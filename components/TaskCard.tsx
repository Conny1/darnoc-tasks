import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { RelativePathString, useRouter } from "expo-router";
import { taskType } from "@/types";

type Props = {
  item: taskType;
};
const TaskCard = ({ item }: Props) => {
  const route = useRouter();
  return (
    <View style={styles.TaskCard}>
      <View style={styles.TaskCardContent}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/3d-render-todo-check-list-with-ticks-task-test_107791-15401.jpg?t=st=1743241380~exp=1743244980~hmac=282bebd3fd77b1a95015a290ad9cb93b7469b350c5bf91f292ac2cdddf1f5227&w=826",
          }}
          height={50}
          width={50}
          style={{ borderRadius: 10 }}
        />

        <View style={styles.info}>
          <Text style={{ fontWeight: 400, fontSize: 15 }}>{item.title}</Text>

          <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>
            Start:
            {new Date(item.start_date as string).toDateString()}
          </Text>
          <Text style={{ color: "#9a9a9a" }}>
            {new Date(item.start_time as string).toLocaleTimeString()} -
            {new Date(item.end_time as string).toLocaleTimeString()}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          const path = `/task/${item.id}` as RelativePathString;
          route.push(path);
        }}
      >
        <SimpleLineIcons name="arrow-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  TaskCard: {
    width: "100%",
    // borderWidth: 1,

    flexDirection: "row",
    alignItems: "center",
    height: 75,
    padding: 15,
    gap: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  TaskCardContent: {
    width: "70%",
    // borderWidth: 1,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  info: {
    justifyContent: "space-between",
    minHeight: 45,
    overflow: "hidden",
  },
});
