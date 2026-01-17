import React, { memo } from 'react';
import { SoundrEvent } from "@models/event";
import { StyleSheet, Text, View } from "react-native";
import { TicketButton } from './ticketButton';

interface TicketsContainerProps {
    event: SoundrEvent;
    openEventUrl: (url: string) => void;
}

export const TicketsContainer = memo<TicketsContainerProps>(({ event, openEventUrl }) => {
    if (!event.sources || event.sources.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>TICKETS</Text>
            {event.sources.map((source, idx) => (
                <TicketButton
                    key={`${source.name}-${idx}`}
                    source={source}
                    onPress={openEventUrl}
                />
            ))}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF0080',
        textAlign: 'right',
        fontFamily: 'JosefinSans_700Bold',
        marginTop: 20,
        marginBottom: 20,
    },
});