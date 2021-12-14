<template>
  <div class="home">
    <div class="home_left">
      <div>答题卡</div>
      <div class="d">
        <div>单选题(共{{ dan.length }},合计{{ sum }}分)</div>
        <span v-for="(item, index) of dan" :key="item.id">
          <input type="radio" :name="item.id" />
          <span
            class="asd"
            style="background-color: white"
            v-if="item.yonghu != ''"
            >{{ index + 1 }}</span
          >
          <span class="asd" style="background-color: red" v-else>{{
            index + 1
          }}</span>
        </span>
      </div>
      <div class="du">
        <div>填空题(共{{ tian.length }},合计{{ sum1 }}分)</div>
        <span v-for="(item, index) of tian" :key="item.id">
          <input type="radio" :name="item.id" />
          <span
            class="asd"
            style="background-color: white"
            v-if="item.yonghu != ''"
            >{{ index + 1 }}</span
          >
          <span class="asd" style="background-color: red" v-else>{{
            index + 1
          }}</span>
        </span>
      </div>
      <div class="w">
        <div>问答题(共{{ wen.length }},合计{{ sum2 }}分)</div>
        <span v-for="(item, index) of wen" :key="item.id">
          <input type="radio" :name="item.id" />
          <span
            class="asd"
            style="background-color: white"
            v-if="item.yonghu != ''"
            >{{ index + 1 }}</span
          >
          <span class="asd" style="background-color: red" v-else>{{
            index + 1
          }}</span>
        </span>
      </div>
    </div>
    <div class="home_center">
      <div class="danxuan">
        <span class="dan">单选题</span>
        <div v-for="(item, index) of dan" :key="item.id" class="ti">
          <span>{{ index + 1 }}.{{ item.title }}</span>
          <ul>
            <li v-for="(item2, index2) in JSON.parse(item.option)">
              <input
                @change="qwe"
                type="radio"
                v-model="item.yonghu"
                :value="index2"
                :name="'radio' + index"
              />{{ index2 + 1 }}.{{ item2 }}
            </li>
          </ul>
        </div>
      </div>
      <div class="tiankong">
        <span class="tian">填空题</span>
        <div v-for="(item, index) of tian" :key="item.id" class="ti">
          <span>{{ index + 1 }}.{{ item.title }}()()()()</span><br />
          <input type="text" v-model="item.yonghu" class="int" />
        </div>
      </div>
      <div class="wenda">
        <span class="wen">问答题</span>
        <div v-for="(item, index) of wen" :key="item.id" class="ti">
          <span>{{ index + 1 }}.{{ item.title }}()()()()</span><br />
          <input type="text" v-model="item.yonghu" class="int" />
        </div>
      </div>
    </div>
    <div class="home_right">
      <div class="zihao">
        <span class="jian" @click="jian">-</span>
        <span class="zi">字号</span>
        <span class="jia" @click="jia">+</span>
      </div>
      <div class="tijiao">
        <button @click="tijiao">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getpaper } from "network/paper";
export default {
  data() {
    return {
      titleall: null,
      dan: [],
      tian: [],
      wen: [],
      pan:[],
    };
  },
  computed: {
    sum() {
      var s = 0;
      this.dan.forEach((item) => {
        s += Number(item.score);
      });
      return s;
    },
    sum1() {
      var s = 0;
      this.tian.forEach((item) => {
        s += Number(item.score);
      });
      return s;
    },
    sum2() {
      var s = 0;
      this.wen.forEach((item) => {
        s += Number(item.score);
      });
      return s;
    },
  },
  methods: {
    tijiao() {},
    jian() {
      if (document.body.style.fontSize == "") {
        document.body.style.fontSize = "15px";
      }
      document.body.style.fontSize = "15px";
    },
    jia() {
      if (document.body.style.fontSize == "") {
        document.body.style.fontSize = "25px";
      }
      document.body.style.fontSize = "25px";
    },
    qwe() {
      console.log(this.danq);
    },
    async getpaper(id) {
        //获取考试卷
      const res = await getpaper(id);
      //获取考试题及对应分数   两个一体
      console.log(res.data);
      const p_title=res.data.list.p_title
      console.log(p_title);
      this.titleall = res.data.list;
      this.titleall.forEach((item) => {
        if (item.type == "0") {
          this.dan.push(item);
          console.log('qwe');
        }
        if (item.type == "2") {
          this.pan.push(item);
        }
        if (item.type == "3") {
          this.tian.push(item);
        }
        if (item.type == "4") {
          this.wen.push(item);
        }
      });
    },
  },
  async created() {
        this.getpaper({'id':this.$route.params.id});
  },
};
</script>

<style scode lang="less">
body {
  font-size: 20px;
}
ul li {
  list-style: none;
}
.home {
  width: 100%;
  height: 100vh;
  background-color: wheat;
  display: flex;
}
.home_left {
  flex: 1;
  height: 100vh;
}
.home_center {
  flex: 4;
  background-color: red;
}
.home_right {
  flex: 1;
  margin-right: 50px;
}
.home_left,
.home_center,
.home_right {
  margin-top: 25px;
  margin-left: 25px;
  background-color: white;
}
.danxuan,
.tiankong,
.wenda {
  width: 100%;
}
.dan,
.tian,
.wen {
  display: block;
  width: 100%;
  height: 35px;
  background-color: dimgray;
  border: 1px solid black;
}
.ti {
  margin: 6px 0px;
  border: 1px solid black;
}
.home_center .int {
  margin: 10px 0px;
  width: 100%;
  height: 30px;
}
.zihao {
  margin-left: 50px;
}
.jian,
.jia {
  display: inline-block;
  width: 40px;
  height: 40px;
  padding-left: 15px;
  background-color: blueviolet;
}
.asd {
  margin-left: 15px;
  display: inline-block;
  width: 25px;
  height: 25px;
  background-color: red;
}
</style>
