import { AdminRequest } from "@/types/appwrite.types";
import { databases } from "../appwrite";
import { parseStringify } from "../utils";
import { toast } from "sonner";
import { getProfileById, updateProfileById } from "./profile.actions";
import { DateRangeType } from "@/app/(protected)/dashboard/context";
import { Query } from "appwrite";

export async function getAdminRequests({
  dateRange,
}: {
  dateRange?: DateRangeType;
}): Promise<AdminRequest[]> {
  try {
    const query = [];
    query.push(Query.orderDesc("$createdAt"));

    if (dateRange) {
      query.push(
        Query.greaterThanEqual("$createdAt", dateRange.from.toDateString())
      );
      query.push(
        Query.lessThanEqual("$createdAt", dateRange.to.toDateString())
      );
    }

    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_REQUEST_COLLECTION_ID!,
      query
    );

    if (!data?.documents) {
      return [];
    }

    // Fetch trainer profiles for requests that have trainerProfile_id
    const adminRequests = await Promise.all(
      data.documents.map(async (request) => {
        if (request.trainerProfile_id) {
          const trainerProfile = await getProfileById({
            id: request.trainerProfile_id,
            role: "trainer",
          });

          return {
            ...parseStringify(request),
            trainerProfile,
          };
        } else if (request.userProfile_id) {
          const userProfile = await getProfileById({
            id: request.userProfile_id,
            role: "trainee",
          });

          return {
            ...parseStringify(request),
            userProfile,
          };
        }

        return parseStringify(request);
      })
    );

    return adminRequests;
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the admin requests details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}

export async function updateAdminRequestStatus({
  id,
  status,
  trainer_id,
  type,
}: {
  id: string;
  trainer_id: string;
  status: "denied" | "completed";
  type: "certification" | "report" | "appeal" | "sport";
}): Promise<AdminRequest | null> {
  try {
    const data = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ADMIN_REQUEST_COLLECTION_ID!,
      id,
      {
        status,
      }
    );

    if (type === "certification") {
      if (status === "completed")
        await updateProfileById({
          id: trainer_id,
          role: "trainer",
          body: {
            isCertified: true,
          },
        });

      return parseStringify(data);
    } else {
      if (status === "completed")
        await updateProfileById({
          id: trainer_id,
          role: "trainer",
          body: {
            isDisabled: false,
          },
        });

      return parseStringify(data);
    }
  } catch (error) {
    const errorMessage =
      "An error occurred while updating admin request details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}
