<template>
  <div>
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
          if (error.response.status === 404) {
            this.message = "Utilisateur inconnu.";
          }
          if (error.response.status === 401) {
            this.message = "Email ou mot de passe invalide.";
          }
          if (error.response.status === 500) {
            this.message = "Erreur serveur.";
          }
          this.message = "Connard";
        });
    },
  },
};
</script>

<style scoped>
form {
  width: 400px;
}
</style>
