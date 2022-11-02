<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left">
      <div class="box-left-card">
        <section class="box-left-item">
          <div>较上日+{{ store.chinaDailyAdd.localConfirmadd }}</div>
          <div>{{ store.chinaDaily.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section class="box-left-item">
          <div>较上日+{{ store.chinaDailyAdd.heal }}</div>
          <div>{{ store.chinaDaily.heal }}</div>
          <div>累计治愈</div>
        </section>
        <section class="box-left-item">
          <div>较上日+{{ store.chinaDailyAdd.confirm }}</div>
          <div>{{ store.chinaDaily.nowConfirm }}</div>
          <div>本土累计确诊</div>
        </section>
        <section class="box-left-item">
          <div>较上日+{{ store.chinaDailyAdd.infect }}</div>
          <div>{{ store.chinaDaily.noInfectH5 }}</div>
          <div>无症状感染者</div>
        </section>
        <section class="box-left-item">
          <div>较上日+{{ store.chinaDailyAdd.dead }}</div>
          <div>{{ store.chinaDaily.dead }}</div>
          <div>本土现有死亡数</div>
        </section>
        <section class="box-left-item">
          <div>较上日+{{ store.chinaDailyAdd.importedCase }}</div>
          <div>{{ store.chinaDaily.importedCase }}</div>
          <div>本土境外输入</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div id="china" class="box-center">
    </div>
    <div class="box-right">
      <table cellspacing="0" border="1">
        <thead>
          <tr>
            <th>确认新增</th>
            <th>死亡人数</th>
            <th>治愈</th>
            <th>现确诊</th>
            <th>zero代表啥</th>
          </tr>
        </thead>
        <tbody>
          <th v-for="(item1, index) in store.item.otherValue" :key="index">
            {{ item1 }}
          </th>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from './assets/1.jpg'
import { useStore } from './stores/data'
import { onMounted } from 'vue'
import { geoCoordMap } from '@/assets/geoMap'
import * as echarts from 'echarts'
import './assets/china'
import type { RootObject, pieData } from './stores/type'
const store = useStore()

onMounted(async () => {
  await store.getList()
  initCharts()
  initPieCharts()
  initLineCharts()
})
const initCharts = () => {
  let city = store.list.data.provinceCompare
  let chinaDaily = store.list.data.chinaDayList[59]
  let chinaDailyAdd = store.list.data.chinaDayAddList[59]
  store.chinaDaily = chinaDaily
  store.chinaDailyAdd = chinaDailyAdd
  console.log(store.chinaDaily);
  const charts = echarts.init(document.querySelector('#china') as HTMLElement)
  let data = []
  for (let item in city) {
    data.push({
      name: item,
      value: geoCoordMap[item].concat(city[item].confirmAdd),
      otherValue: city[item]
    })
  }
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
      },
    ],
  })
  charts.on('click', (e) => {
    store.item = e.data as RootObject
    console.log(store.item);

  })
}
const initPieCharts = () => {
  let pieChartDom = document.getElementsByClassName('box-left-pie')[0] as HTMLElement
  let pieChart = echarts.init(pieChartDom)
  let city = store.list.data.provinceCompare
  let keys = Object.keys(city)

  let data: pieData[] = keys.map((v) => {
    return {
      value: city[v].confirmAdd,
      name: v
    }
  })
  data = data.splice(10, 20)
  let option = {
    backgroundColor: '#223651',
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: 'white',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
          }
        },
        labelLine: {
          show: true
        },
        data: data
      }
    ]
  };

  pieChart && pieChart.setOption(option);

}
const initLineCharts = () => {
  let lineChartDom = document.getElementsByClassName('box-left-line')[0] as HTMLElement
  let lineChart = echarts.init(lineChartDom)
  let city = store.list.data.provinceCompare
  let keys = Object.keys(city)
  let data = keys.map((v) => {
     return city[v].confirmAdd
  })
  var option;
  option = {
    xAxis: {
      type: 'category',
      data: keys.splice(0,6),
      axisLine:{
        lineStyle:{
          color:'white'
        }
      }
    },
    tooltip:{
      trigger:'axis'
    },
    yAxis: {
      type: 'value',
      axisLine:{
        lineStyle:{
          color:'white'
        }
      }
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true
      }
    ]
  };

  lineChart && lineChart.setOption(option);

}
</script>

<style lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  overflow: hidden;

  &-left {
    width: 400px;
  }

  &-center {

    flex: 1;
  }

  &-right {
    width: 400px;
  }
}

.box-right {
  color: white;
}

.box-left {
  width: 400px;
  display: flex;
  flex-direction: column;
  color: white;

  &-card {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto auto;
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background: @itemBg;
    border: 1px solid @itemBorder;

    div:nth-child(2) {
      color: @itemColor;
      font-size: 20px;
      font-weight: bold;
    }
  }

  &-pie {
    margin-top: 10px;
    height: 320px;
  }

  &-line {
    margin-top: 10px;
    height: 300px;
    background-color: @itemBg;
  }
}
</style>