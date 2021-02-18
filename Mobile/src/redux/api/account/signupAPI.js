import { API_URL } from '../../../config/Config';
export function signupAPI(input) {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   const url = API_URL + '/user/signup';
   var raw = JSON.stringify({
      username: input.username,
      password: input.password,
      fullname: input.fullname,
      dob: input.dob,
      email: input.email,
      phone: input.phone,
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
         return { error: error };
      });
   // console.log(response);

   return response;
}
