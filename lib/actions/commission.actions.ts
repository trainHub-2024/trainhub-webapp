import {
  Appointment,
  AppointmentStatus,
  Commission,
  Sport,
} from "@/types/appwrite.types";
import { databases, ID } from "../appwrite";
import { parseStringify } from "../utils";
import { toast } from "sonner";

const COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_COMMISSION_COLLECTION_ID!;

export async function getCommission(): Promise<Commission[]> {
  try {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION
    );

    if (!data?.documents) {
      return [];
    }

    return data.documents.map((d) => parseStringify(d));
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the commission details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}

export async function updateCommission({
  id,
  body,
}: {
  id: string;
  body: any;
}): Promise<any> {
  try {
    const data = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION,
      id,
      body
    );

    return parseStringify(data);
  } catch (error) {
    const errorMessage =
      "An error occurred while updating the commission details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}
