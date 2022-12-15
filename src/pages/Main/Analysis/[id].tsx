import { ComposedChart, Bar, XAxis, YAxis, Legend, LabelList } from 'recharts';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader, Notification, SyncButton } from '@/components';

type AnalysisProps<T extends React.ElementType> = Component<T>;
interface BaseInfo {
  /** 정류장 ID */
  stationId: string;
  /** 정류장 이름 */
  stationName: string;
  /** 요청한 정류장 기준 몇 정거장 전인지 */
  remainStationCnt: number;
}

interface PredictInfo extends BaseInfo {
  /** 예측한 도착 시 남을 좌석 */
  predictRemainSeatCnt: number;
}

interface CurrentInfo extends BaseInfo {
  /** 현재 남은 좌석 수 */
  remainSeatCnt: number;
}

interface AnalysisInfo {
  current: CurrentInfo; // 현재 버스가 위치한 정류장 정보
  predict: PredictInfo[]; // 요청한 정류장 기준 앞 3개 정류장 정보(요청 정류장 포함)
}

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
  const queryClient = useQueryClient();

  const TEST_URL =
    'https://raw.githubusercontent.com/TAMAS-Inc/MockAPI/main/analysis/228000191.routeId=228000176.json';
  const testData = {
    stationId: '228000191',
    predictDate: '2022-12-25T07:25',
    routeIds: 228000176,
  };

  const fetcher = () => fetch(TEST_URL).then((res) => res.json());

  const { isLoading, isError, data } = useQuery<[]>(
    ['realtime', testData],
    () => fetcher()
  );

  const mutation = useMutation(() => fetcher(), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['realtime']);
    },
  });

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
    mutation.mutate();
  };

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>실시간 분석</NavigationHeader>
      <Notification />
      {isLoading ? (
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
