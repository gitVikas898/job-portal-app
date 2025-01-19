import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { saveJob } from "@/api/apiJobs";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { deleteJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
    const [saved,setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob,{
    alreadySaved : saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  const {loading : loadingDeleteJob,fn: fnDeleteJob}
   = useFetch(deleteJob,{
      job_id:job.id,
   })

   const handleDeleteJob = async()=>{
      await fnDeleteJob();
      onJobSaved()
   }

  useEffect(()=>{
    if(savedJob !== undefined){
        setSaved(savedJob?.length>0)
    }
  },[])

  const { user } = useUser();
  return (
    <Card className="flex flex-col">
      {loadingDeleteJob &&(
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              onClick={handleDeleteJob}
              className="text-red-300 cursor-pointer"
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && (
            <img src={job.company.logo_url} className="h-6"></img>
          )}
          <div className="flex items-center gap-2">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-4 items-center justify-between">
        <Link to={`/job/${job.id}`}>
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved? ( <Heart size={20} stroke="red" fill="red" />):(<Heart size={20}/>)}
           
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
