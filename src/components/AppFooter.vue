<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>
    <v-spacer/>
    <div
      class="text-caption text-disabled"
    >
      &copy; 2025 {{ `${(new Date()).getFullYear() !== 2025 ? (" - " + (new Date()).getFullYear()) : ""}` }} <span class="d-none d-sm-inline-block">Joel Mandell</span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  const items = [
    {
      title: 'JOEL MANDELL Github',
      icon: `mdi-github`,
      href: 'https://github.com/joelmandell/',
    },
    ]
</script>