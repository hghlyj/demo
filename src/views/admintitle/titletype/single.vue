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
          <span>单/多选题的选项范围从 2 到 20 </span>{{radio}}
        </div>
        <div class="options_bottom">
          <el-form
            :model="options"
            ref="options"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(domain, index) in options.domains"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              :rules="{
                required: true,
                message: '不能为空',
                trigger: 'blur',
              }"
            >
            <el-radio v-model="radio" :label="index" class="radio" @change="handleradio">{{kong}}</el-radio>
              <el-input v-model="domain.value"></el-input>
              >
              
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.prevent="removeDomain(domain)"
              ></el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="options_increse">
          <el-button type="info" @click="addDomain" v-show="options.domains.length<=20">+添加一个选项</el-button>
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
import {addtitle} from 'network/topic'
import bus from 'assets/js/bus'
export default {
  created(){
     bus.$on('qupid',(val)=>{this.pid=val});
     bus.$on('diff',(val)=>{this.diff=val});
  },
  props:{
    sho:{
            type:Number,
            default:0
        }
  },
  data() {
    return {
      kong:'',
      //题目对应的类型
      pid:0,
      //题干
      questionval: "",
      //选项
      radio:null,
      //解析
      analysis:'',
      //难度
      diff:'',
      options: {
        domains: [
          {
            value: "",
          },
          {
            value: "",
          },
        ],
        email: "",
      },
    };
  },
  methods: {
    //获取答案
    handleradio(val){
      // console.log(this.radio);
    },
    //录入题目点击事件
    async addtitle() {
      if (this.questionval == "") {
        alert("请填写题干内容");
        return;
      };
      const empty = this.options.domains.every((v) => v.value != "");
      if (empty == false) {
        alert("请填写选项内容");
        return;
      };
      if(this.options.domains.length<2){
        alert("单选题和多选题至少存在两个选项，请重新编辑。");
        return;
      };
      if (this.radio==null){
        alert("请选择正确答案");
        return;
      }
      const title=this.questionval
      //答案
      const answer=this.radio
      //解析
      const analysis=this.analysis
      //选项
      const option=[]
      this.options.domains.forEach(item=>{
        option.push(item.value)
      })
      const options='"'+option+'"'
      //pid   0时未选择分类
      const pid=this.pid
      //类型
      const type=this.sho
      //难度
      const difficulty=this.diff
      const res=await addtitle({pid,title,options,answer,analysis,type,difficulty})
      this.$message(res.data.msg)
    },
    //删除一个选项
    removeDomain(item) {
      var index = this.options.domains.indexOf(item);
      if (index !== -1) {
        this.options.domains.splice(index, 1);
      }
    },
    //添加一个选项
    addDomain() {
      this.options.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style scoped lang="less">
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

.options-top span {
  font-size: 14px;
  color: #a9b3bf;
}

.options_increse .el-button {
  margin-left: 70px;
  margin-top: 20px;
  width: 1125px;
  height: 40px;
}

.options_bottom .el-form .el-form-item .el-input {
  position: absolute;
  left: -30px;
  width: 1125px;
}

.options_bottom .el-form .el-form-item .el-button {
  position: absolute;
  left: 1100px;
}

.options_bottom .el-form .el-form-item .radio {
  position: absolute;
  left: -80px;
  top: 10px;
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
