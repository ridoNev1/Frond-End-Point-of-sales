<template>
  <div>
    <div v-if="allFoodData.isLoading === true">
      <div class="loading-page">
        <b-icon icon="clock" animation="spin" font-scale="5" shift-v="8"></b-icon>
      </div>
    </div>
    <div v-else>
      <div v-if="allFoodData.foodData.length === 0" class="not-found-page">
        <h3 class="font-weight-bold" style="color: lightgrey;">No data found</h3>
        <img src="../assets/notFound.jpg" class="not-found" alt="404 image" />
      </div>
      <div v-else class="card">
        <div class="main-card" v-for="(item, index) in allFoodData.foodData" :key="index">
          <div
            class="card-img"
            :style="`background-image: url(http://34.232.66.65:3002/${item.image});`"
          >
            <div class="card-hover h1">
              <b-icon
                icon="trash"
                class="rounded-circle bg-danger p-2 button-menu"
                variant="light"
                @click="deleteItem(item.id)"
              ></b-icon>
              <img src="../assets/1598010190175.png" alt="cart icon" class="add-btn" @click="$emit('addtocart', item.id, index)"/>
              <b-icon icon="pen" class="rounded-circle bg-info p-2 button-menu" variant="light" @click="$emit('editdata', item.id, index)"></b-icon>
            </div>
          </div>
          <div class="product-detail">
            <h3>{{item.product_name}}</h3>
            <p>Rp. {{item.price}}</p>
          </div>
        </div>
      </div>
      <div class="pagination-button">
        <button @click="previousPage">Previous</button>
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Card',
  data () {
    return {
      pagination: 1
    }
  },
  computed: {
    ...mapGetters({
      allFoodData: 'food/getAllFood',
      totalPage: 'food/getPagination'
    })
  },
  methods: {
    ...mapActions({
      processFoodData: 'food/getFoodData',
      deleteFoodData: 'food/deleteFoddData'
    }),
    deleteItem (id) {
      const deleteConfirm = confirm('are u sure want to delete item ?')
      if (deleteConfirm === true) {
        this.deleteFoodData(id)
          .then(() => {
            window.location = '/'
          })
          .catch((err) => {
            if (err.message === 'Request failed with status code 403') {
              alert('Only admin can do this')
            }
          })
      } else {
        alert('canceled')
      }
    },
    nextPage () {
      if (this.pagination >= this.totalPage) {
        alert('Already on last page')
      } else {
        this.pagination += 1
        const data = {
          search: '',
          page: this.pagination
        }
        this.processFoodData(data)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      this.$emit('parsepage', this.pagination)
    },
    previousPage () {
      if (this.pagination <= 1) {
        alert('Already in page 1')
      } else {
        this.pagination -= 1
        const data = {
          search: '',
          page: this.pagination
        }
        this.processFoodData(data)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      this.$emit('parsepage', this.pagination)
    }
  },
  mounted () {
    const data = {
      search: '',
      page: 1
    }
    this.processFoodData(data)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.loading-page {
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  background-color: transparent;
  border: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
}
.main-card {
  width: 250px;
  border-radius: 10px 10px 0 0;
}
.card-img {
  width: 250px;
  height: 200px;
  border-radius: 10px 10px 0 0;
  background-size: cover;
}
.card-hover {
  background-color: rgba(4, 4, 4, 0.4);
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  opacity: 0.01;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  padding-right: 7px;
}
.card-hover:hover {
  opacity: 1;
}
.card-hover .button-menu {
  cursor: pointer;
}
.product-detail p {
  font-weight: bold;
  font-size: 20px;
}
.add-btn {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 25px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.add-btn:hover {
  background-color: rgb(226, 224, 224);
}
.not-found {
  width: 300px;
}
.not-found-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px;
  justify-items: center;
  border-top: 1px solid rgb(112, 112, 112);
  padding-top: 20px;

}
.pagination-button button {
  width: 150px;
  outline: none;
  font-weight: bold;
  padding: 4px;
  border-radius: 5px;
  background-color: maroon;
  color: white;
  border: 2px solid maroon;
  transition: all 0.2s ease;
}

.pagination-button button:hover {
  background-color: transparent;
  color: maroon;
}
</style>
