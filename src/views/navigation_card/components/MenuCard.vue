<template>
  <a-col :span="6">
    <a-card hoverable @click="gotoRouteHandle(menu)" :loading="!menu">
      <a-card-meta :title="menu.meta.title">
        <template #description
          ><svg-icon
            v-if="menu.meta.icon"
            :iconName="menu.meta.icon"
            className="meun-icon-nav"
          ></svg-icon
          >{{ menu.meta.description }}</template
        >
      </a-card-meta>
    </a-card>
  </a-col>
</template>

<script>
import { Col, Card } from "ant-design-vue";
import { useRouter } from "vue-router";
import SvgIcon from "@/apa/components/Icons/SvgIcon";
export default {
  name: "menu-card",
  components: {
    ACard: Card,
    ACardMeta: Card.Meta,
    ACol: Col,
    SvgIcon,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = new useRouter();
    function gotoRouteHandle(menu) {
      // console.log("gotoRouteHandle", menu);
      router.push(menu.path);
    }
    return {
      gotoRouteHandle,
    };
  },
};
</script>

<style scoped>
.ant-card-bordered {
  border-radius: 5px;
  background: #f5f7fa;
}
</style>
