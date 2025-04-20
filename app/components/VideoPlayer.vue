<template>
    <video ref="video" width="100%" height="640" controls></video>
</template>

<script setup lang="ts">
import { PlayerAdapter } from '~/src/player/PlayerAdapter';


const props = defineProps({
    name: String
})

let video = ref<HTMLMediaElement>();
onMounted(async () => {
    const player = PlayerAdapter.builder()
    const videoElement = video.value as HTMLMediaElement;
    const source = `/live/hls/${props.name}/index.m3u8`
    await player.play(videoElement, source);
})
</script>