import {  useQuery  } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";



const useFetchPasrEvent = ()=> {
    return useQuery({
        queryKey: ["pastEvent"],
        queryFn: async()=> {
            let res = await api.get('/api/v1/find/pastEvents')
            return res.data.data
        }


    })
}

export default useFetchPasrEvent