<template>
<el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
</el-select>
</template>

<script>
export default {
  name: 'my-chinnel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      if (val === '') {
        val = null
      }
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>

</style>
