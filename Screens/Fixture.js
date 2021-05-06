import { View, Text, ScrollView, Button } from "react-native";
import React from "react";

const  Fixture = (props) => {
    return (
    <ScrollView>
    <View>
        <Text>Todas las Divisiones </Text>
    </View>
    <Button //no admite stylos cambiar po un touchcable despues 
      onPress={() => props.navigation.navigate("Home")}
      title="Home"
    />
    </ScrollView>
    )
}

export default Fixture