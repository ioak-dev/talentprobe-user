import { httpGet, httpPost } from "@/lib/RestTemplate";

export const validateResponseId = (
  id: string,
  responseId: string,
  authorization?: any
) => {
  return httpGet(`/assessment/${id}/response/${responseId}`, {
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
