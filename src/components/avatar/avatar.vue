<template>
  <div class="avatar" :style="{width: `${width}rem`, height: `${width * 1.44}rem`}">
    <img :src="dataSource.skin" alt="">
    <img :src="dataSource.cloth" alt="">
    <img :src="dataSource.emotion" alt="">
    <img :src="dataSource.hair" alt="">
    <img :src="dataSource.backext" alt="">
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { IAvatar } from "@/components/avatar/avatar.interface";

const props = defineProps({
  width: Number,
  dataSource: {
    type: Object as PropType<IAvatar>,
    required: true
  },
})
</script>

<style lang="less" scoped>
.avatar {
  width: 250px;
  position: absolute;
  bottom: 0;
  left: 84px;

  img {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}

</style>
