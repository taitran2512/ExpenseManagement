export const SET_COLOR = 'SET_COLOR';

export const setColorAction = (color) => {
   return {
      type: SET_COLOR,
      data: color,
   };
};
