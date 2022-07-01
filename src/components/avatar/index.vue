<template>
  <div class="avatar-warp" :style="[sceneStyle]" @click="nextNode">
    <!--    对话-->
    <SpDialog
      v-show="nodeData.type === 'chat'"
      :content="nodeData.content"
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
    <AvatarItem v-show="isShowAvatar" :data-source="dataSource"></AvatarItem>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import AvatarItem from '@/components/avatar/avatar.vue';
import { IAvatar } from "@/components/avatar/avatar.interface";
import chatJson from '@/chapter/chat.json';
import SpDialog from './detail/spDialog.vue'
import SpSelectName from './detail/selectName.vue'
import SpChoiceLook from './detail/choiceLook.vue'
import SpAction from './detail/spAction.vue'

const { chat_info, role_info } = chatJson;
// 角色数据
const dataSource = ref<IAvatar>({})
// 是否显示角色
const isShowAvatar = ref(true);
// 背景
const sceneStyle = reactive({})

const nodeData = ref(chat_info[chat_info.start_id.next_id]) // chat_info.chat_10098
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

const nextNode = () => {
  nodeData.value = chat_info[nodeData.value.next_id]
  console.log('startData--------->', nodeData.value.type)
  console.log(JSON.stringify(nodeData.value));

  updateNode()
}

</script>

<style lang="less" scoped>
.avatar-warp {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 4px #00152914;
}

</style>
