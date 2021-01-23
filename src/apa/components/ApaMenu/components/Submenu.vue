<template>
  <el-submenu
    ref="subMenu"
    :index="item.fullPath"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <vab-remix-icon
        v-if="item.meta && item.meta.remixIcon"
        :is-svg="item.meta.isCustomSvgIcon"
        :icon-class="item.meta.remixIcon"
        class="vab-remix-icon"
      ></vab-remix-icon>
      <span>{{ translateTitle(item.meta.title) }}</span>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'Submenu',
    props: {
      item: {
        type: Object,
        default() {
          return null
        },
      },
      routeChildren: {
        type: Object,
        default() {
          return null
        },
      },
    },
    methods: {
      translateTitle,
    },
  }
</script>
