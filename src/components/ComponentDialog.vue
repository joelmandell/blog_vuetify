<template>
  <v-dialog
      v-model="model"    
      :persistent="props?.persistent ?? false"
    >
    <v-card>
        <component v-if="currentComp != null" :is="currentComp" v-bind="{actionHide:()=> model = false, ...props}"></component>
    </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
const model = defineModel<boolean>();
const {component, props} = defineProps(["component","props"]);

const currentComp = computed(() => component);
</script>