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

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
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

        <form className="flex flex-col p-4 pb-0 gap-4">
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
          />

          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1"
          />

          <RadioGroup defaultValue="option-one">
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

            <Input
                type="file"
                accept=".pdf,.doc,.docx"
                className="flex-1 file:text-gray-500 "
            />

          <Button type="submit" variant="blue" size="lg" >Apply</Button>
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
