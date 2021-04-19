/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标
 * hidden:true                        是否显示在菜单中显示路由（默认值：false）
 * alwaysShow:true                    当只有一级子路由时是否显示父路由是否显示在菜单中显示路由（默认值：false）
 * name:"Demo"                        首字母大写，一定要与vue文件的name对应起来，用于noKeepAlive缓存控制（该项特别重要）
 * meta:{
    title:"title"                     菜单、面包屑、多标签页显示的名称
    roles:["admin","..."]             当config/settings.js中rolesControl配置开启时，用于控制角色
    roles: {
      role: ["admin"],                role: ["admin"]
      ability: ["READ","WRITE"],      ability: ["READ","WRITE"],
      mode: "allOf"                   allOf: 数组内所有角色都拥有，返回True
                                      oneOf: 数组内拥有任一角色，返回True(等价第1种数据)
                                      except: 不拥有数组内任一角色，返回True(取反)
    }
    remixIcon:""                      remix图标
    isCustomSvgIcon:false,            是否是自定义svg图标（默认值：false，如果设置true，那么需要把你的svg拷贝到icon/remixIcon下，然后remixIcon字段配置上你的图标名）
    noKeepAlive:true                  当前路由是否不缓存（默认值：false）
    affix:true                        当前路由是否固定多标签页
    badge:"New"                       badge小标签（只支持子级）
    tagHidden:true                    当前路由是否不显示多标签页
    target                            是否连接跳转
   }
 */
