<!--Code pour la page...-->

<template>
  <div class="card">
    <div class="card_user">
      <div class="card_profile">
        <div class="card_profile-name">posté par {{ comment.username }} |</div>
        <div class="card_profile-date">posté par :{{ comment.createdAt }}</div>
      </div>
      <div class="card_sm">
        <div class="card_sm-content">{{ comment.text }}</div>
        <button type="button" class="btn btn-secondary" v-if="canDeleteComment()" @click="$emit('askDelete', comment)">
          Supprimer mon commentaire
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
  methods: {
    canDeleteComment() {
      const owner_id = parseInt(this.comment.owner_id);
      const user_id = parseInt(sessionStorage.getItem("userId"));
      const isOwner = owner_id === user_id;
      return isOwner;
    },
  },
};
</script>

<style scoped>

.card {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  border-width: 3px;
  border-color: rgb(185, 213, 255);
  box-shadow: 0px 0px 2px 2px rgb(185, 213, 255);
}
</style>