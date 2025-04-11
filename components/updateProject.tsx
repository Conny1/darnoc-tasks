import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useAppContext } from "@/hooks/contexHook";
import { projectType } from "@/types";

type Props = {
  project?: projectType;
  setModalVisible: (value: React.SetStateAction<boolean>) => void;
};
const UpdateProject = ({ project, setModalVisible }: Props) => {
  const [select_date, setselect_date] = useState(false);
  const [title, settitle] = useState(project?.title || "");
  const [start_date, setstart_date] = useState(
    new Date(project?.start_date as string)
  );

  // const [end_date, setend_date] = useState("");
  const [desc, setdesc] = useState(project?.desc || "");
  const { updateProject } = useAppContext();

  const updateHandler = async () => {
    // console.log({ title, start_date, desc });
    if (!title || !start_date || !desc) {
      Alert.alert("Alert", "Provide all required fields with *");

      return;
    }
    try {
      let payload = {
        title,
        start_date: start_date.toString(),
        desc,
        updated_at: new Date().toString(),
      };
      const updateData = project as projectType;
      for (let key in payload) {
        updateData[key as keyof projectType] = payload[key as keyof {}];
      }
      await updateProject(project?.id as string, updateData);
      ToastAndroid.show(" project updated", 3);
    } catch (error) {
      ToastAndroid.show("Encounterd an error creating project.Try again", 5);
      console.log("error updating project", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            console.log("pressed");
            setModalVisible((prev) => !prev);
          }}
          style={{
            // padding: 10,
            backgroundColor: "#f1f1f1",
            borderRadius: 10,
            marginRight: 10,
            position: "absolute",
            right: 10,
          }}
        >
          <AntDesign name="close" size={40} color="black" />
        </TouchableOpacity>
        <View style={styles.inputStyle}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Project Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            onChangeText={(text) => settitle(text)}
            style={styles.inputName}
            placeholder="eg CRM Mock"
            value={title}
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
            Date <Text style={{ color: "red" }}>*</Text>
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
            Description <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            onChangeText={(text) => setdesc(text)}
            style={styles.inputDesc}
            multiline
            numberOfLines={15}
            placeholder="A short description about the project"
            value={desc}
          />
        </View>
        <TouchableOpacity onPress={updateHandler} style={styles.updateProject}>
          <Text
            style={{
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            update Project
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateProject;

const styles = StyleSheet.create({
  main: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
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
  updateProject: {
    width: "100%",
    backgroundColor: "#3787eb",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
