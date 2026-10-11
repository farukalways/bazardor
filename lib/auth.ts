import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("কোথাও MONGODB_URI পাওয়া যায়নি! .env.local ফাইল চেক করুন।");
}

declare global {
  var _mongo: MongoClient | undefined;
}

// Global caching for MongoDB client (TypeScript Version)
const client: MongoClient = global._mongo || new MongoClient(uri);
if (!global._mongo) {
  global._mongo = client;
}

const db = client.db("bazerdor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
});