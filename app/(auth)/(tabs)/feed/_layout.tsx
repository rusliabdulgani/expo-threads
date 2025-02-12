import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Home" }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
