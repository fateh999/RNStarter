import {useEffect, useCallback, useState, useRef} from 'react';
import {ControllerRenderProps} from 'react-hook-form';
import {
  Country,
  FlagType,
  getAllCountries,
} from 'react-native-country-picker-modal';
import {getCountryCallingCodeAsync} from 'react-native-country-picker-modal/lib/CountryService';
import {getLocales} from 'react-native-localize';

function useCountryCode(field: ControllerRenderProps<any>) {
  const [countryCode, setCountryCode] = useState<any>('');
  const [initialCallingCode] = useState(field.value);
  const onChangeRef = useRef(field.onChange);

  useEffect(() => {
    (async () => {
      if (initialCallingCode === '') {
        const [{countryCode: _countryCode}]: any = getLocales();
        setCountryCode(_countryCode);
        const callingCode = await getCountryCallingCodeAsync(_countryCode);
        onChangeRef.current('+' + callingCode);
      } else {
        const callingCode = initialCallingCode.replace('+', '');
        const countries = await getAllCountries(FlagType.FLAT);
        const country: Country | undefined = countries.find(
          _country => _country.callingCode.indexOf(callingCode) !== -1,
        );
        if (country) {
          setCountryCode(country.cca2);
        }
      }
    })();
  }, [initialCallingCode]);

  const onSelect = useCallback(
    ({callingCode, cca2}: Country) => {
      const [callCode] = callingCode;
      setCountryCode(cca2);
      field.onChange('+' + callCode);
    },
    [field],
  );

  return {countryCode, onSelect};
}

export default useCountryCode;
