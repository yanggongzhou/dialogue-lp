<template>
  <div class="completeBox" :style="{height: `${width * 1.44}rem`}">
    <slot></slot>
    <div
      class="avatar"
      :class="position === PositionEnum.left ? 'avatarLeft' : 'avatarRight'"
      :style="{width: `${width}rem`, height: `${width * 1.44}rem`}"
    >
      <img v-show="dataSource.skin" :src="dataSource.skin" alt="">
      <img v-show="dataSource.cloth" :src="dataSource.cloth" alt="">
      <img v-show="dataSource.emotion" :src="dataSource.emotion" alt="">
      <img v-show="dataSource.hair" :src="dataSource.hair" alt="">
      <img v-show="dataSource.backext" :src="dataSource.backext" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { IAvatar, PositionEnum } from "@/components/avatar/avatar.interface";

const props = defineProps({
  width: Number,
  dataSource: {
    type: Object as PropType<IAvatar>,
    required: true
  },
  position: {
    type: Number as PropType<PositionEnum>,
    default: PositionEnum.left
  }
})
</script>

<style lang="less" scoped>
.completeBox {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.avatar {
  width: 250px;
  position: absolute;
  bottom: 0;
  font-size: 0;

  img {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
.avatarLeft {
  left: -1rem;
  animation: moveLeft 0.5s ease-in-out;
  transform: scaleX(1);
}

.avatarRight {
  right: -1rem;
  animation: moveRight 0.5s ease-out;
  transform: scaleX(-1);
}

@keyframes moveLeft {
  0% {
    left: -4rem;
    opacity: 0;
  }
  100% {
    left: -1rem;
    opacity: 1;
  }
}
@keyframes moveRight {
  0% {
    right: -4rem;
    opacity: 0;
  }
  100% {
    right: -1rem;
    opacity: 1;
  }
}

</style>
