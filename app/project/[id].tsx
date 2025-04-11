import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TaskCard, UpdateProject } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { projectType, taskType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useAppContext } from "@/hooks/contexHook";
import { useSearchParams } from "expo-router/build/hooks";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ProjectDetails = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const projectId = useSearchParams().get("id");
  const {
    getProjectbyid,
    tasks: allTasks,
    getTasksByprojectid,
    updateProject,
  } = useAppContext();
  const [project, setproject] = useState<projectType>();
  const [tasks, settasks] = useState<taskType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchTasks = () => {
    const data = getProjectbyid(projectId as string);
    setproject(data);
    const taskData = getTasksByprojectid(data?.id as string);
    settasks(taskData);
  };

  useEffect(() => {
    fetchTasks();
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
  }, [allTasks]);

  const updateProjectHandler = (body: taskType) => {
    let oldData = project;
    if (oldData) {
      for (let key in body) {
        oldData[key as keyof projectType] = body[key as keyof {}];
      }

      updateProject(oldData.id as string, oldData);

      setproject(oldData);
      if (body.is_deleted === true) {
        route.back();
      }
    }
  };

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
        {project?.title}
      </Text>
      <View style={styles.date_container}>
        <View style={styles.dateIcon}>
          <SimpleLineIcons name="calendar" size={20} color="#3787eb" />
        </View>
        <Text style={{ color: "#9a9a9a", fontWeight: 600 }}>
          {new Date(project?.start_date as string).toDateString()}
        </Text>
      </View>
      {/* <View style={styles.progressContainer}>
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
      </View> */}
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
        {project?.desc?.substring(0, 200)}
        <TouchableOpacity>
          <Text style={{ color: "#3787eb", fontWeight: 600 }}>Read More</Text>
        </TouchableOpacity>
      </Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.actionIcons}
        >
          <Entypo name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateProjectHandler({ is_deleted: true })}
          style={styles.actionIcons}
        >
          <FontAwesome6 name="trash-can" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tasksHeader}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}> Tasks</Text>

        <TouchableOpacity onPress={() => route.push("/task/list")}>
          <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>See All</Text>
        </TouchableOpacity>
      </View>
      {tasks.length === 0 ? (
        <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>
          No tasks here 😊
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

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <UpdateProject project={project} setModalVisible={setModalVisible} />
      </Modal>
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
  actionIcons: {
    backgroundColor: "#ecf4fd",
    padding: 10,
    borderRadius: 30,
  },
  actionContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
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
