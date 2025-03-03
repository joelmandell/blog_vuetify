// src/stores/app.ts
import { defineStore } from 'pinia'

// const router = useRouter();

// router.beforeEach((to) => {
//   console.log("HELLO ROUTE FROM APP STORE")
// })
export const useAppStore = defineStore('app', {
  state: () => {
    return ({
      componentInUse:false,
      currentComponent: "",
      props:{}
    })
  },
  actions: {
    showDialog(type: string, props: any = {}) {
      this.currentComponent = type;
      this.componentInUse = true;
      this.props = props
    },
    getCurrentComponent() {
      return this.currentComponent
    }
  }
})