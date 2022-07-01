<template>
  <div class="avatar-warp" :style="[sceneStyle]" @click="nextNode">
    <div class="scene-content">{{ nodeData.scene_content }}</div>

    <div class="snow" v-for="val in 50" :key="val"></div>
    <!--    对话-->
    <SpDialog
      v-show="nodeData.type === 'chat' || nodeData.type === 'select_chat'"
      :chatInfo="chat_info"
      :data="nodeData"
      @selectChange="selectChange"
    />
    <!--    选择装扮-->
    <SpChoiceLook
      v-if="['select_role_skin', 'select_role_hair', 'select_role_cloth'].indexOf(nodeData.type) !== -1"
      @confirm="() => {}"
      @left="choiceLookEvent('left')"
      @right="choiceLookEvent('right')"
    />
    <!--    旁白 action-->
    <SpAction
      v-show="nodeData.type === 'action'"
      :content="nodeData.content"
    />
    <AvatarItem v-show="isShowAvatar" :data-source="dataSource" :width="6" :position="nodeData?.pos_id ? PositionEnum[nodeData?.pos_id] : PositionEnum.left"></AvatarItem>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import AvatarItem from '@/components/avatar/avatar.vue';
import { IAvatar, PositionEnum } from "@/components/avatar/avatar.interface";
import chatJson from '@/chapter/chat.json';
import SpDialog from './detail/spDialog.vue'
import SpChoiceLook from './detail/choiceLook.vue'
import SpAction from './detail/spAction.vue'

const { chat_info, role_info } = chatJson;
// 角色数据
const dataSource = ref<IAvatar>({})
// 是否显示角色
const isShowAvatar = ref(true);
// 背景
const sceneStyle = reactive({})

const nodeData = ref(chat_info[chat_info.start_id.next_id]) // 节点数据；
// const nodeData = ref(chat_info.chat_10172) // select_chat；

const baseUrl = 'http://work-platform.hw.dzods.cn/chapter/res/'

onBeforeMount(async () => {
  updateNode();
})

const updateNode = () => {
  // 角色
  if (nodeData.value.role_id) {
    isShowAvatar.value = true;
    const roleData = (role_info[nodeData.value.role_id].look.default_look as IAvatar)
    dataSource.value = {
      skin: roleData.skin && baseUrl + `role/${nodeData.value.role_id}/skin/${roleData.skin}.png`,
      cloth: roleData.cloth && baseUrl + `role/${nodeData.value.role_id}/cloth/${roleData.cloth}.png`,
      emotion: roleData.emotion && baseUrl + `role/${nodeData.value.role_id}/emotion/${roleData.emotion}.png`,
      hair: roleData.hair && baseUrl + `role/${nodeData.value.role_id}/hair/${roleData.hair}.png`,
      backext: roleData.backext && baseUrl + `role/${nodeData.value.role_id}/backext/${roleData.backext}.png`,
    }
  } else {
    isShowAvatar.value = false;
  }
  // 场景
  if (nodeData.value.scene_bg) {
    sceneStyle.background = `url('${baseUrl}scene/${nodeData.value.scene_bg}.jpg') no-repeat`;
    sceneStyle.backgroundSize = 'auto 100%'
  }
}

const choiceLookEvent = (state: 'left' | 'right') => {
  if (state === 'left') {

  }
  console.info('切换look', state)
}

// 下一个节点
const nextNode = () => {
  nodeData.value = chat_info[nodeData.value.next_id]
  console.log('startData--------->', nodeData.value.type)
  // console.log(JSON.stringify(nodeData.value));
  console.log('nodeData.value.pos_id--------------->', nodeData.value.pos_id);
  updateNode()
}

// 对话选项
const selectChange = (optionKey: string) => {
  nodeData.value = chat_info[chat_info[optionKey].next_id]
}

</script>

<style lang="less" scoped>
@import "snow.css";
.avatar-warp {
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 4px #00152914;
  .scene-content {
    position: absolute;
    top: 5%;
    left: 20%;
    width: 60%;
    z-index: 99;
    font-size: 0.2rem;
    font-weight: 500;
    color: #FFFFFF;
    background-color: #2B2B2B80;
    text-align: center;
    border-radius: 8PX;
  }
}

</style>
