import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface RealtimeInfo {
  /** 실시간 정보 존재 여부 */
  exist: boolean;
  /** 노선명 */
  routeName: string;
  /** 노선 ID */
  routeId: string;
  /** 현재 남은 좌석 수 */
  remainSeatCnt: number;
  /** 현재 남은 정거장 수 */
  remainStationCnt: number;
  /** 도착까지 남은 시간(분) */
  predictRemainTime: number;
  /** 예측한 도착 시 남을 좌석 */
  predictRemainSeatCnt: number;
}

export interface RealtimeReqParams {
  stationId: string;
  routeIds: string[];
  predictDate: string;
}

type FetchRealtime = (params: RealtimeReqParams) => Promise<RealtimeInfo[]>;

const fetchRealtime: FetchRealtime = async ({
  stationId,
  routeIds,
  predictDate,
}) => {
  try {
    const END_POINT =
      'http://ec2-35-174-107-39.compute-1.amazonaws.com/realtime';

    const REAL_URL = `${END_POINT}/${stationId}?predictDate=${predictDate}&${routeIds
      .map((id) => `routeIds=${id}`)
      .join('')}`;

    const TEST_URL =
      'https://raw.githubusercontent.com/TAMAS-Inc/MockAPI/main/realtime/228000191.routeIds.228000176.228000182.json';
    const res = await fetch(true ? TEST_URL : REAL_URL);

    return res.json() as unknown as RealtimeInfo[];
  } catch {
    return [];
  }
};

export const useRealtime = (params: RealtimeReqParams) => {
  const queryClient = useQueryClient();

  const query = useQuery<RealtimeInfo[]>({
    queryKey: ['realtime', params],
    queryFn: async () => fetchRealtime(params),
  });

  const mutation = useMutation({
    mutationFn: fetchRealtime,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['realtime']);
    },
  });

  return { ...query, mutation };
};
