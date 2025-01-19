import CreatedApplications from "@/components/CreatedApplications";
import CreatedJobs from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react"
import { BarLoader } from "react-spinners";

const Myjobs = () => {

  const {user,isLoaded} = useUser();

    if(!isLoaded){
      return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"> </BarLoader>
    }

  return (
    <div className="p-20">
          {user?.unsafeMetadata?.role === "candidate" ?(
            <CreatedApplications/>
          ):(
            <CreatedJobs/>
          )}
    </div>
  )
}

export default Myjobs