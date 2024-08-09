import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your API headers
const cryptoNewsHeaders = {
  'x-rapidapi-key': 'b234994e45msh9d30e7e22d7bc7cp1111e8jsnd752f1acf9d8',
    'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com'
};

// Base URL for the API
const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk';

// Function to create request options
const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count }) => {
        // Adjusting to match the provided API endpoint
        return createRequest(`/search?query=cryptocurrency&language=en&pageSize=${count}`);
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
