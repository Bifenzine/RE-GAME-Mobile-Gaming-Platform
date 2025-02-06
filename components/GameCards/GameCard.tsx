import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/colors";

const GameCard = ({ game, onPress }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.cardContainer, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient
          colors={["#2b2b2b", "#1a1a1a"]}
          style={styles.gradientBackground}>
          <View style={styles.imageContainer}>
            {game.image_url ? (
              <Image
                source={{ uri: game.image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialIcons
                  name="image-not-supported"
                  size={24}
                  color="#666"
                />
              </View>
            )}
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {game.game_name || "Untitled Game"}
            </Text>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>
                {game.category_id?.name || "Unknown Console"}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialIcons name="visibility" size={14} color="#999" />
                <Text style={styles.statsText}>{game.viewers}</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="favorite" size={14} color="#999" />
                <Text style={styles.statsText}>
                  {Math.floor(Math.random() * 100)}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  gradientBackground: {
    padding: 8,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.progress.inactive,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.progress.inactive,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 4,
    textShadowColor: colors.accent,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  categoryContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  categoryText: {
    color: colors.text.primary,
    fontSize: 10,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  statsText: {
    color: "#999",
    fontSize: 10,
  },
});

export default GameCard;
