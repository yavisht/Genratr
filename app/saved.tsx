import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Copy, Eye, EyeOff, Notebook, Trash } from "lucide-react-native";
import { useCallback, useState } from "react";
import { FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Text, useTheme, XStack, YStack } from "tamagui";

type PasswordItem = {
  label: string;
  password: string;
  isMasked: boolean;
};

type StoredPasswordItem = {
  label: string;
  password: string;
};

const STORAGE_KEY = "savedPasswords";

const ShowPasswords = () => {
  const theme = useTheme();
  const isWeb = Platform.OS === "web";
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getStoredPasswords = async (): Promise<StoredPasswordItem[]> => {
    if (isWeb) {
      const stored =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_KEY)
          : null;

      return stored ? JSON.parse(stored) : [];
    }

    const stored = await SecureStore.getItemAsync(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const setStoredPasswords = async (passwordsArray: PasswordItem[]) => {
    const serialized = JSON.stringify(
      passwordsArray.map(({ label, password }) => ({ label, password }))
    );

    if (isWeb) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, serialized);
      }
      return;
    }

    await SecureStore.setItemAsync(STORAGE_KEY, serialized);
  };

  const getPasswords = async () => {
    try {
      if (!isWeb) {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const auth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Unlock saved passwords",
            fallbackLabel: "Use Passcode",
          });

          if (!auth.success) {
            setIsAuthenticated(false);
            setPasswords([]);
            return;
          }
        }
      }

      setIsAuthenticated(true);

      const storedPasswords = await getStoredPasswords();
      const updatedPasswords = storedPasswords.map((item: StoredPasswordItem) => ({
        ...item,
        isMasked: true,
      }));

      setPasswords(updatedPasswords);
    } catch (e) {
      alert("Failed to retrieve passwords.");
    }
  };

  const togglePasswordMask = (index: number) => {
    const updatedPasswords = passwords.map((item, i) =>
      i === index ? { ...item, isMasked: !item.isMasked } : item
    );
    setPasswords(updatedPasswords);
  };

  const deletePassword = async (index: number) => {
    try {
      const updatedPasswords = passwords.filter((_, i) => i !== index);
      setPasswords(updatedPasswords);
      await setStoredPasswords(updatedPasswords);
    } catch (e) {
      alert("Failed to delete the password");
    }
  };

  const copyToClipboard = async (password: string) => {
    await Clipboard.setStringAsync(password);
  };

  useFocusEffect(
    useCallback(() => {
      getPasswords();

      return () => {
        setPasswords([]);
        setIsAuthenticated(false);
      };
    }, [])
  );

  return (
    <YStack
      flex={1}
      bg="$background"
      paddingHorizontal="$6"
      width="100%"
      minHeight={isWeb ? "100vh" : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <YStack width="100%" maxWidth={720} alignSelf="center" flex={1}>
          <XStack
            gap="$2"
            ai="center"
            justifyContent="center"
            marginTop="$8"
            marginBottom="$8"
          >
            <Notebook color={theme.color.val} size={30} />
            <Text fontSize="$8" fontWeight="bold" color={theme.color.val}>
              Saved
            </Text>
          </XStack>

          <FlatList
            data={passwords}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
            renderItem={({ item, index }: { item: PasswordItem; index: number }) => (
              <Card
                padding="$3"
                borderRadius="$4"
                marginBottom="$4"
                bg={theme.color2.val}
                width="100%"
              >
                <YStack>
                  {item.label ? (
                    <Text
                      color={theme.color.val}
                      maxWidth="$16"
                      mb="$2"
                      style={{
                        fontSize: 9,
                        fontWeight: "700",
                        backgroundColor: theme.color.val,
                        borderRadius: 10,
                        color: theme.background.val,
                        padding: 5,
                        overflow: "hidden",
                        border: "0",
                        alignSelf: "flex-start",
                      }}
                    >
                      {item.label}
                    </Text>
                  ) : null}

                  <XStack justifyContent="space-between" ai="center">
                    <Text fontSize="$3" color={theme.color.val} maxWidth="70%">
                      {item.isMasked
                        ? "••••••••••••••••••••••••••••••••"
                        : item.password}
                    </Text>

                    <XStack gap="$2">
                      <Button size="$2" onPress={() => togglePasswordMask(index)}>
                        {item.isMasked ? (
                          <Eye color={theme.color.val} size={16} />
                        ) : (
                          <EyeOff color={theme.color.val} size={16} />
                        )}
                      </Button>

                      <Button size="$2" onPress={() => copyToClipboard(item.password)}>
                        <Copy color={theme.color.val} size={16} />
                      </Button>

                      <Button size="$2" onPress={() => deletePassword(index)}>
                        <Trash color="red" size={16} />
                      </Button>
                    </XStack>
                  </XStack>
                </YStack>
              </Card>
            )}
            ListEmptyComponent={
              <Text
                fontSize="$6"
                color={theme.color.val}
                textAlign="center"
                marginVertical="$4"
              >
                {isAuthenticated
                  ? "No saved passwords"
                  : isWeb
                    ? "No saved passwords"
                    : "Authentication required to view saved passwords"}
              </Text>
            }
          />
        </YStack>
      </SafeAreaView>
    </YStack>
  );
};

export default ShowPasswords;