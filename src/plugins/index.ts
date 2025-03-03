/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import {markRaw} from 'vue'

// Types
import type { App } from 'vue'

pinia.use(({store}) => {
  store.router = markRaw(router);
})

export function registerPlugins (app: App) {
  app
    .use(pinia)
    .use(vuetify)
    .use(router)

}
