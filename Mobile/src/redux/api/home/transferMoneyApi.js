import { API_URL, userData } from '../../../config/Config';
export function transferMoneyApi(input) {
   var myHeaders = new Headers();
   myHeaders.append('Authorization', 'Bearer ' + userData.token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify(input);

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };
   const url = API_URL + '/wallet/transferMoney';

   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err transferMoneyApi', error);
         return { error: error };
      });
   return response;
}
