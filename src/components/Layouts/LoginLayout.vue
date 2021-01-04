<template>
  <div class="backImg">
    <div id="LoginLayout">
      <div class="card">
        <a-row type="flex" justify="center" align="bottom">
          <a-col :md="24" :lg="8">
            <span class="title">Vue Ant Admin</span>
          </a-col>
          <a-col :md="24" :lg="16">
            <div class="desc">牛逼plus 江北区最具影响力的 Web 后台管理系统</div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="0" :lg="16">
            <img src="~@/assets/login/table_bg.png" />
          </a-col>
          <a-col :md="24" :lg="8">
            <router-view />
          </a-col>
        </a-row>
        <div class="footer">
          <a-row>
            <a-col :span="24">
              <div class="links">
                <a href="_self">帮助</a>
                <a href="_self">隐私</a>
                <a href="_self">条款</a>
              </div>
            </a-col>
            <a-col :span="24">
              <div class="copyright">
                Copyright &copy; 2018 vueComponent
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLayout"
};
</script>

<style lang="scss" scoped>
@import "loginLayout";
</style>
