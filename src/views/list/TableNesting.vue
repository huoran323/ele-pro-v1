<template>
  <div>
    <div>
      <el-button type="primary" @click="addNew">新增</el-button>
    </div>
    <div>
      <el-form :model="formModel" ref="formModel">
        <el-table border style="width: 100%;" :data="formModel.datas">
          <el-table-column label="职位选择">
            <template slot-scope="scope">
              <el-form-item>
                <el-radio-group v-model="scope.row.is_leader" @change="changeRadio(scope.$index)">
                  <el-radio :label="1">组长</el-radio>
                  <el-radio :label="0">组员</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      //   has_leader: true, //是否有组长
      obj: {
        has_leader: true, //是否有组长
        index: "0" //组长在哪行
      },
      formModel: {
        datas: [
          {
            is_leader: 1
          }
        ]
      }
    };
  },
  methods: {
    addNew() {
      let emptyItem = {
        is_leader: 0
      };
      this.formModel.datas.push(emptyItem);
    },
    changeRadio(index) {
      if (this.obj.index != index) {
        if (this.obj.has_leader != false) {
          this.obj.index = index;
        }
      }

      this.formModel.datas.forEach((item, index) => {
        if (index == this.obj.index) {
          item.is_leader = 1;
        } else {
          item.is_leader = 0;
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>