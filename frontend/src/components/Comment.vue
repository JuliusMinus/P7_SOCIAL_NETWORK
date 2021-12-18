<template>
    <div class="card">
    <div class="card_user">
      <div class="card_profile">
        <div class="card_profile-name"> {{ comment.username }} |</div>
        <div class="card_profile-date">posté le :{{ comment.createdAt }}</div>
      </div>
      <div class="card_sm">
        <div class="card_sm-content">{{ comment.content }}</div>
       
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment']
}
</script>