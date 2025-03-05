// src/stores/app.ts
import { defineStore } from 'pinia'
import { AsyncComponentLoader } from 'vue'

const APP_STORE_KEY='app'

export const useAppStore = defineStore(APP_STORE_KEY, {
  state: () => {
    return ({
      componentInUse:false,
      currentComponent: null as AsyncComponentLoader | null,
      props:{},
      cachedModules: {} as {[key: string] : AsyncComponentLoader},
      allModules: null as any,
    })
  },
  actions: {
    async showDialog(type: string, props: any = {}, resolvePromise = false) {
      const path = `../components/${type}.vue`

      if(this.allModules == null)
        this.allModules = import.meta.glob('../components/*.vue')

      if(!this.cachedModules[type])
      {
        const moduleToUse = this.allModules[path]
        this.cachedModules[type] = markRaw(defineAsyncComponent(() => moduleToUse() as any | null) as AsyncComponentLoader)
      }    

      this.currentComponent = this.cachedModules[type] 
      this.componentInUse = true
      this.props = props

      if(resolvePromise)
      {
        props.resolverFunction = null
        const myPromise = new Promise((resolve, reject) => {
          props.resolverFunction = resolve
        })

        const resolvedValue = await myPromise

        //Reset after promise resolving
        this.componentInUse = false
        this.currentComponent = null

        return resolvedValue
      }
    },
    getCurrentComponent() {
      return this.currentComponent
    }
  }
})