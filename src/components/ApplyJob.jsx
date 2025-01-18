import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experinece must be alteast 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),

  education: z.enum(["Junior", "Intemediate", "Experienced"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading : loadingApply,
    error :errorApply,
    fn : fnApply,
  } = useFetch(applyToJob)

  const onSubmit = (data)=>{
    fnApply({
        ...data,
        job_id :job.id,
        candidate_id : user.id,
        name : user.fullName,
        status : "applied",
        resume : data.resume[0],
    }).then(()=>{
        fetchJob();
        reset();
    })
  }

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please Fill the Form below </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4 pb-0 gap-4">
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />

          {errors.experience && (
            <p className="text-red-500">{errors.experience.message}</p>
          )}

          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
            {...register("skills")}
          />

          {errors.skills && (
            <p className="text-red-500">{errors.skills.message}</p>
          )}
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Junior" id="junior" />
                  <Label htmlFor="junior">Junior</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Experienced" id="experienced" />
                  <Label htmlFor="experienced">Experienced</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors.education && (
            <p className="text-red-500">{errors.education.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="flex-1 file:text-gray-500 "
            {...register("resume")}
          />

          {errors.resume && (
            <p className="text-red-500">{errors.resume.message}</p>
          )}

          {errorApply?.message &&(
            <p className="text-red-500">{errorApply?.message}</p>
          )}

        {loadingApply && <BarLoader width={"100%"} color="#36d7b7"/>}
          <Button type="submit" variant="blue" size="lg">
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
