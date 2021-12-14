<template>
      
  <div class="overall">
    <el-container>
      <el-header
        ><div class="head-left">
          <img
            src="https://s3.kaoshixing.com/static/base/images/ksx-logo-double.svg"
          />
          <p>考试后台管理系统</p>
          <p @click="$router.push('/homepage')">首页</p>
        </div>
        <el-button type="info" @click="exit">退出</el-button></el-header
      >
      <el-container>
        <el-aside :style="{ width: col ? '65px' : '200px' }"
          ><el-row class="tac">
            <div class="topbar" @click="change">|||</div>
            <el-col :span="24">
              <el-menu
                :collapse="col"
                :unique-opened="true"
                :collapse-transition="false"
                :router="true"
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu
                  :index="item.id + ''"
                  v-for="item of list"
                  :key="item.id + ''"
                >
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.name }}</span>
                  </template>
                  <!-- 二级列表 -->
                  <div v-for="item2 in item.children" :key="item2.id">
                    <el-menu-item
                      :index="item2.path"
                      v-if="item2.children == undefined"
                      >{{ item2.name }}</el-menu-item
                    >
                    <!-- 三级列表 -->
                    <el-submenu
                      :index="item2.id + ''"
                      v-else
                    >
                      <span slot="title">{{ item2.name }}</span>
                      <el-menu-item-group
                        v-for="item3 in item2.children"
                        :key="item3.id"
                      >
                        <el-menu-item :index="item3.path">{{
                          item3.name
                        }}</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </div>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row></el-aside
        >
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
        
  </div>
</template>

<script>
import { getmenus } from "network/typetitle";
export default {
  data() {
    return {
      col: false,
      list: [],
    };
  },
  async created() {
    const res = await getmenus();
    this.list = res.data.data;
  },
  methods: {
    exit() {
      this.$router.push("/login");
    },
    change() {
      this.col = !this.col;
    },
  },
};
</script>

<style scoped lang="less">
.el-header img {
  width: 150px;
  height: 50px;
}

.head-left p {
  font-size: 22px;
  color: white;
  margin-left: 10px;
  letter-spacing: 2px;
}
.overall {
  height: 100%;
}
.overall .el-container {
  height: 100%;
}
.overall .el-container .el-header {
  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.overall .el-container .el-header .head-left {
  display: flex;
  align-items: center;
}
.overall .el-container .el-header .head-left div {
  color: #fff;
  margin-left: 10px;
  font-size: 22px;
}
.overall .el-container .el-aside {
  background-image: linear-gradient(
    to top,
    #545c64 0%,
    #545c64 99%,
    #545c64 100%
  );
}
.overall .el-container .el-aside .topbar {
  background-color: #4a5064;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
  letter-spacing: 0.12em;
}

.overall .el-container .el-aside .el-menu {
  border: none;
}

.el-main {
  background-color: #eaedf1;
}
</style>
