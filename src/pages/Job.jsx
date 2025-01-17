import { getSingleJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5 p-20">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img
          src={job?.company?.logo_url}
          className="h-12"
          alt={job?.title}
        ></img>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon></MapPinIcon>
          {job?.location}
        </div>
        <div className="flex gap-2 items-center">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen>Open</DoorOpen>
            </>
          ) : (
            <>
              <DoorClosed>Closed</DoorClosed>
            </>
          )}
        </div>
      </div>

      {/** Hiring Status */}
      <h2 className="text-2xl sm:text-3xl font-bold" >About the job</h2>
       <MDEditor.Markdown
            source={job?.description}
            className="bg-transparent sm:text-lg"
          />
      <h2 className="text-2xl sm:text-3xl font-bold" >What we are looking for : </h2>
          <MDEditor.Markdown
            source={job?.requirements}
            className="bg-transparent sm:text-lg"
          />

          {/** Render Applications */}
    </div>
  );
};

export default Job;
