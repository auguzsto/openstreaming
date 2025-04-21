<script setup lang="ts">
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

useHead({
    title: "Open Streaming"
})

</script>

<template>
    <div class="h-screen">
        <AppHeader />
        <slot />
        <AppFooter />
    </div>
</template>