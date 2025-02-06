import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
