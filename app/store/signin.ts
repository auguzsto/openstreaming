import type { FormSubmitEvent } from "@nuxt/ui";
import { useUserStore } from "./user";
import type { User } from "~/src/users/User";

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
            const userStore = useUserStore()
            this.isLoading = true;
            const { status: statusSingIn, error: errorSignIn } = await useFetch("/api/public/auth/signin", {
                method: "POST",
                body: (body as FormSubmitEvent<object>).data,
                watch: false
            })

            if (statusSingIn.value != "success") {
                this.error = true,
                this.message = errorSignIn.value?.data.message
                this.isLoading = false;
                return;
            }

            const { status: statusMe, error: errorMe, data } = await useFetch("/api/auth/me", {
                headers: {
                    "Authorization": `Bearer ${useCookie("Authorization").value}`
                }
            })

            if (statusMe.value != "success") {
                this.error = true,
                this.message = errorMe.value?.data.message
                this.isLoading = false;
                return;
            }

            userStore.setUser(data.value as unknown as User);
            navigateTo("/dashboard", {
                external: true
            });
        }
    }
})