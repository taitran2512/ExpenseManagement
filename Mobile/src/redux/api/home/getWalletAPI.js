import { API_URL, userData } from '../../../config/Config';
export function getWalletAPI() {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   const url = API_URL + '/wallet/getWallet/' + userData._id;
   var requestOptions = {
      method: 'GET',
      redirect: 'follow',
   };
   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err getWallet', error);
         return { error: error };
      });
   return response;
}
