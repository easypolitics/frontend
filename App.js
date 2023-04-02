import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Bills } from './components/Bills';
import { Following } from './components/Following';
import { Search } from './components/Search';

function HomeHeader() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>On the Floor</Text>
            {/* <View style={styles.headerFilter}>
                <AntDesign name="filter" color="#a7aaae" size={24} />
            </View>
            <View style={styles.headerSettings}>
                <Ionicons name="settings-outline" color="#a7aaae" size={24} />
            </View> */}
        </View>
    );
}

function SearchHeader() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Search Bills</Text>
        </View>
    );
}

function FollowingHeader() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Following</Text>
        </View>
    );
}

function HomeScreen() {
    return <Bills />;
}

function SearchScreen() {
    return <Search />;
}

function FollowingScreen() {
    return <Following />;
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        // iOS
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#1a1a1a" />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: {
                            fontSize: 12,
                        },
                        tabBarStyle: {
                            backgroundColor: '#222932',
                        },
                        tabBarActiveTintColor: '#a7aaae',
                    }}
                >
                    <Tab.Screen
                        name="On the Floor"
                        component={HomeScreen}
                        options={{
                            header: () => <HomeHeader />,
                            tabBarLabel: 'Bills',
                            tabBarIcon: () => (
                                <Ionicons name="document-text-outline" color="#a7aaae" size={24} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen}
                        options={{
                            header: () => <SearchHeader />,
                            tabBarLabel: 'Search',
                            tabBarIcon: () => (
                                <Ionicons name="search-outline" color="#a7aaae" size={24} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Following"
                        component={FollowingScreen}
                        options={{
                            header: () => <FollowingHeader />,
                            tabBarLabel: 'Following',
                            tabBarIcon: () => (
                                <Ionicons name="heart-outline" color="#a7aaae" size={24} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#2a323c',
        flexDirection: 'row',
    },
    headerText: {
        color: '#a7aaae',
        fontSize: 32,
        flex: 8,
        justifyContent: 'center',
        paddingBottom: 15,
        paddingLeft: 15,
        marginTop: StatusBar.currentHeight || 0,
    },
    headerFilter: {
        flex: 2,
        justifyContent: 'center',
        paddingTop: 10,
    },
    headerSettings: {
        flex: 2,
        justifyContent: 'center',
        paddingTop: 10,
    },
});
