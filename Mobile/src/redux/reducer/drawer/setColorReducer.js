import { colors } from '../../../res/style/theme';
import { SET_COLOR } from '../../action/drawer/setColorAcion';

const setColorReducer = (state = { color: colors.app }, action) => {
   switch (action.type) {
      case SET_COLOR:
         return {
            color: action.data,
         };
      default:
         return state;
   }
};

export default setColorReducer;
