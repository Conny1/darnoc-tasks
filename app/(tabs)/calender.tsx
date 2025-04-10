import {
  FlatList,
  SafeAreaView,
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
import CalendarPicker from "react-native-calendar-picker";
import { useAppContext } from "@/hooks/contexHook";

const Calender = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [tasks, settasks] = useState<taskType[]>([]);
  const [selectedDate, setselectedDate] = useState(new Date());

  const { tasks: alltasks, getTasksByDate } = useAppContext();

  const getDateTasks = () => {
    const data = getTasksByDate(selectedDate as unknown as string);
    settasks(data);
  };

  useEffect(() => {
    getDateTasks();
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
  }, [alltasks]);

  const ondateChange = (date: Date) => {
    const data = getTasksByDate(date as unknown as string);
    settasks(data);
    setselectedDate(date);
  };

  return (
    <View style={styles.main}>
      <View>
        <CalendarPicker onDateChange={ondateChange} />
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
      {tasks.length === 0 ? (
        <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>
          No tasks for you on{" "}
          {new Date(selectedDate as unknown as string).toDateString()} 😊
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
