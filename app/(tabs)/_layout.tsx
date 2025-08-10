import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#24A19C",
        tabBarInactiveTintColor: "#A0AAB8",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
