<template>
  <div class="login">
    <div class="main-login">
      <div class="login-page">
        <div class="image">
          <div class="welcome-title">
            <h1 class="font-weight-bold mt-5 mr-4" style="text-shadow: 1px 1px 3px rgba(5, 5, 5, 0.6);">Welcome to <span class="text-danger">Login Page</span><br>
            <h4>Point of sales aplication</h4></h1>
          </div>
        </div>
        <div>
          <form class="form-login" @submit.prevent="login">
            <input type="text" placeholder="email" class="form-control" required v-model="form.loginEmail"/>
            <input type="password" placeholder="password" class="form-control" required v-model="form.loginPassword"/>
            <input type="submit" value="Log in" class="login-button" />
          </form>
          <p class="ml-4 register-text">Don't have any account ? <router-link to="/register">Register</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        loginEmail: '',
        loginPassword: ''
      }
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'onLogin'
    }),
    login () {
      this.onLogin(this.form).then(result => {
        if (result === "Cannot read property 'password' of undefined") {
          alert('Login Failed')
          localStorage.removeItem('token')
        } else {
          window.location = '/'
        }
      }).catch(err => {
        if (err.message === 'Request failed with status code 401') {
          alert('This Account need to verified, check your email account')
        }
      })
    }
  }
}
</script>

<style scoped>
.login-content {
  padding: 25px;
}
.login-title {
  box-shadow: 1px 1px 3px rgba(5, 5, 5, 0.6);
  color: rgb(71, 70, 70);
  border-radius: 10px;
}
.main-login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(34, 34, 34);
  height: 100vh;
}
.login-page {
  width: 95%;
  border-radius: 17px;
  box-shadow: 2px 2px 10px rgba(5, 5, 5, 0.6);
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #fff;
}
/* image market */
.image {
  background-image: url(../assets/76541.jpg);
  background-size: cover;
  height: 90vh;
  border-radius: 17px 0 0 17px;
}
.welcome-title {
  background-color: rgba(5, 5, 5, 0.6);
  height: 100%;
  border-radius: 17px 0 0 17px;
  display: flex;
  justify-content: flex-end;
  color: #fff;
}
/* form login */
.form-login {
  padding: 20px;
  border-radius: 0 17px 17px 0;
}
.form-login input {
  margin-top: 20px;
}
.form-login input[type = 'text'],
.form-login input[type = 'password'] {
  border: none;
  border-bottom: 1px solid rgb(160, 159, 159);
  border-radius: 0;
}

.login-button {
  width: 100%;
  outline: none;
  background-color: rgb(34, 34, 34);
  padding: 7px;
  border: 2px solid rgb(34, 34, 34);
  color: white;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.login-button:hover {
  background-color: transparent;
  color: rgb(34, 34, 34);
}
.register-text a {
  color: maroon;
}
/* responsive breakpoint */

@media screen and (max-width: 1050px) {
  .main-login {
    height: 140vh;
  }
  .image {
    border-radius: 17px 17px 0 0;
  }
  .login-page {
    grid-template-columns: 1fr;
  }
  .form-login {
    border-radius: 0 0 17px 17px;
  }
  .welcome-title {
    border-radius: 17px 17px 0 0;
  }
}

@media screen and (max-width: 576px) {
  .main-login {
    height: 100%;
  }
  .image {
    border-radius: 0;
  }
  .login-page {
    width: 100%;
    box-shadow: none;
  }
  .form-login {
    border-radius: 0;
  }
  .login-page {
    border-radius: 0;
  }
  .welcome-title {
    border-radius: 0;
  }
}
</style>
