import React, { useState } from "react";
import { Sport, UserProfile } from "@/types/appwrite.types";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteSportModal } from "./delete-modal";
import { EditSportModal } from "./edit-modal";
import { deleteSportById } from "@/lib/actions/sports.actions";
import { toast } from "sonner";

const Row = ({ data }: { data: Sport }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      const res = await deleteSportById({ id: data.$id });
      if (res) {
        toast("Successfully Deleted Sport!");
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
    <TableRow>
      <TableCell className="capitalize">{data.name}</TableCell>
      <TableCell className="flex flex-row justify-end items-center gap-2">
        <EditSportModal data={data} isLoading={isLoading} setIsLoading={setIsLoading}/>
        <DeleteSportModal handleDelete={handleDelete} isLoading={isLoading} />
      </TableCell>
    </TableRow>
  );
};

export default Row;
