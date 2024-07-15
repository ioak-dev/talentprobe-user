import { httpGet, httpPost } from "@/lib/RestTemplate";

export const checkResponse = (id: any, authorization?: any) => {
  return httpPost(`/assessment/${id}/response`, null, {
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
