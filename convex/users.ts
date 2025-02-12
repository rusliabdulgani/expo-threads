import { internalMutation, mutation, query } from "@/convex/_generated/server";
import { v } from "convex/values";
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    bio: v.optional(v.string()),
    email: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    followersCount: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("users", {
      ...args,
      username: args.username || args.email.split("@")[0],
      followersCount: 0,
    });
    console.log("user created", user);
    return user;
  },
});
