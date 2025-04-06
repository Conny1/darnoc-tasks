import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TaskCard } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { taskType } from "@/types";
import CalendarPicker from "react-native-calendar-picker";

const tasks: taskType[] = [
  {
    id: 1,
    title: "Do Rust Tutorial",
    start_time: "08:00 AM",
    end_time: "09:00 AM",
  },
  {
    id: 2,
    title: "Read System Design Book",
    start_time: "09:30 AM",
    end_time: "10:30 AM",
  },
  {
    id: 3,
    title: "Write MongoDB Aggregation",
    start_time: "11:00 AM",
    end_time: "12:00 PM",
  },
  {
    id: 4,
    title: "Debug Node.js Cron Job",
    start_time: "12:30 PM",
    end_time: "01:30 PM",
  },
  {
    id: 5,
    title: "Fix React Native UI Issue",
    start_time: "02:00 PM",
    end_time: "03:00 PM",
  },
  {
    id: 6,
    title: "Optimize SQL Queries",
    start_time: "03:30 PM",
    end_time: "04:30 PM",
  },
  {
    id: 7,
    title: "Deploy API to Production",
    start_time: "05:00 PM",
    end_time: "06:00 PM",
  },
  {
    id: 8,
    title: "Plan New Side Project",
    start_time: "06:30 PM",
    end_time: "07:30 PM",
  },
  {
    id: 9,
    title: "Refactor Notification Service",
    start_time: "08:00 PM",
    end_time: "09:00 PM",
  },
  {
    id: 10,
    title: "Write Tech Blog Post",
    start_time: "09:30 PM",
    end_time: "10:30 PM",
  },
  {
    id: 11,
    title: "Study React Server Components",
    start_time: "07:00 AM",
    end_time: "08:00 AM",
  },
  {
    id: 12,
    title: "Review Pull Requests",
    start_time: "08:30 AM",
    end_time: "09:30 AM",
  },
  {
    id: 13,
    title: "Test WebSocket Implementation",
    start_time: "10:00 AM",
    end_time: "11:00 AM",
  },
  {
    id: 14,
    title: "Sketch UI for New Feature",
    start_time: "11:30 AM",
    end_time: "12:30 PM",
  },
  {
    id: 15,
    title: "Implement GraphQL API",
    start_time: "01:00 PM",
    end_time: "02:00 PM",
  },
  {
    id: 16,
    title: "Fix Expo Router Bug",
    start_time: "02:30 PM",
    end_time: "03:30 PM",
  },
  {
    id: 17,
    title: "Set Up CI/CD Pipeline",
    start_time: "04:00 PM",
    end_time: "05:00 PM",
  },
  {
    id: 18,
    title: "Write Jest Unit Tests",
    start_time: "05:30 PM",
    end_time: "06:30 PM",
  },
  {
    id: 19,
    title: "Analyze Database Performance",
    start_time: "07:00 PM",
    end_time: "08:00 PM",
  },
  {
    id: 20,
    title: "Research Web3 Authentication",
    start_time: "08:30 PM",
    end_time: "09:30 PM",
  },
];

const Calender = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Upcoming Tasks",
      headerTitleAlign: "center", // Centers the title
      headerTitleStyle: {
        // fontWeight: "bold",
        // fontSize: 25,
        color: "#000022",
      },
    });
  }, []);

  return (
    <View style={styles.main}>
      <View>
        <CalendarPicker />
      </View>
      <View style={styles.tasksHeader}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Schedule</Text>

        <TouchableOpacity
          style={styles.addNewBTN}
          onPress={() => router.push("/task/create")}
        >
          <MaterialCommunityIcons name="plus" size={15} color="#ffffff" />
          <Text style={{ color: "#ffffff", fontWeight: 500 }}>Add new</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaProvider style={styles.providerContainer}>
        <SafeAreaView style={styles.listContainer}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => <TaskCard item={item} />}
            keyExtractor={(item) => item.id as unknown as string}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  main: {
    margin: 20,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  addNewBTN: {
    backgroundColor: "#3787eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 10,
  },
  tasksHeader: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  progressContainer: {
    marginTop: 10,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  providerContainer: {
    width: "100%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
});
