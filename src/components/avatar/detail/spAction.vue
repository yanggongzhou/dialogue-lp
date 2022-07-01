<template>
  <div class="sp-action-box">
    <div class="dialog-content">
      {{ txt }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, watch } from "vue";

const props = defineProps({
  content: String
})

watch(() => props.content, (value) => {
  if (value) setTxt(value)
})
const txt = ref('')
const timer = ref<number>();
onMounted(() => {
  if (props.content) setTxt(props.content)
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
.sp-action-box {
  min-height: 100px;
  box-shadow: 0 1px 4px #00152914;
  position: absolute;
  width: 6.38rem;
  height: 2.76rem;
  left: calc(50% - 3.19rem);
  padding: 0.5rem 0.56rem 0.34rem;
  box-sizing: border-box;
  top: calc(50% - 1.38rem);
  z-index: 999;
  background: url("../../../assets/spImg/action.png") no-repeat;
  background-size: contain;
  .dialog-content {
    width: 100%;
    font-size: 0.32rem;
    font-weight: 500;
    color: #2B2B2B;
    line-height: 0.48rem;
  }
}
</style>
