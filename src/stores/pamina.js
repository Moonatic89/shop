import { defineStore } from 'pinia';

export const usePaminaStore = defineStore('pamina', {
    state: () => ({
        events: [
        ],
        products: [
        ],
        sales: [
        ]
    }),
    actions: {
        importEvents(data) {
            this.events = data;
        },
        importProducts(data) {
            this.products = data;
        },
        importSales(data) {
            this.sales = data;
        },
        save() { },
    },

})