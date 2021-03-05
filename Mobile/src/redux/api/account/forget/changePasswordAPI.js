import { API_URL } from '../../../../config/Config';

export function changePasswordApi(_id, oldPassword, newPassword) {
   var myHeaders = new Headers();
   myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQxYmEwMTRhMTk5ODAwMTUxMjY5MzciLCJ1c2VybmFtZSI6ImFkbWluMTIzNCIsImVtYWlsIjoiaHAwOTA2MTk5OUBnbWFpbC5jb20iLCJpYXQiOjE2MTQ5MzQ1MzUsImV4cCI6MTYxNTAyMDkzNX0.nuRBlbB6zYIZdYfESQQfzYL21Qv6dT8NCzlOpXoeGSU',
   );
   myHeaders.append('Content-Type', 'application/json');
   const url = API_URL + '/user/changePassword';
   const data = {
      _id: _id,
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
