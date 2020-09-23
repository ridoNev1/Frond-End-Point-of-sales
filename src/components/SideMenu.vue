<template>
  <div class="side-menu">
    <router-link to="/">
      <img src="../assets/fork.png" alt="forkIcon" />
    </router-link>
    <router-link to="/history">
      <img src="../assets/clipboard.png" alt="historyIcon" />
    </router-link>
    <img src="../assets/add.png" alt="addIcon" style="cursor: pointer;" @click="$emit('addtoggle')"/>
    <div>
      <div v-if="type === 'history'">
        <span></span>
      </div>
      <div v-else>
        <b-icon class="btn-search mt-4" icon="search" font-scale="2" @click="$emit('searchtoggle')"></b-icon>
        <b-icon class="btn-search mt-4" icon="door-open" font-scale="2" @click="logout"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SideMenu',
  props: ['type'],
  methods: {
    ...mapActions({
      onLogout: 'logout'
    }),
    logout () {
      const confirmLogout = confirm('Are u sure want to logout ?')
      if (confirmLogout === true) {
        this.onLogout().then(() => {
          window.location = '/login'
        })
      } else {
        alert('canceled')
      }
    }
  }
}
</script>

<style scoped>
.side-menu {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 20px 12px;
  width: 65px;
  height: 100%;
}
.side-menu img {
  width: 40px;
  height: 40px;
  margin-top: 30px;
}
.btn-search {
  cursor: pointer;
}
</style>
