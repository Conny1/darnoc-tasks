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

const CreateProject = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const [select_date, setselect_date] = useState(false);
  const [title, settitle] = useState("");
  const [start_date, setstart_date] = useState(new Date());
  // const [end_date, setend_date] = useState("");
  const [desc, setdesc] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Create New Project",
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

  const createProject = () => {
    console.log({ title, start_date, desc });
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
            Project Name
          </Text>
          <TextInput
            onChangeText={(text) => settitle(text)}
            style={styles.inputName}
            placeholder="eg CRM Mock"
          />
        </View>

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
            Date
          </Text>
          <View style={styles.date_container}>
            <Text>{start_date.toDateString()}</Text>
            <TouchableOpacity onPress={() => setselect_date((prev) => !prev)}>
              <SimpleLineIcons name="calendar" size={20} color="#3787eb" />
            </TouchableOpacity>
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
            Description
          </Text>
          <TextInput
            onChangeText={(text) => setdesc(text)}
            style={styles.inputDesc}
            multiline
            numberOfLines={6}
            placeholder="eg ui design"
          />
        </View>
        <TouchableOpacity onPress={createProject} style={styles.createProject}>
          <Text
            style={{
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            Create Project
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateProject;

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
  categorybtn: {
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
  createProject: {
    width: "100%",
    backgroundColor: "#3787eb",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
