<template>
  <div class="tapTipBox">
    <img src="../../assets/images/ic_tap.png" alt="">
    <p>Tap to Continue</p>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.tapTipBox {
  position: fixed;
  text-align: center;
  left: calc(50% - 1.2rem);
  bottom: 1.38rem;
  font-size: 0;
  width: 2.4rem;
  height: 1.70rem;
  background: #0000007F;
  border-radius: 0.16rem;

  img {
    margin: 0.16rem 0 0.08rem;
    width: 0.9rem;
    height: 0.9rem;
    animation: visible1 1.3s infinite;
  }

  p {
    font-size: 0.24rem;
    font-family: Poppins-Medium;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 0.40rem;
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
