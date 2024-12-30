import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import FarmerDashboard from "../screens/FarmerDashboard";
import CaptureImageScreen from "../screens/CaptureImageScreen";
import HelpScreen from "../screens/HelpScreen";

import FrequencyGuideScreen from "../screens/FrequencyGuideScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
      <Stack.Screen name="CaptureImageScreen" component={CaptureImageScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="FrequencyGuide" component={FrequencyGuideScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
