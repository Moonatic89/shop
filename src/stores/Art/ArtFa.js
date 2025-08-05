import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../../supabase";
import { ref as dbRef, push, set, get, child } from "firebase/database";
import db from "../../services/firebase";

export const useArtFa = defineStore("art-fa", () => {
    const arts = ref([]);
    const selectedCategory = ref(null);

    const fetchArts = async () => {
        try {
            const snapshot = await get(child(dbRef(db), "arts-fa"));
            if (snapshot.exists()) {
                arts.value = Object.values(snapshot.val()).reverse();
            } else {
                arts.value = [];
            }
        } catch (err) {
            console.error("[fetchArts FA] Errore:", err);
            throw err;
        }
    };

    const setCategory = (newCategory) => {
        selectedCategory.value = newCategory;
    };

    const categories = computed(() => [...new Set(arts.value.map((a) => a.category))]);

    const filteredArts = computed(() => {
        if (!selectedCategory.value) return arts.value;
        return arts.value.filter((a) => a.category === selectedCategory.value);
    });

    const addArt = async ({ title, category, imageFile }) => {
        try {
            const ext = imageFile.name.split(".").pop();
            const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from("art-fa")
                .upload(randomName, imageFile);

            if (uploadError) throw uploadError;

            const { data: publicUrl } = supabase.storage.from("art-fa").getPublicUrl(randomName);

            const newArt = {
                title,
                category,
                img: publicUrl.publicUrl,
                created_at: Date.now(),
            };

            const artsRef = dbRef(db, "arts-fa");
            const newArtRef = push(artsRef);
            await set(newArtRef, newArt);

            arts.value.unshift(newArt);
        } catch (err) {
            console.error("[addArt FA] Errore:", err);
            throw err;
        }
    };

    return {
        arts,
        selectedCategory,
        categories,
        filteredArts,
        setCategory,
        fetchArts,
        addArt,
    };
});
