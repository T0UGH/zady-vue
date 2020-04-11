<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item>
        <el-button-group>
          <el-button size="medium" @click="onSubmit">提交</el-button>
          <el-button size="medium" @click="onCancel">清空</el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item label="BUG名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="所属故事">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="导入封装包" value="1" />
          <el-option label="导出封装包" value="2" />
          <el-option label="导出xml" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="BUG级别">
        <el-select v-model="form.date1" placeholder="please select your zone">
          <el-option label="A" value="A" />
          <el-option label="B" value="B" />
          <el-option label="C" value="C" />
          <el-option label="C" value="D" />
        </el-select>
      </el-form-item>
      <el-form-item label="文字描述">
        <el-input v-model="form.desc" type="textarea" autosize/>
      </el-form-item>
      <el-form-item label="图片描述">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

