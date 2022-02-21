import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './NavigationService';
import BackIcon from '../assets/images/svgs/BackIcon';
import SignUp from '../screens/SignUp';
import {TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const commonOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    shadowOffset: {height: 0, width: 0},
    backgroundColor: '#1F1F1F',
  },
  headerTitleStyle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  headerTitleAlign: 'center',
};

const NavigationApp = () => {
  return (
    <NavigationContainer headerMode="none" ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            ...commonOptions,
            headerLeft: () => (
              <TouchableOpacity>
                <BackIcon />
              </TouchableOpacity>
            ),
            headerTitle: () => <></>,
          }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationApp;
