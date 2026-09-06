import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      Slug,
      payload,
    }: {
      Slug: string | undefined;
      payload: Record<string, unknown>;
    }) => {
      const { data } = await api.patch(`/events/${Slug}`, payload);

      return data;
    },

    onSuccess: (_, { Slug }) => {
      queryClient.invalidateQueries({
        queryKey: ["event", Slug],
      });
    },
  });
};

export default useUpdateEvent;
