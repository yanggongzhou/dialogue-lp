<template>
  <div class="chat-warp" @click="chatClick()">
    <!--遮罩-->
    <div class="zhezhao"></div>
    <audio ref="musicRef" preload loop autoplay v-show="false">
      <source :src="audioUrl" type="audio/mpeg">
    </audio>
    <div class="chat-content">
      <div class="book-name">{{ bookName }}</div>
      <img src="../../assets/images/bookHw.png" alt="">
      <div class="bookIntro">{{ bookIntro }}</div>
    </div>
    <!-- main -->
    <ul class="message">
      <li v-for="message in list" :key="message.id"
          :class="{
            'an-move-right':message.direction === DirectionEnum.主人,
            'an-move-left': message.direction === DirectionEnum.联系人
          }">
        <div
          v-if="DirectionEnum.主人 === message.direction || DirectionEnum.联系人 === message.direction"
          class="mainSelf" :class="message.direction === DirectionEnum.主人 ? 'rightSelf' : ''">
          <img class="avatar" :src="message.direction===DirectionEnum.主人? owner.url: contact.url"
               alt="">
          <!-- 文本 -->
          <div class="dialog-content">
            <p class="role-name" v-show="message.direction">
              {{ message.direction === DirectionEnum.主人 ? owner.name : contact.name }}
            </p>
            <div v-if="message.type===TypeEnum.对话" class="text">{{ message.content }}</div>
            <div v-else-if="message.type===TypeEnum.独白" class="monologue">{{ message.content }}</div>
            <!-- 图片 -->
            <div class="text" v-else-if="message.type===TypeEnum.图片">
              <img :src="message.content" class="image" alt="">
            </div>
          </div>
        </div>
        <!-- 选项 -->
        <div v-else-if="DirectionEnum.选项 === message.direction" class="chooseBox">
          <div class="choose-tip">
            <i></i>
            <i></i>
            <i>Please choose</i>
            <i></i>
            <i></i>
          </div>
          <div class="choose-title">
            {{ message?.choiceTitle }}
          </div>
          <div class="choose-content">
            <div class="choose-option" v-for="(opt, ind) in message.content" :key="ind" v-waves
                 @click.stop="optClick(opt, message.id)">
              {{ opt.option }}
            </div>
          </div>
        </div>
        <!--        旁白-->
        <div v-else-if="DirectionEnum.旁白 === message.direction" class="cha-narration">{{ message.content }}</div>
      </li>
      <div v-if="isShowFooter" class="footer">
        <img class="footer-tip" src="../../assets/images/divided.png" alt="">
        <p class="footer-title">Download GoStory and start reading <br>《{{ bookName }}》</p>
        <img class="footer-hand" src="../../assets/images/hand.png" alt="">
      </div>
    </ul>
    <div class="play-btn">
      <div class="btn" v-waves @click="emits('playNow')">Play Now</div>
    </div>
    <TapTip v-show="isShowTapTip"/>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, nextTick, onMounted, PropType, ref } from "vue";
import { DirectionEnum, IDataSource, TypeEnum } from "@/components/dialogue/dialogue.interface";
import audioUrl from '@/assets/default_bgm.mp3'
import TapTip from './tapToContinue.vue'
import { gostoryLog } from "@/utils/client";

const props = defineProps({
  bookName: {
    type: String,
  },
  bookIntro: {
    type: String,
  },
  dataSource: {
    type: Array as PropType<IDataSource[]>,
    required: true,
    default: [] as IDataSource[]
  },
  owner: {
    type: Object as PropType<{ name: string; url: string }>,
  },
  contact: {
    type: Object as PropType<{ name: string; url: string }>,
  },
})

const emits = defineEmits(['playNow'])

const isShowFooter = ref(false); // 是否展示底部提示
const isShowTapTip = ref(true); // 是否展示点击提示
const musicRef = ref<HTMLAudioElement>(); // 音乐ref
let timer = ref<number>();

const list = ref<IDataSource[]>([])

onMounted(() => {
  list.value = props.dataSource?.slice(0, 3);
  aiPlay();
})
// 自动播放
const aiPlay = () => {
  timer = setTimeout(() => {
    if (isShowTapTip.value) {
      chatClick(true)
    }
    aiPlay();
  }, 5000)
}

const aiPlay2 = () => {
  timer = setTimeout(() => {
    if (!isShowTapTip.value && list.value.length !== props.dataSource?.length) {
      isShowTapTip.value = true;
      aiPlay();
    }
  }, 5000)
}
// 自动定位
const scrollDown = () => {
  nextTick(() => {
    const targetDom = document.querySelector('.message')?.lastElementChild
    if (targetDom && targetDom.scrollIntoView) {
      targetDom.scrollIntoView(true)
    }
  })
}

// 页面点击
const chatClick = async (flag?: boolean) => {
  if (!flag) {
    isShowTapTip.value = false;
    clearTimeout(timer);
    aiPlay2()
    if (musicRef.value && musicRef.value.paused) {
      musicRef.value.currentTime = 0;
      musicRef.value.play();
    }
    await gostoryLog({ action: 3 }, 'story_user_click')
  } else {
    await gostoryLog({ action: 3 }, 'story_auto_click')
  }

  if (list.value[list.value.length - 1].direction === DirectionEnum.选项) return;
  const append = props.dataSource[list.value.length]

  if (list.value.length === props.dataSource?.length - 1) {
    isShowFooter.value = true
    clearTimeout(timer);
    isShowTapTip.value = false;
  }
  if (append) {
    list.value = [...list.value, append]
  } else {
    isShowFooter.value = true
    clearTimeout(timer);
    isShowTapTip.value = false;
  }
  scrollDown()
}

const optClickIds: Array<string | number> = [];
// 选项点击
const optClick = async (opt: { nextId: string | number; option: string }, id: string | number) => {
  const { nextId, option } = opt;
  // 防止再点
  if (optClickIds.indexOf(id) !== -1) {
    await chatClick()
  } else {
    optClickIds.push(id);
  }

  const append = props.dataSource?.find(val => val.id === nextId);
  if (append) {
    list.value = [...list.value, append]
    await gostoryLog({ action: 3 }, 'story_user_click')
  } else {
    isShowFooter.value = true;
    emits('playNow')
    await gostoryLog({ chooseBtn: option, action: 2 }, 'luodiyelogClick_click_gostory_selectbtn')
  }
  scrollDown()
}

</script>

<style src="./index.less" lang="less" scoped></style>
