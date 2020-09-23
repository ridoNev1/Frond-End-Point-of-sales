<template>
  <div class="cart-page">
    <div class="cart-navbar">
      <h2 class="font-weight-bold">Cart<span>{{cartdata.length}}</span></h2>
    </div>
    <div class="cart-content">
      <div class="cart-empty" v-if="cartdata.length === 0">
        <img src="../assets/food-and-restaurant.png" alt="empty cart" class="mt-5">
        <h3 class="font-weight-bold">Your cart is empty</h3>
        <h5>Please add some items from the menu</h5>
      </div>
      <div v-else class="cart-thereis">
        <div class="cart-item" v-for="(item, index) in cartdata" :key="index">
          <img :src="`http://34.232.66.65:3002/${item.image}`" alt="cart-image" />
          <div class="value-item-cart">
            <p>
              <b>{{item.product_name}}</b>
            </p>
            <div class="btn-cart-value">
              <button class="btn-qty" @click="$emit('plusdata', index)">+</button>
              <h3 class="font-weight-bold btn-qty">{{item.qty}}</h3>
              <button class="btn-qty" @click="$emit('mindata', index)">-</button>
            </div>
          </div>
          <div class="delete-cart">
            <span></span>
            <p class="cart-price">
              <strong>Rp. {{item.price * item.qty}}</strong>
            </p>
          </div>
        </div>
        <div class="total-price">
          <h4 class="font-weight-bold">total:</h4>
          <h4 class="font-weight-bold">Rp. {{amount}}</h4>
        </div>
        <p>*Belum termasuk PPN</p>
        <div class="main-cart-button">
          <button @click="checkOut">Checkout</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Cart',
  props: ['cartdata'],
  data () {
    return {
      amount: null
    }
  },
  watch: {
    cartdata (value) {
      this.amount = value.reduce((item, data) => {
        return item + (data.qty * data.price)
      }, 0)
    }
  },
  methods: {
    ...mapActions({
      insertHistory: 'history/postHistory'
    }),
    checkOut () {
      const detailData = this.cartdata.map(e => {
        const dataDetail = {
          id_product: e.id,
          product_name: e.product_name,
          qty: e.qty,
          price: e.price
        }
        return dataDetail
      })
      const data = {
        invoices: '#3546xxx',
        cashier: 'Billie Elish',
        amount: this.amount,
        detail: detailData
      }
      this.insertHistory(data).then(result => {
        alert(result)
      }).catch(err => {
        console.log(err)
      })
      this.$emit('closencheckout', data)
    }
  }
}
</script>

<style scoped>
.cart-page {
  background: #FFFFFF;
  border: 1px solid #CECECE;
  height: 100%;
  overflow: scroll;
}
.cart-navbar {
  background: #FFFFFF;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  padding: 5px 0;
  text-align: center;
}
.cart-navbar h2 span {
  color: whitesmoke;
  background-color: skyblue;
  font-size: 25px;
  padding: 0 8px;
  border-radius: 25px;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-thereis {
  padding: 15px 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cart-item img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.cart-item .value-item-cart p:nth-child(1) {
  font-size: 25px;
}

.btn-cart-value {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.btn-cart-value .btn-qty {
  background: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  color: #82de3a;
  width: 30px;
  height: 30px;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
}

.btn-cart-value h3:nth-child(2) {
  font-size: 14px;
  padding-top: 6px;
  background: #ffffff;
  border: 1px solid #82de3a;
  cursor: auto;
}
.cart-item .cart-price {
  font-size: 20px;
  margin-bottom: 0;
}
.delete-cart {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 !important;
}
.total-price {
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
}.main-cart-button {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
.main-cart-button button {
  padding: 7px 0;
  border-radius: 7px;
  color: white;
  outline: none;
  font-weight: bolder;
  transition: all .3s ease;
  font-size: 20px;
}
.main-cart-button button:nth-child(1) {
  background-color: #57CAD5;
  border: 2px solid #57cad5;
}
.main-cart-button button:nth-child(2) {
  background-color: #F24F8A;
  border: 2px solid #F24F8A;
}
.main-cart-button button:nth-child(1):hover {
  color: #57CAD5;
  background-color: transparent;
}
.main-cart-button button:nth-child(2):hover {
  color: #F24F8A;
  background-color: transparent;
}

/* responsive breakpoint */
@media screen and (max-width: 992px) {
  .cart-page {
    width: 400px;
    height: 100vh;
  }
}
@media screen and (max-width: 576px) {
  .cart-page {
    width: 96vw;
  }
}
</style>
