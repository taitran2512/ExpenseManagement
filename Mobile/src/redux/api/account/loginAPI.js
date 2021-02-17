import { API_URL } from '../../../config/Config';

export function loginAPI(username, password) {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({ username: username, password: password });
   const url = API_URL + '/user/login';
   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         return { error: error };
      });
}
