<template>
  <a-row type="flex" :gutter="20">
    <a-col flex="300px">
      <p-tree
        title="菜单列表"
        @select="onSelect"
        ref="tree"
        :url="url"
        draggable
        @dragenter="onDragEnter"
        @drop="onDrop"
        default-expand-all
      ></p-tree
    ></a-col>
    <a-col flex="1">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        labelAlign="right"
        :label-col="{ span: 4 }"
      >
        <a-row>
          <a-col :span="12">
            <a-form-item label="菜单id" name="id">
              <!-- <a-input
                v-model:value="formState.id"
                placeholder="菜单id"
                readonly
              /> -->
              <span>{{ formState.id }}</span>
            </a-form-item>
            <a-form-item label="菜单名称" name="title">
              <a-input v-model:value="formState.title" placeholder="菜单名称" />
            </a-form-item>
            <a-form-item label="跳转" name="redirect">
              <a-input v-model:value="formState.redirect" placeholder="跳转" />
            </a-form-item>

            <a-form-item label="是否启用">
              <a-radio-group v-model:value="formState.disable">
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="排序" name="sort">
              <a-input
                type="number"
                v-model:value="formState.sort"
                placeholder="排序"
                :min="0"
              />
              <!-- <a-input-number
                id="order"
                v-model:value="formState.order"
                :min="0"
              /> -->
            </a-form-item>
            <a-form-item label="允许关闭">
              <a-radio-group v-model:value="formState.affix">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="上级id" name="parentId">
              <a-input
                type="number"
                v-model:value="formState.parentId"
                placeholder="上级id,0表示无父级"
                :min="0"
              />
            </a-form-item>
            <a-form-item label="路由URL" name="path">
              <a-input v-model:value="formState.path" placeholder="路由URL" />
            </a-form-item>
            <a-form-item label="组件路径" name="component">
              <a-input
                v-model:value="formState.component"
                placeholder="组件路径"
              />
            </a-form-item>

            <a-form-item label="是否隐藏">
              <a-radio-group v-model:value="formState.hidden">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="图标">
              <a-space>
                <div style="position: relative" v-if="formState.icon">
                  <div style="position: absolute; top: -15px; right: -5px">
                    <CloseOutlined
                      @click="formState.icon = ''"
                      style="color: red"
                    />
                  </div>
                  <svg-icon
                    :icon-class="formState.icon"
                    class-name="icon_item"
                  ></svg-icon>
                </div>
                <a-button type="default" @click="selectIcon">选择图标</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="权限"
              name="ability"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 20 }"
            >
              <!-- <a-checkbox
                v-model:checked="checkAll"
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
              >
                全选
              </a-checkbox>
              <br />
              <a-checkbox-group
                v-model:value="formState.ability"
                name="checkboxgroup"
                :options="abilitylist"
              /> -->
              <a-select
                mode="multiple"
                v-model:value="formState.ability"
                style="width: 100%"
                placeholder=""
                @select="handleSelect"
              >
                <a-select-option v-for="d in apis" :key="d.id">
                  <san
                    >{{ d.name }}
                    <a-divider type="vertical"></a-divider>
                    {{ d.path }}</san
                  >
                </a-select-option>
                <!-- <a-select-option v-for="d in apis" :key="d.value">
                  {{ d.text }}
                </a-select-option> -->
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :style="{ textAlign: 'center' }">
          <a-col :span="24">
            <a-space>
              <a-button type="primary" @click="onSubmit(1)">保存</a-button>
              <a-button type="primary" @click="onSubmit(2)">新增</a-button>
              <a-button type="primary" @click="onSubmit(3)">添加子级</a-button>
              <a-button type="primary" @click="onSubmit(4)">添加同级</a-button>
              <a-button type="danger" @click="onSubmit(5)">删除菜单</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form></a-col
    >
  </a-row>
  <a-modal v-model:visible="visible" title="选择图标" width="50%">
    <template #footer>
      <a-button type="primary" @click="visible = false">关闭</a-button>
    </template>
    <select-icon
      @select="handleIconSelect"
      :active="formState.icon"
    ></select-icon>
  </a-modal>
</template>

