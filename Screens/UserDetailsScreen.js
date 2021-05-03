import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailsScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  //elimino usuario userId
  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    //props.navigation.navigate('UsersList');
    props.navigation.goBack();
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Estas borrando el Socio",
      "Estas seguro?",
      [
        { text: "Si", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    setLoading(true)
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setLoading(false)
    setUser(initialState);
    //props.navigation.navigate("UsersList");
    props.navigation.goBack();
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          keyboardType="email-address"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Telefono"
          keyboardType="numeric"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Borrar"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Actualizar" 
        onPress={() => updateUser()} backgroundColor = {'blue'} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    fontSize: 20,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    backgroundColor: 'red',
    fontSize: 20,
    marginBottom: 7,
  },
});

export default UserDetailsScreen;