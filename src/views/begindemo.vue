<template>
      
  <div class="begindemo">
    <div>
      <label
        >姓名 <input type="text" v-model="name" placeholder="请输入姓名"
      /></label>
    </div>
    <div>
      <label
        >专业 <input type="text" v-model="major" placeholder="请输入专业"
      /></label>
    </div>
    <div>
      <label
        >阶段 <input type="text" v-model="stage" placeholder="请输入阶段"
      /></label>
    </div>
    <div>
      <label
        >班级 <input type="text" v-model="grade" placeholder="请输入班级"
      /></label>
    </div>
    <button @click="begindemo">开始考试</button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      name: null,
      major: null,
      stage: null,
      grade: null,
    };
  },
  created() {},
  methods: {
    begindemo() {
      if (
        this.name == null ||
        this.major == null ||
        this.stage == null ||
        this.grade == null
      ) {
        alert("请填写所有信息");
        return false;
      }
      this.$router.push("/exam/" + this.$route.params.id);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
