<template>
  <div @click="chatClick" class="chat-warp" :style="{backgroundColor: wrapBg}">
    <div class="chat-header" v-if="list && list.length>0">
      <p> {{ contactNickname }}</p>
    </div>
    <div class="chat-content">
      <!-- main -->
      <ul class="message">
        <li v-for="message in list" :key="message.id"
            :class="message.direction === DirectionEnum.主人 ?'an-move-right':'an-move-left'">
          <p class="ctime">{{ message.ctime }}</p>
          <div class="mainSelf" :class="message.direction === DirectionEnum.主人 ? 'rightSelf' : ''">
            <img class="avatar" width="45" height="45" :src="message.direction===DirectionEnum.主人? ownerAvatarUrl: contactAvatarUrl"
                 alt="">
            <!-- 文本 -->
            <div v-if="message.type===TypeEnum.文本" v-emotion="message.content" class="text"></div>

            <!-- 图片 -->
            <div class="text" v-else-if="message.type===TypeEnum.图片">
              <img :src="message.content" class="image" alt="聊天图片">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, defineProps, watch, ref, nextTick, PropType } from "vue";
import { IDataSource, DirectionEnum, TypeEnum } from "@/components/dialogue/dialogue.interface";
const props = defineProps({
  contactNickname: {
    type: String,
    default: 'Handsome man'
  },
  dataSource: {
    type: Array as PropType<IDataSource[]>,
    required: true,
    default: [] as IDataSource[]
  },
  wrapBg: {
    type: String,
    default: '#efefef'
  },
  contactAvatarUrl: {
    type: String,
  },
  ownerAvatarUrl: {
    type: String,
  },
})

const list = ref<IDataSource[]>([])

watch(() => props.dataSource, (newVal) => {
  list.value = [newVal[0]];
})

onMounted(() => {
  list.value = [props.dataSource[0]];
})

const chatClick = () => {
  const append = props.dataSource[list.value.length]
  if (append) {
    list.value = [...list.value, append ]
  } else {
    list.value = [
      ...list.value,
      {
        direction: DirectionEnum.主人,
        id: 1111, type: TypeEnum.文本,
        content: '没了没了没了',
        ctime: '6月21日 16:35'
      }
    ]
  }

  nextTick(() => {
    const targetDom = document.querySelector('.message')?.lastElementChild
    if (targetDom && targetDom.scrollIntoView) {
      targetDom.scrollIntoView(true)
    }
  })
}
</script>

<style lang="less" scoped>
.chat-warp {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: relative;
  overflow: hidden;
  .chat-header {
    background: #000;
    text-align: center;
    color: #fff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .chat-content {
    box-shadow: 1px 1px 20px -5px #000;
    width: 100%;
    background: #F5F5F5;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
    height: 100%;
    position: relative;
    z-index: 1;
  }
}

.message {
  height: 100%;
  box-sizing: border-box;
  padding: 50px 15px;
  overflow-y: scroll;
  background-color: #F5F5F5;
  font-size: 12px;
  text-align: center;
  li {
    margin-bottom: 15px;
    left: 0;
    position: relative;
    display: block;
  }

  .ctime {
    margin: 10px 0;
    text-align: center;
    display: inline-block;
    padding: 0 5px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #DADADA;
  }
  .mainSelf {
    text-align: left;
    .text {
      display: inline-block;
      position: relative;
      max-width: calc(100% - 75px);
      min-height: 35px;
      line-height: 2.1;
      font-size: 15px;
      padding: 6px 10px;
      text-align: left;
      word-break: break-all;
      background-color: #fff;
      color: #000;
      border-radius: 4px;
      box-shadow: 0 1px 7px -5px #000;
      &::before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fff;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      background: #fff;
    }
    .image {
      max-width: 200px;
    }
  }

  .rightSelf {
    text-align: right;
    .text {
      background-color: #9EEA6A;
      &::before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #9EEA6A;
      }
    }
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
  }
}

.an-move-left {
  left: 0;
  animation: moveLeft .7s ease;
  -webkit-animation: moveLeft .7s ease;
}

.an-move-right {
  left: 0;
  animation: moveRight .7s ease;
  -webkit-animation: moveRight .7s ease;
}

@keyframes moveRight {
  0% {
    left: -20px;
    opacity: 0
  }
  100% {
    left: 0;
    opacity: 1
  }
}

@keyframes moveLeft {
  0% {
    left: 20px;
    opacity: 0
  }
  100% {
    left: 0;
    opacity: 1
  }
}

</style>
