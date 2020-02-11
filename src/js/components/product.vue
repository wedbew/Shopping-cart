<template>
  <div class="product">
    <div class="product__card">
      <img class="product__img" :src="item.src" alt="Product">
      <div class="product__content">
        <h5 class="product__title">{{item.name}}</h5>
        <p class="product__text">{{item.price.toFixed(2)}}€</p>
        <button @click="addToCart" :class="{ 'btn--cart': item.cart}" class="btn btn--primary">{{ item.cart ? 'Remove from cart' : 'Add to cart' }}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'product',
    props: ['item'],
    model: {
      event: 'addItemToCart'
    },
    methods: {
      addToCart() {
        this.$emit('addItemToCart');
      }
    }
  }
</script>