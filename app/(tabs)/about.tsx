import { Anchor, YStack, Text, styled, isWeb, Avatar } from "tamagui";

const Container = styled(YStack, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: "$4",
  backgroundColor: "$background",
});

export default function ModalScreen() {
  return (
    <Container>
      <YStack gap="$10" alignItems="center">
        {/* Source Code Link */}
        <YStack gap="$2" alignItems="center">
          <Text fontSize="$4" color="$colorText" fontWeight="bold">
            Genratr will always be 100% Ad-Free and Open Source
          </Text>
          <Anchor
            color="$color"
            href="https://github.com/yavisht/Genratr"
            target="_blank"
            rel="noopener noreferrer"
            fontSize="$4"
          >
            Give us a ⭐️
          </Anchor>
        </YStack>

        {/* Creator Information */}
        <YStack gap="$2" alignItems="center">
          <Text fontSize="$4" color="$colorText" fontWeight="bold" mb="$2">
            Made by
          </Text>
          <Anchor
            color="$color"
            href="https://yav.ai"
            target="_blank"
            rel="noopener noreferrer"
            fontSize="$6"
            fontWeight="bold"
          >
            <Avatar
              circular
              size="$10"
              mb="$3"
              borderStyle="solid"
              borderColor="$purple1"
            >
              <Avatar.Image
                accessibilityLabel="yav.ai logo"
                source={require("./../../assets/images/yavai.jpg")}
              />
              <Avatar.Fallback backgroundColor="$background" />
            </Avatar>
          </Anchor>
        </YStack>

        {/* Web Version Link */}
        <YStack gap="$2" alignItems="center">
          <Text fontSize="$4" color="$colorText" fontWeight="bold">
            {isWeb
              ? "Genratr Android App - Coming Soon"
              : "Looking for the web version?"}
          </Text>
          {!isWeb ? (
            <Anchor
              color="$color"
              href="https://genratr.com"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="$4"
            >
              Genratr.com
            </Anchor>
          ) : (
            <></>
          )}
        </YStack>
      </YStack>
    </Container>
  );
}
