import { Tabs, usePathname, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";

export default function TabLayout() {
  const route = useRouter();
  const [btns, setbtns] = useState(false);

  const slideAnim = useRef(new Animated.Value(200)).current;
  const fadeAnim = useRef(new Animated.Value(200)).current;
  useEffect(() => {
    if (btns) {
      // Reset values before animating
      slideAnim.setValue(200);
      fadeAnim.setValue(0);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [btns]);

  const hideButtons = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setbtns(false); // Hide after animation
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: 75,

            paddingTop: 20,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: -3 },
          },

          tabBarIcon: ({ focused }) => {
            let iconName:
              | "home"
              | "account-outline"
              | "chat-outline"
              | "folder-network-outline"
              | "calendar-month-outline" = "home";

            if (route.name === "home") {
              iconName = "home";
            } else if (route.name === "calender") {
              iconName = "calendar-month-outline";
            } else if (route.name === "chat") {
              iconName = "chat-outline";
            } else if (route.name === "profile") {
              iconName = "account-outline";
            } else if (route.name === "projects") {
              iconName = "folder-network-outline";
            }

            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color={focused ? "#3787eb" : "#9a9a9a"}
                />
              </View>
            );
          },
          tabBarShowLabel: false,
        })}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="projects" />
        <Tabs.Screen name="calender" />
        {/* <Tabs.Screen name="chat" /> */}
        {/* <Tabs.Screen name="profile" /> */}
      </Tabs>
      {btns && (
        <Animated.View
          style={[
            styles.addBTNgroup,
            {
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.addNewBTN}
            onPress={() => route.push("/project/create")}
          >
            <MaterialCommunityIcons name="plus" size={15} color="#ffffff" />
            <Text style={{ color: "#ffffff", fontWeight: 500 }}>
              New Project
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addNewBTN}
            onPress={() => route.push("/task/create")}
          >
            <MaterialCommunityIcons name="plus" size={15} color="#ffffff" />
            <Text style={{ color: "#ffffff", fontWeight: 500 }}> New Task</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <TouchableOpacity
        onPress={() => {
          if (btns) {
            hideButtons();
          } else {
            setbtns(true);
          }
        }}
        style={styles.floatingButton}
      >
        <MaterialCommunityIcons name="plus" size={40} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 50, // Adjust based on your taskbar height
    zIndex: 999,
    alignSelf: "center",
    backgroundColor: "#3787eb",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addBTNgroup: {
    position: "absolute",
    bottom: 110,
    zIndex: 999,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 10,
    width: 320,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  addNewBTN: {
    backgroundColor: "#3787eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 10,
  },
});
