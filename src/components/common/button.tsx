import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from "react-native";


// Example usage:
// <CommonButton
//     title="Spotify"
//     backgroundColor="#1DB954"
//     textColour="#fff"
//     vectorIcon={
//         <Image
//             source={require("../../assets/spotify_icon.png")}
//             style={{ width: 20, height: 20, resizeMode: "contain" }}
//         />
//     }
//     onPress={() => console.log("Pressed!")}

//03CBE2
// />


type CommonButtonProps = {
    title?: string;
    backgroundColor: string;
    vectorIcon?: React.ReactNode;
    textColour: string;
    onPress: (event: GestureResponderEvent) => void;
};

export const CommonButton: React.FC<CommonButtonProps> = ({
    title,
    backgroundColor,
    vectorIcon,
    textColour,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {vectorIcon && <View style={styles.icon}>{vectorIcon}</View>}
                {title ? <Text style={[styles.text, { color: textColour }]}>{title}</Text> : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 0,
        paddingHorizontal: 5,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
});