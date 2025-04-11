import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ProjectCard } from "@/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppContext } from "@/hooks/contexHook";

const Projects = () => {
  const navigation = useNavigation();
  const { projects } = useAppContext();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Projects",
      headerTitleAlign: "center", // Centers the title
      headerTitleStyle: {
        // fontWeight: "bold",
        // fontSize: 25,
        color: "#000022",
      },
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#f1f1f1",
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#9a9a9a"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.main}>
      {projects.length === 0 ? (
        <Text style={{ color: "#9a9a9a", fontWeight: 500 }}>
          No projects here 😊
        </Text>
      ) : (
        <SafeAreaProvider style={styles.providerContainer}>
          <SafeAreaView style={styles.listContainer}>
            <FlatList
              data={projects}
              renderItem={({ item }) => <ProjectCard item={item} />}
              keyExtractor={(item) => item.id as unknown as string}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </View>
  );
};

export default Projects;

const styles = StyleSheet.create({
  main: {
    margin: 20,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },

  providerContainer: {
    width: "100%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
});
