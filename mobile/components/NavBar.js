import { useNavigation } from "@react-navigation/native";
import react from "react";
import { AntDesign } from "@expo/vector-icons";

import { Image, Text, View, TouchableOpacity } from "react-native";

export default function NavBar() {
  const navigation = useNavigation();
  return (
    <View className="absolute -bottom-0 self-center bg-white rounded-2xl h-14 p-3 w-full ">
      <View className="flex-row space-x-14  align-middle justify-center  items-center justify-items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("Doc_Home_Screeen")}
        >
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Doc_Chat")}>
          <View className=" bg-[#E64646] rounded-full h-10 w-10 flex justify-center items-center">
            <AntDesign name="pluscircleo" size={28} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Doc_Profile")}>
          <AntDesign name="user" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
{
  /*
  ----------------------------------------------------------------

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; 
 

<View className="absolute -bottom-0 self-center bg-white rounded-2xl h-14 p-3 w-full ">
        <View className="flex-row space-x-10  align-middle justify-center  items-center justify-items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Doc_Home_Screeen")}
          >
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Doc_Home_Screeen")}
          >
            <Entypo name="list" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Doc_Chat")}>
            <View className=" bg-[#FF0000] rounded-full h-10 w-10 flex justify-center items-center">
              <AntDesign name="pluscircleo" size={28} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Doc_Profile")}>
            <Ionicons name="chatbox-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Doc_Profile")}>
            <AntDesign name="user" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View> */
}
