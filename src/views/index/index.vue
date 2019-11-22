<template>
    <el-container class="bodyer">
      <el-header class="Header">Header</el-header>
      <el-container class="zhuti">
        <el-aside class="Aside" width="200px">Aside</el-aside>
        <el-main class="Main">Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
    name:'index',

}
</script>

<style lang="less">
    .bodyer{
        width:100%;
        height:100%;
        .Header{
            background-color: skyblue;
        }
        .Aside{
            background-color: green;
        }
        .Main{
            background-color: red;
        }
    }
</style>