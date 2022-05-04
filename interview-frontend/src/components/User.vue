<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
          user_name: '',
          email: '',
          password: ''
        },
      editUserID: '',
    };
  },
  created() {
    this.getUsersData()
  },
  methods: {
    async addUser() {
      try {
        const payloads = {
          user_name: this.form.user_name,
          email: this.form.email,
          password: this.form.password
        }
        const result = await axios.post(`${import.meta.env.VITE_BASE_API}/user`, payloads)
        this.tableData = result.data.data;
      } catch (error) {
        console.log(error)
      }
    },
    async getUsersData() {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_API}/user`)
        this.tableData = result.data.data;
      } catch (error) {
        console.log(error)
      }
    },
    async getUserById(id) {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_API}/user/${id}`)
        return result.data.data;
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id) {
      try {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_API}/user/${id}`)
        this.tableData = result.data.data;
      } catch (error) {
        console.log(error)
      }
    },
    async editUser(id) {
      try {
        const result = await axios.put(`${import.meta.env.VITE_BASE_API}/user/${id}`, {
          user_name: this.form.user_name,
          email: this.form.email,
          password: this.form.password
        })
        this.tableData = result.data.data;
      } catch (error) {
        console.log(error)
      }
    },
    confirmDelete(id) {
      this.deleteUser(id)
      this.getUsersData()
    },
    ConfirmEdit() {
      if (this.editUserID === '') {
        this.addUser()
      } else {
        this.editUser(this.editUserID)
      }
      this.closeEdit()
    },
    async openEdit(index, array) {
      this.editUserID = array[index].id
      const result = await this.getUserById(this.editUserID)
      this.form.user_name = result.user_name
      this.form.email = result.email
      this.form.password = result.password
      this.dialogFormVisible = true
    },
    OpenAdd() {
      this.form.user_name = ''
      this.form.email = ''
      this.form.password = ''
      this.dialogFormVisible = true
    },
    closeEdit() {
      this.dialogFormVisible = false
      this.editUserID = ''
    },
    openConfirm(index, array) {
      const id = array[index].id
      this.$confirm('你確認要刪除這個使用者嗎?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.confirmDelete(id)
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
          this.getUsersData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
      },
  },
};
</script>

<template>

<div class="">
  <div class="wrap">
   <el-button type="primary" @click="OpenAdd()">新增</el-button>
  </div>
  <div class="table-wrap">
  <el-table :data="tableData" style="width: 80%">
    <el-table-column prop="id" label="使用者ID" width="180"> </el-table-column>
    <el-table-column prop="user_name" label="使用者名稱" width="180"> </el-table-column>
    <el-table-column prop="email" label="信箱" width="180"> </el-table-column>
    <el-table-column prop="password" label="密碼"> </el-table-column>
    <el-table-column
      prop="edit"
      label="修改"
      width="100"
      >
      <template v-slot="scope">
        <el-button
          @click.native.prevent="openEdit(scope.$index, tableData)"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="delete"
      label="移除"
      width="100"
      >
      <template v-slot="scope">
        <el-button
          @click.native.prevent="openConfirm(scope.$index, tableData)"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

<el-dialog v-model="dialogFormVisible" :title="editUserID === '' ? '新增會員資料' : '修改會員資料'">
    <el-form :model="form">
      <el-form-item label="使用者名稱" :label-width="formLabelWidth">
        <el-input v-model="form.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="信箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密碼" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeEdit()">取消</el-button>
        <el-button type="primary" @click="ConfirmEdit()">確認</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>
</template>

<style scoped>
a {
  color: #42b983;
}
.wrap {
  display: flex;
  justify-content: end;
  width: 90%;
  margin: 60px 0;
}
.table-wrap {
  display: flex;
  justify-content: center;
}
</style>
