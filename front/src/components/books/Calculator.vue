<template>
  <div id="main">
    <div class="container">
      <!-- {{ startDate.toLocaleDateString() }} -->
      {{ boardList }}
      <div>
        <h2>Start Date</h2>
        <date-picker
          v-model="startDate"
          :clearable="false"
          :disabled-date="startDisable"
        ></date-picker>
      </div>
      <div>
        <h2>End Date</h2>
        <date-picker
          v-model="endDate"
          :clearable="false"
          :disabled-date="endDisable"
          :shortcuts="dateShortcuts"
        ></date-picker>
      </div>
      <button @click="filterDate">조회</button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import {mapState} from 'vuex'
    
export default {
  name: "Calculator",
  components: {
    DatePicker,
  },
  data() {
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear());
    startDate.setHours(0, 0, 0, 0);
    
    let endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    return {
      startDate: startDate,
      endDate: endDate,
      timeSince: 365,
      dateShortcuts: [
        {
          text: "Today",
          onClick: () => new Date(new Date().setHours(0, 0, 0, 0)),
        },
      ],
    };
  },

  methods: {
    filterDate: function() {
      const new1 = this.startDate.toISOString()
      const new2 = this.endDate.toISOString()
      console.log(new1)
      const dateItem = [
        {
        startDate: new1
        },
        {
        endDate: new2
        }
      ]
      // console.log(dateItem)
      this.$store.dispatch('filterDate', dateItem)
     },
    startDisable: function (date) {
      return date > this.endDate;
    },
    endDisable: function (date) {
      return date < this.startDate;
    },
    getUTCDates: function () {
      return {
        start: Date.UTC(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate(),
          this.startDate.getHours(),
          this.startDate.getMinutes(),
          this.startDate.getSeconds(),
          this.startDate.getMilliseconds()
        ),
        end: Date.UTC(
          this.endDate.getFullYear(),
          this.endDate.getMonth(),
          this.endDate.getDate(),
          this.endDate.getHours(),
          this.endDate.getMinutes(),
          this.endDate.getSeconds(),
          this.endDate.getMilliseconds()
        ),
      };
    },
  },
  computed:{
    ...mapState([
      'boardList'
    ])
  },
};
</script>

<style scoped>
#main {
  width: 90%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 8%;
  align-items: bottom;
  margin: 0 auto 5rem auto;
}

.results {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0;
  text-align: center;
  margin: auto;
  width: 30%;
}

.results > * {
  flex: 1 1 50%;
}

@media only screen and (max-width: 1500px) {
  .results {
    width: 50%;
  }
}

@media only screen and (max-width: 1200px) {
  .results {
    width: 75%;
  }
}

@media only screen and (max-width: 800px) {
  .results > * {
    width: 100%;
  }
}

@media only screen and (max-width: 650px) {
  .results > * {
    flex: 1 1 100%;
  }
}

.result {
  margin: 0 auto 0 auto;
}

.result:after {
  content: "";
  width: 30%;
  color: #c9184a;
  display: flex;
  justify-content: center;
  line-height: 0.1em;
  font-size: 14px;
  font-family: cursive;
  margin: 10px auto 10px auto;
  border-bottom: 1px solid #c9184a;
}
</style>