<template>
  <div class="add-item">
    <div class="loading" v-if="insertLoading === true">
      <div>
        <h1 class="font-weight-bold text-white image">Loading...</h1>
      </div>
    </div>
    <div class="modal-box" v-else>
      <div class="item-data">
        <h3>Add Item</h3>
        <form @submit.prevent="sendData" enctype="multipart/form-data">
          <label>Name</label>
          <input type="text" v-model="product_name" required />
          <label>Price</label>
          <input type="text" v-model="price" required />
          <label>id category</label>
          <b-form-select v-model="id_category" class="mb-3 category-select" required >
            <b-form-select-option :value="null">Please select an option</b-form-select-option>
            <b-form-select-option
              v-for="(item, index) in categoryData"
              :key="index"
              :value="item.id_category"
            >{{item.category}}</b-form-select-option>
          </b-form-select>
          <label>File</label>
          <input type="file" @change="processFile($event)" required />
          <span></span>
          <div class="form-button">
            <input type="submit" value="Send" />
            <input type="button" value="cancel" @click="$emit('addclose')" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddItem',
  data () {
    return {
      product_name: null,
      price: null,
      id_category: null,
      image: null
    }
  },
  computed: {
    ...mapGetters({
      categoryData: 'category/getCategory',
      insertLoading: 'food/getInsertLoading'
    })
  },
  methods: {
    processFile (event) {
      this.image = event.target.files[0]
    },
    ...mapActions({
      loadCategory: 'category/loadCategory',
      insertFoodData: 'food/insertFoodData'
    }),
    sendData () {
      const fd = new FormData()
      fd.append('image', this.image)
      fd.append('productname', this.product_name)
      fd.append('price', this.price)
      fd.append('category', this.id_category)

      this.insertFoodData(fd).catch(err => {
        if (err.message === 'Request failed with status code 403') {
          alert('Only admin can do this')
        }
      })
    }
  },
  mounted () {
    this.loadCategory()
  }
}
</script>

<style scoped>
.add-item {
  background-color: rgba(5, 5, 5, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.modal-box {
  background-color: #fff;
  width: 40%;
  height: 360px;
  border-radius: 20px;
  padding: 20px;
}
.item-data form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 15px;
}
.item-data form input,
.category-select {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cecece;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  height: 38px;
  padding: 4px 15px;
  font-weight: bold;
}
.form-button {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}
.form-button input {
  width: 100px !important;
  color: white;
  transition: all 0.5s ease;
}
.form-button input:nth-child(1) {
  border: 2px solid #f24f8a;
  background-color: #f24f8a;
}
.form-button input:nth-child(1):hover {
  background-color: transparent;
  color: #f24f8a;
}
.form-button input:nth-child(2) {
  background-color: #57cad5;
  border: 2px solid #57cad5;
}
.form-button input:nth-child(2):hover {
  background-color: transparent;
  color: #57cad5;
}

/** loading */
.loading .image {
  width: 350px;
  height: 250px;
  background-image: url(../assets/loadingAnim.gif);
  background-size: cover;
  padding: 20px;
  border-radius: 15px;
}

/* responsive breakpoint */
@media screen and (max-width: 992px) {
  .modal-box {
    width: 70%;
  }
}
@media screen and (max-width: 576px) {
  .modal-box {
    width: 90%;
  }
}
</style>
