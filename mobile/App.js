import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Doc_Home_Screen from "./screens/Doc_Home_Screen";
import Home from "./screens/Home";
import Page_2 from "./screens/Page_2";
import Pat_Login from "./screens/Pat_Login";
import Doc_Login from "./screens/Doc_Login";
import Doc_List_Patient from "./screens/Doc_List_Patient";
import Doc_Patient_Traitment from "./screens/Doc_Patient_Traitment";
import Doc_Profile from "./screens/Doc_Profile";
import Doc_Ajout_Traitement from "./screens/Doc_Ajout_Traitement";
import Pat_Home_Screen from "./screens/Pat_Home_Screen";
import Pat_List_Doc from "./screens/Pat_List_Doc";
import Pat_Med_Profile from "./screens/Pat_Med_Profile";
import Pat_List_Traitement from "./screens/Pat_List_Traitement";
import Pat_Profile from "./screens/Pat_Profile";
import Pat_Traitement_Detail from "./screens/Pat_Traitement_Detail";
import Urgence_page1 from "./screens/urgence/Urgence_page1";
import Urgence_page2 from "./screens/urgence/Urgence_page2";
import Urgence_page3 from "./screens/urgence/Urgence_page3";
import Urgence_page_fin from "./screens/urgence/Urgence_page_fin";
import Pat_Ajout_Traitement from "./screens/Pat_Ajout_Traitement";

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Page_2" component={Page_2} />
        <Stack.Screen name="Doc_Login" component={Doc_Login} />
        <Stack.Screen name="Doc_Home_Screen" component={Doc_Home_Screen} />
        <Stack.Screen name="Doc_List_Patient" component={Doc_List_Patient} />
        <Stack.Screen name="Doc_Profile" component={Doc_Profile} />
        <Stack.Screen
          name="Doc_Ajout_Traitement"
          component={Doc_Ajout_Traitement}
        />
        <Stack.Screen
          name="Doc_Patient_Traitment"
          component={Doc_Patient_Traitment}
        />
        <Stack.Screen name="Pat_Login" component={Pat_Login} />
        <Stack.Screen name="Pat_Home_Screen" component={Pat_Home_Screen} />
        <Stack.Screen name="Pat_List_Doc" component={Pat_List_Doc} />
        <Stack.Screen name="Pat_Med_Profile" component={Pat_Med_Profile} />
        <Stack.Screen
          name="Pat_Traitement_Detail"
          component={Pat_Traitement_Detail}
        />
        <Stack.Screen
          name="Pat_List_Traitement"
          component={Pat_List_Traitement}
        />
        <Stack.Screen
          name="Pat_Ajout_Traitement"
          component={Pat_Ajout_Traitement}
        />
        <Stack.Screen name="Pat_Profile" component={Pat_Profile} />
        <Stack.Screen name="Urgence_page1" component={Urgence_page1} />
        <Stack.Screen name="Urgence_page2" component={Urgence_page2} />
        <Stack.Screen name="Urgence_page3" component={Urgence_page3} />
        <Stack.Screen name="Urgence_page_fin" component={Urgence_page_fin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
