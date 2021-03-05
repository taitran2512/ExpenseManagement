export const SET_COLOR = 'SET_COLOR';

export const setColorAcion = (color) => {
   return {
      type: SET_COLOR,
      data: color,
   };
};
