<script setup>

const props = defineProps(['name',
    'selectedContainerType',
    'mirrorMode',
    'data',
    'rel'])

const isMirrored = ref(false)

function toggleMirror() {
    isMirrored.value = !isMirrored.value
}



</script>
<template>
    <bay-on-deck mirrorMode />
</template>

