<template>
  <a-row type="flex" :gutter="20">
    <a-col flex="300px">
      <a-tabs
        type="card"
        @tabClick="() => (selectIndex = 0)"
        v-model:activeKey="activeKey"
      >
        <a-tab-pane key="1" tab="角色列表">
          <p-tree
            @select="onSelectRole"
            ref="tree"
            :url="roleUrl"
            default-expand-all
            v-model:selectedKeys="selectedRoleKeys"
          ></p-tree>
        </a-tab-pane>
        <a-tab-pane key="2" tab="部门列表">
          <p-tree
            @select="onSelectDep"
            ref="tree"
            :url="depUrl"
            default-expand-all
            v-model:selectedKeys="selectedDepKeys"
          ></p-tree>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :flex="1">
      <a-button type="primary" @click="handleSave">保存</a-button>
      <permission-tree
        v-if="treeData && selectIndex != 0"
        :data="treeData"
      ></permission-tree>
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
import { useRoute } from "vue-router";
/**
 * 树转list
 */
function treeToList(tree) {
  const list = []; //结果lsit
  for (var i in tree) {
    var node = tree[i];
    list.push(node);
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
    const route = useRoute();
    onBeforeMount(() => {}); // 挂载前

    onMounted(() => {
      if (route.query.t) {
        try {
          state.selectIndex = parseInt(route.query.t);
          state.activeKey = route.query.t;
          let key = parseInt(route.query.id);
          switch (state.selectIndex) {
            case 1:
              state.selectedRoleKeys.push(key);
              getRoleList(key);
              break;
            case 2:
              state.selectedDepKeys.push(key);
              getDepList(key);
              break;
          }
        } catch (error) {}
      }
    }); // 挂载完成之后调用

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
      selectIndex: 0, //0：未选中任何树，1：角色树，2：部门树
      activeKey: "1",
      selectedRoleKeys: [],
      selectedDepKeys: [],
    });
    const onSelectRole = (s, e) => {
      state.selectIndex = 1;
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
      getRoleList(data.id);
    };
    const getRoleList = async (id) => {
      let res = await roleList({ id: id });
      state.treeData = res.data;
      state.roleId = id;
    };
    const onSelectDep = (s, e) => {
      state.selectIndex = 2;
      const {
        node,
        node: { dataRef },
        node: {
          dataRef: { extend: data },
        },
      } = e;
      getDepList(data.id);
    };
    const getDepList = async (id) => {
      let res = await depList({ id: id });
      state.treeData = res.data;
      state.depId = id;
    };
    const handleSave = async () => {
      const list = treeToList(state.treeData);
      // state.treeData.forEach((s) => {
      //   list.push(tmpList);
      //   let tmpList = treeToList(s);
      // });
      let data = {
        role_id: state.roleId,
        department_id: state.depId,
        menus: [],
      };
      list.forEach((item) => {
        console.log(item);
        let checkedAbility = item.extend.abilityList.filter(
          (s) => s.checkBox == true
        );
        if (item.extend.abilityList.length) {
          data.menus.push({
            menu_id: item.extend.id,
            ability: checkedAbility.map((s) => s.abilityKey).join(","),
            parentId: item.parentId,
          });
        }
      });
      data.menus = data.menus.filter((s) => s.ability.length > 0);
      // data.menus = data.menus;
      let res = null;
      switch (state.selectIndex) {
        case 1:
          res = await roleAuth(data);
          break;
        case 2:
          res = await depAuth(data);
          break;
      }
      if (res && res.code == 0) {
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
