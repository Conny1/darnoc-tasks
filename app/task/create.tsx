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

type categoryProps = {
  category: string;
};
const Category = ({ category }: categoryProps) => {
  const [active, setactive] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setactive((prev) => !prev);
      }}
      style={{
        ...styles.categorybtn,
        backgroundColor: active ? "#3787eb" : "#ecf4fd",
      }}
    >
      <Text
        style={{
          color: !active ? "#00000" : "#ecf4fd",
        }}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

let categories = ["Design", "development", "research"];

const CreateTask = () => {
  const navigation = useNavigation();
  const route = useRouter();

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
  }, []);

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
            Task Name
          </Text>
          <TextInput style={styles.inputName} placeholder="eg ui design" />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 10,
            width: "100%",
          }}
        >
          Category
        </Text>
        <SafeAreaView style={{ height: 50 }}>
          <FlatList
            data={categories}
            renderItem={({ item }) => <Category category={item} />}
            keyExtractor={(item: string) => item}
            horizontal={true}
          />
        </SafeAreaView>

        <View style={styles.date_and_timeContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Date & Time
          </Text>
          <View style={styles.date_container}>
            <Text>05 april teusday</Text>
            <TouchableOpacity>
              <SimpleLineIcons name="calendar" size={20} color="#3787eb" />
            </TouchableOpacity>
          </View>
          <View style={styles.end_and_startCont}>
            <View style={styles.time_containers}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                }}
              >
                Start time
              </Text>
              <View style={styles.time}>
                <Text>09:00 AM</Text>
                <TouchableOpacity>
                  <AntDesign name="down" size={20} color="#3787eb" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.time_containers}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                }}
              >
                End time
              </Text>
              <View style={styles.time}>
                <Text>11:00 AM </Text>
                <TouchableOpacity>
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
            Description
          </Text>
          <TextInput
            style={styles.inputDesc}
            multiline
            numberOfLines={6}
            placeholder="eg ui design"
          />
        </View>
        <TouchableOpacity style={styles.createTask}>
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
  createTask: {
    width: "100%",
    backgroundColor: "#3787eb",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
