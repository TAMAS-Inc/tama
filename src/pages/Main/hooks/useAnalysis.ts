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
  /** 현재 버스가 위치한 정류장 정보 */
  current: CurrentInfo;
  /** 요청한 정류장 기준 앞 3개 정류장 정보(요청 정류장 포함) */
  predict: PredictInfo[];
}

export interface AnalysisReqParams {
  stationId: string;
  routeId: string;
  predictDate: string;
}

type FetchAnalysis = (params: AnalysisReqParams) => Promise<AnalysisInfo[]>;

const fetchAnalysis: FetchAnalysis = async ({
  stationId,
  routeId,
  predictDate,
}) => {
  try {
    const END_POINT =
      'http://ec2-35-174-107-39.compute-1.amazonaws.com/Analysis';

    const REAL_URL = `${END_POINT}/${stationId}?predictDate=${predictDate}&routeId=${routeId}`;

    const TEST_URL =
      'https://raw.githubusercontent.com/TAMAS-Inc/MockAPI/main/analysis/228000191.routeId=228000176.json';
    // eslint-disable-next-line no-constant-condition
    const res = await fetch(true ? TEST_URL : REAL_URL);

    return res.json() as unknown as AnalysisInfo[];
  } catch {
    return [];
  }
};

export const useAnalysis = (params: AnalysisReqParams) => {
  const queryClient = useQueryClient();

  const query = useQuery<AnalysisInfo[]>({
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
