<template>
  <v-responsive class="border rounded">
    <v-app>
      <v-app-bar>
        <v-toolbar-title><v-btn variant="plain" to="/">Cat blog with Vuetify</v-btn></v-toolbar-title>
        <v-btn @click="appStore.showDialog('../components/BlogCreate',{fullscreen:mobile, dialogWidth:480})" elevation="10" color="primary">
          <v-icon >mdi-plus</v-icon>
          New blog article
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
  <ComponentDialog :component="component" :props="props" v-model="componentInUse" />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useAppStore } from '@/stores/app'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay() 
  const appStore = useAppStore()
  const {componentInUse} = storeToRefs(appStore)
  const component = computed(() => appStore.getCurrentComponent())
  const props = computed(() => appStore.props)
</script>
