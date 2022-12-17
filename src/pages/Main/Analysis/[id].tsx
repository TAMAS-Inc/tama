import { ComposedChart, Bar, XAxis, YAxis, Legend, LabelList } from 'recharts';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const params = id!.split('&')!;
  const routeId = params[0].split('=')[1];
  const stationId = params[1].split('=')[1];

  const testParams: AnalysisReqParams = {
    stationId: stationId as unknown as string,
    predictDate: getCurrentDate(),
    routeId: routeId as unknown as string,
  };

  const { isLoading, isError, data, mutation } = useAnalysis(testParams);

  if (isError) return <>Error</>;

  const getSortedPredicts = (src: PredictInfo[]) =>
    src.sort((a, b) => b.predictRemainSeatCnt - a.predictRemainSeatCnt);

  const getChartData = ({ current, predict }: AnalysisInfo): ChartData[] => {
    const sortedPredict = getSortedPredicts(predict);

    return [
      {
        ...{ ...current, predictRemainSeatCnt: current.remainSeatCnt },
        label: `${current.remainStationCnt}번째 전`,
      },
      ...sortedPredict.map((station) => ({
        ...station,
        label:
          station.remainStationCnt === 0
            ? station.stationName
            : `${station.remainStationCnt}번째 전`,
      })),
    ];
  };

  const handleSyncButtonClick = () => {
    mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
  };

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>실시간 분석</NavigationHeader>
      <Notification />
      {isLoading || mutation.isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="flex flex-col gap-4 pt-8 pl-7 pr-7 text-body1 font-bold">
          <p>
            <strong className="font-bold text-Primary-600">기흥역</strong>
            에서
            <br />
            <strong className="font-bold text-Primary-600">5001번</strong>{' '}
            버스의 예상 잔여 좌석은
            <br />
            <strong className="font-bold text-Primary-600">
              {
                getSortedPredicts((data as unknown as AnalysisInfo).predict).at(
                  -1
                )?.predictRemainSeatCnt
              }
              석
            </strong>
            일 것 같아요!
          </p>
          <Analysis.Chart
            data={getChartData(data as unknown as AnalysisInfo)}
          />
        </div>
      )}
      <SyncButton onClick={handleSyncButtonClick} />
      <AD />
    </div>
  );
}

function Chart({ data }: { data: (CurrentInfo | PredictInfo)[] }) {
  return (
    <ComposedChart
      width={350}
      height={400}
      data={data}
      margin={{
        left: -30,
      }}
    >
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
        fill="#ffb70f"
      >
        <LabelList fontSize="14px" dataKey="remainSeatCnt" position="top" />
      </Bar>
      <Bar
        name="예측 좌석"
        type="monotone"
        barSize={20}
        fill="#bababa"
        dataKey="predictRemainSeatCnt"
        className="fill-Gray-300"
      >
        <LabelList
          fontSize="14px"
          className="fill-Gray-300"
          dataKey="predictRemainSeatCnt"
          position="top"
        />
      </Bar>
    </ComposedChart>
  );
}

Analysis.Chart = Chart;
