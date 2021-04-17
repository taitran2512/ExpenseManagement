import I18n from '../../../config/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguageAction = (lang) => {
    AsyncStorage.setItem('@appLanguage', lang);
    I18n.locale = lang;
    return {
        type: SET_LANGUAGE,
        data: lang,
    };
};
