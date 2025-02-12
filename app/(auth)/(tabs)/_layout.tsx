import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CreateTabIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => {
  return (
    <View>
      <Ionicons
        name={focused ? "add" : "add-outline"}
        color={color}
        size={size}
      />
    </View>
  );
};
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => (
            <CreateTabIcon size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen name="favorites" options={{ headerShown: false }} />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
