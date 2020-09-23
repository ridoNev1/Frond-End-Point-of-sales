<template>
  <div class="home">
    <div class="main-page">
      <div class="main">
        <Navbar type="home" @sidemenutoggle="sideMenuToggle" />
        <div class="content">
          <div class="main-content">
            <SideMenu
              type="home"
              class="side-toggle"
              @searchtoggle="searchToggle"
              @addtoggle="addItemToggle"
            />
            <div class="food-catalog">
              <div class="catalog-button">
                <div>
                  <b-dropdown
                    id="dropdown-divider"
                    text="Sort item"
                    class="m-2"
                  >
                    <b-dropdown-item-button @click="sortFood('product_name')"
                      >Product name</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="sortFood('price')"
                      >Cheapest price</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="sortFood('category')"
                      >Category</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="sortLatest('DESC')"
                      >Latest product</b-dropdown-item-button
                    >
                  </b-dropdown>
                </div>
                <button
                  class="font-weight-bold btn-refresh-product"
                  @click="refreshCatalog"
                >
                  Refresh
                  <b-icon icon="arrow-clockwise"></b-icon>
                </button>
              </div>
              <Card
                @parsepage="paginationData"
                @editdata="editIdIndex"
                @addtocart="addToCart"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="cart-content">
        <Cart :cartdata="cartItem" @plusdata="plusData" @mindata="minData" @closencheckout="checkOut"/>
      </div>
      <b-icon
        icon="cart-check-fill"
        variant="light"
        font-scale="3"
        class="btn-cart-toggle rounded-circle bg-primary p-2"
        @click="cartToggle"
      ></b-icon>
      <Search
        class="search"
        @closesearch="searchToggle"
        :passpage="pagination"
      />
      <AddItem class="add-item" @addclose="addItemToggle" />
      <EditData
        class="edit-data"
        @editboxtoggle="editToggle"
        @sendeditdata="sendEditData"
        :productname="editProductName"
        :price="editPrice"
      />
      <div class="modal-box" :style="modalToggle">
        <div class="modal-content">
          <div class="modal-checkout">
            <p class="text-center"><b>Checkout</b></p>
            <p><b>Receipt no: #010410919</b></p>
            <button class="btn-close" @click="closeModalCheckout">x</button>
          </div>
          <p class="cashier-name">Cashier : Billie Elish</p>
          <div class="list-payment" v-for="(item, index) in checkOutData" :key="index">
            <p><b>{{item.product_name}} {{item.qty}}x</b></p>
            <p><b>Rp. {{item.price}}</b></p>
          </div>
          <p class="total">
            <b>Total: <span>Rp. {{amount}}</span></b>
          </p>
          <p class="payment-cash"><b>Payment: Cash</b></p>
          <div class="btn-payment">
            <button>Print</button>
            <p>Or</p>
            <button>Send Email</button>
          </div>
        </div>
      </div>
      <p v-changeBgColor="'maroon'" class="text-white p-1">{{changebgCol}}</p>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Cart from '../components/Cart'
