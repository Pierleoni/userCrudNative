import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import AddEditUser from "./components/AddEditUser";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigatorContainer>
      {/* InitialRouteName è una attributo che dice che la prima screen di defualt è Home */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEditUser" component={AddEditUser} />
      </Stack.Navigator>
    </NavigatorContainer>
  );
}

