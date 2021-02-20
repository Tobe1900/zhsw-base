<!-- 登录页 -->
<template>
  <div style="height: 100vh">
    <div id="loginRender">
      <!-- 登录表单 -->
      <div style="position: fixed;top: 50px;">
        <el-alert v-show="limitVisible" title="提示" type="error" description="由于连续输入密码错误,您的账号已被锁定，暂时无法登录，请3分钟后重试！" show-icon @close="limitVisible = false"/>
      </div>

      <p class="logo_position" />
      <div class="login_content">
        <!-- 登录输入选项 -->
        <div class="login_form">
          <el-form ref="loginForm" class="login-form" :rules="loginRules" :model="loginForms">
            <el-form-item prop="username">
              <el-input v-model.trim="loginForms.username" size="small" prefix-icon="el-icon-user" placeholder="账户名称" class="login_input" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model.trim="loginForms.password" size="small" type="password" prefix-icon="el-icon-lock" placeholder="密码" class="login_input" @keyup.enter.native="handleLogin" />
            </el-form-item>
            <div class="m-b-24">
              <el-checkbox v-model="checked">自动登录</el-checkbox>
            </div>
            <el-form-item>
              <el-button type="primary" class="login-submit" :loading="loading" :disabled="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
          <p class="text_center">温馨提示：忘记账号名称或密码请联系系统管理员</p>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="login_foot">
        <span>联系我们</span>
        <span>帮助中心</span>
        <p>copyright ©2020 上海勘测设计研究院有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      hasCode: true,
      limitVisible: false,
      loading: false,
      loginForms: {
        username: '',
        password: ''
      },
      checked: false, // 是否记住密码
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入账户名称',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }

  },
  props: {
    msg: String
  },
  methods: {
    handleLogin() {
      console.log('login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin render_bgi($src) {
  background: url($src) no-repeat center;
  background-size: 100% 100%;
}

.loading-container{
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center
}

.logo_position {
  height: 80px;
  background-image: url("../assets/images/login/logo.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 80px;
  margin-bottom: 20px;
  width: 450px;
}

#loginRender {
  display: flex;
  min-width: 1100px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include render_bgi("../assets/images/login/bgc.png");

  // logo展示
  /**
    .logo_position {
      height: 50px;
      @include render_bgi('../../assets/images/login/logos.svg');
      margin-bottom: 42px;
    }
    **/

  .login_input {
    input {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      height: 40px !important;
      border-radius: 4px !important;
      background: rgba(255, 255, 255, 1);
    }

    i {
      font-size: 16px;
    }
  }

  .login_content {
    width: 370px;
    margin-bottom: 14%;

    .login_form {
      width: 100%;
    }

    .login-submit {
      width: 100%;
    }

    .m-b-24 {
      margin-bottom: 24px;
    }

    .text_center {
      font-size: 12px;
      transform: translatey(-12px);
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
    }
  }

  .login_foot {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 27px;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);

    span:first-child {
      margin-right: 40px;
    }

    span {
      font-size: 14px;
    }

    p {
      font-size: 12px;
    }
  }

  .el-form-item {
    margin-bottom: 24px;
  }

  .el-checkbox__label {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    font-family: PingFang SC;
  }

  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }

  .el-button--primary:active {
    background-color: rgba(68, 132, 255, 0.45) !important;
    border: 1px solid rgba(68, 132, 255, 0.45);
  }

  .el-button--primary {
    font-size: 16px;
    background-color: rgba(68, 132, 255, 1) !important;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #409eff !important;
    width: 16px;
    height: 16px;

    &::after {
      height: 10px;
      left: 5px;
    }
  }
}
</style>