import Search from '../components/Search'
import AddItem from '../components/addItem'
import EditData from '../components/EditData'
import changebgCol from '../mixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [changebgCol],
  name: 'Home',
  components: {
    SideMenu,
    Navbar,
    Card,
    Cart,
    Search,
    AddItem,
    EditData
  },
  data () {
    return {
      pagination: 1,
      editId: null,
      editProductName: null,
      editPrice: null,
      cartItem: [],
      modalToggle: 'transform: scale(0);',
      checkOutData: null,
      amount: null
    }
  },
  computed: {
    ...mapGetters({
      allFoodData: 'food/getAllFood',
      categoryData: 'category/getCategory'
    })
  },
  methods: {
    sideMenuToggle () {
      const sideMenu = document.querySelector('.side-toggle')
      sideMenu.classList.toggle('side-menu-toggle')
    },
    ...mapActions({
      refreshFoodData: 'food/getFoodData',
      sortFoodData: 'food/sortFoodData',
      latestFoodData: 'food/latestFoodData',
      editFoodData: 'food/editFoodData'
    }),
    refreshCatalog () {
      const data = {
        search: '',
        page: this.pagination
      }
      this.refreshFoodData(data)
    },
    searchToggle () {
      const search = document.querySelector('.search')
      search.classList.toggle('search-toggle')
    },
    cartToggle () {
      const cart = document.querySelector('.cart-content')
      cart.classList.toggle('cart-toggle')
    },
    sortFood (value) {
      const data = {
        sort: value,
        page: this.pagination
      }
      this.sortFoodData(data)
      this.$router
        .push({ path: '/', query: { sortkey: value } })
        .catch((err) => {
          console.log(err.name)
        })
    },
    sortLatest (value) {
      this.latestFoodData(value)
      this.$router.push({ path: '/', query: { sortlatest: value } })
    },
    addItemToggle () {
      const addItem = document.querySelector('.add-item')
      addItem.classList.toggle('add-item-toggle')
    },
    paginationData (value) {
      this.pagination = value
    },
    editIdIndex (id, index) {
      this.editId = id
      this.editProductName = this.allFoodData.foodData[index].product_name
      this.editPrice = this.allFoodData.foodData[index].price
      const editToggle = document.querySelector('.edit-data')
      editToggle.classList.toggle('add-item-toggle')
    },
    sendEditData (form) {
      const data = {
        id: this.editId,
        formData: form
      }
      this.editFoodData(data).catch((err) => {
        if (err.message === 'Request failed with status code 403') {
          alert('Only admin can do this')
        }
      })
    },
    editToggle () {
      const editToggle = document.querySelector('.edit-data')
      editToggle.classList.toggle('add-item-toggle')
    },
    addToCart (id, index) {
      const product = this.allFoodData.foodData.filter((e) => e.id === id)
      const cart = this.cartItem.filter((e) => e.id === id)
      if (cart.length === 0) {
        product[0].qty = 1
        this.cartItem = [...this.cartItem, product[0]]
      } else {
        const cartData = this.cartItem.map((e) => {
          if (e.id === id) {
            e.qty += 1
          }
          return e
        })
        this.cartItem = cartData
      }
    },
    plusData (index) {
      const idCart = this.cartItem[index].id
      const plus = this.cartItem.filter((el) => {
        if (idCart === el.id) {
          el.qty += 1
        }
        return el
      })
      this.cartItem = plus
    },
    minData (index) {
      const idCart = this.cartItem[index].id
      const mines = this.cartItem.filter((el) => {
        if (idCart === el.id) {
          if (el.qty <= 1) {
            alert('item on minimum quantity')
            el.qty = 1
          } else {
            el.qty -= 1
          }
        }
        return el
      })
      this.cartItem = mines
    },
    closeModalCheckout () {
      this.modalToggle = 'transform: scale(0);'
      window.location = '/'
    },
    checkOut (data) {
      this.checkOutData = data.detail
      this.amount = data.amount
      this.modalToggle = 'transform: scale(1);'
    }
  }
}
</script>

<style scoped>
/* navbar */
.side-toggle {
  position: absolute;
  left: -100px;
  transition: all 0.3s ease;
  z-index: 2;
}
/* main page */
.main-page {
  display: grid;
  grid-template-columns: 1fr 400px;
}

/* food catalog */
.catalog-button {
  display: flex;
  justify-content: flex-end;
}
.btn-refresh-product {
  outline: none;
  border: 2px solid rgb(71, 71, 71);
  background-color: rgb(71, 71, 71);
  color: white;
  padding: 4.5px 7px;
  border-radius: 5px;
  transition: all 0.2s ease;
  margin: 10px;
}
.btn-refresh-product:hover {
  color: rgb(71, 71, 71);
  background-color: transparent;
}

/* search */
.search {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transform: scale(0);
  transition: all 0.3s ease;
}

/* btn-cart-toggle */
.btn-cart-toggle {
  display: none !important;
}
/* add-item */
.add-item {
  position: fixed;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: 2;
}

/* proccess-loading */
.proccess-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
/* edit-data */
.edit-data {
  position: fixed;
  transform: scale(0);
  transition: all 0.3s ease;
  z-index: 2;
}

.modal-box {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(5, 5, 5, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}
.modal-content {
  width: 400px;
  height: 80vh;
  overflow: scroll;
  padding: 20px;
  border-radius: 10px;
}
.btn-close {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 25px;
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  color: white;
  background-color: maroon;
  font-weight: bold;
}
.cashier-name {
  margin-top: -10px;
}
.list-payment {
  display: grid;
  grid-template-columns: 3.5fr 1fr;
}
.btn-payment {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  font-weight: bold;
}
.btn-payment p {
  text-align: center;
}
.btn-payment button {
  padding: 9px 10px;
  font-weight: bold;
  outline: none;
  border: none;
  color: white;
  border-radius: 5px;
}
.btn-payment button:nth-child(1) {
  background: #F24F8A;
}
.btn-payment button:nth-child(3) {
  background: #57CAD5;
}
.total span {
  margin-left: 220px;
}
/* responsive breakpoint */
@media screen and (max-width: 992px) {
  .main-page {
    grid-template-columns: 1fr;
  }
  .cart-content {
    position: fixed;
    right: -650px;
    transition: all 0.3s ease;
  }
  .btn-cart-toggle {
    display: unset !important;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 50px;
  }
}

/* event */
.side-menu-toggle {
  left: 0;
}
.search-toggle {
  transform: scale(1);
}
.cart-toggle {
  right: 0;
}
.add-item-toggle {
  transform: scale(1);
}
.modal-close {
  transform: scale(1) !important;
}
</style>
