import { Image, StyleSheet, Text, View } from "react-native"

export const EventBanner = ({ eventImageUrl, eventName }: { eventImageUrl: string, eventName: string }) => {

    const imageSource = () => {
        return eventImageUrl ? { uri: eventImageUrl } : require("@assets/images/default-event.png");
    }

    return (
        <View style={styles.imageHeaderWrapper}>
            <Image source={imageSource()} style={styles.image} />
            <View style={styles.imageOverlay} />
            <View style={styles.headerOverlay}>
                <Text style={styles.headerText}>{eventName}</Text>
                <View style={styles.headerUnderline} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(0,0,0,0.6)',
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
        shadowRadius: 10, 
        elevation: 5
    },
})