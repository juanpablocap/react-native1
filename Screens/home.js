import React from 'react'
import { View, Text, Button, StyleSheet, Image,TouchableHighlight, StatusBar } from 'react-native'
import  image  from '../assets/logo.png'


const Home = (props) => {
    return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.texto}>NYG - Manage System</Text>
      <Text>Sistema para la organizacion de divisiones de NYG</Text>
      <TouchableHighlight 
        onPress={() => props.navigation.navigate("News")} 
        style={styles.boton}>
        <Text>Noticias</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        onPress={() => props.navigation.navigate("Divisiones")} 
        style={styles.boton}>
        <Text>Divisiones</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        onPress={() => props.navigation.navigate("UsersList")} 
        style={styles.boton}>
        <Text>Fixture</Text>
      </TouchableHighlight>
    </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center', 
    },
    image: {
      height: 220,
      width: 220,
    },
    texto: {
      fontSize: 22,
      color: 'red',
      padding: 3,
    },
    boton: {
      marginTop: 20,
      paddingHorizontal: 50,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: `#f0f8ff`,
      borderRadius: 15,
    },
  });