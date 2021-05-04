import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image } from 'react-native';

//navegacion
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import image from "./assets/logo.png";

const Stack = createStackNavigator()

//componentes
import  Home from "./Screens/Home";
import  UsersList from './Screens/UsersList';
import  CreateUsersScreen from "./Screens/CreateUsersScreen";
import  UserDetailsScreen from "./Screens/UserDetailsScreen";


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
      options={{ headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}} source={image}
        />
    ),
    }}
       /> 
      <Stack.Screen name = "Lista de Socios" 
      component={UsersList} 
      options={{ headerRight: () => (
            <Image
            style={{width: 30, height: 30, margin: 20}}
            source={image}
            />
        ),
        }}
      />
      <Stack.Screen name = "Crear Nuevo Socio" 
      component={CreateUsersScreen} 
      options={{ headerRight: () => (
        <Image
        style={{width: 30, height: 30, margin: 20}}
        source={image}
        />
    ),
    }}
      />  
      <Stack.Screen name = "Detalles del Socio" 
      component={UserDetailsScreen} 
      options={{ headerRight: () => (
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