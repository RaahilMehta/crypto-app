import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API headers
const cryptoApiHeaders = {
    'x-rapidapi-key': 'b234994e45msh9d30e7e22d7bc7cp1111e8jsnd752f1acf9d8',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

// Helper function to create requests with headers
const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders
});

// Define the cryptoApi service
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getExchanges: builder.query({
            query: (count) => createRequest(`/exchanges`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        })
    })
});

// Export hooks for usage in functional components
export const {
    useGetCryptosQuery,
    useGetExchangesQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;
