<template>
<div>
    <el-container class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="header">
          <h2 class="head_text">List 1</h2>
        </div>


        <div class="card">
          <draggable v-model="data" :options="{group:'clothes'}">
            <div v-for="item in data" v-bind:key="item.id">
              
                <div class="card-body">
                  <p class="data-id">{{ item.id }}</p>
                  <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                  <p class="data-company">{{item.company}}</p>
                  <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <!-- https://chrishurlburt.github.io/vue-scrollview/examples/dist/#/animation -->
      <div class="col-md-4">
        <div class="header">
          <h2 class="head_text">List 2</h2>
        </div>

        <div class="card">
          <draggable v-model="value" :options="{group:'clothes'}">
            <div v-for="item in value" v-bind:key="item.id">
             
                <div class="card-body">
                  <p class="data-id">{{ item.id }}</p>
                  <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                  <p class="data-company">{{item.company}}</p>
                  <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-md-4">
        <div class="header">
          <h2 class="head_text">List 3</h2>
        </div>

        <div class="card">
          <draggable v-model="extra" :options="{group:'clothes'}">
            <div v-for="item in extra" v-bind:key="item.id">
              
                <div class="card-body">
                  <p class="data-id">{{ item.id }}</p>
                  <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                  <p class="data-company">{{item.company}}</p>
                  <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <el-row>
        <el-button type="primary">Save</el-button>
      </el-row>
    </div>
    </el-container>



  <div class="container2">
    <el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container>

<el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
  <el-footer>Footer</el-footer>
</el-container>

<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>

<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>

<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>

<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>

<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
  </div>
</div>
</template>

<script>
import { ElementUI, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import draggable from "vuedraggable";
import locale from "element-ui/lib/locale/lang/en";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import axios from "axios";
import { scrypt } from "crypto";

export default {
  components: {
    draggable,
    vueCustomScrollbar
  },
  data() {
    return {
      data: [],
      loading: false,
      value: [],
      extra: [],
         settings: {
        maxScrollbarLength: 60
      }
    };
  },

  methods: {
    getRequest() {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/customer")
        .then(response => {
          this.data = response.data.map(item => item);
          console.log(this.data);
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    console.log("Component mounted.");
  },

  created: function() {
    this.getRequest();
    console.log("hi");
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  /* overflow-y: scroll; */
  border-radius: 10px;
  display: table;
  position: absolute;
  top: 0;
  right: 50%;
  left: 0%;
  height: 100%;
  width: 50%;
  /* width: 100%; */
    box-shadow: 0px 1px 8px #999;

}

.header_text {
  font-size: 18px;

}

.rounded {
  background-color: #1976d2;
  box-shadow: 0px 1px 8px #999;
  border-radius: 100px / 2px;
  height: 25px;
  width: 25px;
}

.data-id{
  text-align: center;
  font-size: 18px;
  color: #fff;
  align-content: center;
  align-items: center;
  
}


.data-name{
  font-size: 16px;
  color:#000c20;
}
.data-comp{
  font-size: 16px;
  color:#000c20;
}
.data-tel{
    font-size: 16px;
}

.card {
  /* overflow-y: scroll; */
  background-color: #f2f2f2;  
}

.card-body {
  border-radius: 10px;
  box-shadow: 0px 1px 8px #999;
  margin-top: 2%;
  background-color: #1976d2}


.head_text {
  margin-top: 5px;
  font-size: 18px;
}
.btn {
  background-color: #1976d2;
  border-radius: 5px;
}


/* TEST */

.container2 {
  /* overflow-y: scroll; */
  position: absolute;
  top: 0;
  right: 0%;
  height: 100%;
  width: 40%;
    margin-left: 5%;
}

</style>

