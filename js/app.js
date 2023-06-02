import { products } from '../data/data.js'

const app = Vue.createApp({
    data()
    {
        return{
            products: products,
            categories: [
                {categoryName : "Probadores de Baterías", categoryQuantity : 11},
                {categoryName : "Cargadores de Baterías", categoryQuantity : 11},
                {categoryName : "Tipos de Impresoras", categoryQuantity : 11},
                {categoryName : "Accesorios", categoryQuantity : 11},
            ],
            sortOptions: [
                { name: 'Nombre (A-Z)', value: 'name-asc' },
                { name: 'Nombre (Z-A)', value: 'name-desc' },
            ],
            pageSizeOptions: [
                { name: '10', value: '10' },
                { name: '15', value: '15' },
                { name: 'Todos', value: '40' },
            ],

            categoriesDiv: true,
            categoriesAll: 22,
            categoriesPro: 11,
            categoriesTec: 11,

            filterDiv: false,

            filter: '',

            pageSize: 5,
            currentPage: 1,
    
            // Filtros y orden seleccionados
            selectedCategory: '',
            selectedSort: 'name-asc',

            //Texto de búsqueda 
            searchQuery: '',
        }
    },
    created() {
        // Obtenemos el nombre de la categoría de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('category');

        // Obtenemos la información del producto correspondiente al id
        this.selectedCategory = categoryName;

        if(this.selectedCategory != null){
            this.categoriesDiv = false;
            this.selectedCategory = categoryName;
            this.filter = categoryName;
            this.filterDiv = true;
        }

    },
    computed:
    {
        filteredProducts() 
        {
            let products = this.products;
    
            if (this.selectedCategory) {
                // products = products.filter(product => product.category === this.selectedCategory);
                products = products.filter(product => product.category.includes(this.selectedCategory));
            }

            return products;
        },
        sortedProducts() 
        {
            let products = this.filteredProducts;
    
            switch (this.selectedSort) {
                case 'name-asc':
                    products.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    products.sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }
    
            return products;
        },
        searchedProducts() {
            let products = this.sortedProducts;
    
            if (this.searchQuery) {
                products = products.filter(product => {
                    return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            }
    
            return products;
        },
        pageCount(){
            return Math.ceil(this.searchedProducts.length/this.pageSize);
        },
        displayProducts(){
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.searchedProducts.slice(startIndex, endIndex);
        }
    },
    methods: {
        // Redirigir a la página del producto
        goToProduct(id) {
            window.location.href = `product.html?id=${id}`;
        },
        goToCategory(category) {
            window.location.href = `catalog.html?category=${category}`;
        },
        filterCategory(categoryName){
            this.categoriesDiv = false;
            this.selectedCategory = categoryName;
            this.filter = categoryName;
            this.filterDiv = true;
        },
        deleteFilter(){
            this.selectedCategory = '';
            this.selectedGauge = '';
            this.categoriesDiv = true;
            this.gaugeDiv = true;
            this.filterDiv = false;
        }
    },
});

app.mount('#page-content');
