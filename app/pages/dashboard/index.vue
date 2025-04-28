<template>
    <div class="h-full flex justify-center items-center">
        <div v-if="error">
            {{ error.data.message }}
        </div>
        <div v-if="data">
            <div class="w-4xl">
                <b>Chave para transmissão</b>
                <p class="break-all">{{ data?.key }}</p>

                <hr class="m-2">
                <b>Servidor</b>
                <p class="break-all">rtmp://127.0.0.1:1935/live</p>
                <hr class="m-2">

                <b>Instrução</b>
                <p class="break-all">Em seu aplicativo de transmissão (OBS Studio ou Streamlabs, por exemplo), selecione transmissão personalizada e preencha os dados solicitados como: servidor e chave transmissão.</p>
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