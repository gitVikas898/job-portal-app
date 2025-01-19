import { getSavedJobs } from "@/api/apiApplications";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Savedjobs = () => {

  const{isLoaded , user} = useUser();

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(getSavedJobs);

    useEffect(() => {
      if (isLoaded) {
        fnSavedJob();
      }
    }, [isLoaded]);


  if (!isLoaded || loadingSavedJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
        <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
            Saved Jobs
        </h1>

        {loadingSavedJob === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJob?.length ? (
            savedJob.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  savedInit={true}
                  onJobSaved={fnSavedJob}
                />
              );
            })
          ) : (
            <div>No Saved Jobs Found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Savedjobs