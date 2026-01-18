import { Button, StyleSheet, Text, View } from "react-native";


export const ErrorComponent = ({ title, error, refetch,}: { title: string, error: any, refetch: () => void }) => {

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>{title}</Text>
            <Text style={styles.errorMessage}>{error.message || 'Unknown error'}</Text>
            <Button title="Retry" onPress={refetch} color="#00E5FF" />
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorTitle: {
        color: '#FF0080',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'JosefinSans_700Bold',
    },
    errorMessage: {
        color: '#CCCCCC',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'JosefinSans_400Regular',
    },
});