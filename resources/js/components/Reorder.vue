<template>
  <div class="body">
    <b-card id="snackbar">
      <b-row class="snackbar-animation-container">
        <b-col>
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
              <p class="route-name">EAST A</p>
            </b-col>
            <b-col>
              <el-input class="searchbar" v-model="search" placeholder="Search...">
                <i class="el-icon-search el-input__icon" slot="prefix"></i>
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
              <template v-if="filteredData != 0">
                <table class="table table-head">
                  <thead class="thead table-hover">
                    <tr>
                      <th scope="col">
                        <input
                          class="checkboxAll"
                          type="checkbox"
                          v-model="selectAll"
                          @click="select"
                        />
                      </th>
                      <th scope="col">
                        <b-row>
                          <b-col>
                            ID
                            <template v-if="idOrder === true">
                              <arrow-up-circle-outline
                                class="id-Up"
                                style="color: #999"
                                @click="idAscend"
                              />
                              <arrow-down-circle-outline
                                class="id-Down"
                                style="color: #D32F2F"
                                @click="idDescend"
                              />
                            </template>
                            <template v-else>
                              <arrow-up-circle-outline
                                class="id-Up"
                                style="color: #D32F2F"
                                @click="idAscend"
                              />
                              <arrow-down-circle-outline
                                class="id-Down"
                                style="color: #999"
                                @click="idDescend"
                              />
                            </template>
                          </b-col>
                        </b-row>
                      </th>
                      <th scope="col">
                        <b-row>
                          <b-col>
                            FIRST NAME
                            <template v-if="fnOrder === true">
                              <arrow-up-circle-outline
                                class="fn-Up"
                                style="color: #999"
                                @click="fnAscend"
                              />
                              <arrow-down-circle-outline
                                class="fn-Down"
                                style="color: #D32F2F"
                                @click="fnDescend"
                              />
                            </template>
                            <template v-else>
                              <arrow-up-circle-outline style="color: #D32F2F" @click="fnAscend" />
                              <arrow-down-circle-outline style="color: #999" @click="fnDescend" />
                            </template>
                          </b-col>
                        </b-row>
                      </th>
                      <th scope="col">
                        <b-row>
                          <b-col>
                            LAST NAME
                            <template v-if="lnOrder === true">
                              <arrow-up-circle-outline
                                class="ln-Up"
                                style="color: #999"
                                @click="lnAscend"
                              />
                              <arrow-down-circle-outline
                                class="ln-Down"
                                style="color: #D32F2F"
                                @click="lnDescend"
                              />
                            </template>
                            <template v-else>
                              <arrow-up-circle-outline
                                class="ln-Up"
                                style="color: #D32F2F"
                                @click="lnAscend"
                              />
                              <arrow-down-circle-outline
                                class="ln-Down"
                                style="color: #999"
                                @click="lnDescend"
                              />
                            </template>
                          </b-col>
                        </b-row>
                      </th>
                      <th scope="col">
                        <b-row>
                          COMPANY
                          <template v-if="comOrder === true">
                              <arrow-up-circle-outline
                                class="com-Up"
                                style="color: #999"
                                @click="comAscend"
                              />
                              <arrow-down-circle-outline
                                class="com-Down"
                                style="color: #D32F2F"
                                @click="comDescend"
                              />
                            </template>
                            <template v-else>
                              <arrow-up-circle-outline style="color: #D32F2F" @click="comAscend" />
                              <arrow-down-circle-outline style="color: #999" @click="comDescend" />
                            </template>
                          <b-col cols="1"></b-col>
                        </b-row>
                      </th>
                    </tr>
                  </thead>
                </table>
                <table class="table">
                  <draggable v-model="data" :options="{group:'clothes'}" tag="tbody">
                    <tr v-for="(item, index) in filteredData" :key="index">
                      <button
                        @click="clicked(index)"
                        :class="{'active': isClicked[index]}"
                        class="btn-active"
                      >
                        <label class="label" for="checkbox">
                          <b-row>
                            <td>
                              <input
                                class="checkbox"
                                type="checkbox"
                                :value="item"
                                v-model="selected"
                              />
                            </td>
                            <b-col style="margin-left: 70px;  margin-right: -65px;">
                              <td class="table-id">{{ item.id }}</td>
                            </b-col>
                            <b-col>
                              <td onclick=" ">{{item.first_name}}</td>
                            </b-col>
                            <b-col>
                              <td>{{item.last_name}}</td>
                            </b-col>
                            <b-col>
                              <td>{{item.company}}</td>
                            </b-col>
                          </b-row>
                        </label>
                      </button>
                    </tr>
                  </draggable>
                </table>
              </template>
              <template v-else>
                <div>
                  <h2 class="empty">No Results...</h2>
                </div>
              </template>
            </vue-custom-scrollbar>
          </div>
          <!-- https://chrishurlburt.github.io/vue-scrollview/examples/dist/#/animation -->
        </el-container>
      </b-col>

      <b-col class="middle" cols="2">
        <div class="counter-top">
          <b-card class="card-top">
            <b-row align-v="center">
              <b-col class="card-bottom-left">
                <h3>Selected</h3>
                <p>{{ selected.length }}</p>
              </b-col>

              <b-col></b-col>

              <b-col>
                <chevron-right-circle-outline class="chevron-right-circle-outline" />
              </b-col>
            </b-row>
          </b-card>
        </div>

        <div style="positon: fixed;">
          <div class="container3">
            <template v-if="saved != 0">
              <el-button
                class="btn-send-left"
                type="primary"
                circle
                v-on:click="send2"
                icon="el-icon-arrow-left"
              ></el-button>
            </template>
            <template v-else>
              <el-button
                class="btn-send-left"
                disabled
                circle
                v-on:click="send2"
                icon="el-icon-arrow-left"
              ></el-button>
            </template>
          </div>

          <div class="container3">
            <template v-if="data != 0">
              <el-button
                class="btn-send-right"
                type="primary"
                circle
                v-on:click="send"
                icon="el-icon-arrow-right"
              ></el-button>
            </template>
            <template v-else>
              <el-button
                class="btn-send-right"
                disabled
                circle
                v-on:click="send"
                icon="el-icon-arrow-right"
              ></el-button>
            </template>
          </div>
        </div>

        <div class="counter-bottom">
          <b-card class="card-bottom">
            <b-row align-v="center">
              <b-col cols="4">
                <chevron-left-circle-outline class="chevron-left-circle-outline" />
              </b-col>
              <b-col cols="4"></b-col>
              <b-col cols="4">
                <h3>Selected</h3>
                <p>{{ selected2.length }}</p>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-col>
      <b-col class="end" cols="5">
        <b-container class="bv-example-row container2">
          <div class="badge-right">
            <h3>{{ saved.length }}</h3>
            <h3>Left</h3>
          </div>
          <b-row>
            <b-col>
              <p class="route-name">EAST A</p>
            </b-col>
            <b-col>
              <el-input class="searchbar" v-model="search" placeholder="Search...">
                <i class="el-icon-search el-input__icon" slot="prefix"></i>
              </el-input>
            </b-col>
            <b-col class="text-right">
              <font-awesome-icon icon="ellipsis-v" class="icon-settings" />
            </b-col>
          </b-row>
          <vue-custom-scrollbar
            class="scroll-area2"
            :settings="settings"
            @ps-scroll-y="scrollHanle"
          >
            <b-row>
              <b-col cols="1">
                <input type="checkbox" v-model="selectAll2" @click="select2" />
              </b-col>
              <b-col cols="10">
                <draggable v-model="saved" :options="{group:'clothes1'}">
                  <template v-if="saved != 0">
                    <div v-for="item in filteredSavedData" v-bind:key="item.id">
                      <b-row>
                        <b-col cols="1" align-self="center">
                          <div>
                            <drag-icon class="drag-icon" />
                          </div>
                        </b-col>

                        <b-col cols="11">
                          <label class="label2">
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
                                <b-col cols="9">
                                  <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                                  <p class="data-company">{{item.company}}</p>
                                  <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                                </b-col>
                                <b-col cols="1">
                                  <div>
                                    <input
                                      class="checkbox-right"
                                      type="checkbox"
                                      :value="item"
                                      v-model="selected2"
                                    />
                                  </div>
                                </b-col>
                              </b-row>
                            </b-card>
                          </label>
                        </b-col>
                      </b-row>
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      <h2 class="empty2">No Results...</h2>
                    </div>
                  </template>
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
import { parse } from "path";

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
      selectedItems: "",
      isClicked: [],
      activeItemId: "",
      isModalVisible: false,
      data: [],
      inUse: false,
      loading: false,
      idOrder: true,
      fnOrder: true,
      lnOrder: true,
      comOrder: true,
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
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, 3000);
    },

    getPackage(data) {
      this.activeItemId = data[1];
    },

    idDescend() {
      if (this.idOrder === true) {
        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["id"]).reverse();

        this.data = test;
        this.idOrder = false;
      }
    },

    idAscend() {
      if (this.idOrder === false) {
        this.idOrder = true;

        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["id"]);
        this.data = test;
      }
    },

    fnDescend() {
      if (this.fnOrder === true) {
        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["first_name"]).reverse();

        this.data = test;
        this.fnOrder = false;
      }
    },

    fnAscend() {
      if (this.fnOrder === false) {
        this.fnOrder = true;

        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["first_name"]);
        this.data = test;
        this.fnOrder = true;
      }
    },

    lnDescend() {
      if (this.lnOrder === true) {
        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["first_name"]).reverse();

        this.data = test;
        this.lnOrder = false;
      }
    },

    lnAscend() {
      if (this.lnOrder === false) {
        this.lnOrder = true;

        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["first_name"]);
        this.data = test;
        this.lnOrder = true;
      }
    },

        comDescend() {
      if (this.comOrder === true) {
        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["first_name"]).reverse();

        this.data = test;
        this.comOrder = false;
      }
    },

    comAscend() {
      if (this.comOrder === false) {
        this.comOrder = true;

        var test = this.data;
        // var descend = this.data.sort((a, b) => (a.id - b.id) ? 1: -1)

        var test = _.sortBy(this.data, ["first_name"]);
        this.data = test;
        this.comOrder = true;
      }
    },


    open() {
      this.$alert(
        "Complete and Save Route Reordering for EAST A ?",
        "Confirm Submission",
        {
          showCancelButton: true,
          cancelButtonText: "Cancel",
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

    clicked(index) {
      // toggle the active class
      this.$set(this.isClicked, index, !this.isClicked[index]);
    },

    getRequest() {
      // this.loading = true;
      axios
        .get("http://127.0.0.1:8000/customer")
        .then(response => {
          this.data = response.data.map(item => item);
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
      this.selectAll = false;
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
      this.selectAll2 = false;
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
    this.data.forEach((item, index) => this.$set(this.isClicked, index, false));

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
.chevron-left-circle-outline {
  color: #dbdbdb;
  font-size: 35px;
}

.chevron-right-circle-outline {
  color: #dbdbdb;
  font-size: 35px;
}

.scroll-area {
  position: relative;
  margin: auto;
  display: inline-block;
  height: 750px;
  width: 100%;
  top: 0;
  bottom: 0;
}

.scroll-area2 {
  position: relative;
  margin: auto;
  display: inline-block;
  height: 750px;
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
  border-radius: 10px;
  overflow: hidden;
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
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
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
  background-color: #fff;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.table-container {
  border-radius: 3px;
  z-index: 3;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}
.header_text {
  font-size: 18px;
}

.table-head {
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.checkbox {
}

.label {
  display: block;
  height: auto !important; /* for newer IE versions */
  height: 100%; /* the only height-related attribute that IE6 does not ignore  */
}

input[type="checkbox"]:checked label.label {
  box-shadow: 0 0 0 3px hotpink;
}

.checkbox-right {
  display: none;
}

.label2 {
  display: block;
  height: auto !important; /* for newer IE versions */
  height: 100%; /* the only height-related attribute that IE6 does not ignore  */
  width: 100%;
}
tr {
  height: 1px;
}
thead {
  background: #fff;
}

th {
  color: #1976d2;
}

td {
  font-size: 15px;
  color: #000c20;
  line-height: 1.4;
  margin: 5px;
  height: 100%;
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
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
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
  border-radius: 20px;
  background-color: #1976d2;
  border-color: #1976d2;
}

.badge-right {
  background-color: #03a9f4;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: absolute;
  top: 50%;
  right: 2%;
  text-align: center;
  padding: 10px;
}

.badge-right h3 {
  font-size: 18px;
  color: #fff;
}

.counter-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5%;
}

.counter-top {
  position: absolute;
  left: 0;
  right: 0;
  top: 0%;
}

.card-top {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.card-bottom {
  background-color: #fff;
  border-radius: 5px;
  padding-right: -100px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.card-top h3 {
  text-align: center;
  font-size: 16px;
  color: #000c20;
}

.card-bottom h3 {
  text-align: center;
  font-size: 16px;
  color: #000c20;
}

.card-top p {
  margin-top: 5%;
  text-align: center;
  font-weight: 800;
}

.card-bottom p {
  margin-top: 5%;
  text-align: center;
  font-weight: 800;
}

.btn-send-left {
  position: absolute;
  top: 35%;
  left: 50%;
  height: 50px;
  width: 50px;
  font-size: 20px;
}

.btn-send-right {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
  font-size: 20px;
}

#snackbar {
  visibility: hidden;
  width: 230px;
  height: 55px;
  background-color: #fff;
  z-index: 10;
  border-radius: 25px;
  position: fixed;
  left: 3%;
  top: 30px;
}

.snackbar-animation-container {
  margin-top: -10px;
  padding: auto;
}

.snackbar-text {
  color: #000c20;
  font-size: 20px;
  font-weight: 400;
  float: left;
  margin-left: -30px;
}

.empty {
  color: #dbdbdb;
  text-align: center;
  margin-top: 300px;
}

.empty2 {
  color: #dbdbdb;
  text-align: center;
  margin-top: 300px;
}

.drag-icon {
  font-size: 28px;
  color: #999;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    top: 30px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    top: 30px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}

.icon-settings {
  color: #000c20;
  margin-top: 5%;
  font-size: 20px;
}

.active {
  background: #fafafa;
}

.btn-active {
  width: 100%;
}
</style>

