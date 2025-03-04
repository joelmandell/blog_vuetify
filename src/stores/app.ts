// src/stores/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return ({
      componentInUse:false,
      currentComponent: null,
      props:{}
    })
  },
  actions: {
    async showDialog(type: string, props: any = {}) {
      this.currentComponent = markRaw(defineAsyncComponent(() => import( /* @vite-ignore */ `${type}.vue`)));
      this.componentInUse = true;
      this.props = props
    },
    getCurrentComponent() {
      return this.currentComponent
    }
  }
})