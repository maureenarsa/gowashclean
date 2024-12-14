import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faUserPen } from '@fortawesome/free-solid-svg-icons/faUserPen';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Listdata from './Listdata';
import Editdata from './Editdata';

function HomeScreen() {
    return (
        <HomeScreen />
    );
}

function DataMahasiswaScreen() {
    return (
        <Listdata/>
    );
}

function EditScreen() {
    return (
        <Editdata />
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Tambah" component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faPlusCircle} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Data Mahasiswa" component={DataMahasiswaScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUserGraduate} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Edit" component={EditScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUserPen} size={20} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}