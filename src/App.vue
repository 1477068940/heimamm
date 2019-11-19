<template>
  <div id="app">
    黑马面面
  </div>
  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
