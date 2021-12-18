<template>
  <div class="forum">
    <h1>Tous vos articles !</h1>

    <router-link to="/AddPaperPage" class="btn btn-info"
      >Ajouter un article</router-link
    >
    <div class="container">
      <Paper v-for="paper in papers" :paper="paper" :key="paper.id" />
    </div>
  </div>
</template>


<script>
import Paper from "@/components/Paper.vue";
export default {
  name: "Forum",
  components: {
    Paper,
  },
  data: function () {
    return {
      papers: [],
    };
  },
  mounted() {
    const token = sessionStorage.getItem("token");
    // chercher les papers dans l'api fetch!!
    fetch(`http://localhost:3000/api/papers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => res.json())
      .then((papers) => {
        console.log(papers);
        this.papers = papers;
      });
  },
};
</script>

<style scoped>
.forum h1 {
  font-weight: bold;
  font-style: italic;
  font-size: 80px;
}
</style>