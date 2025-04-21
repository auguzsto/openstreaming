<template>
    <div v-if="data?.length == 0" 
        class="h-full flex justify-center items-center">
        Nenhuma transmissão neste momento.
    </div>
    <div v-for="live in data">
        <NuxtLink :to="live.name">
            <PreviewLive :name="live.name"/>
            {{ live.name }}
        </NuxtLink>
    </div>
</template>


<script setup lang="ts">
const { data } = await useFetch("/api/public/stream/lives");
</script>