import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TaskCard } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { taskType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAppContext } from "@/hooks/contexHook";
import { useSearchParams } from "expo-router/build/hooks";

const TaskDetails = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const taskId = useSearchParams().get("id");
  const { getTaskbyid, updateTask } = useAppContext();
  const [task, settask] = useState<taskType>();
  const [read, setread] = useState(false);

  useEffect(() => {
    const data = getTaskbyid(taskId as string);
    settask(data);
    navigation.setOptions({
      headerShown: true,
      title: "Task Details",
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

  const updateTaskHandler = (body: taskType) => {
    let oldData = task;
    if (oldData) {
      for (let key in body) {
        oldData[key as keyof taskType] = body[key as keyof {}];
      }

      updateTask(oldData.id as string, oldData);
      console.log(oldData);
      settask(oldData);
    }
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            width: "100%",
            marginBottom: 20,
          }}
        >
          {task?.title}
        </Text>
        <View style={styles.date_container}>
          <View style={styles.dateIcon}>
            <SimpleLineIcons name="calendar" size={20} color="#3787eb" />
          </View>
          <Text style={{ color: "#9a9a9a", fontWeight: 600 }}>
            {new Date(
              task?.created_at || (new Date().toString() as string)
            ).toDateString()}{" "}
            , at{" "}
            {new Date(
              task?.created_at || (new Date().toString() as string)
            ).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={{ fontWeight: 500 }}>{task?.status || "pending"}</Text>
            <Text style={{ fontWeight: 500 }}>
              {task?.status === "inprogress"
                ? "50%"
                : task?.status === "complete"
                ? "100%"
                : "0%"}{" "}
            </Text>
          </View>
          <Progress.Bar
            borderWidth={0}
            unfilledColor="#ecf4fd"
            color="#3787eb"
            height={7}
            progress={
              task?.status === "inprogress"
                ? 0.5
                : task?.status === "complete"
                ? 1
                : 0
            }
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
          {read ? (
            <>
              {task?.desc}
              <TouchableOpacity onPress={() => setread(false)}>
                <Text style={{ color: "#eb374f", fontWeight: 600 }}>
                  Read less
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {task?.desc?.substring(0, 200)}
              <TouchableOpacity onPress={() => setread(true)}>
                <Text style={{ color: "#3787eb", fontWeight: 600 }}>
                  Read More
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Text>

        <View style={styles.tasksHeader}>
          {task?.status === "pending" ||
            (!task?.status && (
              <TouchableOpacity
                onPress={() => updateTaskHandler({ status: "inprogress" })}
                style={styles.progressBtn}
              >
                <Text>In Progress</Text>
              </TouchableOpacity>
            ))}
          {task?.status !== "complete" && (
            <TouchableOpacity
              onPress={() =>
                updateTaskHandler({ status: "complete", is_done: true })
              }
              style={styles.completeBtn}
            >
              <Text>Complete</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionIcons}>
            <Entypo name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateTaskHandler({ is_deleted: true })}
            style={styles.actionIcons}
          >
            <FontAwesome6 name="trash-can" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskDetails;

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
  actionIcons: {
    backgroundColor: "#ecf4fd",
    padding: 10,
    borderRadius: 30,
  },
  tasksHeader: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-evenly",
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
  progressBtn: {
    backgroundColor: "#ecf4fd",
    padding: 10,
    borderRadius: 10,
  },
  completeBtn: {
    backgroundColor: "#ecf4fd",
    padding: 10,
    borderRadius: 10,
  },
});
