<template>
  <a-card hoverable class="card-base" :style="{ minHeight: '600px' }">
    <div :style="{ color: color }" class="card-base-icon">
      <MenuIcon></MenuIcon>
    </div>
    <div class="card-base-title">
      {{ title }}
    </div>
    <div>
      <a-input-search
        v-model:value="searchValue"
        style="margin-bottom: 8px"
        placeholder="关键字筛选"
        v-if="filter"
      />
      <a-tree
        v-bind="$props"
        :expandedKeys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="data"
        @expand="onExpand"
      >
        <template #title="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </div>
    <a-spin :spinning="spinning" :tip="tip"> </a-spin>
  </a-card>
</template>
<script>
import "./index.less";
import T from "ant-design-vue/lib/tree";
import { getTree } from "@/api/components";
import * as Icons from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, toRefs, watch, onMounted } from "vue";
const TProps = T.props;

const dataList = [];

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({
      key,
      title: `${key}`,
    });

    if (node.children) {
      generateList(node.children);
    }
  }
};

const getParentKey = (key, tree) => {
  let parentKey;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};
export default defineComponent({
  name: "p-tree",
  props: Object.assign({}, TProps, {
    icon: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    filter: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
  }),
  setup(props, { emit }) {
    const MenuIcon = Icons[props.icon] || {};
    const expandedKeys = ref([]);
    const searchValue = ref("");
    const autoExpandParent = ref(true);
    const state = reactive({
      data: [],
      spinning: false,
    });
    const reload = () => {
      state.data = [];
      state.spinning = true;
      if (props.url) {
        getTree(props.url)
          .then((r) => {
            let { data } = r;
            state.data = data;
            generateList(state.data);
            state.spinning = false;
          })
          .catch((err) => {
            console.log(err);
            state.spinning = false;
          });
      } else {
        state.data = props.data;
        state.spinning = false;
      }
    };
    const onExpand = (keys) => {
      expandedKeys.value = keys;
      autoExpandParent.value = false;
    };
    // const handleSelect = (selectedKeys, eventOb) => {
    //   // emit("select", selectedKeys, eventOb);
    // };
    watch(searchValue, (value) => {
      const expanded = dataList
        .map((item) => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, state.data);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      expandedKeys.value = expanded;
      searchValue.value = value;
      autoExpandParent.value = true;
    });

    watch(
      () => [props.data],
      ([newVal], [oldVal]) => {
        //这里是监听数据变化后执行的函数
        if (newVal && Array.isArray(newVal)) {
          state.data = newVal;
        }
      }
    );

    onMounted(() => {
      reload();
    });
    return {
      MenuIcon,
      expandedKeys,
      searchValue,
      autoExpandParent,
      onExpand,
      reload,
      // handleSelect,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.card-base-title {
  margin-bottom: 10px;
}
</style>
