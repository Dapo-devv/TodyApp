import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
    }
    try {
      setIsLoading(true);
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresinMins: 30,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        router.push("/home");
      } else {
        Alert.alert("Error", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.subHeader}>
          You work faster and structured with Todyapp
        </Text>
      </View>

      {/* Login form */}
      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={styles.passwordText}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="eye" size={20} />
            ) : (
              <Ionicons name="eye-off" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <TouchableOpacity onPress={handleLogin} style={styles.btnContainer}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "grey",
  },
  formContainer: {
    padding: 15,
    marginTop: 50,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
  },
  passwordText: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#F6F7F9",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#F6F7F9",
    marginBottom:20,
  },
  btnContainer: {
    backgroundColor: "#24A19C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 15,
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
});