<script>
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
  watch,
  nextTick,
  ref,
  getCurrentInstance,
} from "vue";
import { uuid } from "@/utils/index";
import { list, add, edit, del, apiList } from "@/api/system/menu";
import SvgIcon from "@/components/Icons/SvgIcon";
import SelectIcon from "@/components/Icons/SelectIcon";
import { CloseOutlined } from "@ant-design/icons-vue";
export default {
  name: "menus",
  components: { SvgIcon, SelectIcon, CloseOutlined },
  setup() {
    const { proxy } = getCurrentInstance();
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后

    // const guid = uuid();
    const tree = ref(null);
    const treeReload = () => {
      nextTick(() => {
        tree.value.reload();
      });
    };
    const formRef = ref(null);
    const rules = {
      parentId: [
        {
          required: true,
          message: "不能为空",
          // trigger: "blur",
        },
      ],
      title: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      path: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      component: [
        {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      ],
      // airPortEname: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // country: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // countryCode: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // province: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // chau: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // chanChird: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // cityName: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
      // cityEname: [
      //   {
      //     required: true,
      //     message: "不能为空",
      //     trigger: "blur",
      //   },
      // ],
    };
    const defaultFormState = {
      id: 0,
      parentId: 0,
      path: "",
      name: () => uuid(),
      component: "",
      redirect: "",
      title: "",
      icon: "",
      affix: 0,
      hidden: 0,
      target: "",
      alwaysShow: 0,
      tagHidden: 0,
      keepAlive: 0,
      ability: [],
      disable: 0,
      sort: 0,
    };
    // 这里存放返回数据
    const state = reactive({
      url: "/manage/menu/list",
      formState: {
        id: 0,
        parentId: 0,
        path: "",
        name: () => uuid(),
        component: "",
        redirect: "",
        title: "",
        icon: "",
        affix: 0,
        hidden: 0,
        target: "",
        alwaysShow: 0,
        tagHidden: 0,
        keepAlive: 0,
        ability: [],
        disable: 0,
        sort: 0,
      },
      abilitylist: [
        {
          label: "新增",
          value: "add",
        },
        {
          label: "修改",
          value: "edit",
        },
        {
          label: "删除",
          value: "delete",
        },
        {
          label: "查询",
          value: "search",
        },
        {
          label: "导入",
          value: "import",
        },
        {
          label: "导出",
          value: "export",
        },
        {
          label: "上传",
          value: "upload",
        },
        {
          label: "审核",
          value: "audit",
        },
      ],
      indeterminate: true,
      checkAll: false,
      apis: [],
      visible: false,
    });

    const init = () => {
      apiList().then((res) => {
        const { data } = res;
        state.apis = data;
      });

      // list()
      //   .then((res) => {
      //     console.log(res);
      //     state.data = res.data;
      //   })
      //   .catch((err) => {});
    };
    init();
    const onCheckAllChange = (e) => {
      // Object.assign(state, {
      //   checkedList: e.target.checked
      //     ? state.abilitylist.map((s) => s.value)
      //     : [],
      //   indeterminate: false,
      // });
      if (e.target.checked) {
        state.formState.ability = state.abilitylist.map((s) => s.value);
      } else {
        state.formState.ability = [];
      }
      state.indeterminate = false;
    };
    const onSelect = (s, e) => {
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
      state.formState = { ...state.formState, ...data };
      console.log(data);
    };
    const onSubmit = (action) => {
      let data = Object.assign({}, state.formState);

      // console.log(data);
      switch (action) {
        case 1:
          //保存
          data.ability = data.ability.join(",");
          data.alwaysShow = true;
          data.name = uuid();
          formRef.value
            .validate()
            .then(() => {
              if (data.id) {
                edit(data).then((res) => {
                  if (res.code == 0) {
                    proxy.$message.success("更新成功");
                    treeReload();
                  }
                });
              } else {
                add(data).then((res) => {
                  if (res.code == 0) {
                    proxy.$message.success("新增成功");
                    treeReload();
                  }
                });
              }
            })
            .catch((err) => {
              console.log("error", err);
            });
          console.log(data);
          break;
        case 2:
          //新增
          state.formState = defaultFormState;
          break;
        case 3:
          //添加子级
          state.formState = Object.assign({}, defaultFormState, {
            parentId: state.formState.id,
          });
          break;
        case 4:
          //添加同级
          state.formState = Object.assign({}, defaultFormState, {
            parentId: state.formState.parentId,
          });
          break;
        case 5:
          //删除菜单
          if (data.id) {
            proxy.$message.confirm().then(() => {
              del({ id: data.id }).then((res) => {
                if (res.code == 0) {
                  proxy.$message.success("删除成功");
                  treeReload();
                }
              });
            });
          } else {
            proxy.$message.error("请选择有效数据项");
          }

          break;
      }

      // setTimeout(() => {
      //   treeReload();
      // }, 1000);
    };
    const handleSelect = (val, option) => {
      console.log(val);
      console.log(option);
    };

    const selectIcon = () => {
      //选择图标
      state.visible = true;
    };
    const handleIconSelect = (icon) => {
      state.formState.icon = icon;
    };
    const onDragEnter = (info) => {
      // if (info.node) {
      //   const {
      //     node,
      //     node: { dataRef },
      //     node: {
      //       dataRef: { extend: data },
      //     },
      //   } = info;
      //   console.log(info); // expandedKeys 需要展开时
      //   data.parentId = info.expandedKeys[info.expandedKeys.length - 1];
      //   edit(data).then((res) => {
      //     if (res.code == 0) {
      //       proxy.$message.success("移动成功");
      //       treeReload();
      //     }
      //   });
      // }
      // expandedKeys.value = info.expandedKeys
    };

    const onDrop = (info) => {
      if (info.node && info.dragNode) {
        const {
          node,
          node: {
            dataRef: { extend: parentData },
          },
          dragNode,
          dragNode: {
            dataRef: { extend: data },
          },
        } = info;
        data.parentId = parentData.key || parentData.id;
        if (data && Array.isArray(data.ability)) {
          data.ability = data.ability.join(",");
        }
        edit(data).then((res) => {
          if (res.code == 0) {
            proxy.$message.success("移动成功");
            treeReload();
          }
        });
      }
      console.log(info);
      // const dropKey = info.node.eventKey;
      // const dragKey = info.dragNode.eventKey;
      // const dropPos = info.node.pos.split("-");
      // const dropPosition =
      //   info.dropPosition - Number(dropPos[dropPos.length - 1]);

      // const loop = (data, key, callback) => {
      //   data.forEach((item, index, arr) => {
      //     if (item.key === key) {
      //       return callback(item, index, arr);
      //     }

      //     if (item.children) {
      //       return loop(item.children, key, callback);
      //     }
      //   });
      // };

      // const data = [...tree.value]; // Find dragObject

      // let dragObj = {};
      // loop(data, dragKey, (item, index, arr) => {
      //   arr.splice(index, 1);
      //   dragObj = item;
      // });

      // if (!info.dropToGap) {
      //   // Drop on the content
      //   loop(data, dropKey, (item) => {
      //     item.children = item.children || []; // where to insert 示例添加到尾部，可以是随意位置

      //     item.children.push(dragObj);
      //   });
      // } else if (
      //   (info.node.children || []).length > 0 && // Has children
      //   info.node.expanded && // Is expanded
      //   dropPosition === 1 // On the bottom gap
      // ) {
      //   loop(data, dropKey, (item) => {
      //     item.children = item.children || []; // where to insert 示例添加到尾部，可以是随意位置

      //     item.children.unshift(dragObj);
      //   });
      // } else {
      //   let ar = [];
      //   let i = 0;
      //   loop(data, dropKey, (item, index, arr) => {
      //     ar = arr;
      //     i = index;
      //   });

      //   if (dropPosition === -1) {
      //     ar.splice(i, 0, dragObj);
      //   } else {
      //     ar.splice(i + 1, 0, dragObj);
      //   }
      // }

      // tree.value = data;
    };

    watch(
      () => state.formState.ability,
      (val) => {
        state.indeterminate =
          !!val.length && val.length < state.abilitylist.length;
        state.checkAll = val.length === state.abilitylist.length;
        // if (state.checkAll) {
        //   console.log(state.formState.ability);
        // }
      }
    );
    return {
      tree,
      formRef,
      rules,
      ...toRefs(state),
      onCheckAllChange,
      onSelect,
      onSubmit,
      handleSelect,
      onDragEnter,
      onDrop,
      selectIcon,
      handleIconSelect,
    };
  },
};
</script>
<style lang="less" scoped>
.icon_item {
  font-size: 36px;
}
</style>
