<template>
  <div class="tapTipBox">
    <img src="../../assets/images/tap-tip.png" alt="">
    <p>Tap to Continue</p>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.tapTipBox {
  width: 100%;
  position: fixed;
  height: 1.6rem;
  text-align: center;
  bottom: 1.3rem;
  font-size: 0;
  left: 0;

  img {
    width: 0.72rem;
    height: 1.12rem;
    animation: visible1 1.3s infinite;
  }

  p {
    font-size: 0.26rem;
    font-family: Poppins-Medium;
    font-weight: 500;
    color: #4D2B3C;
    line-height: 0.48rem;
  }
}

@keyframes visible1 {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
