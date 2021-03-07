import { API_URL, userData } from '../../../../config/Config';

export function changePasswordApi(oldPassword, newPassword) {
   var myHeaders = new Headers();
   myHeaders.append('Authorization', 'Bearer ' + userData.token);
   myHeaders.append('Content-Type', 'application/json');
   const url = API_URL + '/user/changePassword';
   const data = {
      _id: userData._id,
      oldPassword: oldPassword,
      newPassword: newPassword,
   };

   var raw = JSON.stringify(data);

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
}
