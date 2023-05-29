import { Image, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import List_Doc from "../components/List_Doc";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Pat_List_Doc({ navigation }) {
  return (
    <View className="flex-1  items-center ">
      <View className=" flex  w-full px-4 pb-3 rounded-b-3xl drop-shadow-xl bg-[#1C6BA4] flex-row pt-10 justify-between">
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />

        <Text className="text-xl text-white font-extrabold">List Doctors</Text>

        <Image
          source={require("../assets/Logo-Doc.png")}
          className="h-14  w-14 from-neutral-50 drop-shadow-xl rounded-lg "
        />
      </View>
      <View className=" flex  justify-between">
        <List_Doc navigation={navigation} className="pb-14 bg-[#FF0000]" />
      </View>

      <View className="absolute -bottom-0 self-center bg-white rounded-2xl h-14 p-3 w-full ">
        <View className="flex-row space-x-10  align-middle justify-center  items-center justify-items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Pat_Home_Screen")}
          >
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Pat_List_Doc")}>
            <Entypo name="list" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Urgence_page1")}
          >
            <View className=" bg-[#FF0000] rounded-full h-10 w-10 flex justify-center items-center">
              <AntDesign name="pluscircleo" size={28} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Pat_List_Traitement")}
          >
            <Ionicons name="chatbox-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Pat_Profile")}>
            <AntDesign name="user" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
