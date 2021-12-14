<template>
      
  <div>
    <el-button type="primary" @click="addtitle" class="entering"
      >录入题目</el-button
    >
    <!-- 正文 -->
    <div class="logging">
      <div class="question">
        <div class="question-top">
          <el-tag type="info" color="#A9B3BF" size="medium">题干</el-tag>
          <span>这里填写题目描述</span>
        </div>
        <div class="question-bottom">
          <textarea class="text" v-model="questionval"></textarea>
        </div>
      </div>
      <div class="options">
        <div class="options-top">
          <el-tag type="info" color="#A9B3BF" size="medium">选项</el-tag>
          <span>选择正确或者错误（默认正确）</span>
          <div class="pan">
            <span @click="q" :class="{ isactive: dui }">正确</span>
            <span @click="w" :class="{ isactive: cuo }">错误</span>
          </div>
        </div>
      </div>
      <div class="analysis">
        <div class="analysis-top">
          <el-tag type="info" color="#A9B3BF" size="medium">解析</el-tag>
          <span>这里填写该问题对应的答案解释</span>
        </div>
        <div class="analysis-bottom">
          <textarea class="text" v-model="analysis"></textarea>
        </div>
      </div>
       
    </div>
      
  </div>
</template>

<script>
import { addtitle } from "network/topic";
import bus from "assets/js/bus";
export default {
  created() {
    bus.$on("qupid", (val) => {
      this.pid = val;
    });
    bus.$on("diff", (val) => {
      this.diff = val;
    });
     bus.$on("sho", (val) => {
      this.sho = val;
    });
  },
  props: {
  },
  data() {
    return {
      kong: "",
      //题目对应的类型
      pid: 0,
      //题干
      questionval: "",
      //解析
      analysis: "",
      //难度
      diff: "",
      //类型
      sho:"",
      dui: true,
      cuo: false,
      answer:0
    };
  },
  methods: {
    q() {
      this.dui = true;
      this.cuo = false;
      this.answer=0
    },
    w() {
      this.dui = false;
      this.cuo = true;
      this.answer=1
    },
    //录入题目点击事件
    async addtitle() {
      if (this.questionval == "") {
        alert("请填写题干内容");
        return;
      }
      const title = this.questionval;
      //解析
      const analysis = this.analysis;
      //答案
      const answer=this.answer
      //pid   0时未选择分类
      const pid = this.pid;
      //类型
      const type = this.sho;
      //难度
      const difficulty = this.diff;
      const res = await addtitle({
        pid,
        title,
        answer,
        analysis,
        type,
        difficulty,
      });
      this.$message(res.data.msg);
    },
  },
};
</script>

<style scoped lang="less">
.isactive {
  background-color: white;
}

.entering {
  position: relative;
  left: 930px;
  bottom: 40px;
}
.logging {
  margin-top: 20px;
  background-color: #f6f7fa;
}
.question-top .el-tag {
  margin-right: 30px;
  color: white;
}

.question-top span {
  font-size: 14px;
  color: #a9b3bf;
}

.question-bottom .text {
  margin-top: 20px;
  margin-left: 70px;
  width: 1100px;
  height: 60px;
  border: 0;
  padding: 10px;
  font-family: "Ubuntu Light", "Ubuntu", "Ubuntu Mono", "Segoe Print",
    "Segoe UI";
  color: #ccc;
  border: solid 1px #ccc;
  -moz-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  box-shadow: inner 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.question-bottom .text:focus {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}
.options {
  margin-top: 50px;
}

.options-top .el-tag {
  margin-right: 30px;
  color: white;
}
.options-top .pan {
  margin-left: 80px;
}
.options-top .pan span {
  display: inline-block;
  width: 160px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 30px;
  border: 1px solid black;
}
.options-top .pan span:last-child {
  margin-left: 20px;
}
.analysis {
  margin-top: 20px;
}
.analysis-top .el-tag {
  margin-right: 30px;
  color: white;
}

.analysis-top span {
  font-size: 14px;
  color: #a9b3bf;
}

.analysis-bottom .text {
  margin-top: 20px;
  margin-left: 70px;
  width: 1100px;
  height: 60px;
  border: 0;
  padding: 10px;
  font-family: "Ubuntu Light", "Ubuntu", "Ubuntu Mono", "Segoe Print",
    "Segoe UI";
  color: #ccc;
  border: solid 1px #ccc;
  -moz-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  box-shadow: inner 0 0 4px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.analysis-bottom .text:focus {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}
</style>
