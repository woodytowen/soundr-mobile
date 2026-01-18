import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native"

interface EventHeaderProps {
    title: string;
    imageSource: ImageSourcePropType;
}

export const EventHeader = ({ title, imageSource }: EventHeaderProps) => {
    return (
        <View style={styles.headerBar}>
            <Image
                source={imageSource}
                style={styles.headerImage}
            />
            <View style={styles.headerOverlay}>
                <Text style={styles.headerText}>{title}</Text>
                <View style={styles.headerUnderline} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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