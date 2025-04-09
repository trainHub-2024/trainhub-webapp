import { toast } from "sonner";
import { accounts, databases } from "../appwrite";
import { Query } from "appwrite";
import { parseStringify } from "../utils";
import { DateRangeType } from "@/app/(protected)/dashboard/context";
import { User } from "@/types/appwrite.types";

export const login = async (email: string, password: string) => {
  const session = await accounts.createEmailPasswordSession(email, password);
  return session;
};

export const getCurrentUser = async () => {
  try {
    const account = await accounts.get();

    if (!account) {
      throw new Error("No Authenticated Account!");
    }

    const user = await getUserByAccountId(account.$id);

    return user;
  } catch (error: any) {
    console.log(error);
    toast.error(error);
  }
};

export const logout = async () => {
  await accounts.deleteSession("current");
};

// ********************************* USER DETAILS
export async function getUserByAccountId(account_id: string) {
  try {
    const users = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.equal("account_id", [account_id])]
    );

    return parseStringify(users.documents[0]);
  } catch (error) {
    const errorMessage = "An error occurred while retrieving the user details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
  }
}

export async function getUsers({
  dateRange,
}: {
  dateRange: DateRangeType;
}): Promise<User[]> {
  try {
    const query = [];

    query.push(Query.greaterThanEqual("$createdAt", dateRange.from.toDateString()));
    query.push(Query.lessThanEqual("$createdAt", dateRange.to.toDateString()));

    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      query
    );

    if (!data?.documents) {
      return [];
    }

    return data.documents.map((d) => parseStringify(d));
  } catch (error) {
    const errorMessage = "An error occurred while retrieving the user details:";
    toast.error(errorMessage);
    console.error(errorMessage, error);
    return [];
  }
}
