import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'com.hadronomy.example',
  encryptionKey: 'ENCRYPTION_KEY'
});
