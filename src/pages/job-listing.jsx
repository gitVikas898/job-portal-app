import { getJobs } from "@/api/apiJobs"
import useFetch from "@/hooks/use-fetch"
import { useEffect } from "react";
const Joblisting = () => {

  const {fn:fnJobs
    ,data:dataJobs,
    loading:loadingJobs
  } = useFetch(getJobs);
  
  console.log(dataJobs);

  useEffect(()=>{
    fnJobs()
  },[])

  return (
    <div>Joblisting</div>
  )
}

export default Joblisting