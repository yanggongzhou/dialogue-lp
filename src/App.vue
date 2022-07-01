<template>
  <Dialogue/>
<!--  <Avatar/>-->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Dialogue from '@/components/dialogue/index.vue'
import Avatar from '@/components/avatar/index.vue'

@Options({
  components: {
    Dialogue,
    Avatar
  }
})
export default class App extends Vue {}
</script>
