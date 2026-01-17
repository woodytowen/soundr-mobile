import { memo, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SoundrEvent } from "../../../types/event";
import { useNavigation } from "@react-navigation/native";
import { convertDate } from "../../../util/dateUtils";
import { ScreenNames } from "../../../types/screens";

export const EventItem = memo((event: SoundrEvent) => {
    const navigation = useNavigation<any>();

    const onPress = useCallback(() => {
        navigation.navigate(ScreenNames.EventDetails, { event: event });
    }, [navigation, event]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: event.eventImageUrl }} style={styles.image} />
                    <View style={styles.overlay} />
                    <View style={styles.textOverlay}>
                        <Text style={styles.name}>{event.name}</Text>
                        <Text style={styles.date}>{convertDate(event.date)}</Text>
                        <Text style={styles.venue}>{event.venue}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 5,
    },
    imageWrapper: {
        height: 150,
        position: 'relative',
        borderColor: 'rgba(0, 229, 255, 0.6)',
        borderWidth: 2,
        // Remove or comment out overflow: 'hidden' to allow shadow to show
        // overflow: 'hidden',
        backgroundColor: 'black',

        // Shadow for iOS
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,

        // Shadow for Android
        elevation: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.7
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent overlay for readability
    },
    textOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    name: {
        paddingTop: 10,
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'JosefinSans_700Bold',
    },
    date: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'JosefinSans_400Regular'
    },
    venue: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'JosefinSans_400Regular'
    },
});