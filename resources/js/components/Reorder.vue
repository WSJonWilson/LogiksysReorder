<template>
  <div class="body">
    <el-container class="container">
      <el-row class="header-container">
        <el-col :span="8">
          <div class="grid-content test">
            <p>EAST A</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content test1">
                  <el-input placeholder="Please input"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content test2">
                   <el-button v-on:click="save" type="primary" class="btn" >Save</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="header">
            <h2 class="head_text">List 1</h2>
          </div>

          <vue-custom-scrollbar class="scroll-area" :settings="settings" @ps-scroll-y="scrollHanle">
            <div class="card">
              <draggable v-model="data" :options="{group:'clothes'}">
                <div v-for="item in data" v-bind:key="item.id">
                  <div class="item-body">
                    <p class="data-id">{{ item.id }}</p>
                    <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                    <p class="data-company">{{item.company}}</p>
                    <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                  </div>
                </div>
              </draggable>
            </div>
          </vue-custom-scrollbar>
        </div>
        <!-- https://chrishurlburt.github.io/vue-scrollview/examples/dist/#/animation -->
        <div class="col-md-4">
          <div class="header">
            <h2 class="head_text">List 2</h2>
          </div>

          <div class="card">
            <vue-custom-scrollbar
              class="scroll-area"
              :settings="settings"
              @ps-scroll-y="scrollHanle"
            >
              <draggable v-model="value" :options="{group:'clothes'}">
                <div v-for="item in value" v-bind:key="item.id">
                  <div class="item-body">
                    <p class="data-id">{{ item.id }}</p>
                    <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                    <p class="data-company">{{item.company}}</p>
                    <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                  </div>
                </div>
              </draggable>
            </vue-custom-scrollbar>
          </div>
        </div>

        <div class="col-md-4">
          <div class="header">
            <h2 class="head_text">List 3</h2>
          </div>

          <div class="card">
            <vue-custom-scrollbar
              class="scroll-area"
              :settings="settings"
              @ps-scroll-y="scrollHanle"
            >
              <draggable v-model="extra" :options="{group:'clothes'}">
                <div v-for="item in extra" v-bind:key="item.id">
                  <div class="item-body">
                    <p class="data-id">{{ item.id }}</p>
                    <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                    <p class="data-company">{{item.company}}</p>
                    <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                  </div>
                </div>
              </draggable>
            </vue-custom-scrollbar>
          </div>
        </div>
      </div>

      <!-- <div class="row justify-content-center">
      <el-row>
      </el-row>
      </div>-->
    </el-container>
    <div class="container2">
      <vue-custom-scrollbar class="scroll-area2" :settings="settings" @ps-scroll-y="scrollHanle">
            <el-row class="header-container">
        <el-col :span="8">
          <div class="grid-content test">
            <p>EAST A</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content test1">
                  <el-input placeholder="Please input"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content test2">
          </div>
        </el-col>
      </el-row>

      <el-row class="header-container">
        <el-col :span="8">
          <div class="grid-content test">
                        <p style="color: #fafafa">EAST A</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content test1">
   <div v-for="item in saved" v-bind:key="item.id">
                  <div class="item-body">
                    <p class="data-id">{{ item.id }}</p>
                    <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                    <p class="data-company">{{item.company}}</p>
                    <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                  </div>
                </div>          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content test2">
                        <p style="color: #fafafa">EAST A</p>

          </div>
        </el-col>
      </el-row>
      </vue-custom-scrollbar>
                <!-- <vue-custom-scrollbar class="scroll-area2" :settings="settings" @ps-scroll-y="scrollHanle">
      <el-container>
              <div class="row justify-content-center">
       
                  <div class="card">

       <div v-for="item in saved" v-bind:key="item.id">
                  <div class="item-body">
                    <p class="data-id">{{ item.id }}</p>
                    <p class="data-name">{{item.first_name}} {{item.last_name}}</p>
                    <p class="data-company">{{item.company}}</p>
                    <p class="data-tel">{{item.phone1}} / {{item.phone2}}</p>
                  </div>
                </div>
                  </div>
            
              </div>
   </el-container>
                </vue-custom-scrollbar> -->

    </div>
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
      saved:[
        {
          id: 1,
          first_name: 'steve',
          last_name: 'jobs',
          company: 'lolololol',
          phone1: '292-6691',
          phone2: '624-1642',
        }
      ],
      settings: {
        maxScrollbarLength: 60
      }
    };
  },

  methods: {
      save: function(event){
        this.saved = this.saved.concat(this.value)
          console.log(this.saved)
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

.test p {
  color: #000c20;
  font-size: 20px;
  font-weight: 600;
}

.test1 {
}

.test2 {
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
  z-index: 5;
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

.data-id {
  text-align: center;
  font-size: 18px;
  color: #fff;
  align-content: center;
  align-items: center;
}

.data-name {
  font-size: 16px;
  color: #000c20;
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
  box-shadow: 0px 1px 8px #999;
  margin-top: 2%;
  background-color: #1976d2;
}

.head_text {
  margin-top: 5px;
  font-size: 18px;
}
.btn {
  background-color: #1976d2;
  border-radius: 5px;
  text-align: center;
  justify-content: center;
}


.container2 {
  /* overflow-y: scroll; */
  position: absolute;
  top: 0;
  right: 0%;
  left: 50%;
  width: 40%;
  margin-left: 5%;
  /* background-color: #fff; */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: table;
  margin: 0;
  height: 100%;
  width: 50%;
  margin-bottom: 5%;
  padding: 20px;
  background-color: #fafafa;
    box-shadow: 0px 1px 8px #999;
}
</style>

