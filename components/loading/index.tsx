import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";

interface FullScreenLoaderProps {
  visible: boolean;
}

export default function FullScreenLoader({ visible }: FullScreenLoaderProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
});
