<template>
  <div id="app" class="app-container">
    <h1 class="title">物件管理系統</h1>
    <ObjectList />
  </div>
</template>

<script>
import ObjectList from './components/ObjectList.vue'

export default {
  name: 'App',
  components: { ObjectList }
}
</script>

<style>
.app-container {
  min-height: 100vh;
  background: linear-gradient(to right, #3a7bd5, #00d2ff); /* 藍色漸層 */
  padding: 40px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  color: #fff;
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: bold;
}
</style>
