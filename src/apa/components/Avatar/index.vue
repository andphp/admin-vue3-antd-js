<!-- Avatar -->
<template>
  <div style="float: right; padding-right: 20px">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ nickname }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down">
          <a-menu-item key="settings">
            <svg-icon iconName="caidanlan-kehu-kehuguanli"></svg-icon>
            个人设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout"
            ><svg-icon iconName="exit"></svg-icon> 退出登录</a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
  </div>
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
import SvgIcon from "@/apa/components/Icons/SvgIcon";
export default {
  name: "Avatar",
  components: {
    DownOutlined,
    AAvatar: Avatar,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    SvgIcon,
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    // 这里存放返回数据
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
.ant-pro-drop-down {
  top: 15px;
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.ant-dropdown-link {
  color: @apa-color-blue;
}
</style>
