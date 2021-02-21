import { API_URL, userData } from '../../../config/Config';
export function createWalletAPI(walletName, walletMoney) {
   var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
   myHeaders.append('Authorization', 'Bearer ' + userData.token);
	
   const url = API_URL + '/wallet/create';

   var raw = JSON.stringify({
      userId: userData._id,
      walletName: walletName,
      walletMoney: walletMoney,
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
         console.log('err create wallet', error);
         return { error: error };
      });
   return response;
}
