<template>
  <div class="products">
    <div class="cart">
      <h2 class="products__title">Cart</h2>
      <button @click="showCart = !showCart" class="btn btn--primary" :class="{ 'btn--cart': showCart}">{{ showCart ? 'Hide cart' : 'Show cart'}}</button>
      <div v-if="showCart" class="cart__wrapper">
        <h3 v-if="cart.length == 0"> Cart is empty</h3>
        <div v-if="!cart.length == 0" class="cart__nav">
          <span class="cart__title cart__title--hidden">Image</span>
          <span class="cart__title">Product name</span>
          <span class="cart__title">Qunatity</span>
          <span class="cart__title">Price</span>
        </div>
        <div class="cart__items">

          <ProductInCart @addProductToCart="addItem(item)" @removeProductFromCart="removeItem(item)" v-for="(item,index) in cart" :key=(index) :item="item"/>

        </div>
        <h5 v-if="!cart.length == 0" class="cart__total">Total : {{ total.toFixed(2) }}€</h5>
      </div>
    </div>
    <h2 class="products__title products__title--inline">Poroducts</h2>
    <select @change="sortedArray" v-model="sortedBy" class="products__filter">
      <option value="sort" disabled selected hidden>Sort by</option>
      <option value="name">Name</option>
      <option value="price">Price</option>
    </select>
    <div class="products__wrapper">

      <Product v-for="item in items" :key="item.id" :item="item" @addItemToCart="item.cart = !item.cart;addToCart(item)"/>

    </div>

    <Modal @removeItem="removeFromCart(removeId)" ref="modal"></Modal>

  </div>
</template>
<script>
  import Product from './components/product';
  import ProductInCart from './components/productInCart';
  import Modal from './components/modal';
  export default {
    name: 'index',
    components: {
      Modal,
      Product,
      ProductInCart
    },
    data() {
      return {
        total: 0,
        showCart: false,
        removeId: null,
        sortedBy: 'sort',
        cart: [],
        products: [],
        items: [{
          "id": 1,
          "name": "Sack",
          "src": "img/1.jpg",
          "price": 65,
          "cart": false,
        },
        {
          "id": 2,
          "name": "Bracelet",
          "src": "img/2.jpg",
          "price": 12,
          "cart": false,
        },
        {
          "id": 3,
          "name": "Headphones",
          "src": "img/3.jpg",
          "price": 80,
          "cart": false,
        },
        {
          "id": 4,
          "name": "Donut",
          "src": "img/4.jpg",
          "price": 10,
          "cart": false,
        },
        {
          "id": 5,
          "name": "Camera",
          "src": "img/5.jpg",
          "price": 5,
          "cart": false,
        },
        {
          "id": 6,
          "name": "Bike",
          "src": "img/6.jpg",
          "price": 2200,
          "cart": false,
        },
        {
          "id": 7,
          "name": "Shoes",
          "src": "img/7.jpg",
          "price": 65,
          "cart": false,
        },
        {
          "id": 8,
          "name": "Watch",
          "src": "img/8.jpg",
          "price": 150,
          "cart": false,
        }
      ]}
    },
    mounted() {
      const visited = localStorage.getItem('visited');
      if (parseInt(visited) === 1) {
        const length = localStorage.getItem('items');
        for (let i = 0; i < length; i++) {
          this.items.forEach((item, index) => {
            const props = localStorage.getItem(`item_${i}`).split('/');
            if (item.id == parseInt(props[0])) {
              item.cart = true;
              const product = {
                "id": parseInt(props[0]),
                "name": item.name,
                "price": item.price,
                "count": parseInt(props[1]),
                "cart": true,
                "src": item.src
              };
              this.total += product.price * product.count;
              this.cart.push(product);
            }
          })
        }
      }
    },
    updated() {
      localStorage.setItem('visited', 1);
      if (this.cart.length) {
        let count = 0;
        this.cart.forEach((item, index) => {
          localStorage.setItem(`item_${index}`, `${item.id}/${item.count}`);
          count++;
        });
        if (count != 0) {
          localStorage.setItem('items', count);
        }
      } else {
        localStorage.clear();
        this.total = 0;
      }
    },
    methods: {
      addToCart(product) {
        const item = {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "count": 1,
          "cart": product.cart,
          "src": product.src
        };
        if (product.cart === true) {
          this.total += product.price;
          this.cart.push(item);
        } else {
          this.total -= product.price;
          this.cart.forEach((item, index) => {
            if (this.cart[index].id == product.id) {
              this.cart.splice(index, 1);
            }
          });
        }
      },
      removeFromCart(id) {
        this.cart.forEach((item, index) => {
          if (this.cart[index].id == id) {
            this.cart.splice(index, 1);
          }
        });
        this.items.forEach((item, index) => {
          if (this.items[index].id == id) {
            this.total -= this.items[index].price;
            this.items[index].cart = false;
          }
        });
      },
      addItem(item) {
        item.count++;
        this.total += item.price;
      },
      removeItem(item) {
        if (item.count > 1) {
          item.count--;
          this.total -= item.price;
        } else {
          this.removeId = item.id;
          this.$refs.modal.openModal();
        }
      },
      sortedArray() {
        function compareName(a, b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }

        function comparePrice(a, b) {
          if (a.price < b.price)
            return -1;
          if (a.price > b.price)
            return 1;
          return 0;
        }
        if (this.sortedBy == "name") {
          return this.items.sort(compareName);
        } else if (this.sortedBy == "price") {
          return this.items.sort(comparePrice);
        }
      }
    }
  }
</script>