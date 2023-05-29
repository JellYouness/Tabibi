import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { API_BASE_URL } from "../IP";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Doc_Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handelLogin = async () => {
    try {
      setMessage("");
      if (!email || !password) {
        setMessage("Email and password are required");
        return;
      }
      // TODO:need to handel user with id medcien or alredy logedin
      const response = await axios.post(`${API_BASE_URL}/medecins/login`, {
        email: email,
        password: password,
      });
      setEmail("");
      setPassword("");
      if (response.data.error) {
        setMessage("Unauthenticated");
      } else {
        const id = JSON.stringify(response.data.medecin.id);
        await SecureStore.setItemAsync("med_id", id);
        await navigation.navigate("Doc_Home_Screen");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <View
      className="flex-1 flex-col items-center   mt-4 "
      style={{
        backgroundColor: "#F6F6F6",
      }}
    >
      <View className=" mx-5  items-center  justify-center w-full rounded-br-full mb-14 ">
        <View className=" mt-10 self-start ml-5">
          <AntDesign name="arrowleft" size={24} color="black" />
        </View>
        <Text className="  font-extrabold text-3xl mt-10 ">Tabibi</Text>
        <Text className="  font-medium text-xl mt-3 ">Login As A Doctor</Text>
      </View>
      <View className="flex-col  w-full mt-12">
        <View className="w-full flex-col   ">
          <Text className="w-fit col-start-1 mx-7 mt-3">Email Address</Text>
          <TextInput
            className="w-80 h-10 bg-white mx-7 rounded-md  shadow-sm border-1 p-2 border-gray-400 "
            placeholder={"example@mail.com"}
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View className="w-full flex-col   ">
          {message && (
            <Text
              class=" mx-7 font-semibold text-red-500"
              style={{
                color: "red",
                fontWeight: "bold",
                marginHorizontal: 30,
              }}
            >
              {message}
            </Text>
          )}
          <Text className="w-fit col-start-1 mx-7 mt-4">Password</Text>
          <TextInput
            className="w-80 h-10 bg-white mx-7 rounded-md  shadow-sm border-1 p-2 border-gray-400 "
            placeholder={"At least 8 characters"}
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View className=" mx-10 mt-20">
        <TouchableOpacity
          className="mt-3 w-60 h-12 justify-center self-center shadow-lg bg-teal-400 rounded-lg"
          onPress={handelLogin}
        >
          <Text className=" self-center text-white text-xl">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// style={styles.container}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E8EB",
  },
});
