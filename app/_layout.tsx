import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { ClipboardList, Info, Monitor, Moon, RectangleEllipsis, Sun } from "lucide-react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TamaguiProvider, Theme, useTheme } from "tamagui";
import tamaguiConfig from "../tamagui.config";

export type ThemeType = "light" | "dark" | "system";

export const ThemeContext = createContext<{
  themePref: ThemeType;
  setThemePref: (t: ThemeType) => void;
}>({
  themePref: "system",
  setThemePref: () => { },
});

function GlobalThemeToggle() {
  const { themePref, setThemePref } = useContext(ThemeContext);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const cycleTheme = () => {
    if (themePref === "system") setThemePref("dark");
    else if (themePref === "dark") setThemePref("light");
    else setThemePref("system");
  };

  const Icon = themePref === "system" ? Monitor : themePref === "dark" ? Moon : Sun;

  return (
    <Button
      position="absolute"
      top={Math.max(insets.top + 10, 20)}
      right={20}
      zIndex={1000}
      size="$3"
      circular
      backgroundColor="$background025"
      onPress={cycleTheme}
    >
      <Icon color={theme.color.val} size={18} />
    </Button>
  );
}

function TabLayoutInner() {
  const theme = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.color.val,
          tabBarStyle: {
            backgroundColor: theme.background.val,
            borderTopColor: theme.borderColor.val,
            height: Platform.OS === "ios" ? 80 : 70,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Genratr",
            headerShown: false,
            tabBarIcon: ({ color }) => <RectangleEllipsis color={color} />,
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ color }) => <ClipboardList color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ color }) => <Info color={color} />,
          }}
        />
        <Tabs.Screen
          name="privacy-policy"
          options={{
            title: "Privacy Policy",
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
      <GlobalThemeToggle />
    </>
  );
}

export default function TabLayout() {
  const systemColorScheme = useColorScheme();
  const [themePref, setThemePref] = useState<ThemeType>("system");

  useEffect(() => {
    AsyncStorage.getItem("userTheme").then((t) => {
      if (t === "light" || t === "dark") setThemePref(t);
    });
  }, []);

  const handleSetTheme = (t: ThemeType) => {
    setThemePref(t);
    AsyncStorage.setItem("userTheme", t);
  };

  const activeTheme =
    themePref === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themePref;

  return (
    <ThemeContext.Provider value={{ themePref, setThemePref: handleSetTheme }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={activeTheme}>
        <Theme name={activeTheme}>
          <TabLayoutInner />
        </Theme>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
}
