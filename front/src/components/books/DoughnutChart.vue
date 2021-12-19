<template> 
  <div id="doughnut-chart"> 
  <canvas id="myChart" width="300" height="186"></canvas>
  </div> 
</template>

<script>
// import DoughnutChart from '@/doughnutChart.js'
export default {
  name: 'DoughnutChart', 
  type: 'doughnut', 
  data: function(){
    return {
      data: {
      datasets: [{
        data: [40, 60],      // 섭취량, 총급여량 - 섭취량
        backgroundColor: [
          '#9DCEFF',
          '#F2F3F6'
        ],
        borderWidth: 0,
        scaleBeginAtZero: true,
      }
      ]
    },
  }
  }
}
</script>

<style>

</style>