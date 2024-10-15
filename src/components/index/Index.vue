<script >
export default {
  data() {
    return {
      username:'',
      imgUrl:'',
      show:'',
    }

  },
  methods: {
    getUserInfo() {
      //从缓存中获取userId封装
      var params={};
      params.userId = sessionStorage.getItem('userId');
      //发送请求获取菜单列表
      //get格式‘url’{params:参数对象}
      this.$axios.get('/emp/info',{params:params})
        .then(result=>{
          var data=result.data
          if(data.code==200){
            this.username=data.data.username
            this.imgUrl=data.data.imgUrl
          }
       })

    .catch(e=>{console.log(e)})
    },
    logout(){
      this.$confirm('是否退出系统','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        //退出系统清楚缓存
        sessionStorage.clear();
        //跳转页面
        this.$router.push('/')
      })
      .catch(()=>{
        this.$message.info('取消退出')
      })
    },
    showEmpmenu(){
      var params={};
      params.id = sessionStorage.getItem('userId');
      this.$axios.get('/emp/showEmpmenu' ,{params:params})
        .then(result=>{
          var data=result.data
          if(data.code==200){
            this.show=data.data

          }
        })

        .cat


    }

    },
  mounted(){
    this.getUserInfo()
    this.showEmpmenu()

  }
}
</script>

<template>
  <div class="index-container">
  <el-container >
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#ab3737"
      text-color="#fff"
      active-text-color="#ab3737"
      router>
        <el-submenu index="/check_in" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>通讯录</span>
          </template>
          <el-menu-item-group >
            <el-menu-item index="/sys/check_in" >通讯录清单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
    </el-menu>
    </el-aside>


    <el-container>
      <el-header>
        <div>
          <span>通讯录管理系统</span>
        </div>
      </el-header >
      <el-main class="ui">
<!--        路由视图组件，用于动态渲染对应的路由组件 -->
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<style scoped>
.el-header {
  background-color: #ab3737;
  color: #ab3737;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #da3b3b;
  color: #9b2929;
  text-align: center;
  line-height: 200px;
}



.el-container {

  height: 100vh;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu{
  border-right: 0px;
}


</style>
