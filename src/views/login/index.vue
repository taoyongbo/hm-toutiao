<template>
    <div class="container">
        <el-card class="box-card my-card">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/login_bg.jpg) no-repeat center/cover
    }
    .my-card {
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: red;
    }
</style>
