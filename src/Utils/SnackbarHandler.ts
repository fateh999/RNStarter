import {Keyboard} from 'react-native';
import Snackbar, {SnackBarOptions} from 'react-native-snackbar';
import {getThemeValue} from 'src/Modules/ThemeModule/Hooks/useThemeValue';
class SnackbarHandler {
  private getCurrentTheme = () => {
    return getThemeValue();
  };

  private closeKeyboard = () => {
    Keyboard.dismiss();
  };

  errorToast = (text: string, options?: SnackBarOptions) => {
    if (!text) {
      return;
    }
    this.closeKeyboard();
    const theme = this.getCurrentTheme();
    Snackbar.show({
      backgroundColor: theme.colors.error,
      duration: 5000,
      ...options,
      text,
    });
  };

  successToast = (text: string, options?: SnackBarOptions) => {
    if (!text) {
      return;
    }
    this.closeKeyboard();
    const theme = this.getCurrentTheme();
    Snackbar.show({
      backgroundColor: theme.colors.success,
      duration: 5000,
      ...options,
      text,
    });
  };

  normalToast = (text: string, options?: SnackBarOptions) => {
    if (!text) {
      return;
    }
    this.closeKeyboard();
    const theme = this.getCurrentTheme();
    Snackbar.show({
      backgroundColor: theme.colors.onSurface,
      duration: 5000,
      ...options,
      text,
    });
  };
}

export default new SnackbarHandler();
