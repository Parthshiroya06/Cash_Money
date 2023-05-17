import LocalizedStrings from 'react-native-localization';
import {english} from './english';

const labels = new LocalizedStrings({en: english});

export const changeLanguage = (params = 'en') => labels.setLanguage(params);

export const localize = (name, params) => {
  if (labels.hasOwnProperty(name)) {
    if (params !== undefined && typeof params === 'function') {
      return labels[name](params);
    } else {
      return labels[name];
    }
  } else {
    return `${name} label is missing`;
  }
};
