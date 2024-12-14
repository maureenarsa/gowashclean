import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faTruckPickup } from '@fortawesome/free-solid-svg-icons/faTruckPickup';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Listdata from './Listdata';
import Editdata from './Editdata';
import HomeScreen from './HomeScreen';
import Services from './Services';
import Map from './Map';
import Profile from './Profile';



function Home() {
    return (
        <HomeScreen />
    );
}

function MapScreen() {
    return (
        <Map />
    );
}

function ServicesScreen() {
    return (
        <Services/>
    );
}
function ProfileScreen() {
    return (
        <Profile/>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faHouse} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Map" component={MapScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faMap} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Pickup" component={ServicesScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faTruckPickup} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Account" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUser} size={20} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}