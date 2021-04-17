import I18n from 'i18n-js';
import vi from '../res/languages/vi';
import en from '../res/languages/en';

I18n.defaultLocale = 'vi';
//I18n.locale = 'en';
I18n.fallbacks = true;
I18n.translations = { vi, en };

export default I18n;