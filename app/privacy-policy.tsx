import { ScrollView, Text, YStack, styled } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled(ScrollView, {
  flex: 1,
  backgroundColor: "$background",
});

export default function PrivacyPolicy() {
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <YStack
          paddingHorizontal="$6"
          paddingVertical="$8"
          gap="$4"
          maxWidth={800}
          alignSelf="center"
          width="100%"
        >
          <Text fontSize="$9" fontWeight="bold" color="$color" mb="$4">
            Genratr Privacy Policy
          </Text>

          <Text fontSize="$4" color="$color">
            Last Updated: March 2026
          </Text>

          <Text fontSize="$5" color="$color" lineHeight={24} mt="$2">
            Your privacy is our utmost priority. Genratr is built from the ground up to respect your data and operates entirely on your device. This Privacy Policy explains exactly how we handle your information and permissions.
          </Text>

          <Text fontSize="$6" fontWeight="bold" color="$color" mt="$4">
            1. Information We Do Not Collect
          </Text>
          <Text fontSize="$5" color="$color" lineHeight={24}>
            Genratr is a local, offline-first application. We do not collect, store, transmit, or share any personal data. There are no tracking analytics, no user accounts, and no servers receiving your passwords. What you create on your device stays entirely on your device.
          </Text>

          <Text fontSize="$6" fontWeight="bold" color="$color" mt="$4">
            2. How We Store Passwords (SecureStore)
          </Text>
          <Text fontSize="$5" color="$color" lineHeight={24}>
            When you choose to securely save a generated password using the Notebook feature, that data is encrypted and saved strictly on your local device. 
            {"\n\n"}
            On iOS and Android, we utilize the native OS-level secure credential storage system. We have no external access mechanisms to retrieve or reset this encrypted data.
          </Text>

          <Text fontSize="$6" fontWeight="bold" color="$color" mt="$4">
            3. Use of Biometric Authentication 
          </Text>
          <Text fontSize="$5" color="$color" lineHeight={24}>
            Genratr utilizes your device's native biometric systems (Face ID on iOS, Fingerprint/Face Unlock on Android) exclusively to lock and unlock your saved local passwords.
            {"\n\n"}
            Your raw biometric data (such as fingerprint maps or face scans) is processed locally within your device’s Secure Enclave. We do not have access to your biometric information. We simply receive a "Success" or "Failure" signal from your operating system telling us if you are authorized to view the Notebook.
          </Text>

          <Text fontSize="$6" fontWeight="bold" color="$color" mt="$4">
            4. Third-Party Services
          </Text>
          <Text fontSize="$5" color="$color" lineHeight={24}>
            Our application does not integrate external advertising networks or invasive third-party analytics trackers. Genratr is 100% ad-free and open source.
          </Text>

          <Text fontSize="$6" fontWeight="bold" color="$color" mt="$4">
            5. Changes to This Privacy Policy
          </Text>
          <Text fontSize="$5" color="$color" lineHeight={24}>
            We may occasionally update our Privacy Policy. Since we do not collect your email address, any material updates will simply be reflected in this document within new app versions.
          </Text>

          <Text fontSize="$6" fontWeight="bold" color="$color" mt="$4">
            6. Contact Us
          </Text>
          <Text fontSize="$5" color="$color" lineHeight={24}>
            If you have any questions or suggestions regarding our Privacy Policy or your data, please contact the developer via the official repository at github.com/yavisht/Genratr or through our official website genratr.com.
          </Text>
        </YStack>
      </SafeAreaView>
    </Container>
  );
}
