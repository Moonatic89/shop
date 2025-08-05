import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBlog = defineStore("blog", () => {
    // Lista post (i tuoi card)
    const posts = ref([
        {
            title: "Lunaria Veyr",
            category: "Erranti Celesti",
            img: "https://picsum.photos/200?random=1",
            text: "Viaggiatrice celeste che vaga tra le rovine di mondi dimenticati. Ha occhi color argento e un mantello che brilla sotto la luna. Si dice che raccolga sussurri di stelle e li trasformi in melodie che possono guarire il dolore o evocare ricordi sepolti.",
        },
        {
            title: "Kael Dravos",
            category: "Erranti Celesti",
            img: "https://picsum.photos/200?random=2",
            text: "Guerriero caduto che porta una spada spezzata come simbolo del suo tradimento. Vive ai margini della civiltà, proteggendo villaggi che non lo accetteranno mai. La sua armatura è consumata dal tempo e dal rimorso, e porta cicatrici visibili e invisibili.",
        },
        {
            title: "Mirha delle Tempeste",
            category: "Erranti Celesti",
            img: "https://picsum.photos/200?random=3",
            text: "Sacerdotessa errante capace di leggere il futuro nelle onde del mare. Indossa bracciali di conchiglie che tintinnano quando la tempesta si avvicina. Il suo volto sereno cela una furia silenziosa contro gli dei che l’hanno abbandonata.",
        },
        {
            title: "Orin Lascaux",
            category: "Custodi delle Memorie",
            img: "https://picsum.photos/200?random=4",
            text: "Artista cieco che dipinge usando i ricordi degli altri. Le sue tele raccontano storie di chiunque lo tocchi, creando paesaggi mai visti e volti dimenticati. Vive in una torre isolata, dove i suoi quadri sembrano osservare e giudicare chi entra.",
        },
        {
            title: "Velka Ombrafredda",
            category: "Custodi delle Memorie",
            img: "https://picsum.photos/200?random=5",
            text: "Assassina mercenaria proveniente dalle steppe del nord, nota per il silenzio assoluto con cui colpisce. Porta con sé un corvo che funge da messaggero e testimone delle sue imprese, e che si posa solo su tombe fresche.",
        },
        {
            title: "Nivio il Sussurratore",
            category: "Custodi delle Memorie",
            img: "https://picsum.photos/200?random=6",
            text: "Vecchio cantastorie che narra leggende proibite. Viaggia con un bastone intagliato con i nomi dei morti che lo seguono come ombre silenziose. Chi ascolta le sue storie rischia di sognare per sempre i mondi che lui descrive.",
        },
        {
            title: "Ardhel Cineris",
            category: "Maghi del Fuoco",
            img: "https://picsum.photos/200?random=7",
            text: "Mago pirotecnico ossessionato dalle ceneri: crede che ogni fuoco lasci un’anima dietro di sé. Le sue mani sono sempre annerite e i suoi occhi riflettono una fiamma perpetua. È temuto per la sua capacità di evocare incendi che bruciano ricordi.",
        },
        {
            title: "Serika Luminar",
            category: "Maghi del Fuoco",
            img: "https://picsum.photos/200?random=8",
            text: "Bambina prodigio cresciuta in un monastero sospeso tra le montagne. È capace di comunicare con le lucciole, che la seguono ovunque. Non conosce la paura e crede che ogni notte sia una porta verso un sogno più grande.",
        },
        {
            title: "Drosk Martelloferro",
            category: "Forgiatori Erranti",
            img: "https://picsum.photos/200?random=9",
            text: "Fabbro errante che forgia armi cantando in lingue antiche. Si dice che ogni lama da lui creata custodisca una promessa. Viaggia con un carro di metalli e ricordi, sempre in cerca del prossimo cuore da proteggere o ferire.",
        },
        {
            title: "Isolde Fendineve",
            category: "Forgiatori Erranti",
            img: "https://picsum.photos/200?random=10",
            text: "Cacciatrice delle terre ghiacciate, nota per inseguire spiriti selvaggi visibili solo durante le aurore boreali. Il suo arco è intarsiato di rune che brillano nella neve, e i suoi passi non lasciano mai impronte.",
        },
    ]);

    // Stato categoria selezionata
    const selectedCategory = ref(null);

    const setCategory = (newCategory) => {
        selectedCategory.value = newCategory;
    }

    // Categorie uniche
    const categories = computed(() => [...new Set(posts.value.map((p) => p.category))]);

    // Post filtrati
    const filteredPosts = computed(() => {
        if (!selectedCategory.value) return posts.value;
        return posts.value.filter((p) => p.category === selectedCategory.value);
    });

    return {
        setCategory,
        posts,
        selectedCategory,
        categories,
        filteredPosts,
    };
});
