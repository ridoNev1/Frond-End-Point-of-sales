<template>
  <div class="nav">
    <div class="hamburger-menu">
      <input class="hamburger-animation" type="checkbox" @click="$emit('sidemenutoggle')"/>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="main-title">
      <div v-if="type === 'home'">
        <h2>Food Item</h2>
      </div>
      <div v-else>
        <h2>History</h2>
      </div>
    </div>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['type']
}
</script>

<style scoped>
.nav {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.nav h2 {
  font-weight: bold;
}
.hamburger-menu {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
}
.hamburger-menu span {
  width: 30px;
  height: 4px;
  background-color: rgb(75, 73, 73);
  margin-bottom: 5px;
  border-radius: 10px;
  transition: all 0.4s ease;
}
.hamburger-menu .hamburger-animation {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}
.hamburger-menu span:nth-child(2) {
  transform-origin: 0 0;
}
.hamburger-menu span:nth-child(4) {
  transform-origin: 0 100%;
}
.hamburger-menu input:checked ~ span:nth-child(2) {
  transform: rotate(45deg) translate(1px, -1px);
  background-color: rgb(161, 6, 6);
}
.hamburger-menu input:checked ~ span:nth-child(3) {
  transform: scale(0);
}
.hamburger-menu input:checked ~ span:nth-child(4) {
  transform: rotate(-45deg) translate(0px, 2px);
}
.search {
  outline: none;
  background-color: #fff;
  border: none;
}
</style>
