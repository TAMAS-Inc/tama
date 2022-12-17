import { useQuery } from '@tanstack/react-query';

interface Params {
  stationId: Station['stationId'] | null;
}
const fetchAvailableRoutes = async ({ stationId }: Params) => {
  try {
    const END_POINT = `http://localhost:3000/available/routes`;
    const url = `${END_POINT}/${stationId}`;

    const response = await fetch(url);

    return response.json() as unknown as Route[];
  } catch {
    return [];
  }
};

export const useAvailableRoutes = (params: Params) => {
  const query = useQuery<Route[]>({
    queryKey: ['availableStations', params],
    queryFn: async () => fetchAvailableRoutes(params),
    enabled: params.stationId !== null,
  });

  return query;
};
