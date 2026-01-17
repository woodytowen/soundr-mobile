import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsScreen } from './src/screens/eventListScreen/eventScreen';
import { EventDetails } from './src/screens/eventDetails/eventDetails';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { useFonts, JosefinSans_400Regular, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans'
import { IconButton, MD3Colors } from 'react-native-paper';
import { StartUpScreen } from './src/screens/startUpScreen/startUpScreen';
import { getPermissionFlag } from './src/storage/permissionStorage';
import { ScreenNames } from './src/types/screens';

const Stack = createNativeStackNavigator();

//Stack Navigator will be exported to seperate file + need auth wrapper eventually
export default function App() {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold
  });
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Replace 'locationPermission' with your actual flag key
        const flag = await getPermissionFlag('locationPermission');
        setInitialRoute(flag ? ScreenNames.Events : ScreenNames.StartUpScreen);
      } catch (e) {
        setInitialRoute(ScreenNames.StartUpScreen);
      } finally {
        setLoading(false);
      }
    };
    checkPermission();
  }, []);

  if (!fontsLoaded || loading || !initialRoute) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: '#1A1A1A' },
          headerTintColor: '#009EC3',
        }}
      >
        <Stack.Screen name={ScreenNames.StartUpScreen} component={StartUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.Events} component={EventsScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={ScreenNames.EventDetails}
          component={EventDetails}
          options={{
            headerShown: true,
            headerTitle: '',
            /* headerBackTitleVisible: false,
            headerBackImage: () => (
              <IconButton
                icon="arrow-back"
                size={24}
                style={{ backgroundColor: '#1A1A1A' }}
              />
            ),
            headerRight: () => (
              <IconButton
                icon="heart"
                size={24}
                iconColor={'#FF0080'}
              />
            ), */
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

