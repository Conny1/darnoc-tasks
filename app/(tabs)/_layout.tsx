import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
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
              | "calendar-month-outline" = "home";

            if (route.name === "home") {
              iconName = "home";
            } else if (route.name === "calender") {
              iconName = "calendar-month-outline";
            } else if (route.name === "chat") {
              iconName = "chat-outline";
            } else if (route.name === "profile") {
              iconName = "account-outline";
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
        <Tabs.Screen name="calender" />
        <Tabs.Screen name="chat" />
        <Tabs.Screen name="profile" />
      </Tabs>
      <TouchableOpacity style={styles.floatingButton}>
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
});
