import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const createTask = () => {
    if (task.trim()) {
      console.log({ task, priority, date });
      setTask("");
      setPriority("Normal");
      setDate(new Date());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Today</Text>
            <Text style={styles.subtitle}>
              Best platform for creating to-do lists
            </Text>
          </View>
          <Ionicons name="settings-outline" size={22} color="#555" />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.addRow} onPress={createTask}>
            <Ionicons name="add-circle" size={22} color="#fff" />
            <Text style={styles.addText}>Tap plus to create a new task</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Add your task"
            value={task}
            onChangeText={setTask}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>Date: {date.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event: any, selectedDate: Date | undefined) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <View style={styles.priorityRow}>
            {["Low", "Normal", "High"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.priorityButton,
                  priority === level && styles.prioritySelected,
                ]}
                onPress={() => setPriority(level)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === level && styles.priorityTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    padding: 12,
  },
  addRow: {
    backgroundColor: "#009688",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  addText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 12,
    fontSize: 14,
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 12,
    color: "#555",
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  priorityButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  prioritySelected: {
    backgroundColor: "#009688",
  },
  priorityText: {
    fontSize: 14,
    color: "#555",
  },
  priorityTextSelected: {
    color: "#fff",
  },
  screen:{
    flex:1,
    padding: 16,
  }
});
