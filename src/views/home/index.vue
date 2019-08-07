<template>
    <el-container class="wrapper">
        <el-aside :width="isCollapse?'64px':'200px'">
            <div class="logo" :class="{miniLogo:isCollapse}"></div>
    <el-col>
        <el-menu
            :collapse = "isCollapse"
            :collapse-transition = "false"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#002033"
            text-color="#fff"
            router
            active-text-color="#ffd04b">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document-copy"></i>
          <span>内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-folder-opened"></i>
          <span>素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-document-checked"></i>
          <span>发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-notebook-1"></i>
          <span>评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-chat-dot-square"></i>
          <span>粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span>个人设置</span>
        </el-menu-item>

        </el-menu>
    </el-col>
        </el-aside>
    <el-container>
    <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
    <el-dropdown class="my-dropdown">
        <span class="el-dropdown-link">
            <img :src="photo">
        {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
    </el-container>
    </el-container>
</template>
<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''

    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photow
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      store.clearUser()
      this.$router.push('/login')
    }
  }

}
</script>

<style scoped lang="less">
    .wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        .el-aside {
            background-color: #002033
        }
        .el-header {
            line-height: 60px;
            border-bottom: 1px solid #ddd;
            .el-icon-s-fold {
                font-size: 24px;
                vertical-align:middle;
            }
            .text {
            vertical-align:middle;
            margin-left: 10px;
            }
            .my-dropdown {
                float: right;
                .el-dropdown-link {
                    font-weight: 700;

                }
                 img {
                        width: 30px;
                        height: 30px;
                        vertical-align: middle
                    }
            }
        }

    }
    .logo {
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 120px auto;
    }
    .miniLogo {
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto
    }
    .el-menu {
        border-right: none
    }
</style>
