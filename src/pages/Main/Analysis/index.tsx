/* eslint-disable no-nested-ternary */
import { Bar, XAxis, YAxis, Legend, LabelList, BarChart, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader, Notification, SyncButton } from '@/components';
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

  if (isError) return <>Error</>;

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

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>실시간 분석</NavigationHeader>
      <Notification />
      {!isLoading && !mutation.isLoading ? (
        <div className="flex flex-col gap-4 pt-8 pl-7 pr-7 text-body1 font-bold">
          <p>
            <strong className="font-bold text-Primary-600">
              {data.target.stationName}
            </strong>
            에서
            <br />
            <strong className="font-bold text-Primary-600">
              {isLoading || mutation.isLoading ? <> </> : data.routeName}번
            </strong>
            버스의 예상 잔여 좌석은
            <br />
            {data.target.predictRemainSeatCnt < 0 ? (
              '현재 알 수 없어요!'
            ) : (
              <>
                <strong className="font-bold text-Primary-600">
                  {data.target.predictRemainSeatCnt}석
                </strong>
                일 것 같아요!
              </>
            )}
          </p>
          {data.exist ? (
            <Analysis.Chart data={getChartData(data)} />
          ) : (
            <Link to="/main">메인으로 돌아가기</Link>
          )}
        </div>
      ) : (
        <>로딩중</>
      )}

      <SyncButton onClick={handleSyncButtonClick} />
      <AD />
    </div>
  );
}

function Chart({ data }: { data: (CurrentInfo | PredictInfo)[] }) {
  return (
    <BarChart width={350} height={400} data={data}>
      <XAxis dataKey="label" fontSize="14px" />
      <YAxis fontSize="12px" />
      <Legend
        wrapperStyle={{ fontSize: '16px', fontWeight: '400' }}
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
        className="fill-Gray-300"
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
        />
      </Bar>
    </BarChart>
  );
}

Analysis.Chart = Chart;
