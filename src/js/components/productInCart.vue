<template>
  <div class="cart__item">
    <div class="cart__cell cart__cell--hidden">
      <img :src="item.src" class="cart__img">
    </div>
    <div class="cart__cell">{{item.name}}</div>
    <div class="cart__cell">{{item.count}}
      <div class="cart__quantity">
        <span class="btn btn--add" @click="addItem">+</span>
        <span class="btn btn--add" @click="removeItem">-</span>
      </div>
    </div>
  <div class="cart__cell">{{item.price.toFixed(2)}}€</div>
</div>
</template>
<script>
  export default {
    name: 'cartProduct',
    props: ['item'],
    model: {
      event: ['addProductToCart', 'removeProductFromCart']
    },
    methods: {
      addItem() {
        this.$emit('addProductToCart');
      },
      removeItem() {
        this.$emit('removeProductFromCart');
      }
    }
  }
</script>