import {
  Button,
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
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const TaskDetails = () => {
  const navigation = useNavigation();
  const route = useRouter();

  useEffect(() => {
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
        <TouchableOpacity style={styles.progressBtn}>
          <Text>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeBtn}>
          <Text>Complete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionIcons}>
          <Entypo name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcons}>
          <FontAwesome6 name="trash-can" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
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
