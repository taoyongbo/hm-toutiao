<template>
  <div class="my-img">
    <div class="img-btn" @click="openDialog()">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" size="mini" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              class="img-item"
              :class="{select:selectedImgUrl===item.url}"
              @click="selectedImgUrl=item.url"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            v-if="total > reqParams.per_page"
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传" name="upload">
          <!-- 是否显示已上传文件列表
          :show-file-list="false"-->
          <el-upload
            :headers="headers"
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0,
      uploadImageUrl: null,
      selectedImgUrl: null,
      defaultImage,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        // this.value = this.selectedImgUrl
        this.$emit('input', this.selectedImgUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    handleAvatarSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
      this.activeName = 'upload'
      this.uploadImageUrl = null
      this.selectedImgUrl = null
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.my-img {
    display: inline-block;
    margin-right: 10px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.dialog-footer {
  display: block;
  width: 100%;
  text-align: center;
}
.img-list {
  margin-top: 10px;
  .img-item {
    position: relative;
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    &.select {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
</style>
