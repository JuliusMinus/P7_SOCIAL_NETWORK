<template >
  <div class="paper">
    <div class="card-paper">
      <Paper :paper="paper" :btnComment="false" />

      <button
        id="btn-delete"
        class="btn btn-warning"
        v-if="canDeletePaper()"
        @click="deletePaper"
      >
        Supprimer la publication
      </button>
    </div>
    <form @submit.prevent="sendComment">
      <input
        class="form-control input-lg"
        name="content"
        id="commentcontent"
        type="text"
        placeholder="Commentez ici..."
      />
      <button class="btn btn-info" type="submit">
        Publiez votre commentaire
      </button>
    </form>

    <Comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @askDelete="deleteComment"
    />
    <p v-if="comments.length == 0">Aucun commentaire pour le moment</p>
  </div>
</template>

<script>
// import des components
import Paper from "../components/Paper.vue";
import Comment from "../components/Comment.vue";

export default {
  name: "OnePaperPage",
  data() {
    return {
      paper: {
        type: "Object",
      },
      comments: {
        type: "Object",
        default: [],
      },
    };
  },
  components: {
    Paper,
    Comment,
  },
  mounted: function () {
    fetch(`http://localhost:3000/api/papers/${this.$route.params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((paper) => {
        console.log(paper);
        this.paper = paper[0];
        this.loadComments();

        //appel api comments users
      });
  },
  methods: {
    loadComments() {
      fetch(`http://localhost:3000/api/comments/${this.$route.params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ` + sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((comments) => (this.comments = comments));
    },
    canDeletePaper() {
      return this.paper.owner_id == sessionStorage.getItem("userId");
    },
    //method envoie de commentaire

    sendComment() {
      const content = document.getElementById("commentcontent").value;
      const userId = sessionStorage.getItem("userId");
      fetch(`http://localhost:3000/api/comments/${this.$route.params.id}`, {
        method: "POST",
        body: JSON.stringify({ content, userId }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + sessionStorage.getItem("token"),
        },
      }).then((resp) => {
        if (resp.status < 300) {
          this.loadComments();
        }
      });
    },
    deleteComment(comment) {
      console.log("Ask delete ", comment);
      fetch(`http://localhost:3000/api/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json)
        .then((data) => {
          console.log("deleted ", data);
          this.loadComments();
        });
    },
    // method qui efface le post
    deletePaper() {
      fetch(`http://localhost:3000/api/papers/${this.$route.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + sessionStorage.getItem("token"),
        },
      })
        .then((res) => res.json)
        .then((data) => {
          window.location.href = "#/Forum";
          console.log("deleted ", data);
        });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.btn-delete {
  display: flex;
  justify-content: center;
  width: 50%;
}
</style>