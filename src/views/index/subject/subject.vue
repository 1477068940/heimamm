<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 --> <!-- 传递值必须使用template集合 加 slot-scope="scope" -->
          <template slot-scope="scope">
              <!-- scope.row  点击获取当前 本行值 -->
            <el-button @click="showEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="status(scope.row)" type="text">
                {{ scope.row.status === 1? "禁用" : "启用" }}
            </el-button>
            <el-button @click="remove(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增对话框 -->

    <!-- 编辑对话框 -->

  </div>
</template>

<script>
// 导入 接口
import {subject} from "../../../api/api.js";

export default {
    name: "subject",
    data() {
      return {
        // 筛选表格
        formInline: {},
        // 新增表单是否显示
        addFormVisible: false,
        //   数据
        tableData: [],
         // 页码
        page: 1,
        // 页容量
        limit: 10,
        // 页码数组
        pageSizes: [5, 10, 15, 20],
        // 总条数
        total: 0,
      };
    },
    created() {
        subject
            .list({
                page:this.page,
                limit:this.limit
            }).then(res=>{
                window.console.log(res);
                // 赋值给table
                this.tableData = res.data.data.items;
                // 保存 总条数
                this.tatal = res.data.data.pagination.total;
            });
    },
    // 方法
    methods: {
        // 获取数据逻辑

    },
};
</script>

<style lang="less">
.subject-container {
  .el-input__inner {
    width: 100px;
  }
  .more-width {
    .el-input__inner {
      width: 150px;
    }
  }
  // 分页器的样式
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  // card的样式
  .main-card {
    margin-top: 20px;
  }
  // span 变红
  .red {
    color: red;
  }

  // 编辑器框
  .edit-dialog {
    .el-dialog__header {
      background-color: deepskyblue;
      text-align: center;
      .el-dialog__title {
        color: white;
      }
    }
    .el-input__inner {
      width: 100%;
    }
  }
}
</style>