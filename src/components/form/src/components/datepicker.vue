<template>
  <div>
    <a-date-picker
      v-if="type == 'date'"
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
      :disabled-date="disabledDate"
    />
    <a-month-picker
      v-else-if="type == 'month'"
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
    />
    <a-range-picker
      v-else-if="type == 'range'"
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
    />
    <a-week-picker
      v-else-if="type == 'week'"
      v-model:value="modelValue"
      v-bind="formItem.props"
      v-on="formItem.eventObject"
    />
  </div>
</template>
<script>
import { defineComponent, PropType, computed, reactive, toRefs } from "vue";
import moment from 'moment';

export default defineComponent({
  name: "p-datepicker",
  components: {},
  emits: ["update:value"],
  props: {
    formItem: {
      // 表单项
      type: Object,
      default: () => ({}),
    },
    value: undefined, // 表单项值
  },
  setup(props, { attrs, emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit("update:value", val),
    });

    const state = reactive({
      type: computed(() => {
        return props.formItem.props && props.formItem.props.type
          ? props.formItem.props.type
          : "date";
      }),
    });

      const disabledDate = current => {
      //当天之前的不可选，不包括当天
      return current && current <moment().subtract(1, "days");
      //当天之前的不可选，包括当天
      //return current && current < moment().endOf(‘day');
    };

    return {
      ...toRefs(state),
      modelValue,
      disabledDate,
      moment,
    };
  },
});
</script>
