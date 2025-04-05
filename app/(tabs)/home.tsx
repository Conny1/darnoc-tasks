import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TaskCard } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { taskType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";

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

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Homepage",
      headerTitleAlign: "center", // Centers the title
      headerTitleStyle: {
        // fontWeight: "bold",
        // fontSize: 25,
        color: "#000022",
      },
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#f1f1f1",
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#9a9a9a"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.summeryCard}>
        <LinearGradient
          colors={["#2179d0", "#4bc0ee"]}
          style={styles.leftGradient}
        />
        <LinearGradient
          colors={["#4bc0ee", "#2179d0"]}
          style={styles.rightGradient}
        />
        <View>
          <Text style={{ color: "#ffffff" }}>Today's progress summery</Text>
          <Text style={{ color: "#ffffff" }}>15 Tasks</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={{ color: "#ffffff" }}>Progress</Text>
            <Text style={{ color: "#ffffff" }}>40%</Text>
          </View>
          <Progress.Bar
            borderWidth={0}
            unfilledColor="#7cb1e4"
            color="#ffffff"
            height={10}
            progress={0.3}
            width={200}
          />
        </View>
      </View>

      <View style={styles.tasksHeader}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Today's Tasks</Text>

        <TouchableOpacity>
          <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>See All</Text>
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

export default Home;

const styles = StyleSheet.create({
  main: {
    margin: 20,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  summeryCard: {
    height: 120,
    backgroundColor: "#3787eb",
    width: "100%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  leftGradient: {
    position: "absolute",
    // borderWidth: 1,
    // borderColor: "red",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    left: 0,
    top: 0,
    height: 120,
    width: "60%",
  },
  rightGradient: {
    position: "absolute",
    transform: [{ rotate: "180deg" }],
    // borderWidth: 1,
    // borderColor: "red",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    right: 0,
    top: 0,
    height: 120,
    width: "55%",
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
