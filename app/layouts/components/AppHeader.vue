<template>
    <div class="border flex justify-end p-2">
        <div class="space-x-4 text-sm">
            <NuxtLink to="/">
                Início
            </NuxtLink>

            <NuxtLink to="/auth/signin" v-if="!userStore.isAuthenticated()">
                Entrar
            </NuxtLink>

            <NuxtLink to="/auth/signup" v-if="!userStore.isAuthenticated()">
                Registrar
            </NuxtLink>
            <UDropdownMenu
                v-if="userStore.isAuthenticated()"
                :items="items"
                :ui="{
                    content: 'w-48'
                }"
            >
                <UButton color="neutral" variant="ghost" :avatar="avatarProps"/>
            </UDropdownMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import type { User } from '~/src/users/User';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
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

const items = ref<DropdownMenuItem[][]>([
    [
        {
            label: `${user.value?.username}`,
            avatar: {
                alt: `${user.value?.username}`
            },
            type: 'label'
        }
    ],
    [
        {
            label: 'Chave de transmissão',
            icon: 'i-lucide-tv',
            onSelect(e) {
                navigateTo("/dashboard")
            },
        },
    ],
    [
        {
            label: 'Sair',
            icon: 'i-lucide-log-out',
            kbds: ['shift', 'meta', 'q'],
            onSelect(e) {
                navigateTo("/auth/signout")
            },
        }
    ]
])

const avatarProps = {
    alt: user.value?.username.toUpperCase()
}
</script>