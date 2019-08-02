<template>
    <div class="container">
        <el-card class="box-card my-card">
            <div class="card-form">
                <img src="../../assets/images/logo_index.png" alt="">
            </div>
             <el-form ref="form" :model="form">
                    <el-form-item >
                        <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
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
        }
    }

</style>
