import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar, Badge, Header } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";

<Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    });
  }, []);

  return (
    
    <ScrollView>
      <View><Text style={styles.division}>Division m9 (2012)</Text></View>
      <Button //no admite stylos cambiar po un touchcable despues
        style={styles.btn} onPress={() => props.navigation.navigate("CreateUsersScreen")}
        title="Crear Socio"
      />
      {users.map((user) => {
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
           />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UsersList

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