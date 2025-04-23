<script setup lang="ts">
const cookie = useCookie("Authorization")
cookie.value = null
navigateTo("/", {
    external: true
});
</script>