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
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

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

const ProjectDetails = () => {
  const navigation = useNavigation();
  const route = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Project Details",
      headerTitleAlign: "center", // Centers the title
      headerTitleStyle: {
        // fontWeight: "bold",
        // fontSize: 25,
        color: "#000022",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => route.back()}
          style={{
            padding: 10,
            backgroundColor: "#f1f1f1",
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.main}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          width: "100%",
          marginBottom: 20,
        }}
      >
        Web Development
      </Text>
      <View style={styles.date_container}>
        <View style={styles.dateIcon}>
          <SimpleLineIcons name="calendar" size={20} color="#3787eb" />
        </View>
        <Text style={{ color: "#9a9a9a", fontWeight: 600 }}>
          04 april , at 11:30 AM
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={{ fontWeight: 500 }}>In Progress</Text>
          <Text style={{ fontWeight: 500 }}>40%</Text>
        </View>
        <Progress.Bar
          borderWidth={0}
          unfilledColor="#ecf4fd"
          color="#3787eb"
          height={7}
          progress={0.3}
          width={300}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          width: "100%",
          marginBottom: 20,
        }}
      >
        Overview
      </Text>

      <Text
        style={{
          fontWeight: 600,
          lineHeight: 20,
          color: "#9a9a9a",
          width: "100%",
          marginBottom: 20,
          height: "auto",
        }}
      >
        If you liked Tsukimichi: Moonlit Fantasy, you're probably into isekai
        anime with a powerful MC, fantasy world-building, and some comedy. Heres
        a list of anime similar in vibe, theme, or tone...
        <TouchableOpacity>
          <Text style={{ color: "#3787eb", fontWeight: 600 }}>Read More</Text>
        </TouchableOpacity>
      </Text>

      <View style={styles.tasksHeader}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}> Tasks</Text>

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

export default ProjectDetails;

const styles = StyleSheet.create({
  main: {
    margin: 20,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },

  date_container: {
    width: "100%",
    flexDirection: "row",

    alignItems: "center",
    gap: 10,

    marginBottom: 10,
  },

  dateIcon: {
    backgroundColor: "#ecf4fd",
    padding: 10,
    borderRadius: 30,
  },
  tasksHeader: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  progressContainer: {
    marginTop: 10,
    width: "100%",
    marginBottom: 20,
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
