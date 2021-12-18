<template>
  <div class="card">
    <div class="card_user">
      <div class="card_profile">
        <div class="card_profile-name">posté par {{ comment.username }} |</div>
        <div class="card_profile-date">posté par :{{ comment.createdAt }}</div>
      </div>
      <div class="card_sm">
        <div class="card_sm-content">{{ comment.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
};
</script>