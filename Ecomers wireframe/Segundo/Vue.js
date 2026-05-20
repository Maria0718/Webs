const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
    setup() {


        // Cart State & Dialog Control
        const cart = ref([]);
        const showCartDrawer = ref(false);
        const showLoginModal = ref(false);

        // Best Sellers Slider State
        const bestSellersPage = ref(0);
        const isMobile = ref(false);

        // Our Product Section Filtering
        const activeProductTab = ref('hot'); // 'hot' | 'sale' | 'trending' | 'new'

        // Screen Size Observer (for responsive slider transform offsets)
        const checkScreenSize = () => {
            isMobile.value = window.innerWidth <= 768;
        };

        // Bootstrap Toast Instances
        let cartToast;
        let limitToast;
        let loginToast;

        onMounted(() => {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);

            // Initialize Bootstrap Toasts
            cartToast = new bootstrap.Toast(document.getElementById('cartToast'));
            limitToast = new bootstrap.Toast(document.getElementById('limitToast'));
            
            const loginToastEl = document.getElementById('loginToast');
            if (loginToastEl) {
                loginToast = new bootstrap.Toast(loginToastEl);
            }
        });

        onUnmounted(() => {
            window.removeEventListener('resize', checkScreenSize);
        });


        // Products Data List - Best Sellers Slider
        const bestSellers = ref([
            {
                id: 101,
                name: 'Classic Trench Coat',
                price: 120,
                rating: 5,
                icon: 'fa-solid fa-shirt',
                imageClass: 'card-sweater-placeholder'
            },
            {
                id: 102,
                name: 'Petal Jack Blend',
                price: 40,
                rating: 5,
                icon: 'fa-solid fa-fill-drip',
                imageClass: 'card-jeans-placeholder'
            },
            {
                id: 103,
                name: 'Premium Knit Sweater',
                price: 85,
                rating: 5,
                icon: 'fa-solid fa-socks',
                imageClass: 'card-jackets-placeholder'
            },
            {
                id: 104,
                name: 'Urban Slim Jeans',
                price: 65,
                rating: 5,
                icon: 'fa-solid fa-user-tie',
                imageClass: 'card-sweater-placeholder'
            }
        ]);

        // Products Data List - Our Product Grid
        const allProducts = ref([
            {
                id: 1,
                name: 'Minimalist Sweater',
                price: 50.00,
                category: 'new',
                icon: 'fa-solid fa-shirt',
                imageClass: 'product-card-1'
            },
            {
                id: 2,
                name: 'Summer Floral Dress',
                price: 75.00,
                category: 'hot',
                icon: 'fa-solid fa-person-dress',
                imageClass: 'product-card-2'
            },
            {
                id: 3,
                name: 'Denim Trucker Jacket',
                price: 90.00,
                category: 'sale',
                icon: 'fa-solid fa-vest',
                imageClass: 'product-card-3'
            },
            {
                id: 4,
                name: 'Classic White Tee',
                price: 25.00,
                category: 'trending',
                icon: 'fa-solid fa-shirt',
                imageClass: 'product-card-4'
            },
            {
                id: 5,
                name: 'Leather Biker Jacket',
                price: 180.00,
                category: 'hot',
                icon: 'fa-solid fa-user-secret',
                imageClass: 'product-card-5'
            },
            {
                id: 6,
                name: 'Pleated Midi Skirt',
                price: 60.00,
                category: 'sale',
                icon: 'fa-solid fa-person-dress-burst',
                imageClass: 'product-card-6'
            },
            {
                id: 7,
                name: 'Tailored Blazer',
                price: 110.00,
                category: 'trending',
                icon: 'fa-solid fa-user-tie',
                imageClass: 'product-card-7'
            },
            {
                id: 8,
                name: 'Chunky Cable Beanie',
                price: 30.00,
                category: 'new',
                icon: 'fa-solid fa-hat-cowboy-side',
                imageClass: 'product-card-8'
            }
        ]);

        // Computed Properties
        const cartCount = computed(() => {
            return cart.value.reduce((total, item) => total + item.quantity, 0);
        });

        const cartTotal = computed(() => {
            return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
        });

        const filteredProducts = computed(() => {
            return allProducts.value.filter(product => product.category === activeProductTab.value);
        });

        // Shopping Cart Core Logic
        const addToCart = (product) => {
            // Replicating Primero limit validation
            if (cartCount.value >= 10) {
                if (limitToast) limitToast.show();
                return;
            }

            const existingItem = cart.value.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.value.push({
                    ...product,
                    quantity: 1
                });
            }

            // Show Toast Alert
            if (cartToast) cartToast.show();
        };

        const removeFromCart = (itemId) => {
            const index = cart.value.findIndex(item => item.id === itemId);
            if (index !== -1) {
                cart.value.splice(index, 1);
            }
        };

        const updateQuantity = (itemId, change) => {
            const item = cart.value.find(item => item.id === itemId);
            if (item) {
                const newQuantity = item.quantity + change;
                if (newQuantity <= 0) {
                    removeFromCart(itemId);
                } else {
                    // Check limit
                    const futureTotalCount = cartCount.value + change;
                    if (futureTotalCount > 10) {
                        if (limitToast) limitToast.show();
                        return;
                    }
                    item.quantity = newQuantity;
                }
            }
        };

        const clearCart = () => {
            cart.value = [];
        };

        // Slider Navigation
        const changeBestSellersPage = (pageIndex) => {
            bestSellersPage.value = pageIndex;
        };

        // Simulating Newsletter & Login Submits
        const userEmail = ref('');
        const subscribeNewsletter = () => {
            if (userEmail.value) {
                alert(`¡Gracias por suscribirte con: ${userEmail.value}! Te mantendremos informado de las novedades del wireframe.`);
                userEmail.value = '';
            }
        };

        const loginForm = ref({ email: '', password: '' });
        const handleLoginSubmit = () => {
            showLoginModal.value = false;
            if (loginToast) loginToast.show();
            loginForm.value.email = '';
            loginForm.value.password = '';
        };

        return {
            cart,
            showCartDrawer,
            showLoginModal,
            bestSellersPage,
            isMobile,
            activeProductTab,
            bestSellers,
            allProducts,
            cartCount,
            cartTotal,
            filteredProducts,
            userEmail,
            loginForm,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            changeBestSellersPage,
            subscribeNewsletter,
            handleLoginSubmit
        };
    }
}).mount('#app');
