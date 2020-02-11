import Vue from 'vue';
import Index from './index';

new Vue({
  render: i => i(Index),
}).$mount('#app');
