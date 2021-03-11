import { userData, API_URL } from '../../../config/Config';
export function getTotalByTypeApi() {
   var myHeaders = new Headers();
   myHeaders.append('Authorization', 'Bearer ' + userData.token);
   const url = API_URL + '/filter/getTotalMoneyByType/' + userData._id;
   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   const response = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => {
         console.log('err getTotalByTypeApi', error);
         return { error: error };
      });
   return response;
}
