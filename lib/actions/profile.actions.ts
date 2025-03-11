import { TrainerProfile, UserProfile } from "@/types/appwrite.types";
import { databases } from "../appwrite";
import { parseStringify } from "../utils";
import { toast } from "sonner";
import { getSportById } from "./sports.actions";

export async function getTrainerProfiles(): Promise<TrainerProfile[]> {
  try {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TRAINERS_PROFILE_COLLECTION_ID!
    );

    if (!data?.documents) {
      return [];
    }

    return data.documents.map((d) => parseStringify(d));
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the trainer profile details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}

export async function getUserProfiles(): Promise<UserProfile[]> {
  try {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_PROFILE_COLLECTION_ID!
    );

    if (!data?.documents) {
      return [];
    }

    return data.documents.map((d) => parseStringify(d));
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the user profile details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}

export async function getProfileById({
  id,
  role,
}: {
  id: string;
  role: "trainer" | "trainee";
}): Promise<UserProfile | TrainerProfile | null> {
  try {
    const collection =
      role === "trainer"
        ? process.env.NEXT_PUBLIC_APPWRITE_TRAINERS_PROFILE_COLLECTION_ID
        : process.env.NEXT_PUBLIC_APPWRITE_USERS_PROFILE_COLLECTION_ID;

    const data = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collection!,
      id
    );

    if (!data) return null;

    if (data?.sports_id?.length > 0) {
      const sport = await getSportById({ id: data.sports_id[0] });
      return parseStringify({
        ...data,
        sports: [sport],
      });
    }

    return parseStringify(data);
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the user profile details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}

export async function updateProfileById({
  id,
  role,
  body,
}: {
  id: string;
  role: "trainer" | "trainee";
  body: any;
}): Promise<any> {
  try {
    const collection =
      role === "trainer"
        ? process.env.NEXT_PUBLIC_APPWRITE_TRAINERS_PROFILE_COLLECTION_ID
        : process.env.NEXT_PUBLIC_APPWRITE_USERS_PROFILE_COLLECTION_ID;

    const data = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      collection!,
      id,
      body
    );

    return parseStringify(data);
  } catch (error) {
    const errorMessage =
      "An error occurred while updating the user profile details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}
