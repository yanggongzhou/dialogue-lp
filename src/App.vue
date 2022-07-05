<template>
  <Dialogue/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Dialogue from '@/components/dialogue/index.vue'

@Options({
  components: {
    Dialogue,
  }
})
export default class App extends Vue {}
</script>
