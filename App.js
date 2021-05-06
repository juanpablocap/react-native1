import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, View, headerRight, rightComponent } from 'react-native';
import { Header } from "react-native-elements";

//navegacion
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from 'react-native-safe-area-context';


import image from "./assets/logo.png";

const Stack = createStackNavigator()

//componentes
import  Home from './Screens/Home';
import  News from './Screens/News';
import  Fixture from "./Screens/Fixture";
import  Divisiones from './Screens/Divisiones';
import  UsersList from './Screens/UsersList';
import  CreateUsersScreen from './Screens/CreateUsersScreen';
import  NuevaDivision from './Screens/NuevaDivision';
import  UserDetailsScreen from './Screens/UserDetailsScreen';
import  DetallesDivision from './Screens/DetallesDivision';


function MyStack() {
  return (
    <Stack.Navigator
         screenOptions={{
          headerStyle: {
            backgroundColor: "blue",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
     >

            
<Stack.Screen name = "Home" 
      component={Home}
      options={{ 
        title:'Home - Bienvenido!', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}} source={image}
        />
    ),
    }}
       /> 
       <Stack.Screen name = "News" 
      component={News}
      options={{ 
        title:'Home', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}} source={image}
        />
    ),
    }}
       /> 
       <Stack.Screen name = "Divisiones" 
      component={Divisiones}
      options={{ 
        title:'Home', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}} source={image}
        />
    ),
    }}
       /> 
      <Stack.Screen name = "UsersList" 
      component={UsersList} 
      options={{ 
        title: 'Home', headerRight: () => (
            <Image
            style={{width: 30, height: 30, margin: 20}}
            source={image}
            />
        ),
        }}
      />
      <Stack.Screen name = "CreateUsersScreen" 
      component={CreateUsersScreen} 
      options={{ 
        title: 'Crear Socio', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}}
        source={image}
        />
    ),
    }}
      />  
      <Stack.Screen name = "NuevaDivision" 
      component={NuevaDivision} 
      options={{ 
        title: '???', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}}
        source={image}
        />
    ),
    }}
      />
      <Stack.Screen name = "UserDetailsScreen" 
      component={UserDetailsScreen} 
      options={{ 
        title:'Detalles del Socio', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}}
        source={image}
        />
    ),
    }}
      />
      <Stack.Screen name = "DetallesDivision" 
      component={DetallesDivision} 
      options={{ 
        title:'Detalles de la division', headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}}
        source={image}
        />
    ),
    }}
      />
    </Stack.Navigator>
  )
}
/*--------------------Otra opcion de navegacio ----------------------*/
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Divisiones"
        component={Divisiones}
        options={{
          tabBarLabel: 'Divisiones',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'Noticias',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fixture"
        component={Fixture}
        options={{
          tabBarLabel: 'Fixture',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
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
});