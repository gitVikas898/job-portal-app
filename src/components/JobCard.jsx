import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {job.title}
            {!isMyJob && (
                <Trash2Icon fill="red" size={18} className="text-red-300 cursor-pointer"></Trash2Icon>
            )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between">
                {job.company && <img src={job.company.logo_url} className="h-6"></img>}
                <div className="flex items-center gap-2">
                    < MapPinIcon size={15}  />{job.location}
                </div>
            </div>
            <hr />
            {job.description.substring(0,job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-4 items-center justify-between">
            <Link to={`/job/${job.id}`}>
                <Button variant="secondary" className="w-full">
                    More Details
                </Button>
            </Link>

            <Heart size={20} stroke="red" fill="red"/>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
