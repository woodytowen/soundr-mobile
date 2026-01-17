import { SoundrEvent } from "@models/event";
import { StyleSheet, Text, View } from "react-native";

export const LineupContainer = ({ event }: { event: SoundrEvent }) => {
    return (
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
    )
}

const styles = StyleSheet.create({
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
})