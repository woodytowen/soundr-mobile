import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsScreen } from './src/pages/eventScreen';
import { EventDetails } from './src/pages/eventDetails';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { useFonts, JosefinSans_400Regular, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans'
import { IconButton, MD3Colors } from 'react-native-paper';

const RootStack = createNativeStackNavigator({
  screens: {
    Events: {
      screen: EventsScreen,
      options: { headerShown: false }
    },
    EventDetails: {
      screen: EventDetails,
      options: {
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: '#1A1A1A' },
        headerTintColor: '#009EC3',
        headerBackTitleVisible: false , // hides back button text
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
        ),
      }
    },
  },
});

const Navigation = createStaticNavigation(RootStack);


//Stack Navigator will be exported to seperate file + need auth wrapper eventually
export default function App() {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold
  });
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <Navigation />
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

{/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Soundr' component={EventsScreen} options={{ headerShown: false }} />
        <Stack.Screen name='EventDetails' component={EventsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer> */}

