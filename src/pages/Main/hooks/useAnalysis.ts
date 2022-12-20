import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface BaseInfo {
  /** 정류장 ID */
  stationId: string;
  /** 정류장 이름 */
  stationName: string;
  /** 요청한 정류장 기준 몇 정거장 전인지 */
  remainStationCnt: number;
}

export interface PredictInfo extends BaseInfo {
  /** 예측한 도착 시 남을 좌석 */
  predictRemainSeatCnt: number;
}

export interface CurrentInfo extends BaseInfo {
  /** 현재 남은 좌석 수 */
  remainSeatCnt: number;
}

export interface AnalysisInfo {
  /** 현재 도착 정보 여부 */
  exist: boolean;
  /** 현재 노선 이름 */
  routeName: string;
  /** 현재 버스가 위치한 정류장 정보 */
  current: CurrentInfo;
  /** 요청한 정류장 기준 앞 2개 정류장 예측 정보 */
  nearbys: PredictInfo[];
  /** 현재 정류장 예측 정보 */
  target: PredictInfo;
}

export interface AnalysisReqParams {
  stationId: string;
  routeId: string;
  predictDate: string;
}

type FetchAnalysis = (params: AnalysisReqParams) => Promise<AnalysisInfo>;

const fetchAnalysis: FetchAnalysis = async ({
  stationId,
  routeId,
  predictDate,
}) => {
  try {
    const url = `${
      import.meta.env.VITE_END_POINT
    }/analysis/${stationId}?predictDate=${predictDate}&routeId=${routeId}`;

    const res = await fetch(url);

    return res.json() as unknown as AnalysisInfo;
  } catch {
    throw new Error('Analysis fetch error');
  }
};

export const useAnalysis = (params: AnalysisReqParams) => {
  const queryClient = useQueryClient();

  const query = useQuery<AnalysisInfo>({
    queryKey: ['analysis', params],
    queryFn: async () => fetchAnalysis(params),
  });

  const mutation = useMutation({
    mutationFn: fetchAnalysis,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['analysis']);
    },
  });

  return { ...query, mutation };
};
