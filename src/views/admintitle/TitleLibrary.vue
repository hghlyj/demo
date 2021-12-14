<template>
      
  <div class="library">
    <div class="library_top">
      <p>题库</p>
      <div class="button">
        <span class="but" @click="$router.push('/addtitle')">添加试题</span>
        <span class="but">试题查重</span>
        <span class="but">批量更新</span>
        <span class="but">批量删除</span>
        <span class="but">自定义列</span>
      </div>
    </div>
    <div class="library_content">
      <div class="content_left">
        <span v-if="titleall == null" class="wu">暂无数据</span>
        <span v-else>
          <div class="type">试题分类</div>
          <div class="content">
            <div class="all" @click="getalltype">全部类型</div>
            <!-- 树形分类 -->
            <el-tree
              :data="titleall"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            >
            </el-tree>
          </div>
        </span>
      </div>
      <div class="content_right">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand"
                v-if="props.row.title"
              >
                <div class="tigan1">
                  <span>题干:</span>
                  <span>{{ props.row.title }}</span>
                </div>
                <div class="youce">
                  <div class="daan1">
                    <span>答案:</span>
                    <span v-if="props.row.type==0">
                            <span>{{ props.row.answer }}</span>
                    </span>
                    <span v-if="props.row.type==2">
                            <span v-if="props.row.answer==0">对</span>
                             <span v-if="props.row.answer==1">错</span>
                    </span>
                  </div>
                  <div class="jiexi1">
                    <span>解析:</span>
                    <span>{{ props.row.analysis || None }}</span>
                  </div>
                  <div class="nandu1">
                    <span>难度:</span>
                    <span v-if="props.row.type == 0"> 简单 </span>
                     <span v-if="props.row.type == 1"> 普通 </span>
                      <span v-if="props.row.type == 2"> 困难 </span>
                  </div>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="demo_name" label="试题内容">
            <template slot-scope="scope">
              <div @click="jinru(scope.row)" v-if="scope.row.demo_name">
                <span
                  ><img
                    src="https://s1.kaoshixing.com/static/vue/images/icon/folder.svg?v=641f494d72"
                    alt=""
                  />
                </span>
                <p>{{ scope.row.demo_name.join("/") }}</p>
              </div>
              <div v-else>
                <p>{{ scope.row.title }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="题型">
            <template slot-scope="scope">
              <p v-if="scope.row.type === '0'">单选题</p>
              <p v-if="scope.row.type === '1'">多选题</p>
              <p v-if="scope.row.type === '2'">判断题</p>
              <p v-if="scope.row.type === '3'">填空题</p>
              <p v-if="scope.row.type === '4'">问答题</p>
              <p v-if="scope.row.type === '5'">组合题</p>
              <p v-if="scope.row.type === '6'">录音题</p>
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="qwe"></el-table-column>
          <el-table-column label="难度">
            <template slot-scope="scope">
              <p v-if="scope.row.difficulty === '0'">简单</p>
              <p v-if="scope.row.difficulty === '1'">普通</p>
              <p v-if="scope.row.difficulty === '2'">困难</p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="创建人"> </el-table-column> -->
          <el-table-column prop="name" label="创建日期">
            <template slot-scope="scope">
              {{ scope.row.create_time }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="修改人"> </el-table-column> -->
          <el-table-column prop="name" label="修改日期">
            <template slot-scope="scope">
              {{ scope.row.update_time }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <span class="shanchuspan" @click="shanchuspan(scope.row.id)"
                >删除</span
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])"
            >切换第二、第三行的选中状态</el-button
          >
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
    </div>
        
  </div>
</template>

<script>
import { gettitle1 } from "network/typetitle";
import { gettitle, dele } from "network/topic";
export default {
  props: {},
  data() {
    return {
      titleall: null,
      defaultProps: {
        children: "children",
        label: "demo_name",
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  async created() {
    await this.gettitle1();
    await this.getalltype();
  },
  methods: {
    async gettitle1() {
      const res = await gettitle1();
      this.titleall = res.data.data;
      console.log(this.titleall);
    },
    //树状点击事件
    handleNodeClick(qwe) {
      if (qwe.level != 3) {
        this.$message("请选择三级分类");
        return
      }
      this.jinru(qwe)
    },
    //获取全部分类
    getalltype() {
      this.tableData = [];
      this.titleall.forEach((item) => {
        let name = [];
        name.push(item.demo_name);
        if (item.children) {
          item.children.forEach((item2) => {
            if (item2.children) {
              name.push(item2.demo_name);
              item2.children.forEach((item3) => {
                let obj = {};
                var name2 = JSON.parse(JSON.stringify(name));
                name2.push(item3.demo_name);
                obj.demo_name = name2;
                obj.id = item3.id;
                obj.pid = item3.pid;
                this.tableData.push(obj);
                name2.splice(-1, 0);
                name == name2;
              });
            }
          });
        }
      });
      console.log(this.tableData);
    },
    //进入试题展示题
    async jinru(q) {
      const content = { id: q.id };
      const res = await gettitle(content);
      console.log(res.data.list);
      this.tableData = res.data.list;
      this.tableData.forEach((item) => {
        item.qwe = q.demo_name.join("/");
      });
    },
    //删除一条数据
    shanchuspan(id) {
      dele(id);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped lang="less">
.shanchuspan {
  display: inline-block;
  width: 40px;
  height: 30px;
  background-color: red;
  text-align: center;
  line-height: 30px;
}
.library {
  height: 100%;
  width: 100%;
}
.library .library_top {
  height: 40px;
  position: relative;
}
.library .library_top p,
.button,
span {
  display: inline-block;
}
.library .library_top .button {
  position: absolute;
  right: 0;
}
.library .library_top .button span {
  height: 30px;
  width: 80px;
  background-color: #fff;
  margin-left: 15px;
  line-height: 30px;
  text-align: center;
}
.demo-table-expand {
  display: flex;
  font-size: 20px;
}
.el-form .tigan1 {
  flex: 1;
  margin-left: 200px;
  font-size: 20px;
}
.youce {
  flex: 1;
}
.el-form .daan1,
.nandu1,
.jiexi1 {
  margin-top: 15px;
}
</style>
<style scoped lang="less">
.library .library_content {
  display: flex;
}
.library .library_content .content_left {
  flex: 1;
  background-color: #fff;
  height: 100vh;
}
.library .library_content .content_left .wu {
  height: 50px;
  display: inline-block;
  width: 100%;
  background-color: red;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
}
.library .library_content .content_left span {
  display: inline-block;
  width: 100%;
  height: 50px;
}
.library .library_content .content_left .type {
  display: inline-block;
  width: 100%;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid black;
}
.library .library_content .content_left .content {
}
.library .library_content .content_left .content .all {
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: blue;
}
.library .library_content .content_right {
  flex: 5;
  margin-left: 20px;
  background-color: #fff;
}
</style>