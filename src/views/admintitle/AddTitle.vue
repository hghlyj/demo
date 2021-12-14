<template>
      
  <div class="addtitle">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="批量录入" name="first">
        <xls></xls>
      </el-tab-pane>

      <el-tab-pane label="手动录入" name="second">
        <div>
          <div class="top-option">
            <div class="top-option-item">
              <span>试题分类</span>

              <el-popover width="300" transition="false" v-model="visible">
                <SelectTree
                  :props="props"
                  :options="optionData"
                  :value="valueId"
                  :clearable="isClearable"
                  :accordion="isAccordion"
                  @getValue="getValue($event)"
                />
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini" @click="getpid"
                    >确定</el-button
                  >
                </div>
                <el-button slot="reference" size="mini">试题分类</el-button>
              </el-popover>
            </div>
            <div class="top-option-item">
              <span>试题类型</span>
              <el-select
                v-model="typeform"
                size="mini"
                class="topselect"
                style="width: 100px"
              >
                <el-option
                  v-for="item in typeoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <div class="top-option-item">
              <span>试题难度</span>
              <el-select v-model="difficultyform" class="topselect" size="mini">
                <el-option
                  v-for="item in difficultyoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="showheight">
            <show :shownum="typeform"></show>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="AI录入" name="third">AI录入</el-tab-pane>
    </el-tabs>
        
  </div>
</template>
<script>
import Fuwenben from "components/content/tinymce-editor/index";
import SelectTree from "components/content/treeselect/treeSelect";
import xls from './xls.vue'
import { gettitle1 } from "network/typetitle";
import show from "./show.vue";
import bus from "assets/js/bus";
export default {
  props: {},
  data() {
    return {
      titletinymce: false,
      //tab标签默认渲染出页面
      activeName: "first",
      typetitle: "试题类型",
      visible: false,
      //试题类型表单
      typeoptions: [
        { value: 0, label: "单选题" },
        { value: 1, label: "多选题" },
        { value: 2, label: "判断题" },
        { value: 3, label: "填空题" },
        { value: 4, label: "问答题" },
        { value: 5, label: "组合题", disabled: false },
        { value: 6, label: "录音题", disabled: false },
      ],
      typeform: 3,
      //试题难度表单
      difficultyoptions: [
        { value: 0, label: "简单" },
        { value: 1, label: "普通" },
        { value: 2, label: "困难" },
      ],
      difficultyform: 0,
      //富文本编辑器  双向绑定值
      titlevalue: "",
      //第三方树状组件数据配置
      isClearable: true, // 可清空（可选）
      isAccordion: false, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        // label: "demo_name",
        label: "name",
        children: "children",
        // disabled:true
      },
      // 选项列表（必选）
      tree: [],
      list: [],
      //添加试题
      addpid: null,
    };
  },
  computed: {},
  created() {
    this.gettitle1();
  },
  updated() {
    bus.$emit("diff", this.difficultyform);
    bus.$emit("sho", this.typeform);
  },
  mounted() {},
  watch: {},
  methods: {
    
    qwe() {
      this.titletinymce = true;
    },
    qwe1() {
      this.titletinymce = false;
    },
    //网络请求
    async gettitle1() {
      const res = await gettitle1();
      this.tree = res.data.data;
      this.getNodeTree(this.tree);
      let obj = {};
      this.list = this.list.reduce((item, next) => {
        obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
        return item;
      }, []);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getpid() {
      bus.$emit("qupid", this.valueId);
      this.visible = false;
    },
    //树状组件
    // 取值
    getValue(value) {
      this.valueId = value;
      // console.log(this.valueId);
    },
    getNodeTree(tree) {
      for (var i in tree) {
        if (typeof tree[i] == "object") {
          this.getNodeTree(tree[i]);
        } else {
          this.list.push({
            id: tree["id"],
            parentId: tree["pid"],
            name: tree["demo_name"],
          });
        }
      }
    },
  },
  components: {
    Fuwenben,
    SelectTree,
    show,
    xls,
  },
  computed: {
    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter((child) => {
          return father.id == child.parentId;
        }); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },
  },
};
</script>

<style scoped lang="less">
.addtitle {
  width: 100%;
  height: 100%;
}

.topselect {
  width: 80px;

  border: 1px solid blue;
  border-radius: 5px;
}
.topselect1:first {
  width: 100px;
}

.top-option {
  width: 60%;
  display: flex;
  height: 50px;
}
.top-option-item {
  padding: 10px;
  flex: 1;
}
.top-option-item span {
  margin-right: 40px;
}
</style>
