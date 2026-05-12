import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ProfileCardScreen from "./screens/ProfileCardScreen";
import PortfolioDetailsScreen from "./screens/PortfolioDetailsScreen";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { mode, colors } = useTheme();

  // Adapt React Navigation theme to our palette
  const navTheme = {
    ...(mode === "light" ? DefaultTheme : DarkTheme),
    colors: {
      ...(mode === "light" ? DefaultTheme.colors : DarkTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      primary: colors.primary,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={mode === "light" ? "dark" : "light"} />
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Profile" component={ProfileCardScreen} />
        <Stack.Screen name="PortfolioDetails" component={PortfolioDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
