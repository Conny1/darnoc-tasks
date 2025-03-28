import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ffffff", height: 55 },
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
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={`${focused ? "#3787eb" : "#9a9a9a"}`}
              />
            </View>
          );
        },
        tabBarShowLabel: false, // Show labels
        tabBarLabelStyle: { fontSize: 12 }, // Customize label style
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#fff" : "#75c8d6" }}>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#fff" : "#75c8d6" }}>
              calender
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#fff" : "#75c8d6" }}>chats</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#fff" : "#75c8d6" }}>profile</Text>
          ),
        }}
      />
    </Tabs>
  );
}
