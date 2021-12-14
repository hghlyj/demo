<template>
      
  <div>
    <el-button size="medium" @click="download"> 下载模板 </el-button>
    <a ref="download" style="display: none" href="/考试星-试题模版.xls"></a>
    <el-button size="medium" @click="importExcel">导 入</el-button>
    <input
      type="file"
      ref="upload"
      accept=".xls, .xlsx"
      style="display: none"
    />
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      onDutyList: [], // 保存导入的excel表格数据
      orgPath: null, // 组织路径
    };
  },
  mounted() {
    //绑定监听表格导入事件
    this.$refs.upload.addEventListener("change", (e) => {
      this.readExcel(e);
    });
  },
  methods: {
    //下载模板
    download() {
      this.$refs.download.dispatchEvent(new MouseEvent("click"));
    },
    // 点击导入按钮触发input上传文件
    importExcel() {
      // 通过dispatchEvent触发点击事件
      this.$refs.upload.dispatchEvent(new MouseEvent("click"));
    },
    //表格导入
    readExcel(e) {
      var that = this;
      const files = e.target.files;
      // 判断是否导入文件或者导入文件的格式是否正确
      if (files.length <= 0) {
        //如果没有文件名
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          console.log(wsname,0);
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          console.log(ws,1);
          that.onDutyList = []; //清空接收数据，把导入的excel数据转化成json格式存储到data中
          //编辑数据
          for (let i = 0; i < ws.length; i++) {
            console.log(ws[i]);
            ws[i].forEach((item)=>{
              console.log(item);
            })
            let sheetData = {
              // 使用day.js把日期转化为时间戳
              // 这里配置导入excel表的数据格式
              // dutyTime: this.$dayjs(ws[i]["日期"]).unix(),
              title: ws[i]["题干（必填）"],
              options: ws[i]["选项"]||[],

              answer: ws[i]["答案"]||[],
              keyword: ws[i]["关键字"]||'',
              analysis: ws[i]["解析"]||'',
              type: ws[i]["分类"],
              difficulty: ws[i]["难度"],
            };
            that.onDutyList.push(sheetData);
            console.log(sheetData,3);
          }
          // 清空上传input
          this.$refs.upload.value = "";
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
      //   this.addMaryDutyData();
    },
    // 向后端添加导入的excel数据
    async addMaryDutyData() {
      const { data } = await post(`/api/on-duty-reports`, {
        onDutyList: this.onDutyList,
      });
      if (data.errCode === 200) {
        this.$message.success("添加成功!");
      } else {
        this.$message.error("添加失败!");
      }
      // 更新表格数据, 这个方法是刷新表格数据的函数
      this.getTableData();
    },
  },
};
</script>

<style scoped>
</style>
