import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    // user è già sincronizzato con localStorage come oggetto
    const user = useStorage('user', null, localStorage, {
        serializer: {
            read: (v) => v ? JSON.parse(v) : null,
            write: (v) => JSON.stringify(v)
        }
    })

    const username = computed(() => user.value?.username ?? null)

    function setUser(data) {
        user.value = data
    }

    function clearUser() {
        user.value = null
    }

    return {
        user,
        username,
        setUser,
        clearUser
    }
})
