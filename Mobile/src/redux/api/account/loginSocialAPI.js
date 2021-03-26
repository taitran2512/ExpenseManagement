import { API_URL } from '../../../config/Config';

export function loginSocialAPI(data) {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');
   const url = API_URL + '/user/loginSocial';
   var raw = JSON.stringify({
      _id: data._id,
      fullname: data.fullname,
      email: data.email,
      socialType: data.socialType,
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
         console.log('err loginSocialAPI', error);
         return { error: error };
      });
   return response;
}
