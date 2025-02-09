import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useAuth, useSSO } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { Redirect, useRouter } from "expo-router";
import FullScreenLoader from "@/components/loading";

const redirectUrl = __DEV__
  ? process.env.EXPO_PUBLIC_DEV_REDIRECT_URL
    ? `${process.env.EXPO_PUBLIC_DEV_REDIRECT_URL}/(authenticated)/index`
    : "exp://localhost:8081/(authenticated)/index"
  : `${process.env.EXPO_PUBLIC_PROD_SCHEME}://authenticated/index`;

export default function Index() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const handleInstagramLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({ strategy: "oauth_facebook" });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        signIn?.create({
          strategy: "oauth_facebook",
          redirectUrl,
        });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({ strategy: "oauth_google" });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        signIn?.create({
          strategy: "oauth_google",
          redirectUrl,
        });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  if (isSignedIn) {
    return <Redirect href="/(authenticated)" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.image}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>How would you like to use Threads?</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleInstagramLogin}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonIconContainer}>
                <Image
                  source={require("@/assets/images/instagram_icon.webp")}
                  style={styles.buttonIconImage}
                />
                <Text style={styles.loginButtonTitle}>
                  Continue with Instagram
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              Log in or create a Threads profile with your Instagram account.
              With a profile, you can post, interact and get personilized
              recomendations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
            <View style={styles.buttonContent}>
              <Text style={styles.loginButtonTitle}>Continue with Google.</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.border}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              <Text style={styles.loginButtonTitle}>Use without profile</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.border}
              />
            </View>
            <Text style={styles.loginButtonSubtitle}>
              You can browse Threads without a profile, but won't be able to
              post, interact or get personalized recomendations
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FullScreenLoader visible={!isLoaded} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
  },
  button: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    gap: 10,
  },
  buttonsContainer: {
    gap: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonIconImage: {
    width: 40,
    height: 40,
  },
  loginButtonTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 15,
  },
  loginButtonSubtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: Colors.textSubtitle,
  },
  scrollViewContent: {
    gap: 10,
    marginHorizontal: 20,
  },
  buttonIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
