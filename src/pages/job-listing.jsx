import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
const Joblisting = () => {
  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = ()=>{
    setSearchQuery("")
    setCompany_id("")
    setLocation("")
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="p-20">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center p-8 ">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value)=>setLocation(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({name})=>{
                return (<SelectItem key={name} value={name}>{name}
                </SelectItem>)
              })}
            </SelectGroup>
          </SelectContent>
        </Select>


       { companies && (<Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.map(({name,id})=>{
                return (<SelectItem key={name} value={id}>
                  {name}
                </SelectItem>)
              })}
            </SelectGroup>
          </SelectContent>
        </Select>)}

        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">
              Clear
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Joblisting;
