import { Slot, Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const initialLayout = () => {
  return <Slot />;
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey as string}>
      <Stack />
    </ClerkProvider>
  );
}
