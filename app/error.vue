<template>
    <div class="h-screen flex justify-center items-center">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
const error = useError();
let message = "Ops, ocorreu algum problema."
if (error.value?.statusCode == 403) {
    message = "Acesso negado."
}

if (error.value?.statusCode == 404) {
    message = "Página não encontrada."
}

useHead({
    title: `Open Streaming - ${message}`
});
</script>