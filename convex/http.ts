import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { HttpRouter } from "convex/server";

const http = new HttpRouter();
export const handleClerkWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();
  console.log("data....", data);
  switch (type) {
    case "user.created":
      await ctx.runMutation(internal.users.createUser, {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        first_name: data.first_name,
        last_name: data.last_name,
        imageUrl: data.image_url,
        username:
          data.username || data.email_addresses[0].email_address.split("@")[0],
        websiteUrl: data.website_url,
        followersCount: data.followers_count,
      });
      break;
    case "user.updated":
      console.log("user.updated", data);
      break;
  }
  return new Response(null, { status: 200 });
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
