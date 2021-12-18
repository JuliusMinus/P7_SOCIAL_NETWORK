<template>

<div>
<div class="card" style="width: 18rem;">
  <img :src="paper.img" class="card-img-top" alt="photo de l'article">
  <div class="card-body">
  
    <p class="card-text">{{paper.username}}/{{paper.createdAt}}</p>
    <h5 class="card-title">{{paper.content}}</h5>
    <router-link v-if="btnComment" class="btn btn-primary" :to="{name: 'OnePaperPage', params : {id : paper.id} }">Voir l'article</router-link>
  </div>
</div>
</div>


</template>

<script>
export default {

  name: 'Paper',
  props: {
    paper : {
      type: Object
    },
    btnComment: {
      type : Boolean,
      default : true
    }
  }
}
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: center;
    width: 100% !important;
    height: 30rem !important;
  }
  
  
  .card-body{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    width:100% !important;
   }

 .card-img-top{

display: flex;
align-content: center;
justify-content: center;
align-items: center;
width: 50rem !important;
height: 28rem !important;


}
  
  
  </style>