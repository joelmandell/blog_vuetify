// src/stores/app.ts
import { defineStore } from 'pinia'

const APP_STORE_KEY='app';

export const useAppStore = defineStore(APP_STORE_KEY, {
  state: () => {
    return ({
      componentInUse:false,
      currentComponent: null,
      props:{}
    })
  },
  actions: {
    async showDialog(type: string, props: any = {}, resolvePromise = false) {
      this.currentComponent = markRaw(defineAsyncComponent(() => import( /* @vite-ignore */ `${type}.vue`)));
      this.componentInUse = true;
      this.props = props

      if(resolvePromise)
      {
        props.resolverFunction = null;
        const myPromise = new Promise((resolve, reject) => {
          props.resolverFunction = resolve;
        })

        const resolvedValue = await myPromise;

        //Reset after promise resolving
        this.componentInUse = false;
        this.currentComponent = null;

        return resolvedValue;
      }
    },
    getCurrentComponent() {
      return this.currentComponent
    }
  }
})