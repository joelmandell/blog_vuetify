/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { BlogServiceKey } from "@/symbols";
import { BlogLocalStorageService } from '@/services/BlogLocalStorageService';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.provide("hello", new BlogLocalStorageService());

registerPlugins(app)

app.mount('#app')

