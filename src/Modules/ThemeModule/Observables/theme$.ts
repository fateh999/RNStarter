import {Appearance} from 'react-native';
import {BehaviorSubject} from 'rxjs';
import {NightTheme, DayTheme} from '../Config/Theme';
import {THEME_TYPE} from '../Types/CommonTypes';

const initialColorScheme = Appearance.getColorScheme();
const theme$ = new BehaviorSubject<THEME_TYPE>(
  initialColorScheme === 'dark' ? NightTheme : DayTheme,
);

export default theme$;

Appearance.addChangeListener(({colorScheme}) => {
  if (colorScheme === 'dark') {
    theme$.next(NightTheme);
  } else {
    theme$.next(DayTheme);
  }
});
