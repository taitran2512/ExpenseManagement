import { API_URL, userData } from '../../../config/Config';
export function updateWalletAPI(_id, walletName, walletMoney) {
   const url = API_URL + '/wallet/updateWallet';
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   myHeaders.append('Authorization', 'Bearer ' + userData.token);

   var raw = JSON.stringify({
      _id,
      walletName,
      walletMoney,
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err update wallet', error);
         return { error: error };
      });
   return response;
}
