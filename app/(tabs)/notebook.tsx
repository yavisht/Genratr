import { useState, useCallback } from "react";
import { Platform, FlatList } from "react-native";
import { YStack, XStack, Text, Button, Card, useTheme } from "tamagui";
import { Notebook, Trash, Copy, Eye, EyeOff } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type PasswordItem = {
  label: string;
  password: string;
  isMasked: boolean;
};

const ShowPasswords = () => {
  const theme = useTheme();
  const isWeb = Platform.OS === "web";
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);

  const getPasswords = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem("savedPasswords");
      if (storedPasswords !== null) {
        const parsedPasswords = JSON.parse(storedPasswords);
        const updatedPasswords = parsedPasswords.map((item: PasswordItem) => ({
          ...item,
          isMasked: item.isMasked ?? true,
        }));
        setPasswords(updatedPasswords);
      } else {
        setPasswords([]);
        alert("No passwords saved yet.");
      }
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
      await AsyncStorage.setItem(
        "savedPasswords",
        JSON.stringify(updatedPasswords)
      );
    } catch (e) {
      alert("Failed to delete the password");
    }
  };

  const copyToClipboard = async (password: string) => {
    await Clipboard.setStringAsync(password);
    // alert("Password copied");
  };

  useFocusEffect(
    useCallback(() => {
      getPasswords();
    }, [])
  );

  return (
    <YStack
      flex={1}
      bg="$background"
      paddingHorizontal="$6"
      position={isWeb ? "relative" : "unset"}
      width={isWeb ? "100%" : "unset"}
      maxWidth={isWeb ? "480px" : "unset"}
      margin={isWeb ? "auto" : "unset"}
      height={isWeb ? "100vh" : "unset"}
    >
      <SafeAreaView>
        <XStack
          gap="$2"
          ai="center"
          justifyContent="center"
          marginTop="$8"
          marginBottom="$8"
        >
          <Notebook color={theme.color.val} size={30} />
          <Text fontSize="$8" fontWeight="bold" color={theme.color.val}>
            Notebook
          </Text>
        </XStack>
        {/* Scrollable FlatList of passwords */}
        <FlatList
          data={passwords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({
            item,
            index,
          }: {
            item: PasswordItem;
            index: number;
          }) => (
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
                ) : (
                  <></>
                )}

                <XStack justifyContent="space-between" ai="center">
                  <Text fontSize="$3" color={theme.color.val} maxWidth="70%">
                    {item.isMasked
                      ? "••••••••••••••••••••••••••••••••"
                      : item.password}
                  </Text>
                  <XStack gap="$2">
                    <Button
                      icon={item.isMasked ? Eye : EyeOff}
                      size="$2"
                      color={theme.color.val}
                      onPress={() => togglePasswordMask(index)}
                    />
                    <Button
                      icon={Copy}
                      size="$2"
                      color={theme.color.val}
                      onPress={() => copyToClipboard(item.password)}
                    />
                    <Button
                      icon={Trash}
                      size="$2"
                      color="red"
                      onPress={() => deletePassword(index)}
                    />
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
              No saved passwords
            </Text>
          }
        />
      </SafeAreaView>
    </YStack>
  );
};

export default ShowPasswords;
