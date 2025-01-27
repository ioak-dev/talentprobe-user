import { httpGet, httpPost } from "@/lib/RestTemplate";

export const checkResponse = (id: any, payload: any, authorization?: any) => {
  return httpPost(`/assessment/${id}/response`, payload, {
    headers: {
      Authorization: authorization?.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};

export const submitAnswer = (
  assessmentId: string,
  responseId: string,
  payload: any,
  authorization?: any
) => {
  return httpPost(
    `/assessment/${assessmentId}/response/${responseId}`,
    payload,
    {
      headers: {
        Authorization: authorization?.access_token,
      },
    }
  )
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};

export const fetchResponse = (assessmentId: string, authorization?: any) => {
  return httpGet(`/assessment/${assessmentId}`, {
    // headers: {
    //   Authorization: authorization?.access_token,
    // },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};
