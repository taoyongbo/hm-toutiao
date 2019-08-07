<template>
    <div class="container">
        <el-card class="box-card my-card">
            <div class="card-form">
                <img src="../../assets/images/logo_index.png" alt="">
            </div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon >
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                 </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:249px;margin-right:10px"></el-input>
                    <el-button plain style="width:150px">验证码</el-button>
                 </el-form-item>
                 <el-form-item>
                 <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                 </el-form-item>
                 <el-form-item>
                    <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
                 </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const nameForm = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('请输入正确的电话号码'))
      callback()
    }
    return {
      loginForm: {
        mobile: '18404814368',
        code: '246810'
      },
      loginRules: {
        mobile: [
          {
            required: true, message: '请输入正确的手机号', trigger: 'change'
          },
          {
            validator: nameForm, trigger: 'change'
          }
        ],
        code: [
          {
            required: true, message: '请输入验证码', trigger: 'blur'
          },
          {
            len: 6, message: '请输入六位验证码', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
          //   // console.log(res.data.data)
          //   store.setUser(res.data.data)
          //   this.$router.push('/')
          // }).catch(() => {
          //   // console.log(this.loginForm)
          //   this.$message.error('错误')
          // })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            console.log(data)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
        .my-card {
            width: 450px;
            height: 350px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            // background-color: red;
            .card-form {
                padding: 20px;
                img {
                    display: block;
                    width: 200px;
                    margin: 0 auto;
                }
            }
            .el-form-fl {
                float: left;
            }
        }
    }

</style>
