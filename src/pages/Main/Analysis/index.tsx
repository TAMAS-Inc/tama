import { Bar, XAxis, YAxis, Legend, LabelList, BarChart, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import {
  NavigationHeader,
  Notification,
  TextButton,
  Error,
  LoadingWithDelay,
  SyncButtonWithoutTime,
} from '@/components';
import {
  CurrentInfo,
  PredictInfo,
  AnalysisInfo,
  AnalysisReqParams,
  useAnalysis,
} from '../hooks/useAnalysis';
import { getCurrentDate } from '@/utils/date';
import { useQueryString } from '@/hooks/useQueryString';

type AnalysisProps<T extends React.ElementType> = Component<T>;

interface ChartData {
  label: string;
  predictRemainSeatCnt: number;
  stationId: string;
  stationName: string;
  remainStationCnt: number;
}

export default function Analysis({
  className,
  ...restProps
}: AnalysisProps<'div'>) {
  const query = useQueryString();
  const routeId = query.get('routeId');
  const stationId = query.get('stationId');

  const testParams: AnalysisReqParams = {
    stationId: stationId as unknown as string,
    predictDate: getCurrentDate(),
    routeId: routeId as unknown as string,
  };

  const { isLoading, isError, data, mutation } = useAnalysis(testParams);

  const getSortedData = (predictsInfo: PredictInfo[]) =>
    predictsInfo.sort((a, b) => b.remainStationCnt - a.remainStationCnt);

  const getValidData = (
    currentRamainStationCnt: number,
    predictsInfo: PredictInfo[]
  ) =>
    predictsInfo.filter(
      (predict) => predict.remainStationCnt < currentRamainStationCnt
    );

  const getChartData = ({
    current,
    nearbys,
    target,
  }: AnalysisInfo): ChartData[] => {
    const chartData = getValidData(
      current.remainStationCnt,
      getSortedData(nearbys)
    );

    return [
      {
        ...{ ...current, predictRemainSeatCnt: current.remainSeatCnt },
        label: `${current.remainStationCnt}번째 전`,
      },
      ...chartData.map((station) => ({
        ...station,
        label: `${station.remainStationCnt}번째 전`,
      })),
      {
        ...{
          ...target,
        },
        label: target.stationName,
      },
    ];
  };

  const handleSyncButtonClick = () => {
    mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
  };

  if (isError)
    return (
      <div className={tw('', className)} {...restProps}>
        <Error>
          <Error.SVG />
          <Error.Text>
            현재 보고 계신 페이지를 이용할 수 없습니다.
            <br />
            재접속 후에도 화면이 나타나지 않는다면
            <br />
            아래 버튼을 눌러 알려주세요!
          </Error.Text>
          <Error.InduceLink path="/menu/inquiry">
            문의하러 가기
          </Error.InduceLink>
        </Error>
      </div>
    );

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>실시간 분석</NavigationHeader>
      <Notification />
      {!isLoading ? (
        <div className="flex flex-col gap-4 pt-4 pl-7 pr-7 text-body1">
          <p>
            <strong className="text-Primary-600">
              {data.target.stationName}
            </strong>
            에서
            <br />
            <strong className="text-Primary-600">
              {isLoading ? <LoadingWithDelay /> : data.routeName}번
            </strong>
            버스의 예상 잔여 좌석은
            <br />
            {data.target.predictRemainSeatCnt < 0 ? (
              '현재 알 수 없어요!'
            ) : (
              <>
                <strong className="text-Primary-600">
                  {data.target.predictRemainSeatCnt}석
                </strong>
                일 것 같아요!
              </>
            )}
          </p>
          {data.exist ? (
            <Analysis.Chart data={getChartData(data)} />
          ) : (
            <>
              <p>
                <strong>타까마까의 실시간 예측 정보</strong>는 <br />
                <strong>평일 아침 6시부터 10시 사이</strong>에 제공됩니다.
              </p>
              <TextButton className="h-12 bg-Primary-400 px-4 text-body1 text-White">
                <Link to="/main">타까마까 홈으로 가기</Link>
              </TextButton>
            </>
          )}
        </div>
      ) : (
        <LoadingWithDelay />
      )}
      {data?.exist && <SyncButtonWithoutTime onClick={handleSyncButtonClick} />}
    </div>
  );
}

function Chart({ data }: { data: (CurrentInfo | PredictInfo)[] }) {
  return (
    <BarChart width={400} height={350} data={data} className="-ml-10 mt-6">
      <XAxis dataKey="label" fontSize="14px" />
      <YAxis fontSize="12px" />
      <Legend
        wrapperStyle={{
          fontSize: '16px',
          fontWeight: '400',
          marginLeft: '36px',
        }}
        verticalAlign="bottom"
        height={20}
      />
      <Bar
        name="실시간 좌석"
        dataKey="remainSeatCnt"
        barSize={20}
        fontSize={5}
        fill="#ffb707"
        className="fill-none"
      >
        {data.map((entry) => (
          <Cell key={`${entry}`} className="fill-none" />
        ))}
      </Bar>
      <Bar
        name="예측 좌석"
        type="monotone"
        barSize={20}
        dataKey="predictRemainSeatCnt"
        fill="#bababa"
        className=" fill-Gray-300"
      >
        {data.map((entry, index) => (
          <Cell
            key={`${entry}`}
            className={index === 0 ? 'fill-Primary-500' : 'fill-Gray-300'}
          />
        ))}
        <LabelList
          fontSize="14px"
          dataKey="predictRemainSeatCnt"
          position="top"
          className="font-bold"
        />
      </Bar>
    </BarChart>
  );
}

Analysis.Chart = Chart;
