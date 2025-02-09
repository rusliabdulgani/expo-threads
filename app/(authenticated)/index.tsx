import { Colors } from "@/constants/Colors";
import { useAuth, useSession } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const { signOut, isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (!isSignedIn) {
    return <Redirect href="/(public)" />;
  }

  return (
    <View style={styles.container}>
      <Text>Authenticated page</Text>
      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.border,
    padding: 10,
    borderRadius: 5,
  },
});
