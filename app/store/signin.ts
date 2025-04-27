import type { FormSubmitEvent } from "@nuxt/ui";

interface SignInInterfaceStore {
    isLoading: boolean,
    error: boolean,
    message: string | null
}

export const useSignInStore = defineStore("signin", {
    state: (): SignInInterfaceStore => {
        return {
            isLoading: false,
            error: false,
            message: null,
        }
    },

    actions: {
        async onSubmit(body: object) {
            console.log(body)
            this.isLoading = true;
            const { error, status, data } = await useFetch("/api/public/auth/signin", {
                method: "POST",
                body: (body as FormSubmitEvent<object>).data,
                watch: false
            })

            if (error) {
                this.error = true,
                this.message = error.value?.data.message
            }

            this.isLoading = false;
        }
    }
})