import React, { createContext, useState, useContext, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import SvgFavIcon from "../assets/svg/favicon";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

const Loader = () => {
  const zoomAnim = new Animated.Value(1);

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(zoomAnim, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(zoomAnim, {
          toValue: 0.5,
          duration: 900,
          useNativeDriver: true,
        })
      ]).start(() => loopAnimation());
    };

    loopAnimation();

  }, [zoomAnim]);

  return (
    <View style={styles.overlay}>
      <Animated.View style={{ transform: [{ scale: zoomAnim }] }}>
        <SvgFavIcon width={100} height={100} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(236, 236, 236, 0.84)",
    blurRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
