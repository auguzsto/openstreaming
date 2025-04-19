<template>
    <h1>{{ username.toLocaleUpperCase() }}</h1>
    <div v-if="error">
        {{ username }} não está ao vivo neste momento.
    </div>

    <div v-if="data">
        <VideoPlayer :name="username" />
    </div>
    
</template>

<script setup lang="ts">
const route = useRoute();
const username = route.params.username as string;

const { data, error } = await useFetch(`/api/public/stream/${username}`)
</script>