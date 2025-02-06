import React, { useEffect } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";

const Auth = () => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}>
        {/* Skip Button */}
        <Pressable
          onPress={() => router.replace("/(root)/(tabs)/games")}
          style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </Pressable>

        {/* Logo and Title */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.logo}>RE:GAME </Text>
          <Text style={styles.title}>RE:GAME</Text>
          <Text style={styles.subtitle}>Your Ultimate Gaming Companion</Text>
        </Animated.View>

        {/* Benefits Section */}
        <Animated.View
          style={[
            styles.benefitsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.benefitsTitle}>Unlock Full Experience</Text>
          <View style={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Image
                    source={benefit.icon}
                    style={styles.benefitIconImage}
                  />
                </View>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Auth Button */}
        <Animated.View
          style={[
            styles.authContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Pressable
            style={styles.googleButton}
            onPress={() => console.log("Google Auth")}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}>
              <Image source={icons.google} style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const benefits = [
  {
    icon: icons.star,
    text: "Personalized game recommendations",
  },
  {
    icon: icons.list,
    text: "Create and track your game library",
  },
  {
    icon: icons.chat,
    text: "Join gaming communities",
  },
  {
    icon: icons.target,
    text: "Track achievements and progress",
  },
];

const styles = {
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: "600",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  benefitsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  benefitsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 24,
    textAlign: "center",
  },
  benefitsList: {
    marginTop: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  benefitIconImage: {
    width: 20,
    height: 20,
    tintColor: colors.accent,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  authContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  googleButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
};

export default Auth;
