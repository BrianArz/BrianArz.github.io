const app = Vue.createApp({
    methods: {
        goToCategory(category) {
            window.location.href = `catalog.html?category=${category}`;
        },
    },
});

app.mount('#indexApp');
