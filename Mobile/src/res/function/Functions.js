function formatMoney(num = 0) {
   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const convertDate = (date) => {
   if (!emtyValue(date)) {
      const dateShow = date.slice(0, 10).split('-').reverse().join('/');
      return dateShow;
   } else {
      return '';
   }
};

const convertToStringDate = (date) => {
   if (!emtyValue(date)) {
      const dateShow = date.toISOString().slice(0, 10).split('-').reverse().join('/');
      return dateShow;
   }
};

const emtyValue = (value) => {
   if (value === undefined || value === null || value.length === 0 || value === {} || value === '') {
      return true;
   } else {
      return false;
   }
};
const validEmail = (email = '') => {
   const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return valid.test(email);
};

const convertMoney = (_text) => {
   let texts = _text?.toString();

   if (_text !== undefined) {
      let text = _text.toString().split('.').join('');
      // if(text.split('.').length) ;
      let length = text.length;
      let value = '';
      if (length >= 4) {
         for (let i = length - 1; i >= 0; i = i - 3) {
            value =
               `${text[i - 3] === undefined || text[i - 2] === undefined ? '' : '.'}${
                  text[i - 2] === undefined ? '' : text[i - 2]
               }${text[i - 1] === undefined ? '' : text[i - 1]}${text[i] === undefined ? '' : text[i]}` +
               value;
         }
      } else {
         return texts.split('.').join('');
      }
      return value;
   } else {
      return '0';
   }
};
export { formatMoney, convertDate, emtyValue, validEmail, convertToStringDate, convertMoney };
