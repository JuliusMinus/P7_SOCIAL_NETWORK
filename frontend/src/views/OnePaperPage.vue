<template >
<div class="paper">
 <Paper :paper="paper" :btnComment="false"/> 
 
 <button class="btn-paper" v-if="canDeletePaper()" @click="deletePaper">Supprimer la publication</button>  
    <form @submit.prevent = "sendComment">
    <input
        name="content"
        id="commentcontent"
        type="text"
        placeholder="Commentez ici..."
        
      />
      <button class="btn_send" type="submit" >Publiez votre commentaire</button>
</form>

<Comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
<p v-if="comments.length == 0">Aucun commentaire pour le moment</p>
</div>
    
</template>

<script>
// import des components
import Paper from "../components/Paper.vue";
 import Comment from "../components/Comment.vue";

export default {
  name: "OnePaperPage",
  data(){
      return {
          paper: {
              type: "Object"
          },
         comments:{
            type: "Object",
            default:[]
          },
      }
    },
  components: {
    Paper,
   Comment,
  },
  mounted: function(){
        const token = sessionStorage.getItem('token');
      fetch(`http://localhost:3000/api/papers/${ this.$route.params.id }`,{
                method: 'GET',
                  headers: {
                    Authorization: `Bearer ` + token,
                  }
                }
            )
            .then(res => res.json())
            .then(paper => {
              console.log(paper)
                this.paper = paper[0];

          //appel api comments users

                fetch(`http://localhost:3000/api/comments/${ this.$route.params.id }`,{
                  method: 'GET'
                }).then(res => res.json())
                .then(comments =>
                this.comments = comments
                ) 
            })
          
  },
  methods:{
        canDeletePaper(){
            return this.paper.owner_id == sessionStorage.getItem('userId');
        },
    //method envoie de commentaire

        sendComment(){
            const content = document.getElementById("commentcontent").value;
            const userId = sessionStorage.getItem('userId');
          fetch(`http://localhost:3000/api/comments/${ this.$route.params.id }`,{
                method: 'POST',
                body: JSON.stringify({content,userId}),
                headers: {
                    'Content-type': 'application/json'
                }
                    
                }
            ).then(res => res.json())
      },
      // method qui efface le post
      deletePaper(){
        
        fetch(`http://localhost:3000/api/papers/${ this.$route.params.id }`,{

          method:'DELETE'
          

        })
        .then(res => res.json)
        .then(data => console.log(data))
         
      },
       isOwner(userID){
              console.log(userID,sessionStorage.getItem('userId'))
              return userID == sessionStorage.getItem('userId');
              
            }
  }
 
};
</script>

<style lang="scss">
.comment{
     position: relative;
     .btn-post{
    border-radius: 25%;
    width: 100px;
    height: 30px;
    background-color: rgb(231, 165, 165);
    color: white;
    
}
}

</style>