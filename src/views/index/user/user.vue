<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="more-width">
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
        <el-table-column type="index" label="序号" width="60px"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <!-- 传递值必须使用template集合 加 slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- scope.row  点击获取当前 本行值 -->
            <el-button @click="showEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="status(scope.row)" type="text">
            {{ scope.row.status === 1? "禁用" : "启用" }}</el-button>
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
    <el-dialog title="新增用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="addForm.status" placeholder="请选择角色">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入 接口
import { user } from "../../../api/api.js";

export default {
  name: "subject",
  data() {
    return {
      // 筛选表格
      formInline: {},
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

      // 新增表单的数据
      addForm: {},
      // 新增表单是否显示
      addFormVisible: false,
      // label的宽度不设置不能都在一行
      formLabelWidth: "80px",
      // 表单验证规则
      addRules: {
        name: [{ required: true, message: "用户名不能为空" }],
        email: [
          { required: true, message: "邮箱不能为空" },
          {
            validator: (rules, value, callback) => {
              // value是值
              if (!value) {
                callback(new Error("邮箱不能为空"));
              } else {
                // 格式验证
                const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                setTimeout(() => {
                  // 验证
                  if (reg.test(value)) {
                    // 对的
                    callback();
                  } else {
                    // 错误
                    callback(new Error("邮箱格式不对哦"));
                  }
                }, 1000);
              }
            }
          }
        ],
        phone: [{ required:true, message: "电话不能为空"}],
        role: [{ required:true, message: "角色不能为空"}]
      },
      // 编辑表单的数据
      editForm:{},
      // 编辑表单是否显示
      editFormVisible:false
    };
  },
  created() {
    // 调用接口 传递筛选条件
    user
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        // window.console.log(res);
        // 赋值给table
        this.tableData = res.data.data.items;
        // 保存 总条数
        this.total = res.data.data.pagination.total;
      });
  },
  // 方法
  methods: {
    // 获取数据逻辑
    getList() {
      // 调用接口 传递筛选条件
      user
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          // window.console.log(res);
          this.tableData = res.data.data.items;
          // 重新设置页容量即可
          this.tobal = res.data.data.pagination.total;
        });
    },
    // 筛选逻辑
    search() {
      // 跳转第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
    // 页容量改变
    handleSizeChange(size) {
      // 保存起来
      this.limit = size;
      // 修改页码
      // 去第一页
      this.page = 1;
      // 重新获取数据
      this.getList();
    },
    // 页码改变
    handleCurrentChange(current) {
      // 保存页码
      this.limit = current;
      // 重新获取数据
      this.getList();
    },
    // 启用禁用数据的方法
    status(data){
      user.status({
        id:data.id,
        // 三元表达式
        status:data.status === 1 ? 0 : 1
      }).then(res=>{
        // window.console.log(res);
        if(res.data.code === 200){
          this.getList();
          // this.$message.success(res.data.message);
        }
      });
    },

    // 点击编辑状态
    showEdit(data){
      // 弹框
      this.editFormVisible = true;
      // 修改数据 浅拷贝
      // this.editForm = data;
      // 为了不联动 改为 深拷贝
      this.editForm = JSON.parse(JSON.stringify(data));
    },
    // 保存修改
    submitEdit(){
      // 编辑表单
      // this.$refs[ruleform] 解析ruleform的值 作为字符串来获取属性
      // this.$refs.editForm  editForm作为属性名
      this.$refs.editForm.validate(valid=>{
        if(valid){
          // 成功
          // 调用接口
          user.edit(this.editForm).then(res=>{
            // 如果成功 提示用户 关闭 对话框
            if(res.data.code == 200){
              this.editFormVisible = false;
              // 重新获取一次页面数据
              this.getList();
            }
          });
        }else{
          // 失败
          this.$message.warning("数据不正确");
          return false;
        }
      })
    },


    // 删除数据的方法
    remove(data) {
      this.$confirm("此操作将永久删除该学科, 确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 接口调用
          user
            .remove({
              id: data.id
            })
            .then(res => {
              // window.console.log(res);
              if (res.data.code === 200) {
                // 提示
                this.$message.success(res.data.message);
                // 重新获取数据
                this.getList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
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