<template>
  <v-dialog
      v-model="model"    
      :persistent="props?.persistent ?? false"
      :max-width="props?.dialogWidth ?? null"
      :fullscreen="props?.fullscreen ?? false"
    >
    <v-card>
        <component v-if="currentComponent != null" :is="currentComponent" v-bind="{actionHide:()=> model = false, ...props}"></component>
    </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
const model = defineModel<boolean>()
const {component, props} = defineProps(["component","props"])

const currentComponent = computed(() => component)
</script>