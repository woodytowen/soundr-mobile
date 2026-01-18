import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { SOUNDR_EVENTS_URL } from '../../services/api/apiRoutes';
import { EventItem } from './components/eventItem';
import * as Location from 'expo-location';
import { getPermissionFlag } from '../../storage/permissionStorage';
import { SoundrEvent } from '@models/event';
import { LoadingIndicator } from '@components/loadingIndicator';
import { ErrorComponent } from '@components/errorComponents';
import { DEFAULT_RADIUS } from '@utils/constants';
import { EventHeader } from '../../components/eventComponents/eventHeader';

export const EventsScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            if (await getPermissionFlag('locationPermission') === 'denied') {
                setLocation(null);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
        getCurrentLocation();
    }, []);

    const renderItem = useCallback(({ item }: { item: SoundrEvent }) => (
        <EventItem {...item} />
    ), []);

    const keyExtractor = useCallback((item: SoundrEvent) =>
        `${item.date}-${item.name}`,
        []);

    const { events, isLoading, error, refetch } = useEvents(
        SOUNDR_EVENTS_URL,
        {
            offset: 0,
            location: location
                ? {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    radius: DEFAULT_RADIUS,
                }
                : undefined,
        },
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {isLoading && !events ? (
                <LoadingIndicator />
            ) : error ? (
                <View style={styles.container}>
                    <ErrorComponent title='Failed to Fetch Events' error={error} refetch={refetch} />
                </View>
            ) : events ? (
                <View style={{ flex: 1, marginBottom: 20 }}>
                    <EventHeader title="Nearby Events" imageSource={require('@assets/images/dj-header.jpg')} />
                    <FlatList
                        data={events}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={refetch}
                                colors={['#00E5FF']}      
                                tintColor="#00E5FF" 
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
});