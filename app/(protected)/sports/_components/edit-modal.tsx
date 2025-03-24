import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSportById } from "@/lib/actions/sports.actions";
import { Sport } from "@/types/appwrite.types";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function EditSportModal({
  data,
  isLoading,
  setIsLoading,
}: {
  data: Sport;
  isLoading: boolean;
  setIsLoading: (e: boolean) => void;
}) {
  const [name, setName] = useState(data.name);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await updateSportById({ id: data.$id, body: { name } });
      if (res) {
        toast("Successfully Updated Sport!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isLoading}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit sport details</DialogTitle>
          <DialogDescription>
            Make changes to the sport. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action="POST" className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
