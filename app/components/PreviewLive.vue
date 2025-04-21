<template>
    <div>
        <img :src="getSource()" width="348px" height="196px">
    </div>
    <div>
        {{ props.name }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    name: String,
})

function getSource(): string {
    return `/uploads/${props.name}_preview.jpg`
}
</script>