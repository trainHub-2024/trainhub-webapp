import { Sport } from "@/types/appwrite.types";
import { databases, ID } from "../appwrite";
import { parseStringify } from "../utils";
import { toast } from "sonner";
import { Query } from "appwrite";

const COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_SPORT_COLLECTION_ID!;

export async function getSports(): Promise<Sport[]> {
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
      "An error occurred while retrieving the sport details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}

export async function getSportById({
  id,
}: {
  id: string;
}): Promise<Sport | null> {
  try {
    const data = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION!,
      id
    );

    return parseStringify(data);
  } catch (error) {
    const errorMessage =
      "An error occurred while retrieving the sport details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}

export async function deleteSportById({
  id,
}: {
  id: string;
}): Promise<Sport | null> {
  try {
    const data = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION!,
      id
    );

    return parseStringify(data);
  } catch (error) {
    const errorMessage = "An error occurred while deleting the sport details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}

export async function updateSportById({
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
    const errorMessage = "An error occurred while updating the sport details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}

export async function createSport({
  body,
}: {
  body: any;
}): Promise<Sport | null> {
  try {
    const exists = await checkIfExists({ body });

    if (exists) {
      console.log(exists);
      return exists;
    }

    const data = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION,
      ID.unique(),
      body
    );

    return parseStringify(data);
  } catch (error) {
    const errorMessage = "An error occurred while creating the sport details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}

export async function checkIfExists({
  body,
}: {
  body: any;
}): Promise<Sport | null> {
  try {
    const query = [Query.equal("name", body.name)];

    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      COLLECTION,
      query
    );

    if (data.documents.length > 0) {
      return data.documents[0] as Sport; // Return first match
    }

    return null;
  } catch (error) {
    const errorMessage = "An error occurred while checking the sport details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return null;
  }
}
