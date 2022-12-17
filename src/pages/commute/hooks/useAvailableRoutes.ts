import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Params {
  stationId: Station['stationId'];
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
  const queryClient = useQueryClient();
  const query = useQuery<Route[]>({
    queryKey: ['availableStations', params],
    queryFn: async () => fetchAvailableRoutes(params),
  });

  const mutation = useMutation({
    mutationFn: fetchAvailableRoutes,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['realtime']);
    },
  });
  return { ...query, mutation };
};
