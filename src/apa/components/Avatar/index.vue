<!-- Avatar -->
<template>
  <a-dropdown>
    <span class="ant-dropdown-link">
      <a-avatar :src="avatar" />
      {{ nickname }}
      <DownOutlined />
    </span>
    <template v-slot:overlay>
      <a-menu>
        <a-menu-item key="logout">退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import {
  // reactive,
  // computed,
  // toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
import { Avatar, Dropdown, Menu } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { toRefs, reactive } from "vue";
export default {
  name: "Avatar",
  components: {
    DownOutlined,
    AAvatar: Avatar,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
  },
  setup() {
    onBeforeMount(() => {}); //挂载前

    onMounted(() => {}); //挂载完成之后调用

    onBeforeUpdate(() => {}); //DOM数据更新前调用

    onUpdated(() => {}); //DOM数据更新完成调用

    onBeforeUnmount(() => {}); //实例销毁之前

    onUnmounted(() => {}); //实例销毁后

    //这里存放返回数据
    const data = reactive({
      nickname: "daxiong",
      avatar: "https://i.gtimg.cn/club/item/face/img/2/16022_100.gif",
    });
    return { ...toRefs(data) };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
// .apa-avatar {
//   float: right;
//   padding-right: 20px;
//   .ant-dropdown-link {
//     display: block;
//     min-height: 64px;
//     cursor: pointer;
//   }
// }
</style>
