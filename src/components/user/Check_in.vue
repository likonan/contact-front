<script>
export default {
  data() {
    return {
      id:'',
      name: '',
      address: '',
      phone: '',
      contactList: [],
      page: 1,
      pageSize: 10,
      total: 0,
      updateVisible: false,
      contact: {},
      addContact:{},
      addVisible: false
    }
  },
  methods: {
    getContactList() {
      var params = {};
      params.name = this.name;
      params.pageSize = this.pageSize;
      params.page = this.page;
      this.$axios.get('contact/page', {params: params})
        .then(res => {
          var data = res.data;
          if (data.code == 200) {
            this.contactList = data.data.rows;
            this.total = data.data.total;
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    showUpdateDialog(row) {
      this.updateVisible = true;
      this.contact=row
    },
    showAddDialog(){
      this.addVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getContactList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getContactList();
    },
    cancelAdd(){
      this.addContact = {};
      this.addVisible = false;
    },
    saveAdd(){
      // this.addContact.name = this.name;
      // this.addContact.address = this.address;
      // this.addContact.phone = this.phone;
      this.$axios.post("/contact/add", this.addContact)
        .then(res => {
          var data = res.data;
          if (data.code == 200) {
            this.$message.success(data.msg);
            this.cancelAdd();
            this.getContactList();
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(e => {
          console.log(e)
        });
    },
    cancelUpdate() {
     this.contact={};
      this.updateVisible = false;
    },
    saveUpdate() {
      // this.contact.name = this.name;
      // this.contact.address = this.address;
      // this.contact.phone = this.phone;

      this.$axios.put("/contact/update", this.contact)
        .then(res => {
          var data = res.data;
          if (data.code == 200) {
            this.$message.success(data.msg);
            this.cancelUpdate();
            this.getContactList();
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(e => {
          console.log(e)
        });
    },
    setNull() {
      this.name = '';
      this.getContactList();
    },
    deleteContact(id){
      this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {type: 'warning'})
        .then(()=> {
          this.$axios.delete('/contact/delete',{params:{"id":id}})
            .then(res=>{
              var data=res.data
              if(data.code==200){
                this.$message.success(data.msg)
                this.getContactList()
              }
              else{this.$message.warning(data.msg)}
            })
            .catch(e=>{
              console.log(e)
            })
        })
        .catch(()=>{
          this.$message.info('取消删除')
        })

    }
  },
  mounted() {
    this.getContactList();
  }
}
</script>

<template>

  <div>
    <el-form :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button @click="setNull">重置</el-button>
          <el-button type="primary" @click="getContactList">查询</el-button>
          <el-button type="success" @click="showAddDialog">添加联系人</el-button>
        </template>
      </el-form-item>
    </el-form>
    <el-table
      :data="contactList"
      border
      style="width: 100%"
      max-height="600"
      :default-sort = "{prop: 'id', order: 'ascending'}"
    >
      <el-table-column
        fixed
        prop="id"
        label="序号"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        sortable
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="157"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showUpdateDialog(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteContact(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="添加联系人" :visible.sync="addVisible">
      <el-form :model="addContact">
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="addContact.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" label-width="120px">
          <el-input v-model="addContact.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="addContact.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改联系人" :visible.sync="updateVisible" @close="cancelUpdate">
        <el-form :model="contact">
          <el-form-item label="id" label-width="120px">
            <el-input v-model="contact.id" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="120px">
            <el-input v-model="contact.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="住址" label-width="120px">
            <el-input v-model="contact.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="120px">
            <el-input v-model="contact.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="saveUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<style scoped>

</style>
