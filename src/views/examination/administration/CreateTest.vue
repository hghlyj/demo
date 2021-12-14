<template>
      
  <div class="createtest">
    <el-dialog title="选择分类" :visible.sync="dialog" width="30%">
      <el-tree
        :data="titleall"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">关闭</el-button>
        <el-button type="primary" @click="huoqu">选择</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择试题" :visible.sync="dialog1">
      <div class="n-top"></div>
      <div class="bottom">
        <div class="n-bottom">
          <span @click="qie(1)">试题列表</span>
          <span @click="qie(2)">已选试题{{ multipleSelection.length }}</span>
        </div>
        <el-table
          v-if="eltable == 1"
          ref="multipleTable"
          :data="titleall1"
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
                    <span v-if="props.row.type == 0">
                      <span>{{ props.row.answer }}</span>
                    </span>
                    <span v-if="props.row.type == 2">
                      <span v-if="props.row.answer == 0">对</span>
                      <span v-if="props.row.answer == 1">错</span>
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
          <el-table-column label="分类" prop="pid"></el-table-column>
          <el-table-column prop="demo_name" label="试题内容">
            <template slot-scope="scope">
              <p>{{ scope.row.title }}</p>
            </template>
          </el-table-column>

          <el-table-column label="难度">
            <template slot-scope="scope">
              <p v-if="scope.row.difficulty === '0'">简单</p>
              <p v-if="scope.row.difficulty === '1'">普通</p>
              <p v-if="scope.row.difficulty === '2'">困难</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="创建日期">
            <template slot-scope="scope">
              {{ scope.row.create_time }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">关闭</el-button>
        <el-button type="primary" @click="huoqu1">保存</el-button>
      </span>
    </el-dialog>

    <div class="createtest-top">
      <div class="first">第一步:创建考试</div>
      <div class="second">第二步:添加试题</div>
      <div class="third">第三步:发布考试</div>
    </div>
    <div class="createtest-content">
      <div class="addpaper" v-if="active == 0">
        <div class="first1">
          <el-radio v-model="radio" label="1">创建新试卷</el-radio>
          <div v-if="radio == '1'" class="next1">
            <table>
              <tr>
                <td>试卷名称</td>
                <td colspan="4">
                  <el-input
                    v-model="papername"
                    placeholder="请输入试卷名称"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>试卷分类</td>
                <td>
                  <el-button type="primary" plain @click="dialog = true"
                    >试卷分类</el-button
                  >
                </td>
              </tr>
              <tr>
                <td>组卷方式</td>
                <td><el-button type="primary" plain>选题组卷</el-button></td>
                <td>
                  <el-button type="primary" plain disabled>抽提组卷</el-button>
                </td>
                <td>
                  <el-button type="primary" plain disabled>随机组卷</el-button>
                </td>
                <td>
                  <el-button type="primary" plain disabled>综合组卷</el-button>
                </td>
              </tr>
              <tr>
                <td>答题时长</td>
                <td>
                  <el-button type="primary" plain>整卷限制时长</el-button>
                </td>
                <td>
                  <el-button type="primary" plain disabled
                    >单题限制时长</el-button
                  >
                </td>
              </tr>
            </table>
            <el-button type="primary" @click="jin1">下一步</el-button>
          </div>
        </div>
        <div class="second1">
          <el-radio v-model="radio" label="2">从考试库中选择一张试卷</el-radio>
          <div v-if="radio == '2'" class="next2">
            <el-button type="primary" plain>选择试卷</el-button><br />
            <el-button type="primary" @click="jin2">下一步</el-button>
          </div>
        </div>
      </div>
      <div class="addtitle" v-if="active == 1">
        <div class="left">
          <div>总题数{{ alltitlesum }}</div>
          <div>当前总分{{ allscoresum }}</div>
        </div>
        <div class="right">
          <div class="title">{{ this.papername }}</div>
          <div class="da" v-for="item of idall">
            <div class="xuan" v-for="item2 of item">
              {{ item2.title }}
              <input type="text" placeholder="分数" v-model="item2.score" />
            </div>
          </div>
          <div
            class="content"
            @mouseover.self="changeActive($event)"
            @mouseout="removeActive($event)"
          >
            <div class="tubiao" v-if="zhan == 1">
              <span class="jia">+</span>
              <span class="chuang">创建新的答题</span>
            </div>
            <div class="xuanxiang" v-if="zhan == 2">
              <el-button type="primary" plain>单选题</el-button>
              <el-button type="primary" plain disabled>多选题</el-button>
              <el-button type="primary" plain>判断题</el-button>
              <el-button type="primary" plain>填空题</el-button>
              <el-button type="primary" plain>问答题</el-button>
              <el-button type="primary" plain disabled>组合题</el-button>
              <el-button type="primary" plain disabled>录音题</el-button>
            </div>
          </div>
          <el-button type="primary" @click="titletype('0')" plain
            >单选题</el-button
          >
          <el-button type="primary" @click="titletype('1')" plain disabled
            >多选题</el-button
          >
          <el-button type="primary" @click="titletype('2')" plain
            >判断题</el-button
          >
          <el-button type="primary" @click="titletype('3')" plain
            >填空题</el-button
          >
          <el-button type="primary" @click="titletype('4')" plain
            >问答题</el-button
          >
          <el-button type="primary" @click="titletype('5')" plain disabled
            >组合题</el-button
          >
          <el-button type="primary" @click="titletype('6')" plain disabled
            >录音题</el-button
          >
          <el-button type="primary" @click="jinru2">下一步</el-button>
        </div>
      </div>
      <div class="publish" v-if="active == 2">
        <input type="text" placeholder="请输入及格分数" v-model="jigescore" />
        <el-date-picker
          v-model="starttime"
          type="datetime"
          placeholder="选择开始时间"
        >
        </el-date-picker>
        <el-date-picker
          v-model="endtime"
          type="datetime"
          placeholder="选择结束时间"
        >
        </el-date-picker>
        <input
          type="text"
          placeholder="考试时长（分钟为单位"
          v-model="xietime"
        />
        <button class="chuangjian" @click="chuangjian">创建考试</button>
      </div>
    </div>
  </div>
</template>

<script>
import { gettitle1 } from "network/typetitle";
import { gettitle } from "network/topic";
import { addpaper } from "network/paper";
export default {
  props: {},
  data() {
    return {
      eltable: 1,
      did: null,
      id: null,
      dialog: false,
      dialog1: false,
      multipleSelection: [],
      idall: null,
      titleid: [],
      xietime: null,
      starttime: null,
      endtime: null,
      fangshi: "选题组卷",
      shicahng: "整卷限制时长",
      active: 0,
      //       创建试卷方式     新建还是从试卷库中选择一张试卷
      radio: "1",
      zongscore: 0,
      jigescore: null,
      papername: null,
      titleall: null,
      titleall1: null,
      defaultProps: {
        children: "children",
        label: "demo_name",
      },
      //第二步
      zhan: 1,
    };
  },
  created() {
    this.gettitle1();
  },
  methods: {
    async gettitle1() {
      const res = await gettitle1();
      this.titleall = res.data.data;
    },
    handleNodeClick(val) {
      if (val.level != 3) {
        this.$message("请选择三级分类");
        return false;
      }
      this.did = val.id;
    },
    huoqu() {
      this.id = this.did;
      this.dialog = false;
    },
    async titletype(type) {
      const res = await gettitle({ type: type });
      this.titleall1 = res.data.list;
      this.dialog1 = true;
    },
    huoqu1() {
      if (this.idall == null) {
        this.idall = [];
      }

      var newmul = [];
      this.multipleSelection.forEach((item) => {
        item.score = null;
        newmul.push(item);
      });
      this.idall.push(newmul);
      this.dialog1 = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    qie(val) {
      this.eltable == val;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    jin1() {
      if (this.papername == null || this.papername == "") {
        this.$message("请填写试卷名称");
        return false;
      }
      if (this.id == null || this.id == "") {
        this.$message("请选择试卷分类");
        return false;
      }
      this.active = 1;
    },
    jinru2() {
      if (this.idall == null) {
        alert("至少添加一道试题");
        return false;
      } else {
      }
      let flag = true;
      this.idall.forEach((item) => {
        item.forEach((item2) => {
          if (item2.score == null) {
            flag = false;
            return false;
          }
        });
      });
      if (flag) {
        this.active = 2;
      } else {
        alert("请填写分数");
      }
    },
    async chuangjian() {
      if (this.jigescore == null || this.starttime==null ||this.endtime==null || this.xietime==null) {
        alert("请输入输入完整数据");
        return false;
      }
      this.idall.forEach((item) => {
        let asd = [];
        if (item.id) {
          asd.push(item.id);
          asd.push(item.score);
          this.titleid.push(asd);
        } else {
          item.forEach((item2) => {
            asd.push(item2.id);
            asd.push(item2.score);
            this.titleid.push(asd);
          });
        }
      });
      var starttimed=new Date(this.starttime);
      var p_starttime = starttimed.toLocaleString();
      var xietimed=this.xietime;
      var p_xietime=xietimed.toLocaleString()
     var endtimed=this.endtime;
      var p_endtime=endtimed.toLocaleString()
      const p_title = '"' + this.titleid + '"';
      const p_name = this.papername;
      const p_pid = this.did;
      const p_score = this.zongscore;
      const p_jige = this.jigescore;
      const res = await addpaper({ p_title, p_name, p_pid, p_score, p_jige ,p_starttime,p_xietime,p_endtime});
      if (res.data.msg == "添加成功") {
        this.$message("添加成功");
        this.active = 0;
        this.$router.go(0)
      } else {
        this.$message("添加失败");
      }
    },
    changeActive($event) {
      this.zhan = 2;
    },
    removeActive($event) {
      this.zhan = 1;
    },
    jin2() {
      this.active = 1;
    },
  },
  computed: {
    alltitlesum() {
      let su = 0;
      if (this.idall) {
        this.idall.forEach((item) => {
          item.forEach((item2) => {
            su += 1;
          });
        });
      }

      return su;
    },
    allscoresum() {
      let su = 0;
      if (this.idall) {
        this.idall.forEach((item) => {
          item.forEach((item2) => {
            su += Number(item2.score);
          });
        });
      }
      this.zongscore = su;
      return su;
    },
  },
};
</script>

<style scoped>
.createtest-top {
  height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  border-bottom: 1px solid blue;
}
.createtest-top .first,
.second,
.third {
  flex: 1;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}
.createtest-content .addpaper {
  width: 100%;
  margin-top: 50px;
  background-color: #fff;
}
.createtest-content .addpaper .first1,
.second1 {
  width: 1200px;
  margin: 0 auto;
  border: 1px solid black;
}
.createtest-content .addpaper .first1 {
}
.createtest-content .addpaper .second1 {
  margin-top: 50px;
}
.el-radio {
  margin-left: 30px;
}
.next1 {
  margin: 50px 50px;
}
.next1 tr {
  height: 80px;
}
.next1 td {
  width: 100px;
}
.next2 {
  margin: 50px 50px;
}
.next2 .el-button:last-child {
  margin-top: 30px;
}
</style>
<style scode>
.addtitle {
  margin-top: 50px;
  width: 100%;
  height: 100%;
}
.addtitle .left,
.right {
  background-color: #fff;
}
.addtitle .left {
  width: 20%;
  height: 70px;
  margin-left: 30px;
}
.addtitle .left div {
  margin-left: 25px;
  font-size: 18px;
  line-height: 35px;
  height: 50%;
}
.addtitle .right {
  width: 75%;
  margin-left: 30px;
}
.addtitle .right .title {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
  border-bottom: 1px solid black;
}
.addtitle .right .content {
  width: 95%;
  height: 150px;
  margin: 0 auto;
  margin-top: 25px;
  border: 1px solid black;
}
.addtitle .right .content .tubiao {
  width: 160px;
  height: 80px;
  margin: auto;
  margin-top: 30px;
}
.addtitle .right .content .tubiao .jia {
  display: block;
  width: 50px;
  color: white;
  font-size: 30px;
  margin: 0 auto;
  border-radius: 15px;
  background-color: blue;
  height: 50%;
  text-align: center;
  line-height: 40px;
}
.addtitle .right .content .tubiao .chuang {
  display: block;
  text-align: center;
  height: 50%;
  line-height: 40px;
}
.addtitle .right .content .xuanxiang {
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
.n-bottom span {
  display: inline-block;
  width: 100px;
  height: 35px;
  margin-left: 15px;
  color: #fff;
  line-height: 35px;
  text-align: center;
  background-color: blue;
}
.xuan {
  width: 95%;
  padding: 20px;
  margin: 0 auto;
  margin-top: 25px;
  border: 1px solid black;
}
</style>