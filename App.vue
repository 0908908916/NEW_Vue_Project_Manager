<template>
  <div id="app">
    <ObjectList />
  </div>
</template>

<script>
import ObjectList from './components/ObjectList.vue'

export default {
  components: { ObjectList }
}
</script>

<style>
/* 全域背景美化 */
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  font-family: "Microsoft JhengHei", sans-serif;
}
</style>
