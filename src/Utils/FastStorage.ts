import {MMKVLoader} from 'react-native-mmkv-storage';

class FastStorage {
  MMKV;

  constructor() {
    this.MMKV = new MMKVLoader().initialize();
  }

  getItem = (key: string) => this.MMKV.getItem(key) as Promise<string>;

  setItem = async (key: string, value: string) => {
    this.MMKV.setItem(key, value);
  };

  removeItem = async (key: string) => {
    this.MMKV.removeItem(key);
  };

  clear = () => this.MMKV.clearStore();
}

export default new FastStorage();
