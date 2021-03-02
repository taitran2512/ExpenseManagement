import { API_URL, userData } from '../../../config/Config';

export function getHistoryExpenseAPI() {
   const url = API_URL + '/history/getHistoryExpense/' + userData._id;
   var myHeaders = new Headers();
   myHeaders.append('Authorization', 'Bearer ' + userData.token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err getHistoryExpenseAPI', error);
         return { error: error };
      });
   return response;
}
