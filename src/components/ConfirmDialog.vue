<template>
    <v-card>
        <v-card-actions>
            <v-btn @click="confirm(true)" color="primary">YES</v-btn>
            <v-btn @click="confirm(false)" color="secondary">NO</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
const attrs = useAttrs()
let {resolverFunction} = attrs;

const confirm = (value: boolean) => {
    if(resolverFunction instanceof Function)
        resolverFunction(value);
}
</script>