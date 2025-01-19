import { getApplications } from "@/api/apiApplications";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import useFetch from "@/hooks/use-fetch";

const CreatedApplications = () => {

    const {user} = useUser();

    const {
        fn: fnApplications,
        data: applications,
        loading: loadingApplications,
      } = useFetch(getApplications,{
        user_id:user.id,
      });
    
      useEffect(()=>{
            fnApplications()
      },[])

    if(loadingApplications){
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"></BarLoader>
    }
     
  return (
    <div>
        <h1  className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">My Applications</h1>
       {applications && <div className="flex flex-col gap-3">
             {applications.map((application)=>{
                  return <ApplicationCard
                    key={application.id}
                    application={application}
                    isCandidate
                  />
                })}
        </div>}
    </div>
  )
}

export default CreatedApplications