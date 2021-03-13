import { SHOW_ALERT_ACTION } from '../../action/alert/showAlertAction';
const initState = {
   form: null,
   message: null,
};
const showAlertReducer = (state = initState, action) => {
   switch (action.type) {
      case SHOW_ALERT_ACTION:
         return {
            form: action.form,
            message: action.message,
         };
      default:
         return state;
   }
};

export default showAlertReducer;
