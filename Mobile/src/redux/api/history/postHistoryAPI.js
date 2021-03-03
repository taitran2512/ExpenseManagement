import { API_URL, userData } from '../../../config/Config';

export function postHistoryAPI(input) {
   const url = API_URL + '/history/create';
   var myHeaders = new Headers();
   myHeaders.append('Authorization', 'Bearer ' + userData.token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      userId: userData._id,
      walletId: input.walletId,
      type: input.type,
      code: input.code,
      money: input.money,
      note: input.note,
      date: input.date,
      time: input.time,
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
         console.log('err postHistoryAPi', error);
         return { error: error };
      });
   return response;
}
