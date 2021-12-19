<!--Code pour la page...-->

<template>
  <div class="register">
    <form @submit.prevent="register()">
      <p class="text-danger">{{ message }}</p>
      <div class="form-group">
        <label for="registerpage-mail">Email </label>
        <input
          class="form-control"
          id="registerpage-mail"
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div class="form-group">
        <label for="registerpage-pseudo">Pseudo </label>
        <input
          class="form-control"
          id="registerpage-pseudo"
          v-model="username"
          type="text"
          placeholder="Pseudo"
          required
        />
      </div>
      <div class="form-group">
        <label for="registerpage-password">Mot de passe </label>
        <input
          class="form-control"
          id="registerpage-password"
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="form-group">
        <label for="registerpage-passwordcheck"
          >Vérification du mot de passe
        </label>
        <input
          class="form-control"
          id="registerpage-passwordcheck"
          v-model="passwordCheck"
          type="password"
          placeholder="Password check"
          required
        />
      </div>
      <div class="form-group">
        <button class="btn btn-success" id="registerpage-btn" type="submit">
          Soumettre
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",

  data() {
    return {
      message: "",
      email: "",
      username: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    register() {
      if (this.password === this.passwordCheck) {
        fetch("http://localhost:3000/api/users/register", {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 201) {
              this.$router.push({ name: "Home" });
            } else if (res.status === 403) {
              return res.json();
            }
          })
          .then((data) => {
            this.message = data.message;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.message = "Vérifier le mot de passe";
      }
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
}
#registerpage-mail {
  border-width: 2px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}

#registerpage-pseudo {
  border-width: 2px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}

#registerpage-password {
  border-width: 2px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}

#registerpage-passwordcheck {
  border-width: 2px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}


</style>