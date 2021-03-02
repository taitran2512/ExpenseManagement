import { API_URL, userData } from '../../../config/Config';

export function getHistoryAPI() {
   const url = API_URL + '/history/getHistory/' + userData._id;

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
         console.log('err getHistoryAPI', error);
         return { error: error };
      });
   return response;
}
