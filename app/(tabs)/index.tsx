import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Input,
  Slider,
  Switch,
  Button,
  useTheme,
  ScrollView,
} from "tamagui";
import {
  RectangleEllipsis,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  NotebookPen,
} from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import { throttle } from "lodash";

interface PwOption {
  label: string;
  key: string;
  value: string;
}

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

  useEffect(() => {
    if (isWeb && window.document) {
      window.document.title =
        "Genratr | A simple and secure password generator";
    }
    // Select all options by default
    const allSelected = pwOptions.map((o) => o.value);
    setSelected(allSelected);
    generatePassword(allSelected);
  }, []);

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

  const stringDB: string[] = selected.join("").split("");

  const generatePassword = (str: string[]) => {
    let chars = [...str];
    if (length > chars.length) {
      const repeatTimes = Math.ceil(length / chars.length) + 2;
      chars = Array(repeatTimes).fill(chars.join("")).join("").split("");
    }
    const shuffled = shuffleArray(chars);
    const shortPass = shuffled.slice(0, length);
    setPassword(shortPass.join(""));
  };

  const shuffleArray = (array: string[]): string[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const copyPassword = async () => {
    if (password.length === 0) {
      setPwHelperText(pwHints.empty);
      return;
    }
    await Clipboard.setStringAsync(password);
    setPwHelperText("Copied to clipboard!");
  };

  const savePassword = async () => {
    try {
      const storedPasswords = await AsyncStorage.getItem("savedPasswords");
      let passwordsArray = storedPasswords ? JSON.parse(storedPasswords) : [];
      let entry = { label: label, password: password };
      passwordsArray.push(entry);
      await AsyncStorage.setItem(
        "savedPasswords",
        JSON.stringify(passwordsArray)
      );
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
      {/* Centered Logo */}
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

      <ScrollView>
        {/* Label Field */}
        <YStack marginBottom="$3" alignItems="center">
          <Input
            value={label}
            onChangeText={(l) => setLabel(l)}
            editable={true}
            placeholder="add a label (optional)"
            secureTextEntry={false}
            marginBottom="0px"
            width="100%"
          />
        </YStack>

        {/* Password Field */}
        <YStack marginBottom="$6" alignItems="center">
          <Input
            value={password}
            editable={false}
            showSoftInputOnFocus={false}
            secureTextEntry={isPwd}
            placeholder="Your generated password will appear here"
            marginBottom="$2"
            width="100%"
          />
          <Text fontSize="$2" color={theme.color.val} textAlign="center">
            {pwHelperText}
          </Text>
        </YStack>

        {/* Centered Buttons */}
        <XStack marginBottom="$6" alignSelf="center">
          <Button onPress={() => copyPassword()} marginRight="$2">
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
          <Button onPress={() => savePassword()}>
            <NotebookPen color={theme.color.val} size="20" />
          </Button>
        </XStack>

        {/* Slider and Options */}
        <YStack>
          <XStack marginBottom="$4">
            <Text fontSize="$4" color={theme.color.val} fontWeight="bold">
              Length: {length}
            </Text>
          </XStack>
          <XStack
            marginBottom="$6"
            paddingHorizontal={isWeb ? "10px" : "unset"}
          >
            <Slider
              min={9}
              max={60}
              step={1}
              value={length[0]}
              onValueChange={(values: number[]) =>
                throttledSetLength(values[0])
              }
              style={{ flex: 1, marginHorizontal: 10 }}
            >
              <Slider.Track>
                <Slider.TrackActive />
              </Slider.Track>
              <Slider.Thumb size="$2.5" index={0} circular />
            </Slider>
          </XStack>
          <XStack marginBottom="$4">
            <Text fontSize="$4" color={theme.color.val} fontWeight="bold">
              Strength
            </Text>
          </XStack>
          {pwOptions.map((option) => (
            <XStack key={option.key} marginBottom="$3" ai="center">
              <Switch
                size="$4"
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggleOption(option.value)}
                backgroundColor={
                  selected.includes(option.value)
                    ? theme.background025.val
                    : theme.background025.val
                }
              >
                <Switch.Thumb
                  backgroundColor={
                    selected.includes(option.value)
                      ? theme.color.val
                      : theme.color10.val
                  }
                />
              </Switch>
              <Text marginLeft="$2">{option.label}</Text>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
};
export default GeneratePassword;
