/* export default function typer(el, binding, VNode, prevNode) {
     if (el && el.innerHtml) {
       let letters = el.innerHtml.split("");
       for (let i = 0; i < letters.length; i++) {
         (function(i) {
           setTimeout(() => {
             el.innerHtml += letters[i];
           }, (i + 1) * 1000);
         })(i);
       }
     }
   } */

// 聚焦指令
export default {
  created(el, binding, vnode) {},
  beforeMount(el, binding, vnode) {
    const { value } = binding;
    let delay = 100;
    if (value && Number.isInteger(value)) {
      delay = value;
    }
    if (el && el.innerHtml) {
      let letters = el.innerHtml.split("");
      el.innerHtml = "";
      for (let i = 0; i < letters.length; i++) {
        (function(i) {
          setTimeout(() => {
            el.innerHtml = el.innerHtml.replace(/[_]$/, "");
            if (i == letters.length - 1) {
              el.innerHtml += letters[i];
            } else {
              el.innerHtml += letters[i] + "_";
            }
          }, (i + 1) * delay);
        })(i);
      }
    }
  },
  mounted(el, binding, vnode) {},
  beforeUpdate(el, binding, vnode) {},
  update(el, binding, vnode) {},
  beforeUnmount(el, binding, vnode) {},
  unmounted(el, binding, vnode) {},
};
