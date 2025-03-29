import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
