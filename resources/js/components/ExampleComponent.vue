<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">List 1</div>

          <draggable v-model="data" :options="{group:'clothes'}">
            <div v-for="item in data" v-bind:key="item.id">
              <div class="list_item">
                <div class="card-body">
                
                    <p>{{ item.id }}</p>
                    <h4>{{item.first_name}} {{item.last_name}}</h4>
                     <h4>{{item.company}}</h4>
                    <h4>{{item.phone1}} / {{item.phone2}}</h4>
                     

                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
<!-- https://chrishurlburt.github.io/vue-scrollview/examples/dist/#/animation -->
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">List 2</div>

          <draggable v-model="value" :options="{group:'clothes'}">
              <div v-for="item in value" v-bind:key="item.id">
                <div class="list_item">
                  <div class="card-body">
                       <p>{{ item.id }}</p>
                    <h4>{{item.first_name}} {{item.last_name}}</h4>
                     <h4>{{item.company}}</h4>
                    <h4>{{item.phone1}} / {{item.phone2}}</h4> </div>
                </div>
              </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import draggable from "vuedraggable";
import locale from "element-ui/lib/locale/lang/en";
import axios from "axios";
import { scrypt } from "crypto";

export default {
  components: {
    draggable
  },
  data() {
    return {
      data: [],
      loading: false,
      value: []
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
  background-color: #fafafa;
}

.card{
  overflow-y: scroll
}

.list_item{
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: #f2f2f2;
    box-shadow: 0px 1px 8px #999;
  background-color: #ffffff;
  margin-top: 2%;
}
</style>

