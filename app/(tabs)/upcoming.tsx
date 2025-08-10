import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UpcomingTasks() {
  interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.todos || []));
  }, []);

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={[styles.taskContainer, item.completed && styles.taskCompleted]}
      onPress={() => toggleComplete(item.id)}
    >
      <View style={styles.taskHeader}>
        <Text
          style={[
            styles.taskTitle,
            item.completed && styles.taskTitleCompleted,
          ]}
        >
          {item.todo}
        </Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#888" />
        </TouchableOpacity>
      </View>
      <Text style={styles.taskTime}>Due: {item.userId}</Text>
      <View style={styles.taskFooter}>
        <View style={styles.taskIcons}>
          <Ionicons name="chatbubble-outline" size={16} color="#888" />
          <Text style={styles.taskIconText}>1</Text>
        </View>
        <View style={styles.taskIcons}>
          <Ionicons name="attach-outline" size={16} color="#888" />
          <Text style={styles.taskIconText}>2</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upcoming</Text>
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 0 : 30,
    padding: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  taskContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  taskCompleted: {
    backgroundColor: "#e6ffe6",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  taskTime: {
    color: "#ff4d4d",
    fontSize: 12,
    marginVertical: 4,
  },
  taskFooter: {
    flexDirection: "row",
    marginTop: 4,
  },
  taskIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  taskIconText: {
    marginLeft: 4,
    color: "#888",
    fontSize: 12,
  },
});
