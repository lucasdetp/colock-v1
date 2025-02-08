import React, { createContext, useState, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Création du contexte
const LoaderContext = createContext();

// Provider pour englober toute l'app
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

// Hook personnalisé pour activer/désactiver le loader
export const useLoader = () => useContext(LoaderContext);

// Composant Loader
const Loader = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="#7790ED" />
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
