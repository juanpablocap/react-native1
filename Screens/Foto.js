import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Firebase  from "../database/firebase";

import { firebaseConfig } from "../database/firebase";

export default function ImagePickerExample() {
  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  }
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Lo siento, necesitamos permiso para acceder a su album!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

const uploadImage = async () => { 
   const blob = await new Promise((resolve, reject) =>{
     const xhr = new XMLHttpRequest();
     xhr.onload = function () {
       resolve(xhr.response);
     }
     xhr.onerror = function () {
       reject(new TypeError('Network request failed'));
     };
     xhr.responseType = 'blob';
     xhr.open('GET', image, true);
     xhr.send(null);
   });
}

const ref = Firebase.storage().ref().child(new Date().toISOString())
const snapshot = ref.put(blob)

snapshot.on(
  Firebase.storage.TaskEvent.STATE_CHANGED,
  () => {
    setUploading(true);
  },
  (error) => {
    setUploading(false);
    console.log(error);
    blob.close();
    return;
  },
  () => {
    snapshot.snapshot.ref.getDownloadURL().then((url) => {
      setUploading(false);
      console.log("Download url: ", url);
      blob.close();
      return url;
    });
  }
)
  return (
    <View style={{ flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
     }}>
      <Button title="Elige una foto del album" 
      onPress={pickImage} 
      />
      {image && <Image source=
      {{ uri: image }} style={{ width: 300, height: 300 }} />}
      <Button title="Sube esta foto!" 
      onPress={uploadImage}  />
    </View>
  );
} 