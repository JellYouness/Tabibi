import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_IMAGE_URL } from "../IP.js";
import moment from "moment";
const WIDTH = Dimensions.get("window").width - 30;
import * as SecureStore from "expo-secure-store";

export default function List_Doc({ navigation }) {
  const [Docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDataDoctor = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        const response = await axios.get(`${API_BASE_URL}/medecins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setDocs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataDoctor();
  }, []);

  return (
    <View>
      <FlatList
        style={styles.chatFlatList}
        data={Docs}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => navigation.navigate("Pat_Med_Profile", { item })}
          >
            {item.image ? (
              <Image
                style={{
                  width: 84,
                  height: 89,
                  resizeMode: "contain",
                  borderRadius: 15,
                }}
                source={{ uri: `${API_IMAGE_URL}/storage/${item.image}` }}
              />
            ) : (
              <Image
                style={{
                  width: 84,
                  height: 89,
                  resizeMode: "contain",
                  borderRadius: 15,
                }}
                source={{
                  uri: "https://img.freepik.com/free-vector/man-doctor-with-medical-services-icons_24877-51669.jpg?w=740&t=st=1685247369~exp=1685247969~hmac=df8e69f2275b6b12b7dbf4368101ed750ff32910ceafdafbbca4ea91b3710a66",
                }}
              />
            )}

            <View style={styles.chatTextContainer}>
              <View style={styles.chatTextTop}>
                <Text style={styles.title}>
                  {item.nom} {item.prenom}
                </Text>
              </View>
              <View style={styles.chatTextBottom}>
                <Text style={styles.msg}>{item.email}</Text>
                <Text style={styles.msg}>{item.specialite}</Text>
              </View>
              <View style={styles.chatTextBottom}>
                <Text style={styles.msg}>
                  <Text style={styles.join}>Join Us At :</Text>
                  {moment(item.created_at).format("HH:mm:ss")}
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
  chatFlatList: {
    marginBottom: 160,
  },
  chatContainer: {
    flexDirection: "row",
    marginHorizontal: 22,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 3,
  },
  chatTextContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  chatTextTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.8,
  },
  chatTextBottom: {
    justifyContent: "space-between",
    width: WIDTH * 0.8,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333333",
  },
  join: {
    fontSize: 15,
    fontWeight: "semibold",
    color: "black",
  },
  time: {
    fontSize: 13,
  },
  msg: {
    marginLeft: 5,
    fontSize: 13,
    color: "#5c5c5c",
  },
});
