import { Text, View } from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello Threads</Text>
    </View>
  );
}
