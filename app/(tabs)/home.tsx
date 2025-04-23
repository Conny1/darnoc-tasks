import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TaskCard } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { taskType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import { useAppContext } from "@/hooks/contexHook";

const Home = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const { tasks: alltasks, getCurrentDayTasks } = useAppContext();
  const [tasks, settasks] = useState<taskType[]>([]);
  const [progress, setprogress] = useState(0);

  const todaysTasks = () => {
    const data = getCurrentDayTasks();

    settasks(data);

    if (data.length !== 0) {
      const totalTasks = data.length;
      const completedTasks = data.filter(
        (item) => item.status === "complete"
      ).length;

      const progressPercentage = completedTasks / totalTasks; // value between 0 and 1

      setprogress(progressPercentage);
    } else {
      setprogress(0); // or handle no tasks case
    }
  };

  useEffect(() => {
    todaysTasks();
    navigation.setOptions({
      headerShown: true,
      title: "Homepage",
      headerTitleAlign: "center", // Centers the title
      headerTitleStyle: {
        // fontWeight: "bold",
        // fontSize: 25,
        color: "#000022",
      },
      // headerRight: () => (
      //   <TouchableOpacity
      //     style={{
      //       padding: 10,
      //       backgroundColor: "#f1f1f1",
      //       borderRadius: 10,
      //       marginRight: 10,
      //     }}
      //   >
      //     <MaterialCommunityIcons
      //       name="bell-outline"
      //       size={24}
      //       color="#9a9a9a"
      //     />
      //   </TouchableOpacity>
      // ),
    });
  }, [alltasks]);

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
          <Text style={{ color: "#ffffff" }}>{tasks?.length || 0} Tasks</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={{ color: "#ffffff" }}>Progress</Text>
            <Text style={{ color: "#ffffff" }}>{progress * 100}%</Text>
          </View>
          <Progress.Bar
            borderWidth={0}
            unfilledColor="#7cb1e4"
            color="#ffffff"
            height={10}
            progress={progress}
            width={200}
          />
        </View>
      </View>

      <View style={styles.tasksHeader}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Today's Tasks</Text>

        <TouchableOpacity onPress={() => route.push("/task/list")}>
          <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>See All</Text>
        </TouchableOpacity>
      </View>
      {tasks.length === 0 ? (
        <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>
          No tasks for you today 😊
        </Text>
      ) : (
        <SafeAreaProvider style={styles.providerContainer}>
          <SafeAreaView style={styles.listContainer}>
            <FlatList
              data={tasks}
              renderItem={({ item }) => <TaskCard item={item} />}
              keyExtractor={(item) => item.id as unknown as string}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      )}
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
