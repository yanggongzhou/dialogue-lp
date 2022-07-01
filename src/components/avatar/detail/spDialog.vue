<template>
  <div
    class="p-dialog-box"
    :class="position === PositionEnum.left ? 'dialogLeft' : 'dialogRight'"
  >
    <img class="dialog-bg" src="../../../assets/spImg/dialog.png" alt="">
    <div class="chapter-name">{{ data.roleName || '' }}</div>
    <div class="dialog-content">
      {{ txt }}
    </div>

    <div v-if="data.type === 'select_chat'" class="select-chat-warp">
      <div v-for="val in data.options" :key="val" class="select-chat" @click.stop="emits('selectChange', val)">{{ chatInfo[val].content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, defineEmits, watch, PropType } from "vue";
import { PositionEnum } from "@/components/avatar/avatar.interface";

const props = defineProps({
  data: Object,
  chatInfo: Object,
  position: {
    type: Number as PropType<PositionEnum>,
    default: PositionEnum.left
  }
})

const emits = defineEmits(['selectChange'])

watch(() => props.data.content, (value) => {
  if (value) setTxt(value)
})
const txt = ref('')

const timer = ref<number>();

onMounted(() => {
  console.log('props.content===>', props.data.content)
  if (props.data.content) setTxt(props.data.content)
})

const setTxt = (text: string) => {
  clearInterval(timer.value);
  txt.value = '';
  const textData = text.split(' ');
  let i = 0
  timer.value = setInterval(() => {
    if (txt.value.length < text.length) {
      txt.value += textData[i] + ' '
      i++;
    } else {
      clearInterval(timer.value);
    }
  }, 50);
}
</script>

<style lang="less" scoped>
.p-dialog-box {
  height: 2.62rem;
  box-shadow: 0 1px 4px #00152914;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  box-sizing: border-box;
  .dialog-bg {
    position: absolute;
    width: 6.8rem;
    height: 2.62rem;
    z-index: 1;
    left: calc(50% - 3.4rem);
  }
  .chapter-name {
    width: 2.1rem;
    height: 0.4rem;
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.4rem;
    position: absolute;
    top: 0.48rem;
    color: #FFF;

    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    z-index: 9;
  }
  .dialog-content {
    position: absolute;
    z-index: 9;
    left: calc(50% - 2.88rem);
    top: 1rem;
    width: 5.76rem;
    font-size: 0.32rem;
    font-weight: 500;
    color: #2B2B2B;
    line-height: 0.48rem;
  }
  .select-chat-warp {
    position: absolute;
    top: 2.62rem;
    left: calc(50% - 3.2rem);
    .select-chat {
      margin-top: 0.1rem;
      width: 6.4rem;
      height: 1.04rem;
      background: url("../../../assets/spImg/selectChat.png") no-repeat;
      background-size: contain;
      padding: 0.16rem 0.32rem;
      box-sizing: border-box;
      font-size: 0.28rem;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 0.36rem;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
}
.dialogLeft {
  .dialog-bg {
    transform: scaleX(1);
  }
  .chapter-name{
    left: 2.25rem;
  }
}
.dialogRight {
  .dialog-bg {
   transform: scaleX(-1);
  }
  .chapter-name{
    right: 2.25rem;
  }
}
</style>
