import type { User } from "~/src/users/User";

interface UserTypeStore {
    user: User | null;
}

export const useUseStore = defineStore("user", {
    state: (): UserTypeStore => {
        return {
            user: null
        }
    },
    actions: {
        setUser(data: User) {
            this.user = data
        },
        
        isAuthenticated() {
            if (this.user == null) {
                return false;
            }

            return true;
        }
    }
});