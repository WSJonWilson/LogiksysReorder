<template>
  <div class="body">
    
    <b-card id="snackbar">
      <b-row class="snackbar-animation-container">
        <b-col  >
          <div class="header-animation">
            <lottie
              :options="defaultOptions"
              :height="75"
              :width="60"
              v-on:animCreated="handleAnimation"
            />
          </div>
        </b-col>
        <b-col>
                    <b-card-text class="snackbar-text">Success!</b-card-text>       
        </b-col>
      </b-row>

      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
    
    <b-row class="container_row">
      <b-col class="start" cols="5">
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
            <b-col class="text-right">
              <el-button
                class="btn-finish"
                type="primary"
                v-on:click="open"
                icon="el-icon-check"
              >Finish</el-button>
            </b-col>
          </b-row>

          <div class="row justify-content-center">
            <vue-custom-scrollbar
              class="scroll-area"
              :settings="settings"
              @ps-scroll-y="scrollHanle"
            >
              <table class="table table-striped table-left">
                <thead class="thead">
                  <tr>
                    <th scope="col">
                      <label class="form-checkbox">
                        <p>All</p>
                        <input class="checkbox" type="checkbox" v-model="selectAll" @click="select">
                      </label>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Phone# 1</th>
                    <th scope="col">Phone# 2</th>
                  </tr>
                </thead>
                <draggable v-model="data" :options="{group:'clothes'}" tag="tbody">
                  <tr v-for="item in filteredData" v-bind:key="item.id">
                    <td scope="row">
                      <input class="checkbox" type="checkbox" :value="item" v-model="selected">
                    </td>
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
        </el-container>
      </b-col>

      <b-col class="middle" cols="2">
        <div class="container3">
          <el-button
            class="btn-send-left"
            type="primary"
            circle
            v-on:click="send2"
            icon="el-icon-arrow-left"
          ></el-button>
        </div>

        <div class="container3">
          <el-button
            class="btn-send-right"
            type="primary"
            circle
            v-on:click="send"
            icon="el-icon-arrow-right"
          ></el-button>
        </div>
      </b-col>
      <b-col class="end" cols="5">
        <b-container class="bv-example-row container2">
          <b-row>
            <b-col>
              <p class="route-name">*ROUTE TITLE HERE*</p>
            </b-col>
            <b-col>
                            <el-input v-model="search" placeholder="Search...">
                <i class="el-icon-search el-input__icon" slot="suffix"></i>
              </el-input>
            </b-col>
            <b-col class="text-right">
              <font-awesome-icon icon="ellipsis-v" class="icon-settings"/>
            </b-col>
          </b-row>
          <vue-custom-scrollbar
            class="scroll-area2"
            :settings="settings"
            @ps-scroll-y="scrollHanle"
          >
            <b-row>
              <b-col cols="1">
                <input type="checkbox" v-model="selectAll2" @click="select2">
              </b-col>
              <b-col cols="10">
                <draggable v-model="saved" :options="{group:'clothes1'}">
                  <div v-for="item in filteredSavedData" v-bind:key="item.id">
                    <b-row>
                      <div>
                        <input
                          class="checkbox-right"
                          type="checkbox"
                          :value="item"
                          v-model="selected2"
                        >
                      </div>
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
                    </b-row>
                  </div>
                  <go-top></go-top>
                </draggable>
              </b-col>
              <b-col cols="1"></b-col>
            </b-row>
          </vue-custom-scrollbar>
        </b-container>
      </b-col>
    </b-row>
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
import VModal from "vue-js-modal";
import * as animationData from "../../../public/lottie/blueTick.json";
import Lottie from "vue-lottie";
import { ServerTable, ClientTable, Event } from "vue-tables-2";

var publicPath = process.env.BASE_URL;
animationData.assets.forEach(item => {
  item.u = publicPath + "lottie/";
});

