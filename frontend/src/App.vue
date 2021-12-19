<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <router-link to="/forum" class="navbar-brand"
          ><img src="./assets/icon-left-font-monochrome-black.png"
        /></router-link>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active"></li>
          <a class="nav-link" @click="logout()" v-if="isConnected()"
            >Se déconnecter</a
          >
          <li class="nav-item"></li>
        </ul>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    isConnected() {
      return sessionStorage.getItem("token") !== null;
    },
    logout() {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      window.location.href = "#/";
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-brand {
  img {
    height: 300px;
  }
}

.nav-link {
  font-size: 20px;
}
</style>
