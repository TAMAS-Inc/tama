import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
} from 'recharts';
import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader, Notification, SyncButton } from '@/components';

const CHART_LENGTH = 4;

type AnalysisProps<T extends React.ElementType> = Component<T>;
interface PredictInfo {
  stationId: string;
  stationName: string;
  remainStationCnt: number;
  predictRemainSeatCnt: number;
}

interface CurrentInfo extends PredictInfo {
  remainSeatCnt: number;
}

interface AnalysisInfo {
  current: CurrentInfo;
  predict: PredictInfo[];
}

export default function Analysis({
  className,
  ...restProps
}: AnalysisProps<'div'>) {
  const data = {
    current: {
      stationId: '228000187',
      stationName: '남동구미마을',
      remainStationCnt: 5,
      predictRemainSeatCnt: 30,
      remainSeatCnt: 28,
    },
    predict: [
      {
        stationId: '228000191',
        stationName: '명지대',
        remainStationCnt: 0,
        predictRemainSeatCnt: 3,
      },
      {
        stationId: '228002958',
        stationName: '명지대앞',
        remainStationCnt: 1,
        predictRemainSeatCnt: 10,
      },
      {
        stationId: '228000190',
        stationName: '동진마을',
        remainStationCnt: 2,
        predictRemainSeatCnt: 17,
      },
    ],
  };

  const getUpdatedPredictSeatCnt = (src: number, diff: number): number =>
    src - diff > 0 ? src - diff : 0;

  const getPredictedUpdatedData = ({ current, predict }: AnalysisInfo) => {
    const diff = current.predictRemainSeatCnt - current.remainSeatCnt;
    const sortedPredict = predict.sort(
      (a, b) => b.predictRemainSeatCnt - a.predictRemainSeatCnt
    );

    return {
      current,
      predict: [
        ...sortedPredict.map((station) => ({
          ...station,

          predictRemainSeatCnt: getUpdatedPredictSeatCnt(
            station.predictRemainSeatCnt,
            diff
          ),
        })),
      ],
    };
  };

  const getChartData = ({ current, predict }: AnalysisInfo) => ({
    isWaveChart: current.remainStationCnt > CHART_LENGTH,
    data: [
      { ...current, label: `${current.remainStationCnt}번째 전` },
      ...predict.map((station) => ({
        ...station,
        label:
          station.remainStationCnt === 0
            ? station.stationName
            : `${station.remainStationCnt}번째 전`,
      })),
    ],
  });

  const updatedData = getPredictedUpdatedData(data);
  const chartData = getChartData(updatedData);

  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>실시간 분석</NavigationHeader>
      <Notification />
      <div className="flex flex-col gap-4 pt-8 pl-7 pr-7 text-body1 font-bold">
        <p>
          <strong className="font-bold text-Primary-600">
            {data.predict[0].stationName}
          </strong>
          에서
          <br />
          <strong className="font-bold text-Primary-600">5001번</strong> 버스의
          예상 잔여 좌석은
          <br />
          <strong className="font-bold text-Primary-600">
            {updatedData.predict.at(-1)?.predictRemainSeatCnt}석
          </strong>{' '}
          일 것 같아요!
        </p>
        <Analysis.Chart
          data={chartData.data}
          isWaveChart={chartData.isWaveChart}
        />
        <p>
          사용자의 <strong className="font-bold text-Primary-600">90%</strong>가
          만족하고 있어요!
        </p>
      </div>
      <SyncButton />
      <AD />
    </div>
  );
}

function Chart({
  data,
  isWaveChart,
}: {
  data: (CurrentInfo | PredictInfo)[];
  isWaveChart: boolean;
}) {
  return (
    <ComposedChart
      width={350}
      height={400}
      data={data}
      margin={{
        left: -30,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="label" fontSize="12px" />
      {isWaveChart && (
        <>
          <line
            strokeDasharray="5 5"
            x1="130"
            y1="340"
            x2="130"
            y2="0"
            className="mr-5 stroke-Black"
          />
          <text
            offset="5"
            x="120"
            y="175"
            className="fill-Gray-500 text-body3"
            textAnchor="middle"
          >
            <tspan x="105" y="50">
              중략
            </tspan>
          </text>
        </>
      )}

      <YAxis fontSize="12px" />
      <Legend
        wrapperStyle={{ fontSize: '16px' }}
        verticalAlign="bottom"
        height={20}
      />
      <Bar
        name="실시간 좌석"
        dataKey="remainSeatCnt"
        barSize={20}
        fontSize={5}
        className="fill-Primary-500"
      >
        <LabelList fontSize="14px" dataKey="remainSeatCnt" position="top" />
      </Bar>
      <Bar
        name="예측 좌석"
        type="monotone"
        barSize={20}
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
