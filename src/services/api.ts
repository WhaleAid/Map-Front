import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { auth: { token: string } }).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
            headers.set('content-type', 'application/json')
        }
        return headers
    },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result.error?.status === 401) {
        // Reauth logic here
    }
    return result
}

export const api = createApi({
    tagTypes: ['Me'],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
})

export default api