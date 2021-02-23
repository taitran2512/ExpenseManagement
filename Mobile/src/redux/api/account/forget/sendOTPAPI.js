import { API_URL } from '../../../../config/Config';

export function sendOTPAPI(email) {
   const url = API_URL + '/user/forget';
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({ email: email });

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
         console.log('err sendOTPAPI', error);
         return { error: error };
      });
   return response;
}
