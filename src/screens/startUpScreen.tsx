import { useCallback, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from '../theme/ThemeContext';

import * as Location from 'expo-location';
import { Button } from "react-native-paper";
import { setPermissionFlag } from "../store/permissionStorage";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../types/screens";


/**
 * Allow them through and just set flag on system that its not wanted
 * 
 * but give option on the filters to enable location - need to make the location
 * enablement available across the app
 */

//TODO might need to revise how to use, useTheme 
export const StartUpScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<any>();
    const theme = useTheme();

    const onPress = useCallback(() => {
        navigation.navigate(ScreenNames.Events);
    }, [navigation]);

    const startPermissionsFlow = async () => {
        console.log('Starting permissions flow');
        let { status } = await Location.requestForegroundPermissionsAsync();

        console.log('Permission status:', status);
        if (status === 'granted') {
            
            await setPermissionFlag('locationPermission', 'granted');
            onPress();
        } else {
            await setPermissionFlag('locationPermission', 'denied');
            onPress();
        }
    }

    const onSkip = async () => {
        await setPermissionFlag('locationPermission', 'denied');
        onPress();
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    fadeIn();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.colors.background,
        },
        title: {
            fontSize: 44,
            textAlign: 'left',
            marginBottom: 10,
            marginTop: 40,
            color: theme.colors.text,
            fontFamily: theme.fonts.bold,
        },
        paragraph: {
            marginTop: 20,
            fontSize: 18,
            textAlign: 'center',
            color: theme.colors.text,
            fontFamily: theme.fonts.regular,
        },
        skipButton: {
            alignSelf: 'flex-end',
            marginTop: 60,
            backgroundColor: theme.colors.card,
        },
        grantPermissions: {
            alignSelf: 'center',
            backgroundColor: theme.colors.card,
            marginBottom: 30,
            width: '50%',
        },
        flexSpacer: {
            flex: 1,
        },
        headerUnderline: {
            width: '75%',
            borderBottomWidth: 4,
            borderBottomColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10, // Adjust this for the blur intensity
            elevation: 5
        },
    });

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Button style={styles.skipButton} onPress={onSkip}>Skip</Button>
            </Animated.View>
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>May we use your location?</Animated.Text>
            <Animated.View style={[styles.headerUnderline, { opacity: fadeAnim }]} />
            <Animated.Text style={[styles.paragraph, { opacity: fadeAnim }]}>We use your location for the most relevant events near you.</Animated.Text>
            <View style={styles.flexSpacer} />
            <Animated.View style={{ opacity: fadeAnim }}>
                <Button style={styles.grantPermissions} onPress={startPermissionsFlow}>Grant Permissions</Button>
            </Animated.View>
        </View>
    );
};


// styles moved inside component to use theme