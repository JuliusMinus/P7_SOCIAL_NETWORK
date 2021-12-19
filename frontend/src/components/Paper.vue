<template>
  <div class="card">
    
      <div class="image">
      <img :src="paper.img" class="card-img-left" alt="photo de l'article"/>
      </div>
      <div class="card-body">
        <p class="card-text">{{ paper.username }}/{{ paper.createdAt }}</p>
        <h5 class="card-title">{{ paper.content }}</h5>
        <router-link
          v-if="btnComment"
          class="btn btn-primary"
          :to="{ name: 'OnePaperPage', params: { id: paper.id } }"
          >Voir l'article
          </router-link>
     
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
  margin-top: 20px;
  margin-bottom:20px;
  border-color: rgb(185, 213, 255);
  border-width: 2px;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 5px rgb(185, 213, 255);
  
 
}

.card-body {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  }

  .card-img-left {
   max-width:150px;
   height: auto;
   border-radius: 15px;
  }

  


</style>