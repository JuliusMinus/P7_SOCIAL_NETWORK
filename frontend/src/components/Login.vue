

<template>
  <div class="formulaire">
    <h1>Formulaire de Connexion</h1>
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="InputEmail">Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="InputEmail"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>

      <div class="form-group">
        <label for="InputPassword">Mot de passe</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="InputPassword"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </div>

      <router-link to="/register">S'incrire</router-link>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      console.log(this.email, this.password);

      fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ email: this.email, password: this.password }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("token", data.token);
          this.$router.push({ name: "ForumPage" });
        })
        .catch((error) => {
          console.log(error);
          this.message = "Utilisateur enregistré";
        });
    },
  },
};
</script>

<style scoped>
.formulaire {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  width: 300px;
}

h1 {
  font-size: 25px;
}

#InputEmail {
  border-width: 3px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}

#InputPassword {
  border-width: 3px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}
</style>
