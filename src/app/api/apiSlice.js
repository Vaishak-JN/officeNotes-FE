import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3500',
    baseUrl: 'https://officenotes-be.onrender.com',
    credentials: 'include', //send cookies
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            console.log(token)
            headers.set("authorization", `Bearer ${token}`) //set bearer token
        }
        return headers
    }
})

//refreshing acess
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                //alter the error message
                refreshResult.error.data.message = "Your login has expired. "
            }
            return refreshResult
        }
    }

    console.log("result", result)
    return result
}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})