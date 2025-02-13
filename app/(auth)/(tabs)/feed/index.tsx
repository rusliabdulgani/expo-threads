import { StyleSheet, Text, View, Button } from "react-native";
import * as Sentry from "@sentry/react-native";

import React from "react";

const Feed = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed</Text>
      <Button
        title="Test Error"
        onPress={() => Sentry.captureException(new Error("Test Error"))}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({});
