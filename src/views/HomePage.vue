<template>
      
  <div class="homepage">
    <!-- 添加分类 对话框-->
    <el-button type="primary" @click="dialog = true">添加类别</el-button>

    <el-dialog title="添加类别" :visible.sync="dialog" width="30%">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="demo_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-cascader v-model="pid" :options="cateList" :props="props">
          </el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addtype">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 对话框-->

    <el-dialog title="编辑类别" :visible.sync="dialog2" width="30%">
      <el-form :model="editinfo">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="editinfo.demo_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="lastedit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 第三方树状组件 -->
    <tree-table
      class="tb-cate"
      index-text="#"
      show-index
      stripe
      border
      :data="fencateList"
      :columns="columns"
      :expand-type="false"
      :selection-type="false"
    >
      <template slot="isok" slot-scope="scope">
        <i class="el-icon-success" style="color: lightGreen"></i>
      </template>
      <template slot="level" scope="scope">
        <el-tag
          type="primary"
          effect="plain"
          size="mini"
          v-if="scope.row.level === 1"
          >一级</el-tag
        >
        <el-tag
          type="success"
          effect="plain"
          size="mini"
          v-else-if="scope.row.level === 2"
          >二级</el-tag
        >
        <el-tag type="warning" effect="plain" size="mini" v-else>三级</el-tag>
      </template>
      <template slot="opt" scope="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="update(scope.row)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </tree-table>
        

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { gettitle1, gettitle2,dele, edit, add } from "network/typetitle";
export default {
  props: {},
  data() {
    return {
      //     第三方树状插件
      cateList: [],
      fencateList:[],
      columns: [
        { label: "分类名称", prop: "demo_name" },
        {
          label: "是否有效",
          prop: "effective",
          type: "template",
          template: "isok",
        },
        {
          label: "分类等级",
          prop: "level",
          type: "template",
          template: "level",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      //       删除与修改
      dialog: false,
      dialog2: false,
      editinfo: {},
      //       添加
      demo_name: "",
      // 联级选择器
      pid: 0,
      props: {
        value: "id",
        label: "demo_name",
        children: "children",
        checkStrictly: true,
      },
      //分页
      count:0,
      size:5,
      currentPage:1,
      formLabelWidth: "120px",
    };
  },
  computed: {},
  async created() {
    this.gettitle2();
    this.gettitle1();
  },
  mounted() {},
  watch: {},
  methods: {
    //    分页
      handleSizeChange(val) {
              this.size=val
        this.gettitle2()
      },
      handleCurrentChange(val) {
              this.currentPage=val
        this.gettitle2()
      },
    //     获取类别数据  (分页)
    async gettitle2() {
      const res = await gettitle2({'size':this.size,'page':this.currentPage});
      this.fencateList = res.data.data;
        this.count=res.data.count
    },
    //     获取类别数据  (不分页)
    async gettitle1() {
      const res = await gettitle1();
      this.cateList = res.data.data;

    },
    //     添加类别
    async addtype() {
      var cat_name = this.demo_name;
      var cat_pid = 0;
      var cat_level = 1;
      if (this.pid.length > 0) {
        cat_pid = this.pid[this.pid.length - 1];
        cat_level = this.pid.length + 1;
      }
      const res=await add({ cat_name, cat_pid, cat_level });
      this.$message(res.data.status);
      this.dialog = !this.dialog;
      this.gettitle2();
      this.gettitle1();
    },
    //     弹出修改对话框
    update(row) {
      this.dialog2 = !this.dialog2;
      this.editinfo = row;
    },
    //     修改一条数据
    async lastedit() {
      const res = await edit(this.editinfo);
      this.$message(res.data.status);
      this.dialog2 = !this.dialog2;
      this.gettitle2();
      this.gettitle1()
    },
    //     删除一条数据
    async del(int) {
      const res = await dele(int);
      this.$message(res.data.status);
      this.gettitle2();
      this.gettitle1();
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
</style>
