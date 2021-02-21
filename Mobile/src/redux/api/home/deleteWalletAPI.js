import { API_URL, userData } from '../../../config/Config';

export function deleteWalletAPI(id) {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   myHeaders.append('Authorization', 'Bearer ' + userData.token);

   const url = API_URL + '/wallet/deleteWallet/' + id;
   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err deletewallet', error);
         return { error: error };
      });
   return response;
}
