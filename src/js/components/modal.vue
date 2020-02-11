<template>
  <div v-if="isOpen" class="modal">
    <div class="modal__wrapper">
      <button @click="isOpen = false" @keyup.esc="isOpen = false" class="modal__close btn">&times;</button>
      <h2 class="modal__title">Do you want to remove this item from cart?</h2>
      <div class="modal__buttons">
        <button @click="confirm" class="btn btn--primary">Yes</button>
        <button @click="isOpen = false" class="btn btn--warning">No</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'modal',
    model: {
      event: 'removeItem'
    },
    data() {
      return  {
        isOpen: false,
      }
    },
    methods: {
      openModal() {
        this.isOpen = true;
      },
      confirm() {
        this.$emit('removeItem');
        this.isOpen = false;
      }
    },
  }
</script>