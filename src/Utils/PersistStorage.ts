import {BehaviorSubject} from 'rxjs';
import FastStorage from './FastStorage';
import RNBootSplash from 'react-native-bootsplash';

class PersistStorage {
  keyName;
  observer;

  constructor(keyName: string, observer: BehaviorSubject<any>) {
    this.keyName = keyName;
    this.observer = observer;

    if (keyName === 'authState') {
      RNBootSplash.hide({fade: true});
    }
  }

  init = async () => {
    const lastDataString = await FastStorage.getItem(this.keyName);

    if (lastDataString) {
      this.observer.next(JSON.parse(lastDataString));
    }

    this.observer.subscribe(next =>
      FastStorage.setItem(this.keyName, JSON.stringify(next)),
    );
  };
}

export default PersistStorage;
