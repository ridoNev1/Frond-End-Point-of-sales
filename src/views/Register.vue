<template>
  <div class="register-page">
    <div class="register-box">
      <form class="form-register" @submit.prevent="sendRegister">
        <div class="form-data">
          <router-link to="/login" style="position: absolute;"><b-icon icon="arrow-left-circle" font-scale="1.5" style="color: maroon;"></b-icon></router-link>
          <input type="text" placeholder="email" class="form-control" required v-model="registerEMail">
          <input type="password" placeholder="password" class="form-control" required v-model="registerPassword">
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      registerEMail: '',
      registerPassword: ''
    }
  },
  methods: {
    ...mapActions({
      Register: 'onRegister'
    }),
    sendRegister () {
      const data = {
        email: this.registerEMail,
        password: this.registerPassword
      }
      this.Register(data).then(result => {
        alert(result)
        window.location = '/login'
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
.register-page {
  background-image: url(../assets/bgregister.jpg);
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.register-box {
  width: 40%;
  height: 35vh;
  background-color: #fff;
}
.form-register {
  display: grid;
  grid-template-columns: 5fr 1fr;
}
.form-register button {
  height: 35vh;
  width: 100%;
  outline: none;
  background-color: rgb(68, 67, 67);
  border: 2px solid rgb(68, 67, 67);
  font-weight: bold;
  font-size: large;
  color: #fff;
  transition: all 0.2s ease;
}
.form-register button:hover {
  background-color: rgb(87, 87, 87);
}
.form-data {
  padding: 20px;
  display: grid;
  align-content: center;
  gap: 15px;

}

@media screen and (max-width: 992px) {
  .register-box{
    width: 50%;
  }
}
@media screen and (max-width: 768px) {
  .register-box{
    width: 60%;
  }
}
@media screen and (max-width: 576px) {
  .register-box{
    width: 95%;
  }
}
</style>
