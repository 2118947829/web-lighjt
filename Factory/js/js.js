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
        // echarts_4()
        echarts_5()
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
                    color: '#fff',
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
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
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
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.5,
                        color: function (params) {
                            var colorList = ['#89DA4F', '#FCC828', '#8EC7F4', '#ADCAED', '#14B961', '#E3E3E3','#3CC','#33C'];
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
        var myChart = echarts.init(document.getElementById('echart1'));
        var offices = ['标段一', '标段二', '标段三', '标段四', '标段五'];
        var pie_data2 = [56, 65, 73, 12, 33, 83, 17];
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 500,
                max: 600,
                inRange: {
                    //colorLightness: [0, 1]
                }
            },
            series: [{
                name: '分布',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['50%', '50%'],
                color: ['#f8b62c', '#FE5050', '#0086e5', '#57bc2f', '#ff7100', '#F0805A'],
                data: [{
                    value: pie_data2[0],
                    name: offices[0]
                },
                {
                    value: pie_data2[1],
                    name: offices[1]
                },
                {
                    value: pie_data2[2],
                    name: offices[2]
                },
                {
                    value: pie_data2[3],
                    name: offices[3]
                }
                ].sort(function (a, b) {
                    return a.value - b.value
                }),
                roseType: 'radius',
                label: {
                    normal: {
                        formatter: ['{d|{d}%}', '{b|{b}}'].join('\n'),
                        rich: {
                            d: {
                                color: 'rgb(241,246,104)',
                                fontSize: 14,
                                fontWeight: 'bold',
                            },
                            b: {
                                color: 'rgb(98,137,169)',
                                fontSize: 12,
                            },
                        },
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgb(98,137,169)',
                        },
                        smooth: 0.2,
                        length: 5,
                        length2: 9,
                    }
                },
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 50,
                    }
                }
            }]
        };
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
                bottom: '-10',
                containLabel: true
            }, legend: {
                data: project,
                right: 'center',
                top: 0,
                textStyle: {
                    color: "#fff"
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
                        color: "rgba(255,255,255,.6)",
                        fontSize: 14,
                    },
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
                        color: "rgba(255,255,255,.6)",
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
                    textStyle: { color: 'rgba(255,255,255,.5)' },
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
                    axisLine: { show: false },

                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255,.6)',
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
                            color: 'rgba(255,255,255,.6)',
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
})












