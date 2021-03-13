export const SHOW_ALERT_ACTION = 'SHOW_ALERT_ACTION';

export const showAlertAction = (form, message) => {
   return {
      type: SHOW_ALERT_ACTION,
      form,
      message,
   };
};
