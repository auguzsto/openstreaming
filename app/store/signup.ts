import type { FormSubmitEvent } from "@nuxt/ui";

enum Status {
    none = "none",
    success = "success",
    error = "error"
}

interface SignUpStore {
    isLoading: boolean,
    status: Status,
    message: string | null
}

export const useSignUpStore = defineStore("signup", {
    state(): SignUpStore {
        return {
            isLoading: false,
            status: Status.none,
            message: null,
        }
    },

    actions: {
        async onSubmit(body: object) {
            this.isLoading = true
            const { status, error } = await useFetch("/api/public/auth/signup", {
                method: "POST",
                body: (body as FormSubmitEvent<object>).data,
                watch: false
            })
        
            if (status.value != "success") {
                this.isLoading = false
                this.status = Status.error
                this.message = error.value?.data.message
                return;
            }
            
            this.status = Status.success
            this.message = "Conta registrada com sucesso."
        }
    }
})