<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: true,
      formLabelWidth: '120px',
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
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    axios
      .get(`${import.meta.env.VITE_BASE_API}/user`)
      .then((res) => {
        this.tableData = res.data.data;
        console.log(this.tableData);
      })
      .catch((err) => {
        console.log(err);
      });

    },
    confirmDelete(id) {
      axios
        .delete(`${import.meta.env.VITE_BASE_API}/user/${id}`)
        .then((res) => {
          this.tableData = res.data.data;
          console.log(this.tableData);
          this.fetchData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openConfirm(index, array) {
      const id = array[index].id
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.confirmDelete(id)
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
          this.fetchData()
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
   <el-button type="primary">新增</el-button>
  <el-button type="success">Success</el-button>
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

  <el-button type="text" @click="dialogFormVisible = true">open a Form nested Dialog</el-button>

<el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="Promotion name" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Zones" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="Please select a zone">
        <el-option label="Zone No.1" value="shanghai"></el-option>
        <el-option label="Zone No.2" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
  </span>
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
}
.table-wrap {
  display: flex;
  justify-content: center;
}
</style>
