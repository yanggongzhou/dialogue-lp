<template>
  <div class="dialogBox">
    <Chat
      :dataSource="chatData"
      :owner="owner"
      :contact="contact"
      :bookName="'The Prince\'s Sex Dol'"
      :bookIntro="'In real life, you have a secret crush on your dad\'s best friend, Roman Lewis, the handsome CEO. Meanwhile, you\'re develping a darker side of you with Daddy4Love on the Internet. How far away will you let your fantasies run wild?'"
      :narration="'What if a narrator long?  Change to three lines, you get it.'"
    />
  </div>
</template>

<script lang="ts" setup>
import Chat from './chat.vue'
import { ref } from "vue";
import { IDataSource, TypeEnum, DirectionEnum } from "@/components/dialogue/dialogue.interface";

const owner = {
  name: 'Yara Barros',
  url: 'https://img1.baidu.com/it/u=592570905,1313515675&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656522000&t=2d337d19bb0d9ff9359459c971b9d220'
}
const contact = {
  name: 'Diana Campos',
  url: 'https://img0.baidu.com/it/u=63307426,3948621068&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656522000&t=9685ec18f580bbd3bf5705fa19e81cb7'
}

const chatData = ref<IDataSource[]>([
  { direction: DirectionEnum.主人, id: 1, type: TypeEnum.文本, content: 'Sitting awkwardly among other graduates with their beaming, chattering parents, I suffer in silence, alone.' },
  { direction: DirectionEnum.联系人, id: 2, type: TypeEnum.文本, content: 'Soon there\'ll be one less pedestrian in the World!' },
  { direction: DirectionEnum.主人, id: 3, type: TypeEnum.文本, content: 'I see you\'re really enjoying your holiday, it\'s great：' },
  { direction: DirectionEnum.主人, id: 4, type: TypeEnum.图片, content: 'https://raw.githubusercontent.com/doterlin/vue-wxChat/master/src/assets/wyz.jpg' },
  { direction: DirectionEnum.联系人, id: 5, type: TypeEnum.文本, content: 'OMG That\'s amazing！' },
  { direction: DirectionEnum.选项, id: 7, content: [
    { nextId: 8, option: 'I should...' },
    { nextId: 8, option: 'Encourage him.' },
    { nextId: 8, option: 'Push him away.' }
  ] }
]);

</script>
<style lang="less" scoped>
.dialogBox {
  background: #FFF3F9;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
