import { Button, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { SoundrEvent } from "../../types/event";
import { convertDate } from "../../util/dateUtils";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CommonButton } from "../../components/button";
import React from "react";
import { ScreenNames } from "../../types/screens";

type RootStackParamList = {
    EventDetails: { event: SoundrEvent };
};

export const EventDetails = () => {
    const route = useRoute<RouteProp<RootStackParamList, ScreenNames.EventDetails>>();
    const { event } = route.params;

    const openEventUrl = (eventUrl: string) => {
        Linking.openURL(eventUrl);
        return;
    }

    //Needs something like this to limit characters if lineup length is too long
    //Make re-usable and add to utils file
    const limitCharacters = (text: string, limit: number, ellipsis: string = '...'): string => {
        if (text.length <= limit) return text;
        return text.substring(0, limit) + ellipsis;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.imageHeaderWrapper}>
                    <Image source={{ uri: event.eventImageUrl }} style={styles.image} />
                    <View style={styles.imageOverlay} />
                    {/* <View style={styles.imageTextOverlay}>
                        <Text style={[styles.header, { color: '#FFFFFF', marginBottom: 30 }]}>{event.name}</Text>
                    </View> */}
                    <View style={styles.headerOverlay}>
                        <Text style={styles.headerText}>{event.name}</Text>
                        <View style={styles.headerUnderline} />
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={styles.dateVenueContainers}>
                        <Text style={[styles.header, { marginTop: 20, marginBottom: 10, padding: 10 }]}>DATE</Text>
                        <Text style={styles.text}>{convertDate(event.date)}</Text>
                    </View>
                    <View style={[styles.dateVenueContainers, { borderColor: '#FF0080', shadowColor: '#FF0080', padding: 10 }]}>
                        <Text style={[styles.header, { marginTop: 20, marginBottom: 20, color: '#FF0080' }]}>VENUE</Text>
                        <Text style={styles.text}>{event.venue}</Text>
                        <Text style={styles.text}>{event.venueDetails?.address}, {event.venueDetails?.postcode}</Text>
                        <Text style={styles.text}>Event Type: {event.venueDetails?.eventType}</Text>
                    </View>
                </View>

                <View style={styles.lineupTicketContainer}>
                    <View style={styles.lineupTicketsRow}>
                        {/* LINEUP COLUMN */}
                        <View style={styles.lineupColumn}>
                            <Text style={[styles.header, { marginTop: 20, marginBottom: 20, textAlign: 'left' }]}>LINEUP</Text>
                            {event.artist.length > 0 ? (
                                event.artist.map((artist, idx) => (
                                    <Text key={idx} style={[styles.text, { textAlign: 'left', marginLeft: 10, marginBottom: 10 }]}>
                                        {artist.artistName}
                                    </Text>
                                ))
                            ) : (
                                <Text style={[styles.text, { textAlign: 'left', marginLeft: 10 }]}>
                                    No lineup announced yet
                                </Text>
                            )}
                        </View>
                        {/* TICKETS COLUMN */}
                        <View style={styles.ticketsColumn}>
                            <Text style={[styles.header, { marginTop: 20, textAlign: 'right', marginBottom: 20, color: '#FF0080' }]}>TICKETS</Text>
                            {event.sources?.map((source, idx) => {
                                let icon, bgColor, deeplink;
                                switch (source.name) {
                                    case 'skiddle':
                                        icon = require("../../assets/skiddle_icon.png");
                                        bgColor = "#a3d1c8";
                                        deeplink = source.deepLinkUrl;
                                        break;
                                    case 'ticketmaster':
                                        icon = require("../../assets/ticketmaster_icon.png");
                                        bgColor = "#024DDF";
                                        deeplink = source.deepLinkUrl;
                                        break;
                                    // Add more cases for other sources if needed
                                    default:
                                        return null;
                                }
                                if (!deeplink) return null;
                                return (
                                    <CommonButton
                                        key={idx}
                                        backgroundColor={bgColor}
                                        textColour="#fff"
                                        vectorIcon={
                                            <Image
                                                source={icon}
                                                style={{ width: 100, height: 50, resizeMode: "contain" }}
                                            />
                                        }
                                        onPress={() => openEventUrl(deeplink)}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>

                {/* temp */}
                <View style={{ marginBottom: 20 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

/**
 * Need to add shadow around Text Title
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    imageHeaderWrapper: {
        width: '100%',
        height: 200,
        position: 'relative',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)', // Adjust opacity as needed
    },
    imageTextOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00E5FF',
        textAlign: 'center',
        fontFamily: 'JosefinSans_700Bold',
        marginHorizontal: 10,
        marginBottom: 0,
    },
    text: {
        color: '#CCCCCC',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'JosefinSans_400Regular'
    },
    dateVenueContainers: {
        width: '45%', height: 200, borderRadius: 50, backgroundColor: '#1A1A1A', borderColor: '#00E5FF', borderWidth: 2,
        // Shadow for iOS
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    lineupTicketContainer: {
        width: '90%',
        borderRadius: 50,
        backgroundColor: '#1A1A1A',
        borderColor: '#00E5FF',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 20,
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    lineupTicketsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    lineupColumn: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    ticketsColumn: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },

    headerOverlay: {
        position: 'absolute',
        left: 0,
        bottom: 20,
        width: '100%',
        paddingLeft: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'JosefinSans_700Bold',
    },
    headerUnderline: {
        width: '30%',
        borderBottomWidth: 4,
        borderBottomColor: '#00E5FF',
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10, // Adjust this for the blur intensity
        elevation: 5
    },

});