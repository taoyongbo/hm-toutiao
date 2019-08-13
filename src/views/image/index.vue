<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" style="float:right" size="small" @click="openDialog()">添加素材</el-button>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <span
              @click="toggleCollect(item)"
              class="el-icon-star-off"
              :class="{select:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        name="image"
        class="avatar-uploader"
        :headers="headers"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      dialogVisible: false,
      images: [],
      total: 0,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    delImage (id) {
      this.$confirm('亲，此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        // 上面的请求确实成功了，响应的时候来到前端报错了，阻止下面程序的执行。
        // 提示 更新列表
        this.$message.success('删除图片成功')
        this.getImages()
      }).catch(() => { })
    },
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? 'Add collection successfully' : 'Successfully cancel collection')
      item.is_collected = data.collect
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  margin-top: 20px;
}
.img-item {
  position: relative;
  width: 160px;
  height: 160px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    span {
      margin: 0 10px;
      &.select {
        color: red;
      }
    }
  }
}
</style>
