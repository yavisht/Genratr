import * as Clipboard from "expo-clipboard";
import * as SecureStore from "expo-secure-store";
import { throttle } from "lodash";
import {
  Copy,
  Eye,
  EyeOff,
  RectangleEllipsis,
  RefreshCw,
  SaveIcon,
} from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutChangeEvent, Platform } from "react-native";
import {
  Button,
  Input,
  ScrollView,
  Slider,
  Switch,
  Text,
  useTheme,
  XStack,
  YStack,
} from "tamagui";

interface PwOption {
  label: string;
  key: string;
  value: string;
}

type StoredPasswordItem = {
  label: string;
  password: string;
};

const STORAGE_KEY = "savedPasswords";

const pwHints = {
  selected: "Your generated password will appear here",
  empty: "No password options selected",
};

const pwOptions: PwOption[] = [
  {
    label: "Special characters",
    key: "special",
    value: "!@#$%^&*()_+{}:\"'<>?|[];,./~",
  },
  {
    label: "Lowercase characters",
    key: "lowercase",
    value: "abcdefghijklmnopqrstuvwxyz",
  },
  {
    label: "Uppercase characters",
    key: "uppercase",
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  { label: "Numbers", key: "numbers", value: "0123456789" },
];

const GeneratePassword = () => {
  const theme = useTheme();
  const isWeb = Platform.OS === "web";
  const [label, setLabel] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(18);
  const [selected, setSelected] = useState<string[]>([]);
  const [isPwd, setIsPwd] = useState<boolean>(true);
  const [pwHelperText, setPwHelperText] = useState<string>(pwHints.selected);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (isWeb && typeof window !== "undefined" && window.document) {
      window.document.title =
        "Genratr | A simple and secure password generator";
    }

    const allSelected = pwOptions.map((o) => o.value);
    setSelected(allSelected);
    generatePassword(allSelected.join("").split(""));
  }, []);

  const stringDB = useMemo(() => selected.join("").split(""), [selected]);

  useEffect(() => {
    if (selected.length !== 0) {
      generatePassword(stringDB);
    }

    if (password.length > 0) {
      setPwHelperText(pwHints.selected);
    } else {
      setPwHelperText(pwHints.empty);
    }
  }, [length, selected]);

  const shuffleArray = (array: string[]): string[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generatePassword = (str: string[]) => {
    if (str.length === 0) {
      setPassword("");
      return;
    }

    let chars = [...str];
    if (length > chars.length) {
      const repeatTimes = Math.ceil(length / chars.length) + 2;
      chars = Array(repeatTimes).fill(chars.join("")).join("").split("");
    }

    const shuffled = shuffleArray(chars);
    const shortPass = shuffled.slice(0, length);
    setPassword(shortPass.join(""));
  };

  const copyPassword = async () => {
    if (password.length === 0) {
      setPwHelperText(pwHints.empty);
      return;
    }

    await Clipboard.setStringAsync(password);
    setPwHelperText("Copied to clipboard!");
  };

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

  const setStoredPasswords = async (passwordsArray: StoredPasswordItem[]) => {
    const serialized = JSON.stringify(passwordsArray);

    if (isWeb) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, serialized);
      }
      return;
    }

    await SecureStore.setItemAsync(STORAGE_KEY, serialized);
  };

  const savePassword = async () => {
    try {
      if (!password) {
        alert("Generate a password first");
        return;
      }

      const passwordsArray = await getStoredPasswords();
      const entry: StoredPasswordItem = {
        label,
        password,
      };

      passwordsArray.push(entry);
      await setStoredPasswords(passwordsArray);

      setLabel("");
      alert("Password saved successfully!");
    } catch (e) {
      alert("Failed to save the password");
    }
  };

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      if (selected.length === 1) {
        alert("You must select at least one option");
        return;
      }
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const throttledSetLength = useCallback(
    throttle((newLength: number) => {
      setLength(newLength);
    }, 150),
    []
  );

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height);
  };

  return (
    <YStack
      flex={1}
      bg="$background"
      paddingHorizontal="$6"
      width="100%"
      minHeight={isWeb ? "100vh" : undefined}
      onLayout={handleContainerLayout}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        scrollEnabled={contentHeight > containerHeight && containerHeight > 0}
        onContentSizeChange={(_, height) => setContentHeight(height)}
      >
        <YStack width="100%" maxWidth={720} alignSelf="center" paddingBottom="$6">
          <YStack ai="center" marginBottom="$6" marginTop="$10">
            <RectangleEllipsis color={theme.color.val} size={100} />
            <Text
              fontSize="$8"
              fontWeight="bold"
              color={theme.color.val}
              marginBottom="$2"
            >
              Genratr
            </Text>
            <Text fontSize="$5" color={theme.color.val} textAlign="center">
              A simple and secure strong password generator
            </Text>
          </YStack>

          <YStack marginBottom="$3" alignItems="center">
            <Input
              value={label}
              onChangeText={(l) => setLabel(l)}
              placeholder="add a label (optional)"
              // @ts-expect-error tamagui strict type bypass
              placeholderTextColor={theme.color10.val}
              secureTextEntry={false}
              marginBottom="0px"
              width="100%"
              color={theme.color.val}
            />
          </YStack>

          <YStack marginBottom="$6" alignItems="center">
            <Input
              value={password}
              readOnly
              showSoftInputOnFocus={false}
              secureTextEntry={isPwd}
              placeholder="Your generated password will appear here"
              // @ts-expect-error tamagui strict type bypass
              placeholderTextColor={theme.color10.val}
              marginBottom="$2"
              width="100%"
              color={theme.color.val}
            />
            <Text fontSize="$2" color={theme.color.val} textAlign="center">
              {pwHelperText}
            </Text>
          </YStack>

          <XStack marginBottom="$6" alignSelf="center">
            <Button onPress={copyPassword} marginRight="$2">
              <Copy color={theme.color.val} size="20" />
            </Button>
            <Button onPress={() => setIsPwd(!isPwd)} marginRight="$2">
              {isPwd ? (
                <Eye color={theme.color.val} size="20" />
              ) : (
                <EyeOff color={theme.color.val} size="20" />
              )}
            </Button>
            <Button onPress={() => generatePassword(stringDB)} marginRight="$2">
              <RefreshCw color={theme.color.val} size="20" />
            </Button>
            <Button onPress={savePassword}>
              <SaveIcon color={theme.color.val} size="20" />
            </Button>
          </XStack>

          <YStack>
            <XStack marginBottom="$4">
              <Text fontSize="$4" color={theme.color.val} fontWeight="bold">
                Length: {length}
              </Text>
            </XStack>

            <XStack
              marginBottom="$6"
              width="100%"
              alignItems="center"
              paddingHorizontal="$2"
            >
              <Slider
                width="100%"
                size="$4"
                min={9}
                max={60}
                step={1}
                value={[length]}
                onValueChange={(values: number[]) =>
                  throttledSetLength(values[0])
                }
              >
                <Slider.Track
                  height={6}
                  borderRadius={999}
                  bg={theme.color8.val}
                >
                  <Slider.TrackActive bg={theme.color.val} />
                </Slider.Track>

                <Slider.Thumb
                  index={0}
                  size="$2"
                  circular
                  bg={theme.color.val}
                  borderWidth={2}
                  borderColor={theme.color.val}
                />
              </Slider>
            </XStack>

            <XStack marginBottom="$4">
              <Text fontSize="$4" color={theme.color.val} fontWeight="bold">
                Strength
              </Text>
            </XStack>

            {pwOptions.map((option) => (
              <XStack
                key={option.key}
                marginBottom="$3"
                alignItems="center"
                gap="$3"
              >
                <Switch
                  size="$4"
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => toggleOption(option.value)}
                  alignSelf="center"
                  backgroundColor={theme.color8.val}
                  borderWidth={0}
                  padding={2}
                  justifyContent="center"
                  $platform-web={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Switch.Thumb
                    backgroundColor={theme.color.val}
                  />
                </Switch>

                <Text color={theme.color.val} flex={1} lineHeight={20}>
                  {option.label}
                </Text>
              </XStack>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default GeneratePassword;