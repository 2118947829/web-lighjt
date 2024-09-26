$(window).load(function () {
  $(".loading").fadeOut()
})

/****/
/****/
$(document).ready(function () {
  var whei = $(window).width()
  $("html").css({ fontSize: whei / 20 })
  $(window).resize(function () {
    var whei = $(window).width()
    $("html").css({ fontSize: whei / 20 })
  });
});

var colorList = [
  '#0074c2', '#00b59d', '#00be2b', '#abd300', '#f4e000',
  '#ffab00', '#ff7100', '#f00c00', '#c90061', '#c900c7', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
];


//var pie_data12 = [127, 69, 88];
//var SS2=A1.join()+','+A2.JOIN();
//VAR A12=[1,2,3];
$(function () {
  start();
  setInterval(start, 1000 * 60 * 10);
  function start() {
    echarts_1()
    echarts_2()
    echarts_3()
    echarts_5()
    echarts_6()
  }
  //在字符串中间添加字符
  function insertChar(str, char, position) {
    return str.substr(0, position) + char + str.substr(position);
  }
  //标段三
  function echarts_5() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));
    option = {
      title: {
        text: '标段',
        textStyle: {
          fontSize: '0.3rem',
          color: '#000',
          fontFamily: "Microsoft Yahei",
          fontWeight: '600'
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter: function (params) {
          return params[0].name + ': ' + params[0].value;
        }
      },
      xAxis: {
        data: ['标段一', '标段二', '标段三', '标段四', '标段五', '标段六', '标段七', '标段八',],
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 14,
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 14,
          }
        }
      },
      color: ['#89DA4F', '#FCC828', '#8EC7F4', '#CDCBEC', '#14B961'],
      series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '50%',
        symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        // symbol: 'path://path://M10 600 Q 95 0 180 600',
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: '{c}',
            color: '#000',
          },
        },
        itemStyle: {
          normal: {
            opacity: 0.5,
            color: function (params) {
              var colorList = ['#89DA4F', '#FCC828', '#8EC7F4', '#ADCAED', '#14B961', '#E3E3E3', '#3CC', '#33C'];
              return colorList[params.dataIndex];
            }
          },
          emphasis: {
            opacity: 1
          }
        },
        data: [123, 60, 125, 80, 12, 30, 90, 38],
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  //标段四
  function echarts_1() {
    // var myChart = echarts.init(document.getElementById('echart1'));
    var myChart = echarts.init(document.getElementById('echart1'));
    var offices = ['标段一', '标段二', '标段三', '标段四', '标段五'];
    var pie_data2 = [56, 65, 73, 12, 33, 83, 17];
    // initChartR2() {
    // const chartDom = document.getElementById('echart1')
    // this.rightChart2 = this.$echarts.init(chartDom)
    function getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      height
    ) {
      // 计算
      const midRatio = (startRatio + endRatio) / 2
      const startRadian = startRatio * Math.PI * 2
      const endRadian = endRatio * Math.PI * 2
      const midRadian = midRatio * Math.PI * 2
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== 'undefined' ? k : 1 / 3
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
      // 计算高亮效果的放大比例（未高亮，则比例为1）
      const hoverRate = isHovered ? 1.05 : 1
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        x: function (u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          if (u > endRadian) {
            return (
              offsetX +
              Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
        },
        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          if (u > endRadian) {
            return (
              offsetY +
              Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            )
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u)
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u)
          }
          return Math.sin(v) > 0 ? 1 * height : -1
        }
      }
    }
    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
      const series = []
      let sumValue = 0
      let startValue = 0
      let endValue = 0
      const legendData = []
      const k =
        typeof internalDiameterRatio !== 'undefined'
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3
      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value
        const seriesItem = {
          name:
            typeof pieData[i].name === 'undefined'
              ? `series${i}`
              : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k
          }
        }
        if (typeof pieData[i].itemStyle !== 'undefined') {
          const itemStyle = {}
          typeof pieData[i].itemStyle.color !== 'undefined'
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null
          typeof pieData[i].itemStyle.opacity !== 'undefined'
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null
          seriesItem.itemStyle = itemStyle
        }
        series.push(seriesItem)
      }
      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value
        series[i].pieData.startRatio = startValue / sumValue
        series[i].pieData.endRatio = endValue / sumValue
        series[i].parametricEquation = getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          2000
        )
        startValue = endValue
        legendData.push(series[i].name)
      }
      return series
    }
    // 传入数据生成 option
    const optionsData = [
      {
        name: '标段一',
        value: 13.87,
        itemStyle: {
          opacity: 0.7,
          color: '#7bc35a'
        }
      },
      {
        name: '标段二',
        value: 0.6,
        itemStyle: {
          opacity: 0.7,
          color: '#2f97df'
        }
      },
      {
        name: '标段三',
        value: 9.53,
        itemStyle: {
          opacity: 0.7,
          color: '#4268d6'
        }
      },
      {
        name: '标段四',
        value: 72.17,
        itemStyle: {
          opacity: 0.7,
          color: '#d35e5f'
        }
      },
      {
        name: '标段五',
        value: 3.67,
        itemStyle: {
          opacity: 0.7,
          color: '#c2c763'
        }
      },
      {
        name: '标段六',
        value: 0.17,
        itemStyle: {
          opacity: 0.7,
          color: '#8fdffe'
        }
      }
    ]
    const series = getPie3D(optionsData.map(item => {
      if (item.value < 5) {
        item.value = 5
      }
      return item
    }), 0, 240, 28, 26, 0.5)
    series.push({
      name: 'pie2d',
      type: 'pie',
      label: {
        opacity: 1,
        position: 'outside',
        fontSize: 12,
        lineHeight: 30,
        textStyle: {
          fontSize: 12,
          color: '#000'
        }
      },
      labelLine: {
        length: 40,
        length2: 60
      },
      minAngle: 10,
      startAngle: -50, // 起始角度，支持范围[0, 360]。
      clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['0', '25%'],
      center: ['50%', '50%'],
      data: optionsData.map(item => {
        item.itemStyle.opacity = 0
        return item
      })
    })
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
      legend: {
        show: false
      },
      animation: true,
      tooltip: {
        formatter: (params) => {
          if (
            params.seriesName !== 'mouseoutSeries' &&
            params.seriesName !== 'pie2d'
          ) {
            return `${params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
              };"></span>${option.series[params.seriesIndex].pieData.value + '%'
              }`
          }
        },
        textStyle: {
          fontSize: 14
        }
      },
      title: {
        x: 'center',
        top: '20',
        textStyle: {
          color: '#fff',
          fontSize: 22
        }
      },
      // backgroundColor: '#0E3567',
      labelLine: {
        show: true,
        lineStyle: {
          color: '#ccc'
        },
        normal: {
          show: true,
          length: 10,
          length2: 10
        }
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}',
        // formatter: '{b} \n{d}%',
        textStyle: {
          color: '#000',
          fontSize: '12px'
        }
      },
      xAxis3D: {
        min: -1,
        max: 1
      },
      yAxis3D: {
        min: -1,
        max: 1
      },
      zAxis3D: {
        min: -1,
        max: 1
      },
      grid3D: {
        show: false,
        boxHeight: 0.01,
        // top: '30%',
        bottom: '50%',
        // environment: "rgba(255,255,255,0)",
        viewControl: {
          distance: 300,
          alpha: 35,
          beta: 60,
          autoRotate: false // 自动旋转
        }
      },
      series: series
    }
    // this.rightChart2.setOption(option)
    //   }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // })
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  //标段二
  function echarts_3() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart3'));
    var project = ['标段一', '标段二', '标段三'];
    var week_time = ["7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7"];
    var line_data1 = [[42, 36, 87, 65, 35, 78, 32], [35, 67, 39, 20, 55, 32, 84], [65, 32, 28, 19, 40, 11, 29]];
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#dddc6b'
          }
        }
      },
      grid: {
        left: '0',
        top: '30',
        right: '20',
        bottom: '10',
        containLabel: true
      }, legend: {
        data: project,
        right: 'center',
        top: 0,
        textStyle: {
          color: "#000"
        },
        itemGap: 8,
        itemWidth: 10,
        itemHeight: 10,
        // itemGap: 35
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 14,
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        data: week_time,
      }, {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: 'bottom',
        offset: 20,
      }],
      yAxis: [{
        type: 'value',
        axisTick: { show: false },
        // splitNumber: 6,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#000",
            fontSize: 14,
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      }],
      series: [
        {
          name: project[0],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: 'rgba(228, 228, 126, 1)',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(228, 228, 126, .8)'
              }, {
                offset: 0.8,
                color: 'rgba(228, 228, 126, 0.1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: '#dddc6b',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: line_data1[0]
        }, {
          name: project[1],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: 'rgba(255, 128, 128, 1)',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 128, 128,.8)'
              }, {
                offset: 0.8,
                color: 'rgba(255, 128, 128, .1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(255, 128, 128, 1)',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: line_data1[1],
        }, {
          name: project[2],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: 'rgba(255, 64, 64, 1)',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 128, 128,.8)'
              }, {
                offset: 0.8,
                color: 'rgba(255, 128, 128, .1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(255, 64, 64, 1)',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: line_data1[2],
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
    // }
    // );
  }
  //标段五
  function echarts_2() {
    var myChart = echarts.init(document.getElementById('echart2'));
    var floor = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼', '10楼'];
    var project = ['标段一', '标段二', '标段三'];
    var bar_data = [[150, 230, 180, 110, 100, 140, 160, 130, 221, 213], [150, 230, 180, 110, 100, 140, 160, 130, 221, 213], [90, 170, 120, 50, 40, 80, 100, 70, 221, 213], [60, 123, 120, 30, 78, 35, 190, 60, 21, 300]]

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        x: 'center',
        y: '0',
        icon: 'circle',
        itemGap: 8,
        textStyle: {
          color: "#000"
        },
        itemWidth: 10,
        itemHeight: 10,
      },
      grid: {
        left: '0',
        top: '30',
        right: '15',
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: floor,
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        },
      },
      yAxis: {
        type: 'value',
        splitNumber: 4,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.05)'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 14
          },
        },
      },
      series: [{
        name: project[0],
        type: 'bar',
        barWidth: '15%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#8bd46e'
            }, {
              offset: 1,
              color: '#03b48e'
            }]),
            barBorderRadius: 11,
          }
        },
        data: bar_data[0],
      },
      {
        name: project[1],
        type: 'bar',
        barWidth: '15%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#3893e5'
            }, {
              offset: 1,
              color: '#248ff7'
            }]),
            barBorderRadius: 11,
          }
        },
        data: bar_data[1],
      },
      {
        name: project[2],
        type: 'bar',
        barWidth: '15%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#43cadd'
            }, {
              offset: 1,
              color: '#0097c9'
            }]),
            barBorderRadius: 11,
          }
        },
        data: bar_data[2],
      }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  //标段六
  function echarts_6() {
    var myChart = echarts.init(document.getElementById('echart6'));
    option = {
      // title: {
      //     text: '标段'
      // },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}%'
      },
      legend: {
        data: ['标段一', '标段二', '标段三', '标段四', '标段五']
      },
      series: [
        {
          // name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 20,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'ascending',
          gap: 2,
          label: {
            show: true,
            position: 'outside',
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 60, name: '标段一' },
            { value: 40, name: '标段二' },
            { value: 20, name: '标段三' },
            { value: 80, name: '标段四' },
            { value: 100, name: '标段五' }
          ]
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
})














