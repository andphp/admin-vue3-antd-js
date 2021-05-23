<template>
  <a-row type="flex" :gutter="20">
    <a-col flex="300px">
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="角色列表">
          <p-tree
            @select="onSelectRole"
            ref="tree"
            :url="roleUrl"
          ></p-tree>
        </a-tab-pane>
        <a-tab-pane key="2" tab="部门列表">
          <p-tree
            @select="onSelectDep"
            ref="tree"
            :url="depUrl"
          ></p-tree>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :flex="1">
      <a-button type="primary" @click="handleSave">保存</a-button>
      <permission-tree v-if="treeData" :data="treeData"></permission-tree>
    </a-col>
  </a-row>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  toRefs,
  reactive,
  getCurrentInstance,
} from "vue";

import PermissionTree from "./permission-tree";
import { roleList, roleAuth, depList, depAuth } from "@/api/system/permission";
/**
 * 树转list
 */
function treeToList(tree) {
  const list = []; //结果lsit
  for (var i in tree) {
    var node = tree[i];

    if (node.children.length !== 0) {
      //遍历树的第一层,只有一个根结点
      //第一层加入到list中,因为根结点模块设置为虚拟结点,所以不用加入
      /*list.push({
                    id: node.id,
                    name: node.title,
                    parentId:node.parentId
                });*/
      toListDF(node.children, list, node.id); //遍历子树,并加入到list中.
    }
  }
  return list;
}

/**
 * 深度优先遍历树
 * 一个递归方法
 * @params tree:要转换的树结构数据
 * @params list:保存结果的列表结构数据，初始传list = []
 * @params parentId:当前遍历节点的父级节点id，初始为null(因为根节点无parentId)
 **/
function toListDF(tree, list, parentId) {
  for (var i in tree) {
    //遍历最上层
    //将当前树放入list中
    var node = tree[i];
    list.push(node);
    //如果有子结点,再遍历子结点
    if (node.children && node.children.length !== 0) {
      toListDF(node.children, list, node.id); //递归
    }
  }
}
export default {
  name: "permission",
  components: { PermissionTree },
  setup() {
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {}); // 挂载完成之后调用

    onBeforeUpdate(() => {}); // DOM数据更新前调用

    onUpdated(() => {}); // DOM数据更新完成调用

    onBeforeUnmount(() => {}); // 实例销毁之前

    onUnmounted(() => {}); // 实例销毁后
    const { proxy } = getCurrentInstance();
    const state = reactive({
      roleUrl: "manage/role/select",
      depUrl: "manage/department/select",
      treeData: [],
      roleId: "",
      depId: "",
    });
    const onSelectRole = async (s, e) => {
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
      let res = await roleList({ id: data.id });
      state.treeData = res.data;
      state.roleId = data.id;
    };
    const onSelectDep = async (s, e) => {
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
      let res = await depList({ id: data.id });
      state.treeData = res.data;
      state.depId = data.id;
    };
    const handleSave = async () => {
      const list = treeToList(state.treeData);
      // state.treeData.forEach((s) => {
      //   let tmpList = treeToList(s);
      //   list.push(tmpList);
      // });
      let data = {
        role_id: state.roleId,
        menus: [],
      };
      list.forEach((item) => {
        data.menus.push({
          menu_id: item.extend.id,
          ability: item.extend.abilityList
            .filter((s) => s.checkBox == true)
            .map((s) => s.abilityKey)
            .join(","),
        });
      });
      console.log(data);
      let res = await roleAuth(data);
      if (res.code == 0) {
        proxy.$message.success("保存成功");
      }
    };
    // 这里存放返回数据
    return {
      ...toRefs(state),
      onSelectRole,
      onSelectDep,
      handleSave,
    };
  },
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
