<template>
  <v-dialog
      v-model="model"    
    >
    <v-card>
        <component v-if="is != null" :key="component" :is="is" v-bind="{actionHide:()=> model = false, ...props}"></component>
    </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

const model = defineModel<boolean>();
const {component, props} = defineProps(["component","props"]);

const currentComp = computed(() => component)
let is = defineAsyncComponent(() => import(`./${currentComp.value}.vue`));

onUpdated(() => {
 const definedComponent = defineAsyncComponent(() => import(`./${currentComp.value}.vue`))
 if(is != definedComponent)
  is = definedComponent;
})

</script>