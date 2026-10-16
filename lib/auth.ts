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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string ,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});