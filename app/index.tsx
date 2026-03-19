import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Perfil Rápido - Aula 4: Estilização de Componentes
 *
 * Demonstra o uso de:
 * - TextInput com placeholder, borda arredondada e sincronização via useState
 * - Image com borderRadius circular, resizeMode='cover'
 * - Button com onPress que mostra alerta
 * - StyleSheet.create() para layout responsivo com Flexbox
 * - Cores, bordas e espaçamentos bem definidos
 */

const PROFILE_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
];

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Aviso", "Por favor, digite seu nome");
      return;
    }

    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    Alert.alert("Perfil Salvo", `Bem-vindo, ${name}! 🎉`);
  };

  const handleToggleImage = async () => {
    setImageIndex((prev) => (prev + 1) % PROFILE_IMAGES.length);
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Seu Perfil</Text>
            <Text style={styles.subtitle}>Configure seus dados</Text>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            {/* Profile Image */}
            <Image
              source={{ uri: PROFILE_IMAGES[imageIndex] }}
              style={styles.profileImage}
              resizeMode="cover"
            />

            {/* Toggle Image Button */}
            <Pressable
              onPress={handleToggleImage}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Alternar Foto</Text>
            </Pressable>

            {/* Name Input */}
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu nome"
              placeholderTextColor="#687076"
              value={name}
              onChangeText={setName}
              maxLength={50}
            />
          </View>

          {/* Action Section */}
          <View style={styles.actionSection}>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Salvar Perfil</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 32,
  },
  headerSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#11181C",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#687076",
    textAlign: "center",
  },
  profileSection: {
    width: "100%",
    alignItems: "center",
    gap: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f5f5f5",
    borderWidth: 3,
    borderColor: "#0a7ea4",
  },
  secondaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#0a7ea4",
    backgroundColor: "transparent",
  },
  secondaryButtonPressed: {
    opacity: 0.7,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a7ea4",
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#ffffff",
    fontSize: 16,
    color: "#11181C",
  },
  actionSection: {
    width: "100%",
    gap: 12,
    marginTop: 16,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    backgroundColor: "#0a7ea4",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
