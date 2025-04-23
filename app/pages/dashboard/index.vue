<template>
    <div class="h-full flex justify-center items-center">
        <div v-if="error">
            {{ error.data.message }}
        </div>
        <div v-if="data">
            
            <div class="w-4xl">
                <b>Chave para transmissão</b>
                <p class="break-all">{{ data?.key }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch("/api/stream/key", {
    headers: {
        "Authorization": `Bearer ${useCookie("Authorization").value}`
    }
})

</script>