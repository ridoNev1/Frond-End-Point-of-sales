<template>
  <div class="add-item">
    <div class="loading" v-if="insertLoading === true">
      <div>
        <h1 class="font-weight-bold text-white image">Loading...</h1>
      </div>
    </div>
    <div class="modal-box" v-else>
      <div class="item-data">
        <h3>Edit Item</h3>
        <form @submit.prevent="sendData" enctype="multipart/form-data">
          <label>Name</label>
          <input type="text" v-model="oldProductName"/>
          <label>Price</label>
          <input type="text" v-model="oldPrice" />
          <label>File</label>
          <input type="file" @change="processFile($event)" />
          <span></span>
          <div class="form-button">
            <input type="submit" value="Send" />
            <input type="button" value="cancel" @click="$emit('editboxtoggle')"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditData',
  props: ['productname', 'price'],
  data () {
    return {
      image: null,
      oldProductName: null,
      oldPrice: null
    }
  },
  watch: {
    productname (value) {
      this.oldProductName = value
    },
    price (value) {
      this.oldPrice = value
    }
  },
  computed: {
    ...mapGetters({
      insertLoading: 'food/getInsertLoading'
    })
  },
  methods: {
    processFile (event) {
      this.image = event.target.files[0]
    },
    ...mapActions({
      loadCategory: 'category/loadCategory'
    }),
    sendData () {
      const fd = new FormData()
      fd.append('product_name', this.oldProductName)
      fd.append('price', this.oldPrice)
      fd.append('image', this.image)
      this.$emit('sendeditdata', fd)
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
