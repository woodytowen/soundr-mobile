import { Linking, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import { SoundrEvent } from "../../types/event";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ScreenNames } from "../../types/screens";
import { InformationContainer } from "./components/informationContainer";
import { TicketsContainer } from "./components/ticketsContainer/ticketsContainer";
import { LineupContainer } from "./components/lineupContainer";
import { EventHeader } from "@components/eventComponents/eventHeader";

type RootStackParamList = {
    EventDetails: { event: SoundrEvent };
};

export const EventDetails = () => {
    const route = useRoute<RouteProp<RootStackParamList, ScreenNames.EventDetails>>();
    const { event } = route.params;

    const openEventUrl = useCallback((eventUrl: string) => {
        Linking.openURL(eventUrl);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <EventHeader title={event.name} imageSource={event.eventImageUrl ? { uri: event.eventImageUrl } : require('@assets/images/dj-header.jpg')} />
                <InformationContainer date={event.date} venueName={event.venue} venueDetails={event.venueDetails} />
                <View style={styles.lineupTicketContainer}>
                    <View style={styles.lineupTicketsRow}>
                        <LineupContainer artist={event.artist} />
                        <TicketsContainer event={event} openEventUrl={openEventUrl} />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
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
});