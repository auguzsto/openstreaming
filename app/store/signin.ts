import type { FormSubmitEvent } from "@nuxt/ui";
import { useUserStore } from "./user";
import type { User } from "~/src/users/User";

enum Status {
    none = "none",
    success = "success",
    error = "error"
}

interface SignInStore {
    isLoading: boolean,
    status: Status,
    message: string | null
}

export const useSignInStore = defineStore("signin", {
    state: (): SignInStore => {
        return {
            isLoading: false,
            status: Status.none,
            message: null,
        }
    },

    actions: {
        async onSubmit(body: object) {
            const userStore = useUserStore()
            this.isLoading = true;
            const { status: statusSingIn, error: errorSignIn } = await useFetch("/api/public/auth/signin", {
                method: "POST",
                body: (body as FormSubmitEvent<object>).data,
                watch: false
            })

            if (statusSingIn.value != "success") {
                this.isLoading = false;
                this.status = Status.error;
                this.message = errorSignIn.value?.data.message;
                return;
            }
            
            const { status: statusMe, error: errorMe, data } = await useFetch("/api/auth/me", {
                headers: {
                    "Authorization": `Bearer ${useCookie("Authorization").value}`
                }
            })

            if (statusMe.value != "success") {
                this.isLoading = false;
                this.status = Status.error;
                this.message = errorMe.value?.data.message;
                return;
            }

            userStore.setUser(data.value as unknown as User);
            this.status = Status.success;
        }
    }
})