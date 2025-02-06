import { Stack } from "expo-router";

// each layout has a stack
// for this scenario we are in the auth
// so we need to show the onboarding screens that are the welcome screens
// and the login in and sign up screens
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
