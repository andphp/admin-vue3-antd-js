<template>
  <div>
    <a-alert
      message="点击图标即选择"
      type="success"
      show-icon
      :style="{ marginBottom: '20px' }"
    ></a-alert>
    <a-row :gutter="20" type="flex" class="icon-container">
      <!-- <a-col :span="24">
        <a-input-search
          v-model:value="queryForm.title"
          placeholder="图标名称"
          enter-button
          @search="queryData"
        />icon-container
      </a-col> -->
      <a-col :span="24">
        <a-space style="flex-wrap: wrap">
          <a-card
            hoverable
            shadow="hover"
            v-for="(item, index) in icons"
            :key="index"
            style="
              width: 8vw;
              height: 8vw;
              text-align: center;
              margin-bottom: 10px;
            "
            @click="handleCopy(item)"
          >
            <div>
              <span :class="item == active ? 'active' : ''"
                ><svg-icon :icon-class="item" class-name="icon_item"></svg-icon
              ></span>
              <div>{{ item }}</div>
            </div>
          </a-card>
        </a-space>
      </a-col>
      <!-- <a-col :span="24">
        <a-pagination
          show-quick-jumper
          v-model:current="queryForm.current"
          :total="total"
          @change="handleCurrentChange"
          @showSizeChange="handlePageSizeChange"
        />
      </a-col> -->
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import SvgIcon from "@/components/Icons/SvgIcon";

export default {
  name: "select-icon",
  components: {
    SvgIcon,
  },
  emits: ["select"],
  props: {
    active: "",
  },
  setup(props, { emit }) {
    const state = reactive({
      icons: [],
      active: props.active,
    });
    const init = () => {
      const files = require.context("@/assets/icons", true, /\.svg$/).keys();
      let icons = [];
      files.forEach((s) => {
        let icon = s.substring(s.lastIndexOf("/") + 1);
        icon = icon.replace(".svg", "");
        icons.push(icon);
      });
      state.icons = icons;
    };
    const handleCopy = (item) => {
      state.active = item;
      emit("select", item);
    };

    onMounted(() => {
      init();
    });
    return {
      ...toRefs(state),
      init,
      handleCopy,
    };
  },
};
</script>

<style lang="less" scoped>
.icon-container {
  height: 50vh;
  overflow-y: auto;
}
.icon_item {
  font-size: 36px;
}
.active {
  display: inline-block;
  background: #f44336;
}
</style>
