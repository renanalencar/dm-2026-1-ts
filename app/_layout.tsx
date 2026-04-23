import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="update" options={{ title: "Atualização" }} />
        <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
