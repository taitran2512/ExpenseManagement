import { language } from '../../../res/style/theme';
import { SET_LANGUAGE } from '../../action/drawer/setLanguageAction';

const setColorReducer = (state = { lang: language.app }, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                lang: action.data,
            };
        default:
            return state;
    }
};

export default setColorReducer;