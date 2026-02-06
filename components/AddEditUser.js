import React, { useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet, Alert } from "react-native";
import { db } from "./../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
const AddEditUser = ({navigation, route}) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const userEdit = route.params? route.params.user: null; 
  console.log(userEdit);

  const handleSave = async () => {
    // Logica per salvare o aggiornare l'utente
    if (!nome || !cognome || !email || !telefono) {
      Alert.alert("Errore", "Per favore, compila tutti i campi.");
      return;
    }
    try {
      if(userEdit){
        const userRef = doc(db, "users", userEdit.id);
        await updateDoc(userRef,{
          nome, 
          cognome, 
          email, 
          telefono
        });
        Alert.alert("Successo", "Utente modificato con successo.");
      }else{

        await addDoc(collection(db, "users"), {
          nome,
          cognome,
          email,
          telefono,
          createAt: new Date(),
        });
        Alert.alert("Successo", "Utente salvato con successo.");
      }
      navigation.goBack()
    } catch (error) {
      Alert.alert(
        "Errore",
        "Si è verificato un errore durante il salvataggio dell'utente. "+error.message,
      );
    }
  };
  
  useEffect(()=>{
    if (userEdit){
      setNome(userEdit.nome);
      setCognome(userEdit.cognome);
      setEmail(userEdit.email);
      setTelefono(userEdit.telefono);
      navigation.setOptions({title: "Modifica utente"});
    }else{
      navigation.setOptions({title: "Aggiungi utente"}); 
    }
  }, [userEdit, navigation]);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      ></TextInput>
      <TextInput
        placeholder="Cognome"
        style={styles.input}
        value={cognome}
        onChangeText={setCognome}
      ></TextInput>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        placeholder="telefono"
        keyboardType="phone-pad"
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
      ></TextInput>
      <Button title="Salva" onPress={handleSave}></Button>
    </View>
  );
};

export default AddEditUser;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5fe", padding: 20 },
  input: {
    height: 40,
    borderColor: "grey",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});