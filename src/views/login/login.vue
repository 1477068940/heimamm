<template>
  <div class="login-container">
    <!-- z左侧form -->
    <div class="form-wrapper">
      <div class="title-box">
        <img src="../../assets/login_icon.png" alt class="login-logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <!-- 手机号 -->
        <el-form-item label prop="phone">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            class="phone-input"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            class="password-input"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.captcha"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="captcha" @click="changeCaptcha" :src="captchaSrc" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 协议 -->
        <el-checkbox class="checkbox" v-model="checked">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>

        <!-- 登录注册按钮 -->
        <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
        <el-button type="primary" class="reg-btn" @clisk="showReg=true">注册</el-button>
      </el-form>
    </div>

    <!-- 右侧 图片 -->
    <img src="../../assets/login_banner_ele.png" alt class="banner" />
  </div>

  <!-- 注册对话框 -->
</template>


<script>
/* js业务逻辑 */
// 导入 axios
import axios from "axios";
export default {
  name: "login",
  //数据
  data() {
    // 定义校验的规则
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        // 空
        callback(new Error("老铁，手机不能为空哦"));
      } else {
        // 非空 验证格式
        // callback();
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value)) {
          // 符合
          callback();
        } else {
          // 不符合
          callback(new Error("手机号格式不对哦"));
        }
      }
    };

    return {
      // 登录表单数据
      loginForm: {
        phone: "",
        password: "",
        captcha: ""
      },
      // 登录验证规则
      loginRules: {
        phone: [{ validator: checkPhone }],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "密码的强度不够" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码只有4位哦，不要写错了噢" }
        ]
      },
      // 验证码地址
      captchaSrc: "http://183.237.67.218:3002/captcha?type=login",
      // 是否勾选
      checked: true,
      // 是否显示注册框
      showReg: false,
      // 注册表单数据
      registerForm: {
        name: "",
        phone: "",
        email: "",
        // 用户头像
        avatar: "",
        password: "",
        // 短信验证码
        rcode: "",
        // 图形验证码
        code: ""
      }
    };
  },

  // 方法
  methods: {
    // 点击登录
    submitForm(formName) {
      // 布尔判断 如果为false
      if (!this.checked) {
        this.$message.warning("未勾选用户协议,必须勾选!!!");
        return;
      }
      // this.$refs['ruleForm']==> 获取饿了么的表单
      // 饿了么的表单.validate()
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证成功
          // alert("submit!");
          // 接口调用
          axios({
            url: "http://183.237.67.218:3002/login",
            method: "post",
            data: {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            },
            withCredentials: true
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("登录成功!");
            } else {
              this.$message.warning("登录失败!");
            }
          });
        } else {
          // 验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    // 修复值即可
    // 很有可能重复  随机数
    changeCaptcha() {
      // this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Math.random()}`;
      // 绝对不会重复  时间戳
      this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
      // this.captchaSrc = `http://183.237.67.218:3002/captcha?type=login`
    }
  }
};
</script>


<style lang="less">
/* csss样式 */
/* 登录盒子 */
.login-container {
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 水平方向的对其方式 */
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );

  .form-wrapper {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 48px;
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;

    .title-box {
      display: flex;
      align-items: center;

      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }

      .title {
        font-size: 24px;
        margin-right: 14px;
      }

      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }

      .sub-title {
        font-size: 22px;
      }
    }

    .phone-input {
      margin-top: 30px;
    }

    .password-input {
      margin-top: 25px;
    }

    .captcha-row {
      margin-top: 25px;

      .captcha {
        // width: 110px;
        width: 100%;
        height: 42px;
      }
    }

    // 协议
    .checkbox {
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 32px;

      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    .checkbox.el-checkbox__label {
      color: #999;
    }

    // 按钮
    .login-btn,
    .reg-btn {
      //   display: block;
      width: 100%;
      margin-left: 0;
      margin-top: 27px;
    }
  }
}
</style>