const data = [
  {
    path: "/",
    component: "Layout",
    redirect: "/index",
    meta: {
      title: "首页",
      remixIcon: "home-4-line",
      affix: true,
    },
    children: [
      {
        path: "index",
        name: "Index",
        component: "@/views/index",
        meta: {
          title: "首页",
          remixIcon: "home-4-line",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/vab",
    name: "Vab",
    component: "Layout",
    redirect: "/vab/icon/remixIcon",
    alwaysShow: true,
    meta: {
      title: "组件",
      remixIcon: "code-box-line",
    },
    children: [
      {
        path: "roles",
        name: "Role",
        component: "@/views/vab/roles",
        meta: {
          title: "角色权限控制",
          remixIcon: "user-3-line",
          badge: "New",
        },
      },
      {
        path: "icon",
        name: "Icon",
        component: "@/views/vab/icon",
        redirect: "/vab/icon/remixIcon",
        meta: {
          title: "图标",
          remixIcon: "remixicon-line",
        },
        children: [
          {
            path: "remixIcon",
            name: "RemixIcon",
            component: "@/views/vab/icon/remixIcon",
            meta: {
              title: "小清新图标",
            },
          },
          {
            path: "colorfulIcon",
            name: "ColorfulIcon",
            component: "@/views/vab/icon/colorfulIcon",
            meta: {
              title: "多彩图标",
            },
          },
          {
            path: "iconSelector",
            name: "IconSelector",
            component: "@/views/vab/icon/iconSelector",
            meta: {
              title: "图标选择器",
            },
          },
        ],
      },
      {
        path: "table",
        name: "Table",
        component: "@/views/vab/table",
        redirect: "/vab/table/comprehensiveTable",
        meta: {
          title: "表格",
          roles: {
            role: ["editor"],
            mode: "except",
          },
          remixIcon: "table-2",
        },
        children: [
          {
            path: "comprehensiveTable",
            name: "ComprehensiveTable",
            component: "@/views/vab/table/comprehensiveTable",
            meta: {
              title: "综合表格",
            },
          },
          {
            path: "inlineEditTable",
            name: "InlineEditTable",
            component: "@/views/vab/table/inlineEditTable",
            meta: {
              title: "行内编辑表格",
              noKeepAlive: true,
            },
          },
          {
            path: "customTable",
            name: "CustomTable",
            component: "@/views/vab/table/customTable",
            meta: {
              title: "自定义表格",
              badge: "New",
            },
          },
        ],
      },
      {
        path: "form",
        component: "@/views/vab/form",
        name: "Form",
        meta: {
          title: "表单",
          roles: ["admin"],
          remixIcon: "file-list-2-line",
        },
        children: [
          {
            path: "comprehensiveForm",
            name: "ComprehensiveForm",
            component: "@/views/vab/form/comprehensiveForm",
            meta: {
              title: "综合表单",
            },
          },
          {
            path: "stepForm",
            name: "StepForm",
            component: "@/views/vab/form/stepForm",
            meta: {
              title: "分步表单",
            },
          },
        ],
      },
      {
        path: "dynamicTitle",
        component: "@/views/vab/dynamicTitle",
        name: "DynamicTitle",
        meta: {
          title: "动态标题",
          roles: ["admin"],
          remixIcon: "function-line",
        },
      },
      {
        path: "dynamicSegment",
        component: "@/views/vab/dynamicSegment",
        redirect: "/vab/dynamicSegment/test",
        name: "DynamicSegment",
        meta: {
          title: "动态路径参数",
          roles: ["admin"],
          remixIcon: "arrow-left-right-line",
        },
        children: [
          {
            path: "test",
            name: "Test",
            component: "@/views/vab/dynamicSegment/test",
            meta: {
              title: "动态路径参数",
              roles: ["admin"],
              remixIcon: "arrow-left-right-line",
            },
          },
          {
            path: "test1/:id",
            name: "Test1",
            component: "@/views/vab/dynamicSegment/test1",
            meta: { title: "动态路径参数-test1" },
            hidden: true,
          },
          {
            path: "test2",
            name: "Test2",
            component: "@/views/vab/dynamicSegment/test2",
            meta: { title: "动态路径参数-test2" },
            hidden: true,
          },
        ],
      },
      {
        path: "drag",
        name: "Drag",
        component: "@/views/vab/drag",
        redirect: "/vab/drag/dialogDrag",
        meta: {
          title: "拖拽",
          roles: ["admin"],
          remixIcon: "drag-drop-line",
        },
        children: [
          {
            path: "dialogDrag",
            name: "DialogDrag",
            component: "@/views/vab/drag/dialogDrag",
            meta: {
              title: "弹窗拖拽",
            },
          },
          {
            path: "cardDrag",
            name: "CardDrag",
            component: "@/views/vab/drag/cardDrag",
            meta: {
              title: "卡片拖拽",
            },
          },
          {
            path: "flowsheetDrag",
            name: "FlowsheetDrag",
            component: "@/views/vab/drag/flowsheetDrag",
            meta: {
              title: "流程图拖拽",
            },
          },
        ],
      },
      {
        path: "contextmenu",
        name: "Contextmenu",
        component: "@/views/vab/contextmenu",
        meta: {
          title: "右键菜单",
          roles: ["admin"],
          remixIcon: "menu-2-fill",
          badge: "New",
        },
      },
      {
        path: "card",
        name: "Card",
        component: "@/views/vab/card",
        meta: {
          title: "卡片",
          roles: ["admin"],
          remixIcon: "inbox-line",
          badge: "New",
        },
      },
      {
        path: "editor",
        name: "Editor",
        component: "@/views/vab/editor",
        meta: {
          title: "编辑器",
          roles: ["admin"],
          remixIcon: "edit-2-line",
        },
        children: [
          {
            path: "richTextEditor",
            name: "RichTextEditor",
            component: "@/views/vab/editor/richTextEditor",
            meta: {
              title: "富文本编辑器",
              roles: ["admin"],
            },
          },
          {
            path: "markdownEditor",
            name: "MarkdownEditor",
            component: "@/views/vab/editor/markdownEditor",
            meta: {
              title: "Markdown编辑器",
              roles: ["admin"],
            },
          },
        ],
      },
      {
        path: "menu1",
        name: "Menu1",
        component: "@/views/vab/nested/menu1",
        redirect: "/vab/menu1/menu1-1/menu1-1-1",
        alwaysShow: true,
        meta: {
          title: "嵌套路由1",
          roles: ["admin"],
          remixIcon: "route-line",
        },
        children: [
          {
            path: "menu1-1",
            name: "Menu1-1",
            alwaysShow: true,
            component: "@/views/vab/nested/menu1/menu1-1",
            redirect: "/vab/menu1/menu1-1/menu1-1-1",
            meta: {
              title: "嵌套路由1-1",
            },
            children: [
              {
                path: "menu1-1-1",
                name: "Menu1-1-1",
                meta: {
                  title: "嵌套路由1-1-1",
                },
                component: "@/views/vab/nested/menu1/menu1-1/menu1-1-1",
              },
            ],
          },
        ],
      },
      {
        path: "loading",
        name: "Loading",
        component: "@/views/vab/loading",
        meta: {
          title: "加载",
          roles: ["admin"],
          remixIcon: "loader-line",
        },
      },
      {
        path: "player",
        name: "Player",
        component: "@/views/vab/player",
        meta: {
          title: "视频播放器",
          roles: ["admin"],
          remixIcon: "video-line",
        },
      },
      {
        path: "upload",
        name: "Upload",
        component: "@/views/vab/upload",
        meta: {
          title: "上传",
          roles: ["admin"],
          remixIcon: "chat-upload-line",
        },
      },
      {
        path: "log",
        name: "Log",
        component: "@/views/vab/errorLog",
        meta: {
          title: "错误日志模拟",
          roles: ["admin"],
          remixIcon: "error-warning-line",
        },
      },
      {
        path: "cssfx",
        name: "Cssfx",
        component: "@/views/vab/cssfx",
        meta: {
          title: "Css动画",
          roles: ["admin"],
          remixIcon: "css3-line",
          badge: "New",
        },
      },
      {
        path: "social",
        name: "Social",
        component: "@/views/vab/social",
        meta: {
          title: "第三方登录",
          roles: ["admin"],
          remixIcon: "github-fill",
          badge: "New",
        },
      },
      {
        path:
          "https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension",
        name: "ExternalLink",
        meta: {
          title: "外链",
          target: "_blank",
          roles: {
            role: ["admin", "editor"],
            mode: "oneOf",
          },
          remixIcon: "external-link-line",
        },
      },
      {
        path: "excel",
        name: "Excel",
        component: "@/views/vab/excel",
        redirect: "/vab/excel/exportExcel",
        meta: {
          title: "Excel",
          roles: ["admin"],
          remixIcon: "file-excel-2-line",
        },
        children: [
          {
            path: "exportExcel",
            name: "ExportExcel",
            component: "@/views/vab/excel/exportExcel",
            meta: {
              title: "导出Excel",
            },
          },
          {
            path: "exportSelectedExcel",
            name: "SelectExcel",
            component: "@/views/vab/excel/exportSelectExcel",
            meta: {
              title: "导出选中行Excel",
            },
          },
          {
            path: "exportMergeHeaderExcel",
            name: "MergeHeaderExcel",
            component: "@/views/vab/excel/exportMergeHeaderExcel",
            meta: {
              title: "导出合并Excel",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/mall",
    name: "Mall",
    component: "Layout",
    redirect: "/mall/goods",
    meta: {
      title: "物料源",
      remixIcon: "apps-line",
      roles: ["admin"],
    },
    children: [
      {
        path: "goods",
        name: "GoodsList",
        component: "@/views/mall/goods",
        meta: {
          title: "物料市场",
          remixIcon: "shopping-cart-line",
        },
      },
    ],
  },
  {
    path: "/setting",
    name: "PersonnelManagement",
    component: "Layout",
    redirect: "/setting/userManagement",
    meta: {
      title: "配置",
      remixIcon: "user-settings-line",
      roles: ["admin"],
    },
    children: [
      {
        path: "userManagement",
        name: "UserManagement",
        component: "@/views/setting/userManagement",
        meta: {
          title: "用户管理",
          remixIcon: "user-3-line",
        },
      },
      {
        path: "roleManagement",
        name: "RoleManagement",
        component: "@/views/setting/roleManagement",
        meta: {
          title: "角色管理",
          remixIcon: "admin-line",
        },
      },
      {
        path: "departmentManagement",
        name: "DepartmentManagemen",
        component: "@/views/setting/departmentManagement",
        meta: {
          title: "部门管理",
          remixIcon: "group-line",
        },
      },
      {
        path: "menuManagement",
        name: "MenuManagement",
        component: "@/views/setting/menuManagement",
        meta: {
          title: "菜单管理",
          badge: "New",
          remixIcon: "menu-2-fill",
        },
      },
    ],
  },
  {
    path: "/error",
    name: "Error",
    component: "Layout",
    redirect: "/error/403",
    meta: {
      title: "错误页",
      remixIcon: "error-warning-line",
    },
    children: [
      {
        path: "403",
        name: "Error403",
        component: "@/views/403",
        meta: {
          title: "403",
          remixIcon: "error-warning-line",
        },
      },
      {
        path: "404",
        name: "Error404",
        component: "@/views/404",
        meta: {
          title: "404",
          remixIcon: "error-warning-line",
        },
      },
    ],
  },
];
module.exports = [
  {
    url: "/menu/navigate",
    type: "get",
    response() {
      return {
        code: 200,
        msg: "success",
        data,
      };
    },
  },
];
