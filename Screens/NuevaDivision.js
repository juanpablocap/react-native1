import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import  firebase from "../database/firebase";

const NuevaDivision = (props) => {
    
    const [state, setState] = useState({  //inicializamos el estado
        division: '',
        entrenador: '',
        phone: '',
        email: '',
});
    
const handleChangeText = (division, value) => {  //manejamos el texto
        setState({ ...state, [division]: value })
 };

const saveNewUser = async () => {  // se chequea si esta vacio
    if (state.division === '') {
        alert('Ingrese una division')
    } else {
        try {
            await firebase.db.collection('divisiones').add({ // se agrega el user a db
                division: state.division,
                entrenador: state.entrenador,
                phone: state.phone,
                email: state.email,
            })
            alert('La division se a guardado!');
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
                <TextInput placeholder="Nombre de la division" 
                onChangeText={(value) => handleChangeText('division', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nombre del entrenador" 
                onChangeText={(value) => handleChangeText('entrenador', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput keyboardType="numeric" placeholder="Telefono"
                onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput keyboardType="email-address" placeholder="Email"
                onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.btn}>
                <Button title="Guardar" onPress={()=> saveNewUser()} />
            </View>

        </ScrollView>
    )
}

export default NuevaDivision

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