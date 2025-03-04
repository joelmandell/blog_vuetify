<template>

<v-row>
    <v-col cols="12" md="12" offset-md="0">
        <v-card class="mb-4" elevation="2" v-intersect="{
            handler: onIntersect,
        }">
            <v-img
                class="align-end text-white"
                height="200"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
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
                <v-card-title class="text-h4">{{ article.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-4">
                By {{ article.author }} on {{ formatDate(article.date) }}
            </v-card-subtitle>
            <v-card-text>
                {{ article.text }}
            </v-card-text>
            <v-card-actions class="mt-n2">
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
const isIntersecting = ref<boolean>(false);

async function fetchCatImage() {
    try {
        const apiKey = 'live_jJP9YtrzCCExi84VcEjMhuEIKa8tB0suoAe6t1vgkzbFevLXZojHZJnjaq06xGr8';
        const apiUrl =  '' //'https://api.thecatapi.com/v1/images/search';

        const response = await fetch(apiUrl, {
            headers: {
                'x-api-key': apiKey // Include the API key in the headers if required
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data[0].url;

    } catch (error) {
       // console.error('Error fetching cat image:', error);
    }
    return undefined;
}

const onIntersect = async (intersecting: boolean, entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    //Fetch if interseting and if image is not already set.
    if(intersecting && (image.value == undefined)) image.value = await fetchCatImage();
    isIntersecting.value = entries[0].intersectionRatio >= 0.5
}

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString(); // Format date for display
};
</script>