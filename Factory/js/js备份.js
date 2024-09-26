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
        echarts_4()
        echarts_5()
    }

    //在字符串中间添加字符
    function insertChar(str, char, position) {
        return str.substr(0, position) + char + str.substr(position);
    }

    //各楼层垃圾占比
    function echarts_1() {
        var myChart = echarts.init(document.getElementById('echart1'));
        var offices = ['', '', '', '', ''];
        //var pie_data2 = [56, 65, 73, 12, 33, 83, 17];
        var pie_data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $.post("http://39.108.69.97:17739/GfyService.asmx/GetWasteDayByFloor", {
        }, function (data) {
            var obj = eval(data);
            //var j = 0;
            var jo = [];
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].Allsum > 0) {
                    jo.push({ value: obj[i].Allsum, name: obj[i].Floor + "楼" })
                    //pie_data2[j] = obj[i].Allsum;
                    //offices[j] = obj[i].Floor + "楼"
                    //j++;
                }
            }
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
                    data:
                        jo.sort(function (a, b) {
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
                // series: [{
                // 	name: '分布',
                // 	type: 'pie',
                // 	radius: ['30%', '60%'],
                // 	center: ['50%', '50%'],
                // 	color: ['#f8b62c', '#FE5050', '#0086e5', '#57bc2f', '#ff7100', '#F0805A'],
                // 	data: [{
                // 		value: pie_data2[0],
                // 		name: offices[0]
                // 	},
                // 	{
                // 		value: pie_data2[1],
                // 		name: offices[1]
                // 	},
                // 	{
                // 		value: pie_data2[2],
                // 		name: offices[2]
                // 	},
                // 	{
                // 		value: pie_data2[3],
                // 		name: offices[3]
                // 	}
                // 	].sort(function (a, b) {
                // 		return a.value - b.value
                // 	}),
                // 	roseType: 'radius',

                // 	label: {
                // 		normal: {
                // 			formatter: ['{d|{d}%}', '{b|{b}}'].join('\n'),
                // 			rich: {
                // 				d: {
                // 					color: 'rgb(241,246,104)',
                // 					fontSize: 14,
                // 					fontWeight: 'bold',

                // 				},
                // 				b: {
                // 					color: 'rgb(98,137,169)',
                // 					fontSize: 12,

                // 				},
                // 			},
                // 		}
                // 	},
                // 	labelLine: {
                // 		normal: {
                // 			lineStyle: {
                // 				color: 'rgb(98,137,169)',
                // 			},
                // 			smooth: 0.2,
                // 			length: 5,
                // 			length2: 9,

                // 		}
                // 	},
                // 	itemStyle: {
                // 		normal: {
                // 			shadowColor: 'rgba(0, 0, 0, 0.1)',
                // 			shadowBlur: 50,
                // 		}
                // 	}
                // }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        })


        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    //最近一周各类垃圾数量趋势
    function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart3'));
        var project = ['感染类', '损伤类', '病理类'];
        //var week_time = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

        var datagrl = [0, 0, 0, 0, 0, 0, 0];
        var datassl = [0, 0, 0, 0, 0, 0, 0];
        var databll = [0, 0, 0, 0, 0, 0, 0];
        var week_time = ["", "", "", "", "", "", ""];
        $.post("http://39.108.69.97:17739/GfyService.asmx/GetWasteDayByWeek", {
        }, function (data) {
            var obj = eval(data);
            //感染类
            datagrl[0] = obj[6].Grl;
            datagrl[1] = obj[5].Grl;
            datagrl[2] = obj[4].Grl;
            datagrl[3] = obj[3].Grl;
            datagrl[4] = obj[2].Grl;
            datagrl[5] = obj[1].Grl;
            datagrl[6] = obj[0].Grl;
            //损伤类
            datassl[0] = obj[6].Ssl;
            datassl[1] = obj[5].Ssl;
            datassl[2] = obj[4].Ssl;
            datassl[3] = obj[3].Ssl;
            datassl[4] = obj[2].Ssl;
            datassl[5] = obj[1].Ssl;
            datassl[6] = obj[0].Ssl;
            //病理类
            databll[0] = obj[6].Bll;
            databll[1] = obj[5].Bll;
            databll[2] = obj[4].Bll;
            databll[3] = obj[3].Bll;
            databll[4] = obj[2].Bll;
            databll[5] = obj[1].Bll;
            databll[6] = obj[0].Bll;
            //日期
            week_time[0] = insertChar(obj[6].Gday, '/', 2);
            week_time[1] = insertChar(obj[5].Gday, '/', 2);
            week_time[2] = insertChar(obj[4].Gday, '/', 2);
            week_time[3] = insertChar(obj[3].Gday, '/', 2);
            week_time[4] = insertChar(obj[2].Gday, '/', 2);
            week_time[5] = insertChar(obj[1].Gday, '/', 2);
            week_time[6] = insertChar(obj[0].Gday, '/', 2);

            var line_datatest = datagrl + datassl + databll;
            //var line_data1 = [[42, 36, 87, 65, 35, 78, 32], [35, 67, 39, 20, 55, 32, 84], [65, 32, 28, 19, 40, 11, 29]];
            var line_data1 = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            line_data1[0] = datagrl;
            line_data1[1] = datassl;
            line_data1[2] = databll;

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

        }
        );

    }

    //最近1周各层楼垃圾信息
    function echarts_2() {
        var myChart = echarts.init(document.getElementById('echart2'));

        var floor = ['1楼', '2楼', '3楼', '4楼', '5楼', '6楼', '7楼', '8楼', '9楼', '10楼'];
        var project = ['感染类', '损伤类', '病理类'];
        var bar_data = [[150, 230, 180, 110, 100, 140, 160, 130, 221, 213], [150, 230, 180, 110, 100, 140, 160, 130, 221, 213], [90, 170, 120, 50, 40, 80, 100, 70, 221, 213], [60, 123, 120, 30, 78, 35, 190, 60, 21, 300]]

        var datagrl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var datassl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var databll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $.post("http://39.108.69.97:17739/GfyService.asmx/GetWasteDayByFloor", {
        }, function (data) {
            var obj = eval(data);
            for (var i = 0; i < 10; i++) {
                datagrl[i] = obj[i].Grl;
                datassl[i] = obj[i].Ssl;
                databll[i] = obj[i].Bll;
            }
            bar_data[0] = datagrl;
            bar_data[1] = datassl;
            bar_data[2] = databll;

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

        });

    }

    //各类垃圾占比
    function echarts_4() {
        var pie_data1 = [0, 0, 0];
        $.post("http://39.108.69.97:17739/GfyService.asmx/GetWasteMon", {
        }, function (data) {
            var obj = eval(data);
            pie_data1[0] = obj[0].Grl;
            pie_data1[1] = obj[0].Bll;
            pie_data1[2] = obj[0].Ssl;

            var myChart = echarts.init(document.getElementById('echart4'));
            var project = ['感染类', '病理类', '损伤类'];
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
                    color: ['#f8b62c', '#FE5050', '#0086e5'],
                    data: [{
                        value: pie_data1[0],
                        name: project[0]
                    },
                    {
                        value: pie_data1[1],
                        name: project[1]
                    },
                    {
                        value: pie_data1[2],
                        name: project[2]
                    },
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

            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
        );

    }

    //最近一周各AGV运行时长趋势
    function echarts_5() {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
        //var line_data2 = [[182, 312, 442, 123, 543, 842, 449], [357, 234, 663, 370, 254, 845, 456], [146, 257, 548, 335, 894, 135, 763]];
        var line_data2 = [[182, 312, 442, 123, 543, 842, 449], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
        var AGV = ['AGV01', 'AGV02', 'AGV03'];
        //var week_time = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        var week_time = ["", "", "", "", "", "", ""];

        var dataagv01 = [0, 0, 0, 0, 0, 0, 0];
        var dataagv02 = [0, 0, 0, 0, 0, 0, 0];
        var dataagv03 = [0, 0, 0, 0, 0, 0, 0];
        $.post("http://39.108.69.97:17739/GfyService.asmx/GetWagvDayByWeek", {
        }, function (data) {
            var obj = eval(data);
            dataagv01[0] = obj[6].Runtime;
            dataagv01[1] = obj[5].Runtime;
            dataagv01[2] = obj[4].Runtime;
            dataagv01[3] = obj[3].Runtime;
            dataagv01[4] = obj[2].Runtime;
            dataagv01[5] = obj[1].Runtime;
            dataagv01[6] = obj[0].Runtime;

            dataagv02[0] = obj[13].Runtime;
            dataagv02[1] = obj[12].Runtime;
            dataagv02[2] = obj[11].Runtime;
            dataagv02[3] = obj[10].Runtime;
            dataagv02[4] = obj[9].Runtime;
            dataagv02[5] = obj[8].Runtime;
            dataagv02[6] = obj[7].Runtime;

            dataagv03[0] = obj[20].Runtime;
            dataagv03[1] = obj[19].Runtime;
            dataagv03[2] = obj[18].Runtime;
            dataagv03[3] = obj[17].Runtime;
            dataagv03[4] = obj[16].Runtime;
            dataagv03[5] = obj[15].Runtime;
            dataagv03[6] = obj[14].Runtime;

            week_time[0] = insertChar(obj[6].Runday, '/', 2);
            week_time[1] = insertChar(obj[5].Runday, '/', 2);
            week_time[2] = insertChar(obj[4].Runday, '/', 2);
            week_time[3] = insertChar(obj[3].Runday, '/', 2);
            week_time[4] = insertChar(obj[2].Runday, '/', 2);
            week_time[5] = insertChar(obj[1].Runday, '/', 2);
            week_time[6] = insertChar(obj[0].Runday, '/', 2);

            line_data2[0] = dataagv01;
            line_data2[1] = dataagv02;
            line_data2[2] = dataagv03;

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
                    data: AGV,
                    right: 'center',
                    top: 0,
                    textStyle: {
                        color: "#fff"
                    },
                    itemWidth: 12,
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
                        name: AGV[0],
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
                        data: line_data2[0]
                    }, {
                        name: AGV[1],
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
                        data: line_data2[1],

                    }, {
                        name: AGV[2],
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
                        data: line_data2[2],

                    }

                ]

            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
        );


    }

})












