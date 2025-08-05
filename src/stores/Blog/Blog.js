import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../../supabase";
import { ref as dbRef, push, set, get, child } from "firebase/database";
import db from "../../services/firebase"; // usa direttamente db già configurato

export const useBlog = defineStore("blog", () => {
    // --- Stato iniziale invariato ---

    const posts = ref([]);

    const fetchPosts = async () => {
        try {
            console.log("[fetchPosts] Caricamento post da Firebase...");

            const snapshot = await get(child(dbRef(db), "posts"));
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Converte oggetto {key: post} in array di post
                const loadedPosts = Object.values(data).reverse(); // reverse per ordine cronologico inverso
                posts.value = loadedPosts;
                console.log("[fetchPosts] Post caricati:", loadedPosts);
            } else {
                posts.value = [];
                console.log("[fetchPosts] Nessun post trovato.");
            }
        } catch (err) {
            console.error("[fetchPosts] Errore durante la lettura dei post:", err);
            throw err;
        }
    };

    const selectedCategory = ref(null);

    const setCategory = (newCategory) => {
        selectedCategory.value = newCategory;
    };

    const categories = computed(() => [...new Set(posts.value.map((p) => p.category))]);

    const filteredPosts = computed(() => {
        if (!selectedCategory.value) return posts.value;
        return posts.value.filter((p) => p.category === selectedCategory.value);
    });

    // --- Funzione per aggiungere post ---
    const addPost = async ({ title, category, body, imageFile }) => {
        try {
            console.log("[addPost] Inizio procedura per creare un nuovo post...");

            // 1. Randomizza nome file
            const ext = imageFile.name.split('.').pop();
            const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
            console.log(`[addPost] Nome randomizzato per file: ${randomName}`);

            // 2. Upload su Supabase
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('posts') // nome bucket
                .upload(randomName, imageFile);

            console.log("[addPost] Risultato upload Supabase:", { uploadData, uploadError });

            if (uploadError) {
                console.error("[addPost] Errore durante upload su Supabase:", uploadError.message);
                throw uploadError;
            }

            // 3. Ottieni URL pubblico
            const { data: publicUrl } = supabase.storage
                .from('posts')
                .getPublicUrl(randomName);

            console.log("[addPost] URL pubblico generato da Supabase:", publicUrl);

            // 4. Crea oggetto post
            const newPost = {
                title,
                category,
                text: body,
                img: publicUrl.publicUrl,
                created_at: Date.now() // epoch
            };

            console.log("[addPost] Oggetto post pronto per Firebase:", newPost);

            // 5. Salva su Firebase Realtime Database
            console.log("[addPost] Salvataggio su Firebase Realtime Database...");
            const postsRef = dbRef(db, "posts");
            const newPostRef = push(postsRef);
            await set(newPostRef, newPost);
            console.log("[addPost] Post salvato correttamente su Firebase con chiave:", newPostRef.key);

            // 6. Aggiorna localmente
            posts.value.unshift(newPost);
            console.log("[addPost] Post aggiunto localmente alla lista posts.");

        } catch (err) {
            console.error("[addPost] Errore generale nella funzione addPost:", err);
            throw err;
        }
    };

    return {
        setCategory,
        posts,
        selectedCategory,
        categories,
        filteredPosts,
        addPost,
        fetchPosts
    };

});
