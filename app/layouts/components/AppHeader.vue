<template>
    <div class="border flex justify-end p-2">
        <div v-for="item in items">
            <div class="mr-4">
                <NuxtLink :to="item.url"> {{ item.title }} </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Menu {
    title: string,
    url: string
}

const items: Array<Menu> = [
    { title: "Início", url: "/" },
    { title: "Entrar", url: "/auth/signin" },
    { title: "Registar", url: "/auth/signup" },
];
</script>