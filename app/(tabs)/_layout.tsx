import { Tabs } from "expo-router";
import { useTheme } from "tamagui";
import { RectangleEllipsis, ClipboardList, Info } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabLayout() {
  const theme = useTheme();

  return (
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
        name="notebook"
        options={{
          title: "Notebook",
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
    </Tabs>
  );
}
