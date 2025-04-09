import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useAppContext } from "@/hooks/contexHook";

type projectProps = {
  project: { id: string; title: string };
  setproject: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
};
const Project = ({ project, selected, setproject }: projectProps) => {
  const [active, setactive] = useState(false);
  useEffect(() => {
    if (active && project.id !== selected) {
      setactive(!active);
    }
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={() => {
        setactive((prev) => !prev);
        setproject(project.id);
      }}
      style={{
        ...styles.projectbtn,
        backgroundColor: active ? "#3787eb" : "#ecf4fd",
      }}
    >
      <Text
        style={{
          color: !active ? "#00000" : "#ecf4fd",
        }}
      >
        {project.title}
      </Text>
    </TouchableOpacity>
  );
};

let projects = [
  { id: "a", title: "Design" },
  { id: "b", title: "development" },
  { id: "c", title: "research" },
  { id: "d", title: "Science" },
];

const CreateTask = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const [select_date, setselect_date] = useState(false);
  const [start, setstart] = useState(false);
  const [end, setend] = useState(false);
  const [title, settitle] = useState("");
  const [start_date, setstart_date] = useState(new Date());
  // const [end_date, setend_date] = useState("");
  const [start_time, setstart_time] = useState(new Date());
  const [end_time, setend_time] = useState(new Date());
  const [desc, setdesc] = useState("");
  const [project, setproject] = useState("");
  const { createTask } = useAppContext();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Create New Task",
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
  }, [navigation]);

  const createHandler = async () => {
    console.log({ project, title, start_date, start_time, end_time, desc });
    try {
      const payload = {
        title,
        start_time: start_time.toString(),
        end_time: end_time.toString(),
        start_date: start_date.toString(),
        desc,
        project_id: project,
      };
      await createTask(payload);
    } catch (error) {
      console.log("failed to create task");
    }
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.inputStyle}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Task Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            onChangeText={(text) => settitle(text)}
            style={styles.inputName}
            placeholder="eg ui design"
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 10,
            width: "100%",
          }}
        >
          Project
        </Text>
        <SafeAreaView style={{ height: 50 }}>
          <FlatList
            data={projects}
            renderItem={({ item }) => (
              <Project
                project={item}
                selected={project}
                setproject={setproject}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </SafeAreaView>

        <View style={styles.date_and_timeContainer}>
          {select_date && (
            <RNDateTimePicker
              onChange={(event, date) => {
                let newdate = date as Date;
                setstart_date(newdate);
                setselect_date(false);
              }}
              mode="date"
              value={start_date}
            />
          )}
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Date & Time <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View style={styles.date_container}>
            <Text>{start_date.toDateString()}</Text>
            <TouchableOpacity onPress={() => setselect_date((prev) => !prev)}>
              <SimpleLineIcons name="calendar" size={20} color="#3787eb" />
            </TouchableOpacity>
          </View>
          <View style={styles.end_and_startCont}>
            <View style={styles.time_containers}>
              {start && (
                <RNDateTimePicker
                  onChange={(event, date) => {
                    let newdate = date as Date;
                    setstart_time(newdate);
                    setstart(false);
                  }}
                  mode="time"
                  value={start_time}
                />
              )}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                }}
              >
                Start time <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.time}>
                <Text>{start_time.toLocaleTimeString()}</Text>
                <TouchableOpacity onPress={() => setstart((prev) => !prev)}>
                  <AntDesign name="down" size={20} color="#3787eb" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.time_containers}>
              {end && (
                <RNDateTimePicker
                  onChange={(event, date) => {
                    let newdate = date as Date;
                    setend_time(newdate);
                    setend(false);
                  }}
                  mode="time"
                  value={end_time}
                />
              )}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                }}
              >
                End time <Text style={{ color: "red" }}>*</Text>
              </Text>
              <View style={styles.time}>
                <Text>{end_time.toLocaleTimeString()} </Text>
                <TouchableOpacity onPress={() => setend((prev) => !prev)}>
                  <AntDesign name="down" size={20} color="#3787eb" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.inputStyle}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Description <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            style={styles.inputDesc}
            onChangeText={(text) => setdesc(text)}
            multiline
            numberOfLines={6}
            placeholder="A short description about the project"
          />
        </View>
        <TouchableOpacity onPress={createHandler} style={styles.createTask}>
          <Text
            style={{
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            Create Task
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  main: {
    margin: 20,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  inputStyle: {
    width: "100%",
  },
  inputName: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#9a9a9a",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    height: 50,
  },
  projectbtn: {
    height: 40,

    marginLeft: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  date_and_timeContainer: {
    marginTop: 20,
    width: "100%",
    marginBottom: 10,
  },
  date_container: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    borderColor: "#9a9a9a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
  },
  end_and_startCont: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
    marginBottom: 10,
    gap: 20,
  },
  time_containers: {
    flex: 1,
  },

  time: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9a9a9a",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  inputDesc: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#9a9a9a",
    borderRadius: 10,
    padding: 15,
    height: 100,
    marginBottom: 10,
  },
  createTask: {
    width: "100%",
    backgroundColor: "#3787eb",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
