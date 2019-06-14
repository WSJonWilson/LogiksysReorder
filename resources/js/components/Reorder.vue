<template>
  <div class="body">
    <el-container class="container">
      <b-row>
        <b-col>
          <p class="route-name">*ROUTE TITLE HERE*</p>
        </b-col>
        <b-col>
          <el-input v-model="search" placeholder="Search...">
            <i class="el-icon-search el-input__icon" slot="suffix"></i>
          </el-input>
        </b-col>
        <b-col></b-col>
      </b-row>

      <div class="row justify-content-center">
        <div class="col-md-10 table-container">
          <div class="header"></div>

          <vue-custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
            <table class="table table-striped table-left">
              <thead class="thead">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Phone# 1</th>
                  <th scope="col">Phone# 2</th>
                </tr>
              </thead>
              <draggable v-model="data" :options="{group:'clothes'}" tag="tbody">
                <tr v-for="item in data" v-bind:key="item.id">
                  <td scope="row" class="table-id">{{ item.id }}</td>
                  <td>{{item.first_name}}</td>
                  <td>{{item.last_name}}</td>
                  <td>{{item.company}}</td>
                  <td>{{item.phone1}}</td>
                  <td>{{item.phone2}}</td>
                </tr>
              </draggable>
            </table>
          </vue-custom-scrollbar>
        </div>
        <!-- https://chrishurlburt.github.io/vue-scrollview/examples/dist/#/animation -->
      </div>
    </el-container>
    <b-container class="bv-example-row container2">
      <b-row>
        <b-col>
          <p class="route-name">*ROUTE TITLE HERE*</p>
        </b-col>
        <b-col>
          <el-input placeholder="Search...">
            <i class="el-icon-search el-input__icon" slot="suffix"></i>
          </el-input>
        </b-col>
        <b-col class="text-right">
          <el-button type="primary" v-on:click="open" icon="el-icon-check">Save</el-button>
        </b-col>
      </b-row>
      <vue-custom-scrollbar class="scroll-area2" :settings="settings" @ps-scroll-y="scrollHanle">
        <b-row>
          <b-col cols="2"></b-col>
          <b-col cols="8">
            <draggable v-model="saved" :options="{group:'clothes'}">
              <div v-for="item in saved" v-bind:key="item.id">
                <b-card class="item-body">
                  <b-row>
                    <b-col align-self="center">
                      <div class="circle">
                        <div class="circle__inner">
                          <div class="circle__wrapper">
                            <div class="circle__content">
                              <p class="data-id">{{item.id}}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="10">
                      <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                      <p class="data-company">{{item.company}}</p>
                      <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
              <go-top></go-top>
            </draggable>
          </b-col>
          <b-col></b-col>
        </b-row>
      </vue-custom-scrollbar>
    </b-container>
  </div>
</template>

<script>
import { ElementUI, Button } from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
import draggable from "vuedraggable";
import locale from "element-ui/lib/locale/lang/en";
import vueCustomScrollbar from "vue-custom-scrollbar";
import axios from "axios";
import { scrypt } from "crypto";
import GoTop from "@inotom/vue-go-top";

export default {
  components: {
    draggable,
    vueCustomScrollbar,
    GoTop
  },
  data() {
    return {
      data: [],
      loading: false,
      value: [],
      extra: [],
      saved: [],
      settings: {
        maxScrollbarLength: 60
      }
    };
  },

  methods: {
    save: function(event) {
      this.saved = this.saved.concat(this.value);
      console.log(this.saved);
    },

    getRequest() {
      this.loading = true;
      axios
        .get("http://127.0.0.1:8000/customer")
        .then(response => {
          this.data = response.data.map(item => item);
          console.log(this.data);
        })
        .catch(error => console.log(error));
    },

    scrollHanle(evt) {
      console.log(evt);
    },

    open() {
      this.$alert(
        "Complete and Save Route Reordering for *ROUTE TITLE HERE* ?",
        "Confirm Submission",
        {
          confirmButtonText: "YES",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        }
      );
    }
  },
  mounted() {
    console.log("Component mounted.");
  },

  created: function() {
    this.getRequest();
    console.log("hi");
  },

  computed: {
    filtereddata() {
      return this.data.filter(data => {
        return data.id.match;
      });
    }
  }
};
</script>

<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  display: inline-block;
  height: 850px;
  width: 100%;
  top: 0;
  bottom: 0;
}

.scroll-area2 {
  position: relative;
  margin: auto;
  display: inline-block;
  height: 850px;
  width: 100%;
  top: 0;
  bottom: 0;
}

.header-container {
  position: relative;
}

.route-name {
  color: #000c20;
  font-size: 20px;
  font-weight: 600;
}

table {
  margin-top: 20px;
}

.body {
  position: fixed;
  top: 5%;
  right: 10%;
  bottom: 5%;
  left: 10%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  display: table;
  position: absolute;
  margin: 0;
  height: 100%;
  top: 0;
  right: 50%;
  left: 0%;
  bottom: 0;
  width: 50%;
  box-shadow: 0px 1px 8px #999;
  margin-bottom: 5%;
  padding: 20px;
  z-index: 10;
}

.table-container{
  border-radius: 3px;
  z-index: 3;
    box-shadow: 0px 1px 5px #999;

  
}
.header_text {
  font-size: 18px;
}

thead {
  background: #1976d2;
}

th {
  color: #fff;
}

.table-id {
  font-weight: 600;
}

/* #circle {
  width: 50px;
  height: 50px;
  background-color: #1976d2;
  border: 0.5px solid #000;
  border-radius: 50%; 


   position: relative;
  margin: 2em 0;
    vertical-align: middle;

}

.circle__wrapper {
  display: table;
  width: 100%;
  height: 100%;
} */

.circle {
  position: relative;
  display: block;
  margin: 2em 0;
  background-color: transparent;
  color: #222;
  text-align: center;
}

.circle:after {
  display: block;
  padding-bottom: 100%;
  width: 100%;
  height: 0;
  border-radius: 50%;
  background-color: #1976d2;
  content: "";
}

.circle__inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.circle__wrapper {
  display: table;
  width: 100%;
  height: 100%;
}

.circle__content {
  display: table-cell;
  padding: 1em;
  vertical-align: middle;
}

.data-id {
  color: #fff;
}

.data-name {
  font-size: 16px;
  color: #000c20;
  font-weight: 600;
}
.data-comp {
  font-size: 16px;
  color: #000c20;
}
.data-tel {
  font-size: 16px;
}

.card {
  /* overflow-y: scroll; */
  background-color: #f2f2f2;
}

.item-body {
  border-radius: 10px;
  box-shadow: 0px 0.5px 3px #999;
  margin-top: 2%;
  background-color: #fff;
  width: 95%;
  min-height: 80px;
}

.head_text {
  margin-top: 5px;
  font-size: 18px;
}
.btn {
  background-color: #1976d2;
  border-radius: 5px;
  height: 100%;
}

.btn p {
  color: #fff;
  font-size: 16px;
  text-align: center;
}

.container2 {
  /* overflow-y: scroll; */
  position: absolute;
  top: 0;
  right: 0%;
  left: 50%;
  margin-left: 5%;
  /* background-color: #fff; */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: table;
  margin: 0;
  height: 100%;
  width: 50%;
  margin-bottom: 5%;
  padding: 25px;
  background-color: #fafafa;
  box-shadow: 0px 1px 8px #999;
  z-index: 1;
}
</style>

