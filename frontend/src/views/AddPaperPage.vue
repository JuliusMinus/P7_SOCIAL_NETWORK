<template>
  <div class="addpaper container">
    <AddPaper/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddPaper from '@/components/AddPaper.vue'

export default {
  name: 'AddPaperPage',
  components: {
    AddPaper
  }
}
</script>