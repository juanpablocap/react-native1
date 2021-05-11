import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { ListItem, Avatar, Badge, Header } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";


const News = (props) => {
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
      <View><Text style={styles.division}>Noticias!</Text></View>
      
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
            <ListItem.Content>
              <ListItem.Title >
                <Avatar style={styles.news} source={{
                uri:
                  "https://prod-arc.lavoz.com.ar/resizer/CtzMQFrZfNTP1SLfwY_HNWXj3HM=/1023x682/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/VFQDSQJ4RBAVTG7JYASJQ6VS2I.jpg",
              }} /> 
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                <Text>El club Natación y Gimnasia lamenta profundamente el 
                fallecimiento de nuestro querido Julio Coria. Referente no sólo del club sino del rugby tucumano. Que el señor consuele a su familia en este difícil momento.
                QEPD Julito
                </Text>
                </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default News

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    textAlign: 'justify',
    textAlign: 'center',
    color: 'black',
 },
 news: {
   width: 290,
   height: 250,
 },
 division: {
   fontSize: 15,
   alignItems: 'center',
   backgroundColor: 'red',
   padding: 10,
   textAlign: 'center',
   fontWeight: 'bold',

 },
 btn: {
   backgroundColor: 'grey'
 }
});