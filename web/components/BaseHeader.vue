<template>
  <header class="header">
    <nav class="navs">
      <router-link class="nav"
                   active-class="active"
                   to="/">首页</router-link>
      <router-link class="nav"
                   active-class="active"
                   to="/discover">发现</router-link>
      <router-link class="nav"
                   active-class="active"
                   to="/login"
                   v-if="!user">登陆</router-link>
      <router-link class="nav"
                   active-class="active"
                   to="/my"
                   v-else>{{user.username}}</router-link>
    </nav>
  </header>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const user = computed(() => store.state.userinfo)
    return { user }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  .navs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .nav {
      padding: 5px 20px;
      &.active {
        background-color: #21232c;
        border-radius: 5px;
        color: #fff;
      }
    }
  }
}
</style>