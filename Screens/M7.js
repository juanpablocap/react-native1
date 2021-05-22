import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";


const M7 = (props) => {
  const [socios, setSocios] = useState([]);
  let users = [];


  useEffect(() => {
    firebase.db.collection("Socios").onSnapshot((querySnapshot) => {
      const socios2 = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone, div, div2 } = doc.data();
        socios2.push({
          id: doc.id,
          name,
          email,
          phone,
          div,
          div2
        });
      });
      setSocios(socios2);
    });
  }, []);

  return ( 
    <ScrollView>
      <View><Text style={styles.division}>Division M 7 (2013)</Text></View>
      <Button //no admite stylos cambiar po un touchcable despues
        style={styles.btn} onPress={() => 
        props.navigation.navigate("CreaSocio")}
        title="Crear Socio"
        />
        <View>
          {console.log(socios.map(user => user.name) )}
          {
          socios.map(user => {
            if (user.div2 == 'm7') {
              return (
                <View>
                  <ScrollView>
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
                    <Avatar
                      source={{ uri:
                      "https://www.microstockposts.com/storage/2019/10/000074.jpg",
                      }} rounded
                    />
                     <Badge
                      status="success"
                      containerStyle={{ position: 'absolute', top: 38, right: 318 }}
                    />
                      <ListItem.Content>
                        <ListItem.Title>
                          {user.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          {user.div}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          {user.div2}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </ScrollView>
                </View>
              )
            }
            }
          )}
        </View>
    </ScrollView>
  );
};

export default M7

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