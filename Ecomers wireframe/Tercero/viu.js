const { createApp } = Vue;

createApp({
    data() {
        return {
            isCartOpen: false,
            searchQuery: '',
            selectedCategory: 'all',
            products: [
                { id: 1, name: 'Monstera Deliciosa', price: 25.00, category: 'interior', description: 'Planta de interior con hojas grandes y agujereadas. Ideal para decoración moderna.' },
                { id: 2, name: 'Ficus Lyrata', price: 40.00, category: 'interior', description: 'El árbol de interior perfecto. Sus grandes hojas en forma de violín aportan elegancia.' },
                { id: 3, name: 'Sansevieria', price: 15.00, category: 'easy', description: 'Extremadamente resistente y purificadora de aire. Requiere muy pocos cuidados.' },
                { id: 4, name: 'Pothos Aureum', price: 12.00, category: 'easy', description: 'Planta colgante de rápido crecimiento. Perfecta para dar vida a espacios altos.' },
                { id: 5, name: 'Aloe Vera', price: 18.00, category: 'exterior', description: 'Planta suculenta conocida por sus maravillosas propiedades medicinales y decorativas.' },
                { id: 6, name: 'Calathea Orbifolia', price: 30.00, category: 'interior', description: 'Hojas redondeadas de color verde claro con franjas plateadas que se mueven con la luz.' }
            ],
            cart: [],
            quickViewProduct: null,
            newsletterEmail: '',
            newsletterSuccess: false
        }
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                     product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
                return matchesSearch && matchesCategory;
            });
        },
        cartTotalItems() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        }
    },
    methods: {
        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
        },
        addToCart(product) {
            const existingItem = this.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        clearCart() {
            this.cart = [];
            alert('¡Gracias por tu compra! Tu pedido está siendo procesado.');
            this.isCartOpen = false;
        },
        setCategory(category) {
            this.selectedCategory = category;
        },
        openQuickView(product) {
            this.quickViewProduct = product;
        },
        closeQuickView() {
            this.quickViewProduct = null;
        },
        subscribeNewsletter() {
            if (this.newsletterEmail) {
                this.newsletterSuccess = true;
                this.newsletterEmail = '';
                setTimeout(() => {
                    this.newsletterSuccess = false;
                }, 4000);
            }
        }
    }
}).mount('#app');
