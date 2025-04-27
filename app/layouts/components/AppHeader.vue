<template>
    <div class="border flex justify-end p-2">
        <div class="space-x-4">
            <NuxtLink to="/">
                Início
            </NuxtLink>

            <NuxtLink to="/auth/signin" v-if="!userStore.isAuthenticated()">
                Entrar
            </NuxtLink>

            <NuxtLink to="/auth/signup" v-if="!userStore.isAuthenticated()">
                Registrar
            </NuxtLink>

            <NuxtLink to="/dashboard" v-if="userStore.isAuthenticated()"> 
                Dashboard
            </NuxtLink>

            <NuxtLink to="/auth/signout" v-if="userStore.isAuthenticated()"> 
                Sair 
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/src/users/User';
import { useUserStore } from '~/store/user';
const userStore = useUserStore();
const cookie = useCookie("Authorization")
if (cookie.value != undefined) {
    const { status: statusMe, data } = await useFetch("/api/auth/me", {
        headers: {
            "Authorization": `Bearer ${cookie.value}`
        }
    })

    if (statusMe.value != "success") {
        navigateTo("/auth/signout")
    }

    userStore.setUser(data as unknown as User)
}
</script>