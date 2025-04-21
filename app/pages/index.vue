<template>
    <div v-if="data?.length == 0" 
        class="h-full flex justify-center items-center">
        Nenhuma transmissão neste momento.
    </div>
    <div class="grid grid-cols-6 gap-2 p-2">
        <div v-for="live in data">
            <NuxtLink :to="live.name">
                <PreviewLive :name="live.name"/>
            </NuxtLink>
        </div>
    </div>
</template>


<script setup lang="ts">
const { data } = await useFetch("/api/public/stream/lives");
</script>