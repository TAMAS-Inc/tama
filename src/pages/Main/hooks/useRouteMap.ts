import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface RouteLocation {
  plateNo: string;
  routeId: string;
  stationId: string;
  stationSeq: number;
  remainSeatCnt: number;
}
interface RoutePassingStation {
  centerYn: 'Y' | 'N';
  districtCd: string;
  mobileNo: string;
  regionName: string;
  stationId: string;
  stationName: string;
  x: string;
  y: string;
  stationSeq: number;
  turnYn: 'Y' | 'N';
}

export interface RouteMapInfo {
  routeInfo: {
    companyId: string;
    companyName: string;
    companyTel: string;
    districtCd: string;
    downFirstTime: string;
    downLastTime: string;
    endMobileNo: string;
    endStationId: string;
    endStationName: string;
    peekAlloc: number;
    regionName: string;
    routeId: string;
    routeName: string;
    routeTypeCd: string;
    routeTypeName: string;
    startMobileNo: string;
    startStationId: string;
    startStationName: string;
    upFirstTime: string;
    upLastTime: string;
    nPeekAlloc: number;
  };
  routeLocations: RouteLocation[];
  routePassingStations: RoutePassingStation[];
}

type FetchRouteMap = (routeId: string) => Promise<RouteMapInfo>;

const fetchRouteMap: FetchRouteMap = async (routeId: string) => {
  try {
    const URL = `${import.meta.env.VITE_END_POINT}/routeMap/${routeId}`;

    const res = await fetch(URL);
    return res.json() as unknown as RouteMapInfo;
  } catch {
    throw new Error('RouteMap fetch error');
  }
};

export const useRouteMap = (routeId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<RouteMapInfo>({
    queryKey: ['routeMap', routeId],
    queryFn: async () => fetchRouteMap(routeId),
  });

  const mutation = useMutation({
    mutationFn: fetchRouteMap,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['routeMap'],
      }),
  });

  return { ...query, mutation };
};
