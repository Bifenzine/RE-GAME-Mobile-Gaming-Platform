import React, { useState } from "react";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const DisplayMedia = ({ fileUrl, altText, styling }) => {
    const [mediaError, setMediaError] = useState(false);

    if (!fileUrl || mediaError) return null;

    const isVideo = fileUrl.toLowerCase().endsWith(".mp4");

    return (
        <View style={[styles.mediaContainer, styling]}>
            {isVideo ? (
                <Video
                    source={{ uri: fileUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay={false} // Changed to false to prevent auto-play
                    isLooping={false}
                    style={styles.media}
                    useNativeControls={true}
                    onError={() => setMediaError(true)}
                />
            ) : (
                <Image
                    source={{ uri: fileUrl }}
                    style={styles.media}
                    contentFit="cover"
                    transition={300}
                    onError={() => setMediaError(true)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mediaContainer: {
        width: width - 64, // Account for card padding and margins
        height: (width - 64) * 0.5625, // 16:9 aspect ratio
        backgroundColor: '#1a1a1a', // Dark background for loading state
        borderRadius: 12,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    media: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});

export default DisplayMedia;