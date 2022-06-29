<template>
  <Chat
    :dataSource="chatData"
    :showShade="false"
    :contactNickname="'大帅比'"
    :ownerAvatarUrl="ownerAvatarUrl"
    :contactAvatarUrl="contactAvatarUrl"
    :wrapBg="'#efefef'"
  />
</template>

<script lang="ts" setup>
import Chat from './chat.vue'
import { ref } from "vue";
import { IDataSource, TypeEnum, DirectionEnum } from "@/components/dialogue/dialogue.interface";

// wrapBg              外层父元素背景颜色，默认#efefef
// contactAvatarUrl    好友头像url
// ownerAvatarUrl      微信主人头像url
// ownerNickname       微信主人昵称

const ownerAvatarUrl = 'https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656522000&t=2d337d19bb0d9ff9359459c971b9d220';
const contactAvatarUrl = 'https://img0.baidu.com/it/u=63307426,3948621068&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656522000&t=9685ec18f580bbd3bf5705fa19e81cb7';

const chatData = ref<IDataSource[]>([
  { direction: DirectionEnum.主人, id: 1, type: TypeEnum.文本, content: '你好!![呲牙]', ctime: '6月21日 16:35' },
  { direction: DirectionEnum.联系人, id: 2, type: TypeEnum.文本, content: '你也好。[害羞]', ctime: '星期六 21: 07' },
  { direction: DirectionEnum.主人, id: 3, type: TypeEnum.文本, content: '这是Lz头像：', ctime: '昨天 21: 07' },
  { direction: DirectionEnum.主人, id: 4, type: TypeEnum.图片, content: 'https://raw.githubusercontent.com/doterlin/vue-wxChat/master/src/assets/wyz.jpg', ctime: '15:31' },
  { direction: DirectionEnum.联系人, id: 5, type: TypeEnum.文本, content: '你开心就好。[微笑]', ctime: '16: 32' },
  // { direction: DirectionEnum.主人, id: 1, type: TypeEnum.选项, content: '你好!![呲牙]', ctime: '6月21日 16:35' },
]);
</script>
