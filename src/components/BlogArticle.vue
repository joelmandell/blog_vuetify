<template>

<v-row>
    <v-col cols="12" md="12" offset-md="0">
        <v-card class="mb-4" elevation="2">
            <v-img
            class="align-end text-white"
            height="200"
            :src="image"
            cover
            >
                <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                    ></v-progress-circular>
                    </div>
                </template>
                <v-card-title>{{ article.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
            By {{ article.author }} on {{ formatDate(article.date) }}
            </v-card-subtitle>
            <v-card-text>
            {{ article.content }}
            </v-card-text>
            <v-card-actions>
                <slot name="actions">

                </slot>
            </v-card-actions>
        </v-card>
    </v-col>
</v-row>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const {article} = defineProps(["article"])
const image = ref<string|undefined>(undefined);

async function fetchCatImage() {
    try {
        // Replace with your API key if needed
        const apiKey = 'live_jJP9YtrzCCExi84VcEjMhuEIKa8tB0suoAe6t1vgkzbFevLXZojHZJnjaq06xGr8';
        const apiUrl = 'https://api.thecatapi.com/v1/images/search';

        // Fetch data from the Cat API
        const response = await fetch(apiUrl, {
            headers: {
                'x-api-key': apiKey // Include the API key in the headers if required
            }
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Get the image URL from the response
        return data[0].url;

    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
    return undefined;
}

onMounted(async() => {
    image.value = await fetchCatImage();
})

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString(); // Format date for display
};
</script>