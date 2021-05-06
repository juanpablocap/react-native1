import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar, Badge, Header } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";


const Divisiones = (props) => {
  const [divisiones, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("divisiones").onSnapshot((querySnapshot) => {
      const divisiones = [];
      querySnapshot.docs.forEach((doc) => {
        const { division, entrenador, phone, email } = doc.data();
        divisiones.push({
          id: doc.id,
          division,
          entrenador,
          phone,
          email,
        });
      });
      setUsers(divisiones);
    });
  }, []);

  return (
    
    <ScrollView>
      <View><Text style={styles.dv}>Todas las Divisiones </Text></View>
      <Button //no admite stylos cambiar po un touchcable despues
        style={styles.btn} 
        onPress={() => props.navigation.navigate("NuevaDivision")}
        title="Crear Nueva Division"
      />
      {divisiones.map((division) => {
        return (
          <ListItem
            key={division.id}
            bottomDivider
            onPress={() => { 
              props.navigation.navigate("DetallesDivision", {
                userId: division.id,
              });
            }}
          >
            
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://www.microstockposts.com/storage/2019/10/000074.jpg", 
                  
              }}
              rounded
              
            />
            <Badge
            status="success"
            containerStyle={{ position: 'absolute', top: 38, right: 318 }}
            onPress={() => props.navigation.navigate("DetallesDivision", {
              userId: division.id,
            })}
           />
            <ListItem.Content>
              <ListItem.Title>{division.division}
              {console.log('divisiones.division')}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {division.entrenador}
                </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default Divisiones

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
   color: 'grey'
 },
 dv: {
   fontSize: 15,
   backgroundColor: 'red',
   padding: 10,
   textAlign: 'center',
   fontWeight: 'bold'
 },
 btn: {
   backgroundColor: 'grey'
 }
});