import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import PlaceDetail from "./screens/PlaceDetail";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/Colors";
import { init } from "./util/database";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialize, setDbInitialize] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialize(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialize) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialize]);

  if (!dbInitialize) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  colotr={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          ></Stack.Screen>
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          ></Stack.Screen>
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetail}
            options={{
              title: "Loading Place....",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
