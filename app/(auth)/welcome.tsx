import { View, Text, Pressable, Image } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
// import { Image } from "expo-image";
import { onboarding } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";

const Welcome = () => {
  const SwiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/(auth)/auth");
    } else {
      SwiperRef.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}>
        {/* Skip Button */}
        <Pressable
          onPress={() => router.replace("/(auth)/auth")}
          style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        {/* Swiper for Onboarding */}
        <Swiper
          ref={SwiperRef}
          loop={false}
          showsPagination={false} // Disable default pagination
          onIndexChanged={setActiveIndex}
          scrollEnabled={true}>
          {onboarding.map((item) => (
            <View key={item.id} style={styles.slideContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={item?.image} // Ensure item.image is a valid URI or require() path
                  style={styles.image}
                  resizeMode="contain"
                  transition={100} // Smooth image transition
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </Swiper>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {onboarding.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                activeIndex === index && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <Pressable onPress={handleNext} style={styles.buttonContainer}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {isLastSlide ? "Let's Play! 🎮" : "Next"}
            </Text>
          </LinearGradient>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  skipButton: {
    alignSelf: "flex-end",
    padding: 16,
  },
  skipText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "600",
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.progress.inactive,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: colors.progress.active,
    opacity: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default Welcome;
