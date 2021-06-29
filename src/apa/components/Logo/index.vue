<!-- logo -->
<template>
  <div class="apa-logo">
    <span class="anticon">
      <!-- <svg-icon v-if="logo" :iconName="logo" class-name="apa-large"></svg-icon> -->

      <img src="~assets/logo2.png" width="59" height="45" v-if="collapse" />
      <img src="~assets/logo.png" width="132" height="71" v-else />
    </span>
    <transition name="slide">
      <span v-show="!collapse">{{ title }}</span>
    </transition>
  </div>
</template>

<script>
import SvgIcon from "@/apa/components/Icons/SvgIcon";
import store from "@/store";
import {
  reactive,
  computed,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
export default {
  name: "logo",
  components: {
    SvgIcon,
  },
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    const data = reactive({
      logo: computed(() => store.state.settings.logo),
      title: computed(() => store.state.settings.title),
    });

    const dataToRefs = toRefs(data);
    // 这里存放返回数据
    return {
      ...dataToRefs,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.apa-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 32px;
  margin: 16px 5px;
  overflow: hidden;
  overflow: hidden;
  font-size: 15px;
  color: @apa-color-blue;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.slide {
  &-enter {
    transform: translateX(100%);
    &-to {
      transform: translateX(0%);
    }
    &-active {
      transition: transform 0.5s;
    }
  }
  &-leave {
    transform: translateX(0);
    &-to {
      transform: translateX(100%);
    }
    &-active {
      transition: transform 0.5s;
    }
  }
}
</style>
