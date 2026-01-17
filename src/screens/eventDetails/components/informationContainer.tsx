import { SoundrEvent, SoundrEventVenue } from "@models/event"
import { convertDate } from "@utils/dateUtils"
import { StyleSheet, Text, View } from "react-native"


export const InformationContainer = ({ date, venueName, venueDetails }: { date: string, venueName: string, venueDetails?: SoundrEventVenue }) => {

    const VenueInfo = ({ venue }: { venue?: SoundrEventVenue }) => (
        <View style={[
            styles.dateVenueContainers,
            { borderColor: '#FF0080', shadowColor: '#FF0080', padding: 10 }
        ]}>
            <Text style={[
                styles.containerHeader,
                { marginTop: 20, marginBottom: 20, color: '#FF0080' }
            ]}>VENUE</Text>
            {venue ? (
                <>
                    <Text style={styles.text}>{venueName}</Text>
                    <Text style={styles.text}>{venue.address}, {venue.postcode}</Text>
                    <Text style={styles.text}>Event Type: {venue.eventType}</Text>
                </>
            ) : (
                <Text style={styles.text}>No venue details available</Text>
            )}
        </View>
    )

    const DateInfo = ({ date }: { date: string }) => (
        <View style={styles.dateVenueContainers}>
            <Text style={[
                styles.containerHeader,
                { marginTop: 20, marginBottom: 10, padding: 10 }
            ]}>DATE</Text>
            <Text style={styles.text}>{convertDate(date)}</Text>
        </View>
    )

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <DateInfo date={date} />
            <VenueInfo venue={venueDetails} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
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
})