<template>
  <div class="home container">
    <Login />
  </div>
</template>

<script>

// import des components//

import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
