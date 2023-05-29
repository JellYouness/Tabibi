import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { API_BASE_URL } from "../IP";
import axios from "axios";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const WIDTH = Dimensions.get("window").width - 10;
const image =
  "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1685246789~exp=1685247389~hmac=6198d9d8581621936d1df82332ee3fe100c74e15fdf91510bec5addd505b8c71";

export default function List_Patient({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTraitementDoctor();
    // TODO:Change it to 600
    const interval = setInterval(fetchTraitementDoctor, 6000); // Refresh data every 1 minute (adjust as needed)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const fetchTraitementDoctor = async () => {
    try {
      const storedId = await SecureStore.getItemAsync("med_id");
      if (!storedId) {
        navigation.navigate("Doc_Login");
      }
      const response = await axios.get(
        `${API_BASE_URL}/traitements/medecins/${storedId}`
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => navigation.navigate("Doc_Ajout_Traitement", item)}
          >
            <TouchableOpacity name="HELLOOO">
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                  borderRadius: 15,
                }}
                source={{ uri: image }}
              />
            </TouchableOpacity>

            <View style={styles.chatTextContainer}>
              <View style={styles.chatTextTop}>
                <Text style={styles.title}>
                  {item.patient.nom} {item.patient.prenom}
                </Text>
              </View>
              <View style={styles.chatTextTop2}>
                <Text
                  style={styles.title2}
                  lineBreakMode="clip"
                  numberOfLines={1}
                >
                  {item.description}
                </Text>
              </View>
              <View style={styles.foot}>
                <Text style={styles.time}>
                  <FontAwesome5 name="clock" size={18} color="green" />
                  {moment(item.updated_at).format("HH:mm:ss")}
                </Text>
                <Text style={styles.time}>
                  {item.reponse ? (
                    <Feather name="check-circle" size={20} color="black" />
                  ) : (
                    <AntDesign name="warning" size={20} color="red" />
                  )}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 4,
  },
  chatTextContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  chatTextTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.6,
  },
  chatTextTop2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.66,
  },
  chatTextBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    // width: 200,
    width: WIDTH * 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 14,
    fontWeight: "300",
  },
  time: {
    flexDirection: "row",
    fontSize: 13,
    justifyContent: "space-between",
    alignItems: "center",
  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  msg: {
    fontSize: 15,
    marginLeft: 5,
  },
  green: {
    fontSize: 15,
    marginLeft: 5,
  },
  red: {
    backgroundColor: "red",
    margin: 4,
    color: "white",
    borderRadius: 15,
  },
});
