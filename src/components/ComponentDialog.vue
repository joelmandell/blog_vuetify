<template>
  <v-dialog
      v-model="model"    
    >
    <v-card>
        <component v-if="is != null" :key="component" :is="is" v-bind="{actionHide:()=> model = false, ...props}"></component>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="model = false"
          ></v-btn>
        </template>
    </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref, defineProps, defineModel } from 'vue';

const model = defineModel();
const {component, props} = defineProps(["component","props"]);

const currentComp = computed(() => component)
let is = defineAsyncComponent(() => import(`./${currentComp.value}.vue`));

onUpdated(() => {
 is = defineAsyncComponent(() => import(`./${currentComp.value}.vue`))
})

</script>