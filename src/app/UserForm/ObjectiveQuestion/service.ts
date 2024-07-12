import { httpGet, httpPost } from "@/lib/RestTemplate";


export const checkResponse = (id:any, authorization?: any) => {
  return httpPost(`/assessment/${id}/response`,null, {
    headers: {
      Authorization: authorization?.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};


export const submitAnswer = (payload: any,id:any,responseId:any, authorization?: any) => {
    return httpPost(`/assessment/${id}/response/${responseId}`, payload, {
      headers: {
        Authorization: authorization?.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
        return Promise.resolve({});
      })
      .catch((error) => {
        return Promise.resolve({});
      });
  };
