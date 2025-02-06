import React from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import GameCard from "@/components/GameCards/GameCard";
import useGames from "@/Hooks/GamesHooks/useGames";
import { useRouter } from "expo-router";

const Games = () => {
  const {
    games,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    currentPage,
    totalPages,
  } = useGames();

  const router = useRouter();

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  };

  const handleGamePress = (game) => {
    console.log("Selected game:", game);
    router.push(`/GamePlay/${game._id}`);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.gameCardWrapper}>
      <GameCard key={index} game={item} onPress={() => handleGamePress(item)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        refreshing={loading}
        onRefresh={refresh}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    // paddingVertical: 8,
    paddingHorizontal: 6,
  },
  gameCardWrapper: {
    flex: 1,
    paddingHorizontal: 4,
    maxWidth: "50%",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  footer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Games;
