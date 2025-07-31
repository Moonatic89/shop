import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'

export const useBlog = defineStore('blog', () => {


    const randomImage = (id) => `https://picsum.photos/seed/${id}/400/300`
    const posts = ref(
        Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            titolo: `Post ${i + 1}`,
            testo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            immagine: randomImage(i)
        }))
    )



    return {
        posts,
    }
})