export default {
  components: {
    draggable,
    vueCustomScrollbar,
    GoTop,
    VModal,
    lottie: Lottie
  },
  data() {
    return {
      isModalVisible: false,
      data: [],
      loading: false,
      value: [],
      extra: [],
      saved: [],
      search: "",
      search2: "",
      selected: [],
      selected2: [],
      selectAll2: false,
      selectAll: false,
      snackbar: false,
      color: "",
      mode: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar",

      columns: [
        "id",
        "first_name",
        "Last Name",
        "Company",
        "Phone# 1",
        "Phone# 2"
      ],
      settings: {
        maxScrollbarLength: 60
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: null
    };
  },

  methods: {

 myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
},

    open() {
      this.$alert(
        "Complete and Save Route Reordering for *ROUTE TITLE HERE* ?",
        "Confirm Submission",
        {
          confirmButtonText: "YES",
          callback: action => {

      axios
        .post("https://miamiocr.free.beeceptor.com", {
          data: this.saved
        })
        .then(response => {
          console.log("done");
          console.log(this.saved);
                this.myFunction();

        })
        .catch(error => console.log(error));


          }
        }
      );

    },

    handleAnimation: function(anim) {
      this.anim = anim;
    },

    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    },

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

    send() {
      const array = this.saved.concat(this.selected);
      this.saved = array;
      console.log(this.saved);

      const table = this.data.filter(item => !this.saved.includes(item));
      this.selected = [];
      this.data = table;
      this.search = "";
      this.search2 = "";
      console.log(table);
    },

    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let item in this.data) {
          this.selected.push(this.data[item]);
        }
      }
    },

    send2() {
      const array = this.data.concat(this.selected2);
      this.data = array;
      console.log(this.data);

      const table = this.saved.filter(item => !this.data.includes(item));
      this.selected2 = [];
      this.saved = table;
      this.search = "";
      this.search2 = "";
      console.log(table);
    },

    select2() {
      this.selected2 = [];
      if (!this.selectAll2) {
        for (let item in this.saved) {
          this.selected2.push(this.saved[item]);
        }
      }
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
    filteredData() {
      var self = this;
      return this.data.filter(item => {
        return (
          item.first_name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        );
      });
      //return this.customers;
    },

    filteredSavedData() {
      var self = this;
      return this.saved.filter(item => {
        return (
          item.first_name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        );
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
  height: 800px;
  width: 100%;
  top: 0;
  bottom: 0;
}

.scroll-area2 {
  position: relative;
  margin: auto;
  display: inline-block;
  height: 800px;
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
  right: 5%;
  bottom: 5%;
  left: 5%;
}

.header-animation {
  /* make it closer to the search button */
  margin-top: -20px;
}
.container {
  background-color: #fff;
  border-radius: 10px;
  display: table;
  margin: 0;
  height: 90%;

  width: 100%;
  box-shadow: 0px 1px 8px #999;
  margin-bottom: 5%;
  padding: 25px;
  z-index: 8;
}

.container2 {
  margin-left: 5%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: table;
  margin: 0;
  height: 90%;
  width: 100%;
  margin-bottom: 5%;
  padding: 25px;
  background-color: #fafafa;
  box-shadow: 0px 1px 8px #999;
  z-index: 1;
}

.table-container {
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

td {
  font-size: 16px;
  color: #000c20;
  line-height: 1.5;
  margin: 5px;
}

.table-id {
  font-weight: 600;
}

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

.btn p {
  color: #fff;
  font-size: 16px;
  text-align: center;
}

.modal-body {
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.3);
}

.header-animation {
  border-radius: 10%;
}

.container_row {
  height: 100%;
  width: 100%;
}
.start {
  /* background-color: #222; */
  width: 100%;
}

.middle {

}

.end {
  /* background-color: #222; */
  width: 100%;
}

.btn-finish {
  /* position: absolute;
    top: 5%;
    left: 50%;
    right: 0; */
}

.btn-send-left {
  position: absolute;
  top: 35%;
  left: 50%;
  height: 50px;
  width: 50px;
}

.btn-send-right {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
}

#snackbar{
    visibility: hidden;
width: 230px;
height: 55px;
background-color: #fff;
z-index: 10;
border-radius: 25px;
  position: fixed;
  left: 3%;
  bottom: 30px;
}

.snackbar-animation-container{
  margin-top: -10px;
  padding: auto;
}

.snackbar-text{
color: #000c20;
font-size: 20px;
font-weight: 400;
float: left;
margin-left: -30px;

}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}



.icon-settings {
  color: #000c20;
  margin-top: 5%;
  font-size: 20px;
}
</style>

