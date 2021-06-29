const Mock = require("mockjs");

const Random = Mock.Random;
// 设置全局延时，没有延时的话，有时候会检测不到数据变化
Mock.setup({
  timeout: "300-600",
});
// 创建一个数组用来接收模拟的数据
const mocklist = [];
const count = 10;

for (let i = 0; i < count; i++) {
  mocklist.push(Mock.mock({
    id: "@id",
    name: "@cname",
    "phone|1": /^1[0-9]{10}$/,
    age: "@integer(18, 60)",
    email: "@email",
    // "education|1": ["本科", "大专", "硕士", "博士", "中专"],
    "sex|1": ["男", "女"],
    /* "graduationschool|1": [
         "西南财经",
         "北京交通大学",
         "重庆工商大学",
         "清华大学",
         "西南大学",
         "上海复旦大学",
       ],
       "profession|1": [
         "教授",
         "律师",
         "医生",
         "公务员",
         "大学老师",
         "警察",
         "白领",address
       ], */
    address: "@county(true)",
  }));
}

const acions = [];
for (let index = 1; index <= 5; index++) {
  acions.push({
    key: index,
    value: index,
    checked: true,
  });
}

const treelist = [
  {
    key: 1, // 唯一标识
    value: 1, // 唯一标识
    title: "111", // 标题
    checkable: true, // 当树为 checkable 时，设置独立节点是否展示 Checkbox
    disableCheckbox: false, // 禁掉 checkbox
    disabled: false, // 禁掉响应
    selectable: true, // 设置节点是否可被选中
    isLeaf: false, // 设置为叶子节点(设置了loadData时有效)
    extra: { id: 1, name: 2, actions: acions },
    slots: { title: "custom" },
    children: [
      {
        key: 11, // 唯一标识
        value: 11, // 唯一标识
        title: "1-1", // 标题
        checkable: true, // 当树为 checkable 时，设置独立节点是否展示 Checkbox
        disableCheckbox: false, // 禁掉 checkbox
        disabled: false, // 禁掉响应
        selectable: true, // 设置节点是否可被选中
        isLeaf: false, // 设置为叶子节点(设置了loadData时有效)
        extra: { id: 11, name: 22, actions: acions },
        slots: { title: "custom" },
      },
    ],
  },
];

module.exports = [
  {
    url: "/components/table",
    type: "get",
    response() {
      return {
        code: 200,
        msg: "success",
        data: {
          data: mocklist,
          total: Random.integer(60, 100),
        },
      };
    },
  },
  {
    url: "/components/tree",
    type: "get",
    response() {
      return {
        code: 200,
        msg: "success",
        data: treelist,
      };
    },
  },
];
