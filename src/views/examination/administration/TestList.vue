<template>
      
  <div class="testlist">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="p_name" label="考试名称"> </el-table-column>
      <el-table-column prop="p_pid" label="分类"> </el-table-column>
      <el-table-column prop="p_score" label="总分"> </el-table-column>
      <el-table-column prop="p_starttime" label="开始时间"> </el-table-column>
      <el-table-column prop="p_endtime" label="结束时间"> </el-table-column>
      <el-table-column prop="p_createtime" label="创建时间"> </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <div>
            <button @click="kaishi(scope.row.id)">开始考试</button>
          </div>
        </template>
      </el-table-column>
    </el-table>
        
  </div>
</template>

<script>
import { getpaper } from "network/paper";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    this.getpaper();
  },
  methods: {
    async getpaper() {
      const res = await getpaper();
      this.tableData = res.data.list;
    },
    kaishi(id) {
      this.$router.push("/begindemo/"+id);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped lang="">
</style>
