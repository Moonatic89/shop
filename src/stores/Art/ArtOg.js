import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { supabase } from "../../supabase";
import { ref as dbRef, push, set, get, child } from "firebase/database";
import db from "../../services/firebase";

export const useArtOg = defineStore("art-og", () => {
    const arts = ref([]);
    const selectedCategory = ref(null);

    const mockArts = [
        {
            title: "Tramonto sul mare",
            image: "https://picsum.photos/seed/art1/600/400",
            category: "Paesaggi",
            description: "Un tramonto vibrante che illumina il mare calmo."
        },
        {
            title: "Città futuristica",
            image: "https://picsum.photos/seed/art2/600/400",
            category: "Futurismo",
            description: "Grattacieli e luci al neon in una metropoli del futuro."
        },
        {
            title: "Foresta incantata",
            image: "https://picsum.photos/seed/art3/600/400",
            category: "Fantasy",
            description: "Un bosco pieno di magia e mistero."
        },
        {
            title: "Ritratto femminile",
            image: "https://picsum.photos/seed/art4/600/400",
            category: "Ritratti",
            description: "Uno sguardo intenso catturato sulla tela."
        },
        {
            title: "Architettura gotica",
            image: "https://picsum.photos/seed/art5/600/400",
            category: "Architettura",
            description: "Dettagli di una cattedrale gotica imponente."
        },
        {
            title: "Notte stellata",
            image: "https://picsum.photos/seed/art6/600/400",
            category: "Paesaggi",
            description: "Un cielo notturno pieno di stelle brillanti."
        },
        {
            title: "Visione astratta",
            image: "https://picsum.photos/seed/art7/600/400",
            category: "Astratto",
            description: "Forme e colori che evocano emozioni profonde."
        },
        {
            title: "Scultura moderna",
            image: "https://picsum.photos/seed/art8/600/400",
            category: "Scultura",
            description: "Linee pulite e forme geometriche minimaliste."
        },
        {
            title: "Animali selvatici",
            image: "https://picsum.photos/seed/art9/600/400",
            category: "Fauna",
            description: "Un gruppo di cervi in un prato al tramonto."
        },
        {
            title: "Fiori delicati",
            image: "https://picsum.photos/seed/art10/600/400",
            category: "Natura morta",
            description: "Un vaso di fiori dai colori pastello."
        }
    ];


    const fetchArts = async () => {
        try {
            const snapshot = await get(child(dbRef(db), "arts-og"));
            if (snapshot.exists()) {
                arts.value = Object.values(snapshot.val()).reverse();
            } else {
                arts.value = mockArts;
            }
        } catch (err) {
            console.error("[fetchArts OG] Errore:", err);
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
                .from("art-og")
                .upload(randomName, imageFile);

            if (uploadError) throw uploadError;

            const { data: publicUrl } = supabase.storage.from("art-og").getPublicUrl(randomName);

            const newArt = {
                title,
                category,
                img: publicUrl.publicUrl,
                created_at: Date.now(),
            };

            const artsRef = dbRef(db, "arts-og");
            const newArtRef = push(artsRef);
            await set(newArtRef, newArt);

            arts.value.unshift(newArt);
        } catch (err) {
            console.error("[addArt OG] Errore:", err);
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
