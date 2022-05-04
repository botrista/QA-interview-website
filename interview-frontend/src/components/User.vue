<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
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
};
</script>

<template>

<div class="">
  <div class="wrap">
   <el-button type="primary">Primary</el-button>
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
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
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
