import api from "./api";

export const ai = api.injectEndpoints({
    endpoints: (builder) => ({
        inquireAi: builder.mutation<any, { request: string }>({
            query: (data) => ({
                url: 'ai/inquire',
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useInquireAiMutation,
} = ai;