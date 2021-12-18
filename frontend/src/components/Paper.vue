<template>
  <div>
    <div class="card">
      <img :src="paper.img" class="img-fluid img-thumbnail" alt="photo de l'article" />
      <div class="card-body">
        <p class="card-text">{{ paper.username }}/{{ paper.createdAt }}</p>
        <h5 class="card-title">{{ paper.content }}</h5>
        <router-link
          v-if="btnComment"
          class="btn btn-primary"
          :to="{ name: 'OnePaperPage', params: { id: paper.id } }"
          >Voir l'article</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paper",
  props: {
    paper: {
      type: Object,
    },
    btnComment: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
  
  <style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-content: center;
  
 
}

.card-body {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  }

  


</style>