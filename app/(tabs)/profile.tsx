import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  interface User {
    image: string;
    firstName: string;
    lastName: string;
    username: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <Ionicons name="search" size={22} color="#000" />
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: user?.image }} style={styles.avatar} />

        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <View style={styles.menuSection}>
        {[
          { icon: "person-outline", label: "Account" },
          { icon: "color-palette-outline", label: "Theme" },
          { icon: "apps-outline", label: "App Icon" },
          { icon: "bar-chart-outline", label: "Productivity" },
          { icon: "sunny-outline", label: "Change Mode", isSwitch: true },
          { icon: "document-text-outline", label: "Privacy Policy" },
          { icon: "help-circle-outline", label: "Help Center" },
          { icon: "log-out-outline", label: "Log Out" },
        ].map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Ionicons name={item.icon} size={20} color="#555" />
            <Text style={styles.menuText}>{item.label}</Text>
            {item.isSwitch ? (
              <Switch value={darkMode} onValueChange={setDarkMode} />
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 0 : 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: "40%",
    backgroundColor: "#009688",
    borderRadius: 10,
    padding: 4,
  },
  name: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
  },
  username: {
    fontSize: 14,
    color: "#888",
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },
});
