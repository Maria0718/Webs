const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const cartCount = ref(0);
        const showCart = ref(false);

        // Productos
        const products = ref([
            {
                id: 1,
                name: 'Auriculares Inalámbricos Pro',
                description: 'Cancelación de ruido activa, 30h de batería, sonido espacial 3D.',
                price: 199.99,
                icon: 'fa-headphones',
                isNew: true,
                added: false
            },
            {
                id: 2,
                name: 'Smartwatch Serie X',
                description: 'Monitor de salud avanzado, GPS integrado, resistente al agua 50m.',
                price: 299.00,
                icon: 'fa-stopwatch',
                isNew: false,
                added: false
            },
            {
                id: 3,
                name: 'Cámara Mirrorless Alpha',
                description: 'Sensor Full-Frame de 24MP, video 4K a 60fps, enfoque ocular.',
                price: 1299.50,
                icon: 'fa-camera-retro',
                isNew: false,
                added: false
            },
            {
                id: 4,
                name: 'Altavoz Bluetooth Ultra',
                description: 'Graves potentes, batería 24h, diseño resistente e impermeable IP67.',
                price: 149.90,
                icon: 'fa-speaker-deck',
                isNew: true,
                added: false
            },
            {
                id: 5,
                name: 'Tablet Creativa Pro',
                description: 'Pantalla 120Hz, incluye lápiz óptico, ideal para ilustradores.',
                price: 599.99,
                icon: 'fa-tablet-screen-button',
                isNew: false,
                added: false
            },
            {
                id: 6,
                name: 'Drone Explorer 4K',
                description: 'Cámara estabilizada, seguimiento inteligente, alcance 10km.',
                price: 799.00,
                icon: 'fa-plane-up',
                isNew: true,
                added: false
            },
            {
                id: 7,
                name: 'Gafas de Realidad Virtual',
                description: 'Resolución 4K por ojo, rastreo de movimiento preciso, sin cables.',
                price: 349.99,
                icon: 'fa-vr-cardboard',
                isNew: false,
                added: false
            },
            {
                id: 8,
                name: 'Teclado Mecánico RGB',
                description: 'Switches táctiles, personalización por tecla, diseño ergonómico.',
                price: 129.50,
                icon: 'fa-keyboard',
                isNew: false,
                added: false
            }
        ]);

        let cartToast;
        let limitToast;

        onMounted(() => {
           
            cartToast = new bootstrap.Toast(document.getElementById('cartToast'));
            limitToast = new bootstrap.Toast(document.getElementById('limitToast'));
        });

        const addToCart = (product) => {
            if (cartCount.value >= 10) {
                limitToast.show();
                return;
            }

            cartCount.value++;

            
            product.added = true;

            
            cartToast.show();

            
            setTimeout(() => {
                product.added = false;
            }, 2000);
        };

        return {
            cartCount,
            showCart,
            products,
            addToCart
        };
    }
}).mount('#app');
