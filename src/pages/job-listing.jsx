import { getJobs } from "@/api/apiJobs"
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
const Joblisting = () => {
  const {isLoaded} = useUser();

  const[searchQuery,setSearchQuery] = useState("");
  const[location,setLocation] = useState("");
  const[company_id,setCompany_id] = useState("");

  const {fn:fnJobs
    ,data:dataJobs,
    loading:loadingJobs
  } = useFetch(getJobs,{
    location,
    company_id,
    searchQuery,
  });
  
  console.log(dataJobs);

  useEffect(()=>{
    if(isLoaded){
      fnJobs()
    }
   
  },[isLoaded,location,company_id,searchQuery])

  if(!isLoaded){
    return <BarLoader className="mb-4"  width={"100%"} color="#36d7b7"/>
  }

  return (
    <div className="p-20">
        <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center p-8 ">
            Latest Jobs
        </h1>

        {loadingJobs &&(
          <BarLoader className="mt-4"  width={"100%"} color="#36d7b7"/>
        )}

        {loadingJobs === false && (
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataJobs?.length ? (dataJobs.map((job)=>{
              return <JobCard key={job.id} job={job} savedInit={job.saved.length>0} />
            })) : (
              <div>
                  No Jobs Found
              </div>
            )}
          </div>
        )}
    </div>
  )
}

export default Joblisting