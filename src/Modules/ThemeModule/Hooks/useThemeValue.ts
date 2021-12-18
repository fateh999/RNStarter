import {useEffect, useState} from 'react';
import ThemeService from '../Services/ThemeService';
import {VARIANT} from '../Types/CommonTypes';

function useThemeValue() {
  const [theme, setTheme] = useState(ThemeService.theme$.getValue());

  useEffect(() => {
    const subscription = ThemeService.theme$.subscribe(setTheme);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return theme;
}

export default useThemeValue;

export const getThemeValue = () => ThemeService.theme$.getValue();

export const toggleTheme = ThemeService.toggleTheme;

export const getVariantValue = (variant: VARIANT) =>
  ThemeService.theme$.getValue().colors[variant];
