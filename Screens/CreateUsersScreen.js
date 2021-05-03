import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import  firebase from "../database/firebase";

const CreateUsersScreen = (props) => {
    
    const [state, setState] = useState({  //inicializamos el estado
        name: '',
        email: '',
        phone: '',
});
    
const handleChangeText = (name, value) => {  //manejamos el texto
        setState({ ...state, [name]: value })
 };

const saveNewUser = async () => {  // se chequea si esta vacio
    if (state.name === '') {
        alert('Ingrese un nombre')
    } else {
        try {
            await firebase.db.collection('users').add({ // se agrega el user a db
                name: state.name,
                email: state.email,
                phone: state.phone
            })
            alert('El socio se a guardado!');
            //props.navigation.navigate('UsersList');
            props.navigation.goBack();
        } catch (error) {
            console.log(error);
        }

    }
};

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre del Socio" 
                onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput keyboardType="email-address" placeholder="Email"
                onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput keyboardType="numeric" placeholder="Telefono"
                onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View style={styles.btn}>
                <Button title="Guardar" onPress={()=> saveNewUser()} />
            </View>
        </ScrollView>
    )
}

export default CreateUsersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex:1,
        fontSize: 25,
        fontWeight: 'bold',
        padding: 3,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },

    btn: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'blue',
        fontSize: 20,
    }

})