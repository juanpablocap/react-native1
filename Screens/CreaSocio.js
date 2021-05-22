import React, { useState } from "react";
import {
  View,
  Text,
  Select,
  Button,
  TouchableHighlight,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import firebase from "../database/firebase";
import { Picker } from "@react-native-picker/picker";

const CreaSocio = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(); // para picker

  const [state, setState] = useState({
    //inicializamos el estado
    name: "",
    email: "",
    phone: "",
    div: "",
    div2: "", // prueba otro metodo para elegir la division comos select
  });

  const handleChangeText = (name, value) => {
    //manejamos el texto
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    // se chequea si esta vacio
    if (state.name === "") {
      alert("Ingrese un nombre");
    } else {
      try {
        await firebase.db.collection("Socios").add({
          // se agrega el user a db
          name: state.name,
          email: state.email,
          phone: state.phone,
          div: state.div,
          div2: state.div2,
        });
        alert("El socio se a guardado!");
        props.navigation.navigate("M7");
        //props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableHighlight
          onPress={() => props.navigation.navigate("Foto")}
          style={styles.boton}
        >
          <Text>Sube su foto</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre del Socio"
          autoCompleteType="name"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          autoCompleteType="email"
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          autoCompleteType="tel"
          keyboardType="numeric"
          placeholder="Telefono"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Division"
          onChangeText={(value) => handleChangeText("div", value)}
        />
      </View>
      <View>
        {/* <Picker style={styles.inputGroup}
                    selectedValue={selectedLanguage}
                    onValueChange={(value, itemIndex) =>
                        handleChangeText('div2', value)
                    }>
                <Picker.Item label="m6" value="m6"  />
                <Picker.Item label="m7" value="m7" />
                <Picker.Item label="m8" value="m8" />
                <Picker.Item label="m9" value="m9" />
                <Picker.Item label="m10" value="m10" />
                <Picker.Item label="m11" value="m11" />
            </Picker> */}
      </View>
      {/* <View> // intentando crear un select para elegir division
                <TextInput type="text" 
                        onChangeText={(value) => 
                        handleChangeText('div2', value)} >
                    <label>
                    <select value="">
                            <option value="M6">Menores de 6</option>
                            <option value="M7">Menores de 7</option>
                            <option value="M8">Menores de 8</option>
                            <option value="M9">Menos de 9</option>
                            <option value="M10">Menores de 10</option>
                            <option value="M11">Menos de 11</option>
                    </select>
                    </label>
                </TextInput>
            </View> */}
      <View style={styles.btn}>
        <Button title="Guardar" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

export default CreaSocio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    padding: 3,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  btn: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "blue",
    fontSize: 20,
  },
  boton: {
    flex: 1,
    color: "white",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 35,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: `grey`,
    borderRadius: 15,
  },
});
