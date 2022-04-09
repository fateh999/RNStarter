import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {enableFreeze} from 'react-native-screens';

enableFreeze(true);
MaterialCommunityIcons.loadFont();
AppRegistry.registerComponent(appName, () => App);
