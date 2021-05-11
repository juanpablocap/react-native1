import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";


const M6 = (props) => {
  const [socios, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("Socios").onSnapshot((querySnapshot) => {
      const socios = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone, div } = doc.data();
        socios.push({
          id: doc.id,
          name,
          email,
          phone,
          div
        });
      });
      setUsers(socios);
    });
  }, []);

  return (
    <ScrollView>
      <View><Text style={styles.division}>Division M 6 (2012)</Text></View>
      <Button //no admite stylos cambiar po un touchcable despues
        style={styles.btn} onPress={() => 
        props.navigation.navigate("CreaSocio")}
        title="Crear Socio"
      />
      {socios.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => { 
              props.navigation.navigate("UserDetailsScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />  
            <Avatar  // imagen del usuario x ahora una generica
              source={{
                uri:
                  "https://www.microstockposts.com/storage/2019/10/000074.jpg",
              }}
              rounded
            />
            <Badge
            status="success" // un punto de color, que indica un estado verde/rojo
            containerStyle={{ position: 'absolute', top: 38, right: 318 }}
           />
            <ListItem.Content>
                <ListItem.Title>
                  {user.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.subtitle}>
                  {user.div} 
                 </ListItem.Subtitle>
            </ListItem.Content>
            {console.log(user.name, user.div)}
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default M6

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
   color: 'grey'
 },
 division: {
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