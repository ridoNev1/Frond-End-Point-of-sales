<template>
  <div class="search">
    <button @click="$emit('closesearch')">x</button>
    <form>
      <input type="text" placeholder="type something..." v-model="searchdata" @keyup="typingSearch">
      <input type="submit" @click.prevent="typingSearch" @click="$emit('closesearch')">
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  props: ['passpage'],
  data () {
    return {
      searchdata: ''
    }
  },
  methods: {
    ...mapActions({
      actionSearch: 'food/getFoodData'
    }),
    typingSearch () {
      const data = {
        search: this.searchdata,
        page: this.passpage
      }
      this.actionSearch(data).then(() => {
        alert('find item success')
      }).catch(err => {
        alert(err.message)
      })
      this.$router.push({ path: '/', query: { search: data.search, page: data.page } }).catch(err => {
        console.log(err.name)
      })
    }
  }
}
</script>

<style scoped>
.search {
  background-color: rgba(5, 5, 5, 0.6);
  transition: all 0.5s ease;
}
.search button {
  outline: none;
  border: none;
  border-radius: 25px;
  background-color: transparent;
  border: 2px solid whitesmoke;
  width: 48px;
  height: 48px;
  font-weight: bold;
  font-size: 20px;
  color: whitesmoke;
  position: absolute;
  top: 50px;
  transition: all 0.4s ease;
}
.search button:hover {
  background-color: rgb(206, 17, 17);
}

.search form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type="text"] {
  outline: none;
  border: none;
  width: 50%;
  height: 50px;
  padding: 5px 20px;
  border-radius: 30px 0 0 30px;
}
input[type="submit"] {
  border: none;
  outline: none;
  height: 50px;
  width: 120px;
  border-radius: 0 30px 30px 0;
  background-color: rgb(39, 33, 33);
  color: whitesmoke;
  font-weight: bold;
  transition: all 0.5s ease;
}
input[type="submit"]:hover {
  background-color: rgb(53, 49, 49);
}
@media screen and (max-width: 576px) {
  input[type="submit"] {
    width: 90px;
  }
}
</style>
