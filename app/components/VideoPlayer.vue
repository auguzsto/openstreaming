<template>
    <video ref="video" width="100%" height="640" controls></video>
</template>

<script setup lang="ts">
import Hls, { type MediaAttachingData } from 'hls.js';

const props = defineProps({
    name: String
})

let video = ref<HTMLMediaElement | MediaAttachingData>();
onMounted(() => {
    console.log(video.value);
    let hls = new Hls();
    const stream: string = `/live/hls/${props.name}/index.m3u8`
    hls.loadSource(stream);
    hls.attachMedia(video.value as HTMLMediaElement | MediaAttachingData);
    (video.value as HTMLMediaElement)?.play();
})
</script>