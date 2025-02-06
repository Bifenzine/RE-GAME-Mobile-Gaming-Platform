import { Tabs } from "expo-router";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

const TabBarIcon = ({ name, focused, color }) => (
  <View style={styles.tabIconContainer}>
    <Ionicons
      name={name}
      size={24}
      color={focused ? colors.progress.active : colors.progress.active}
      style={{
        transform: [{ scale: focused ? 1.1 : 1 }],
      }}
    />
  </View>
);

const SearchHeader = () => (
  <SafeAreaView style={styles.headerContainer}>
    <View style={styles.logoContainer}>
      {/* Add your logo here */}
      <View style={styles.logoPlaceholder} />
      {/*  */}
    </View>
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={colors.text.secondary} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search games..."
        placeholderTextColor={colors.text.secondary}
      />
    </View>
  </SafeAreaView>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="games"
      screenOptions={{
        header: () => <SearchHeader />,
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={10} style={styles.blurView} />
        ),
      }}>
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "game-controller" : "game-controller-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="consoles"
        options={{
          title: "Consoles",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "hardware-chip" : "hardware-chip-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: colors.progress.inactive,
  },
  logoContainer: {
    marginRight: 16,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent,
    borderRadius: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    marginLeft: 8,
    fontSize: 16,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  tabBar: {
    position: "absolute",
    height: 70,
    borderRadius: 30,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: -10,
    marginBottom: 10,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
});
