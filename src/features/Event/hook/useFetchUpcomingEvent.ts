import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

const useFetchUpcomingEvent = () => {
  return useQuery({
    queryKey: ["upcomingEvent"],
    queryFn: async () => {
      let res = await api.get("/api/v1/find/upcomingEvents");
      return res.data.data;
    },
  });
};

export default useFetchUpcomingEvent;
