import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './components/Dashboard/Dashboard';
import {NavigationContainer} from '@react-navigation/native';

import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./components/Profile/Profile";

const Tab = createBottomTabNavigator();

const actionColor = "#04151F";

export default class Core extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Dashboard')
                                iconName = focused ? 'apps' : 'apps-outline';
                            else if (route.name === 'Areas')
                                iconName = focused ? 'globe' : 'globe-outline';
                            else if (route.name === 'Profile')
                                iconName = 'ios-person-circle-sharp';
                            else if (route.name === 'Settings')
                                iconName = focused ? 'ios-cog' : 'ios-cog-outline';
                            else if (route.name === 'Search')
                                iconName = focused ? 'ios-search' : 'ios-search-outline';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#04A777',
                        tabBarInactiveTintColor: 'gray',
                        initialRouteName: "Dashboard",
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: actionColor,
                            position: 'absolute',
                            paddingBottom: 14,
                            paddingTop: 12,
                            borderRadius: 30,
                            marginBottom: 16,
                            marginLeft: 8,
                            marginRight: 8,
                            left: 0,
                            height: 80, // Specify the height of your custom header

                        },
                        headerStyle: {
                            height: 180, // Specify the height of your custom header
                        }
                    })}>

                    <Tab.Screen name="Dashboard" children={() => {return <Dashboard serverAddress={this.props.serverAddress}/>}} />
                    <Tab.Screen name="Profile" children={() => {return <Profile serverAddress={this.props.serverAddress}/>}} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}
