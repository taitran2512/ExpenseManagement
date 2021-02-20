import { API_URL } from '../../../config/Config';

export function deleteWalletAPI(id) {
   const url = API_URL + '/wallet/deleteWallet/' + id;
   var requestOptions = {
      method: 'GET',
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
