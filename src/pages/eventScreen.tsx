import { ActivityIndicator, Animated, Button, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { SoundrEvent } from '../types/event';
import { fetchEvents } from '../services/eventService';
import { StatusBar } from 'expo-status-bar';
import { useFetch } from '../hooks/useFetch';
import { SOUNDR_EVENTS_URL } from '../services/api/apiRoutes';
import { EventItem } from '../components/events/eventItem';

export const EventsScreen = () => {
    const { data, isLoading, error, refresh } = useFetch<SoundrEvent[]>(
        SOUNDR_EVENTS_URL,
        {
            "offset": 0,
        },
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {isLoading && !data ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : error ? (
                <View style={styles.container}>
                    <Text style={{ color: 'red' }}>Failed to load events: {error.message || 'Unknown error'}</Text>
                    <Button title="Retry" onPress={refresh} />
                </View>
            ) : data ? (
                <View style={{flex: 1, marginBottom: 20}}>
                    <View style={styles.headerBar}>
                        <Image
                            source={require('../../assets/dj-header.jpg')}
                            style={styles.headerImage}
                        />
                        <View style={styles.headerOverlay}>
                            <Text style={styles.headerText}>Upcoming Events</Text>
                            <View style={styles.headerUnderline} />
                        </View>
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => `${item.date}-${item.name}`}
                        renderItem={({ item }) => (
                            <EventItem {...item} />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={refresh}
                                colors={['white']}
                                progressBackgroundColor={'white'}
                            />
                        }
                    />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBar: {
        width: '100%',
        height: 200,
        backgroundColor: 'black',
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    headerImage: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'cover',
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