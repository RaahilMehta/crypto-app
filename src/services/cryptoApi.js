import { createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders={
    'x-rapidapi-key': 'b234994e45msh9d30e7e22d7bc7cp1111e8jsnd752f1acf9d8',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'; 

const createRequest = (url) =>({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getCryptos: builder.query({
            query:(count) => createRequest(`/coins?limit=${count}`),
        })
    })
});


export const{
    useGetCryptosQuery,
} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/exchanges',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       limit: '50',
//       offset: '0',
//       orderBy: '24hVolume',
//       orderDirection: 'desc'
//     },
//     headers: {
//       'x-rapidapi-key': 'b234994e45msh9d30e7e22d7bc7cp1111e8jsnd752f1acf9d8',
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
//     }
//   };