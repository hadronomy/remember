import { StyleSheet } from 'react-native';
import { Button, YStack } from 'tamagui';

import { SafeAreaView } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <SafeAreaView backgroundColor="$background" style={styles.container}>
      <YStack>
        <Button>I'm just a button</Button>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
