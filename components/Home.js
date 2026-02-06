import { useNavigation } from "@react-navigation/native";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import React, { useState, useEffect, act } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebaseConfig";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  // Event handler per l'eliminazione del singolo utente
  // Prende in input l'id dell'utente
  const handleDelete = (id)=>{
    // Faccio visualizzare una finestra di dialogo di alert 
    Alert.alert("Attenzione!", "L'operazione di cancellazione è irreversibile.\nSei sicuro?", 
      // Definisco un array di oggetti come secondo parametro : https://reactnative.dev/docs/alert#alertoptions
      [
        // Come primo oggetto dell'array definisco il pulsante per l'undo dell'operazione
        {text:"No!",style:"cancel"},
        // Come secondo oggetto definisco il pulsante di conferma dell'operazione di delete
        {
      text: 'Si!',
      // Dichiaro funzione onPress: 
      // Questa funzione esegue una funzione async 
      // esegue un blocco try-catch: nel blocco try eseguo un await con la funzione deleteDoc; come argomenti gli passo il db, la collezzione 'users' e l'id dell'utente
      onPress:async()=>{try {
        await deleteDoc(doc(db, "users", id))
      // Nel catch gestisco l'errore nel caso la fetch fallisca 
      } catch (error) {
        // Faccio visualizzare una finestra di dialogo di Alert con un messaggio di errore + il messaggio dell'errore stesso 
        Alert.alert("Errore!","L'operazione non è andata a buon fine" + error.message);
      }
        },
      style: 'cancel'

    }],
    // Come secondo argomento dell'alert definisco se l'alert può essere dismesso quando l'utente preme fuori dalla box di alert  
    {cancelable:true, 
      onDismiss:()=>Alert.alert("Vuoi annullare l'operazione?")
    })
  }
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.nome} {item.cognome}
        </Text>
        <Text style={styles.details}>{item.email} </Text>
        <Text style={styles.details}>{item.telefono} </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.editBtn]}
          onPress={() => navigation.navigate("AddEditUser", { user: item })}

        >
          <Text style={styles.btnText}>Modifica </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.deleteBtn]}>
          <Text style={styles.btnText} onPress={()=>handleDelete(item.id)}>Cancella </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}> Nessun utente Trovato</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEditUser")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5fe" },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 16, color: "grey", marginTop: 2 },
  actions: { flexDirection: "column", gap: 5 },
  btn: {
    marginHorizontal: 5,
    padding: 10,
  },
  editBtn: { backgroundColor: "#f0ad4e" },
  deleteBtn: { backgroundColor: "#d9534f" },
  btnText: { color: "white", fontWeight: "bold" },
  emptyText:{textAlign:"center", marginTop:20, fontSize:16, color:"grey"},
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 30,
    right: 30,
    backgroundColor: "#5067FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  fabText: { color: "white", fontSize: 30 },
});