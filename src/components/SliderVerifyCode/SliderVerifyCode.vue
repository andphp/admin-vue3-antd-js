<template>
  <div class="slider_verify_code" ref="slider_wrap">
    <div class="backgroud" ref="slider_background"></div>
    <div class="content" ref="slider_content"></div>
    <div
      class="icon"
      ref="slider_icon"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "SliderVerifyCode",
  props: {
    options: {
      type: Object,
      required: true,
      default: function() {
        return {
          text: "请向右滑动验证",
          successText: "验证成功", // 验证成功文字
          sliderTextColor: "#54e346", // 滑块验证成功的文本颜色
          sliderBackground: "#54e346", // 滑块滑动时背景颜色
          sliderColor: "#fff", // 滑块颜色
          height: 40, // 高度默认40
          width: "100%", // 默认宽度
          color: "#fff", // 初始化的字体颜色
          backgroud: "#cfd3ce", // 背景颜色
          fontSize: 12, // 字体大小
          icon: false, // 是否自定义图标，如果自定义需要自己配置成功图标
          delay: 0 // 延迟回调函数时间
        };
      }
    }
  },
  setup(props, { emit }) {
    // 取出配置的参数
    const options = ref(props.options).value;
    // 定义滑动成功的状态
    let isSuccess = false;

    const slider_icon = ref(null);
    const slider_wrap = ref(null);
    const slider_background = ref(null);
    const slider_content = ref(null);

    let slider;
    let wrap;
    let background;
    let content;
    let distance;

    onMounted(() => {
      // 1、获取滑动图片的dom元素
      slider = slider_icon.value;
      // 2、获取容器的dom元素
      wrap = slider_wrap.value;
      // 3、获取div背景dom元素
      background = slider_background.value;
      // 4、获取文本dom元素
      content = slider_content.value;
      // 6、初始化
      // wrap.style.position = "relative";
      wrap.style.height = options.height + "px";
      wrap.style.lineHeight = options.height + "px";
      wrap.style.background = options.backgroud;
      wrap.style.fontSize = options.fontSize + "px";
      wrap.style.width = options.width + "px";

      // 设置滑块的属性
      slider.style.background = options.sliderColor; // 滑块颜色

      !options.icon ? (slider.innerHTML = "&gt;&gt;") : ""; // 滑块文字

      slider.style.transition = null;
      slider.style.height = options.height + "px"; // 滑块高度
      slider.style.width = options.height + "px"; // 滑块宽度
      slider.style.lineHeight = options.height + "px"; // 滑块行高
      slider.style.left = 0 + "px"; // 滑块初始偏移值

      // 设置滑块条文字
      content.style.color = options.color; // 文字颜色
      content.innerHTML = options.text; // 文本

      // 设置滑块条背景
      background.style.transition = null;
      background.style.width = 0 + "px";

      // 5、定义滑动的最大距离
      distance =
        wrap.offsetWidth && slider.offsetWidth
          ? wrap.offsetWidth - slider.offsetWidth
          : 0;

      slider.onmousedown = event => {
        // 获取按下时的 初始x 的值
        const downX = event.clientX;
        document.onmousemove = e => {
          // 获取移动之后 x的值
          const moveX = e.clientX;
          // 获取偏移值
          let offsetX = moveX - downX;
          // 鼠标水平移动的距离 与 滑动成功的距离 之间的关系
          if (offsetX > distance) {
            // 如果滑过了终点，就将它停留在终点位置
            offsetX = distance;
          } else if (offsetX < 0) {
            // 滑到了起点的左侧，就将它重置为起点位置
            offsetX = 0;
          }
          // 根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
          slider.style.left = offsetX + "px";
          background.style.width = offsetX + "px";
          background.style.background = options.sliderBackground;

          // 如果鼠标的水平移动距离 = 滑动成功的宽度
          if (offsetX === distance) {
            // 1、设置滑动成功后的样式
            content.innerHTML = options.successText; // 成功文本
            slider.style.color = options.sliderTextColor; // 滑块文本颜色

            !options.icon ? (slider.innerHTML = "✔") : ""; // 滑块图标
            isSuccess = true;
            // 2、成功后，清除掉鼠标按下事件和移动事件
            slider.onmousedown = null;
            document.onmousemove = null;

            setTimeout(() => {
              // 回调函数
              emit("on-verify", isSuccess);
            }, options.delay);
          }
        };

        document.onmouseup = () => {
          // 如果鼠标松开时，滑到了终点，则验证通过
          if (isSuccess) {
            return;
          }
          // 反之，则将滑块复位（设置了1s的属性过渡效果）
          slider.style.left = 0 + "px";
          background.style.width = 0 + "px";
          // 只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    });

    let downX;
    let moveX;
    function touchstart(ev) {
      downX = ev.touches[0].clientX;
    }
    function touchmove(ev) {
      if (ev.touches.length === 1) {
        moveX = ev.touches[0].clientX;
        // 获取偏移值
        let offsetX = moveX - downX;
        // 鼠标水平移动的距离 与 滑动成功的距离 之间的关系
        if (offsetX > distance) {
          // 如果滑过了终点，就将它停留在终点位置
          offsetX = distance;
        } else if (offsetX < 0) {
          // 滑到了起点的左侧，就将它重置为起点位置
          offsetX = 0;
        }
        // 根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
        slider.style.left = offsetX + "px";
        background.style.width = offsetX + "px";
        background.style.background = options.sliderBackground;

        // 如果鼠标的水平移动距离 = 滑动成功的宽度
        if (offsetX === distance) {
          // 1、设置滑动成功后的样式
          content.innerHTML = options.successText; // 成功文本
          slider.style.color = options.sliderTextColor; // 滑块文本颜色

          !options.icon ? (slider.innerHTML = "✔") : ""; // 滑块图标
          isSuccess = true;
          // 2、成功后，清除掉鼠标按下事件和移动事件
          slider.onmousedown = null;
          document.onmousemove = null;

          setTimeout(() => {
            // 回调函数
            emit("on-verify", isSuccess);
          }, options.delay);
        }
      }
    }
    function touchend() {
      // 如果鼠标松开时，滑到了终点，则验证通过
      if (isSuccess) {
        return;
      }
      // 反之，则将滑块复位（设置了1s的属性过渡效果）
      slider.style.left = 0 + "px";
      background.style.width = 0 + "px";
    }
    return {
      slider_icon,
      slider_wrap,
      slider_content,
      slider_background,
      touchstart,
      touchmove,
      touchend
    };
  }
};
</script>

<style lang="scss" scoped>
.slider_verify_code {
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
}

.slider_verify_code .backgroud {
  position: absolute;
  height: 100%;
  border-radius: 4px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.29),
    2px 2px 2px rgba(255, 255, 255, 0.44) inset;
}

.slider_verify_code .content {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 4px;
}
.slider_verify_code .icon {
  position: absolute;
  text-align: center;
  color: #0a043c;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.29),
    2px 2px 2px rgba(255, 255, 255, 0.44) inset;
}</style
>>
