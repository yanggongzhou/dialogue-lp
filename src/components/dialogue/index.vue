<template>
  <div class="dialogBox">
    <Chat
      :dataSource="chatData"
      :owner="params.owner"
      :contact="params.contact"
      :bookName="params.bookName"
      :bookIntro="params.bookIntro"
      @playNow="playNow"
    />
  </div>
</template>

<script lang="ts" setup>
import Chat from './chat.vue'
import { onBeforeMount, reactive, ref } from "vue";
import { IDataSource, TypeEnum, DirectionEnum } from "@/components/dialogue/dialogue.interface";
import { getCopyText, gostoryLog, is_ios } from "@/utils/client";
import contactImg from '@/assets/images/contact.png';
import ownerImg from '@/assets/images/owner.png';
import { copy } from "@/utils/clipboard";

const params = reactive({
  bookName: 'Hooked with CEO!',
  bookIntro: 'In real life, you have a secret crush on your dad\'s best friend, Roman Lewis, the handsome CEO. Meanwhile, you\'re develping a darker side of you with Daddy4Love on the Internet. How far away will you let your fantasies run wild?',
  owner: {
    name: 'Yara Barros',
    url: ownerImg
  },
  contact: {
    name: 'Diana Campos',
    url: contactImg
  }
})

const chatData = ref<IDataSource[]>([
  { direction: DirectionEnum.主人, id: 1, type: TypeEnum.独白, content: 'Sitting awkwardly among other graduates with their beaming, chattering parents, I suffer in silence, alone.' },
  { direction: DirectionEnum.旁白, id: 2, content: 'You are on the dean\'s list this year.  President wants to invite your parents to give a speech.' },
  { direction: DirectionEnum.联系人, id: 3, type: TypeEnum.对话, content: 'Soon there\'ll be one less pedestrian in the World!' },
  { direction: DirectionEnum.旁白, id: 4, content: ' \'\'Obviously, busy citizens breed excellent graduates. \'\' President said.' },
  { direction: DirectionEnum.联系人, id: 5, type: TypeEnum.对话, content: 'As her father\'s best friend, I believe I bear witness to Lolita\'s fine development in this marvelous school.' },
  { direction: DirectionEnum.联系人, id: 6, type: TypeEnum.对话, content: 'Don\'t worry, little girl. I\'ll take you through this.' },
  { direction: DirectionEnum.主人, id: 7, type: TypeEnum.独白, content: 'That\'s when Roman pats my shoulder from behind and gives me a wink, whispering in a dreamy voice.' },
  { direction: DirectionEnum.主人, id: 8, type: TypeEnum.独白, content: 'Tall, well-built, and devillishly enticing, Roman\'s smoking hotness sends me to the clouds.' },
  { direction: DirectionEnum.主人, id: 9, type: TypeEnum.独白, content: 'Amid a storm of applause, the speech ends, and Roman sits down draping an fatherly arm on my shoulder.' },
  { direction: DirectionEnum.主人, id: 10, type: TypeEnum.独白, content: 'That\'s when butterflies take off in my stomach, my blood veins pump, and my face blushes hot. Oh dear god...' },
  { direction: DirectionEnum.旁白, id: 11, content: 'Your heart races as you hold his strong, domineering hand. Anticipation rising as you realize he\'s pulling you towards the back of the garden.' },
  { direction: DirectionEnum.旁白, id: 12, content: 'As soon as you are out of view of anyone, he pushes you against the side of the house, pinning you against the wall.' },
  { direction: DirectionEnum.主人, id: 13, type: TypeEnum.独白, content: 'I can’t believe I’m about to do this…' },
  { direction: DirectionEnum.旁白, id: 14, content: 'Suddenly, he caresses your lips with his thumb then trails his fingers slowly down to your collarbone, sending shivers down your spine.' },
  { direction: DirectionEnum.主人, id: 15, type: TypeEnum.对话, content: 'What are you doing? Why are we out here Roman?' },
  { direction: DirectionEnum.联系人, id: 16, type: TypeEnum.对话, content: 'Isn’t it obvious? I\'m going to punish you, naughty girl.' },
  { direction: DirectionEnum.旁白, id: 17, content: 'You just look at him, speechless. Every trace of fear or guilt seems to disappear at the sight of him.' },
  { direction: DirectionEnum.旁白, id: 18, content: 'Despite his age, he’s the type of man every woman would go weak at the knees over: tall, well-built, enticing in every sense of the word.' },
  { direction: DirectionEnum.主人, id: 19, type: TypeEnum.独白, content: 'Roman Lewis. Roman effing Lewis. Unfortunately for me, my Dad’s best friend…' },
  { direction: DirectionEnum.旁白, id: 20, content: 'He runs his thumb down your cheek and along your jawline, touching you as comfortably as if you’ve been lovers for years.' },
  { direction: DirectionEnum.选项, id: 21, choiceTitle: 'I should...', content: [
    { nextId: 22, option: 'Encourage him.' },
    { nextId: 22, option: 'Push him away.' }
  ] },
  { direction: DirectionEnum.主人, id: 22, type: TypeEnum.对话, content: 'I\'m yours...my body is yours...' },
  { direction: DirectionEnum.旁白, id: 23, content: 'Roman grins dangerously.' },
  { direction: DirectionEnum.联系人, id: 24, type: TypeEnum.对话, content: 'Yes...naughty girl' },
  { direction: DirectionEnum.旁白, id: 25, content: 'Moving away from the wall, he bends you over the patio table, it feels freezing cold against your bare skin.' },
  { direction: DirectionEnum.旁白, id: 26, content: 'He leans down and touches his lips to yours.' },
  { direction: DirectionEnum.旁白, id: 27, content: 'You\'re compelled to kiss him in return.' },
  { direction: DirectionEnum.旁白, id: 28, content: 'He wants this as bad as you do.' },
  { direction: DirectionEnum.联系人, id: 29, type: TypeEnum.对话, content: 'If you only knew the things I want to do with you.' },
  { direction: DirectionEnum.旁白, id: 30, content: 'He whispers in your ear in his charming voice.' },
  { direction: DirectionEnum.旁白, id: 31, content: 'Your heart is pounding.' },
  { direction: DirectionEnum.联系人, id: 32, type: TypeEnum.对话, content: 'Get on your knees, naughtly girl. Open your mouth for me.' },
  { direction: DirectionEnum.选项, id: 33, choiceTitle: 'I want to…', content: [
    { nextId: 100, option: 'Submit to him.' },
    { nextId: 100, option: 'Misbehave.' }
  ] }
]);

const adjustObj = ref<string>('');

onBeforeMount(async () => {
  adjustObj.value = await getCopyText();
})

const playNow = async () => {
  let downloadUrl = 'https://play.google.com/store/apps/details?id=com.storymatrix.gostory';
  if (is_ios) {
    downloadUrl = 'https://apps.apple.com/cn/app/id1610053050';
  }
  await copy(adjustObj.value);
  window.location.href = downloadUrl;
}

</script>
<style lang="less" scoped>
.dialogBox {
  background: #FFF3F9;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
