import { Appointment, AppointmentStatus, Sport } from "@/types/appwrite.types";
import { databases, ID } from "../appwrite";
import { parseStringify } from "../utils";
import { toast } from "sonner";
import { Query } from "appwrite";
import { DateRangeType } from "@/app/(protected)/dashboard/context";

const COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID!;

export async function getAppointments({
  status = "all",
  dateRange,
}: {
  status?: "all" | AppointmentStatus;
  dateRange: DateRangeType;
}): Promise<Appointment[]> {
  try {
    const query = [];

    query.push(Query.greaterThanEqual("date", dateRange.from.toDateString()));
    query.push(Query.lessThanEqual("date", dateRange.to.toDateString()));

    if (status != "all") {
      query.push(Query.equal("status", status));
    }

    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION,
      query
    );

    if (!data?.documents) {
      return [];
    }

    return data.documents.map((d) => parseStringify(d));
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the appointment details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}
