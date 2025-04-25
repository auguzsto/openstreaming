<template>
    <div class="border flex justify-end p-2">
        <div class="space-x-4">
            <NuxtLink to="/">
                Início
            </NuxtLink>

            <NuxtLink to="/auth/signin" v-if="!useUserStore.isAuthenticated()">
                Entrar
            </NuxtLink>

            <NuxtLink to="/auth/signup" v-if="!useUserStore.isAuthenticated()">
                Registrar
            </NuxtLink>

            <NuxtLink to="/dashboard" v-if="useUserStore.isAuthenticated()"> 
                Dashboard 
            </NuxtLink>

            <NuxtLink to="/auth/signout" v-if="useUserStore.isAuthenticated()"> 
                Sair 
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUseStore } from '~/store/user';

const useUserStore = useUseStore();

</script>