$('#foot').load('public.html');
$(function() {
	projectInfo();
	ServerCurrentTime();


});

// $(function() {
// 	$('#container-pie').highcharts({
// 		chart: {
// 			backgroundColor: '#292E46',
// 			plotBackgroundColor: null,
// 			plotBorderWidth: null,
// 			plotShadow: false
// 		},
// 		credits: {
// 			enabled: false
// 		},
// 		title: {
// 			text: ''
// 		},
// 		tooltip: {
// 			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
// 		},
// 		plotOptions: {
// 			pie: {
// 				allowPointSelect: true,
// 				cursor: 'pointer',
// 				dataLabels: {
// 					enabled: true,
// 					format: '{point.percentage:.1f} %',
// 					style: {
// 						"color": "#BFD3DF",
// 						"fontSize": "11px",
// 						"fontWeight": "bold",
// 						"textOutline": "none"
// 					},

// 				},
// 				showInLegend: true
// 			}
// 		},
// 		legend: {
// 			align: 'left',
// 			layout: 'vertical',
// 			verticalAlign: 'middle',
// 			itemMarginBottom: 8,
// 			itemStyle: {
// 				color: '#7A8FAC;',
// 				fontWeight: 'bold'
// 			},
// 			x: -10,
// 			y: 50
// 		},
// 		series: [{
// 			type: 'pie',
// 			name: '能耗占比',
// 			data: [{
// 				name: '照明',
// 				y: 25.0,
// 				color: '#1B70B0'
// 			}, {
// 				name: '空调',
// 				y: 26.8,
// 				color: '#298372'
// 			}, {
// 				name: '插座',
// 				y: 15.4,
// 				color: '#8268BE'
// 			}]
// 		}]
// 	});
// });

// $(function() {
// 	Highcharts.setOptions({
// 		timezoneOffset: -8
// 	});

// 	var data = [
// 		[
// 			1370131200000,
// 			0.7695
// 		],
// 		[
// 			1370217600000,
// 			0.7648
// 		],
// 		[
// 			1370304000000,
// 			0.7645
// 		],
// 		[
// 			1370390400000,
// 			0.7638
// 		],
// 		[
// 			1370476800000,
// 			0.7549
// 		],
// 		[
// 			1370563200000,
// 			0.7562
// 		],
// 		[
// 			1370736000000,
// 			0.7574
// 		],
// 		[
// 			1370822400000,
// 			0.7543
// 		],
// 		[
// 			1370908800000,
// 			0.751
// 		],
// 		[
// 			1370995200000,
// 			0.7498
// 		],
// 		[
// 			1371081600000,
// 			0.7477
// 		],
// 		[
// 			1371168000000,
// 			0.7492
// 		],
// 		[
// 			1371340800000,
// 			0.7487
// 		],
// 		[
// 			1371427200000,
// 			0.748
// 		],
// 		[
// 			1371513600000,
// 			0.7466
// 		],
// 		[
// 			1371600000000,
// 			0.7521
// 		],
// 		[
// 			1371686400000,
// 			0.7564
// 		],
// 		[
// 			1371772800000,
// 			0.7621
// 		],
// 		[
// 			1371945600000,
// 			0.763
// 		],
// 		[
// 			1372032000000,
// 			0.7623
// 		],
// 		[
// 			1372118400000,
// 			0.7644
// 		],
// 		[
// 			1372204800000,
// 			0.7685
// 		],
// 		[
// 			1372291200000,
// 			0.7671
// 		],
// 		[
// 			1372377600000,
// 			0.7687
// 		],
// 		[
// 			1372550400000,
// 			0.7687
// 		],
// 		[
// 			1372636800000,
// 			0.7654
// 		],
// 		[
// 			1372723200000,
// 			0.7705
// 		],
// 		[
// 			1372809600000,
// 			0.7687
// 		],
// 		[
// 			1372896000000,
// 			0.7744
// 		],
// 		[
// 			1372982400000,
// 			0.7793
// 		],
// 		[
// 			1373155200000,
// 			0.7804
// 		],
// 		[
// 			1373241600000,
// 			0.777
// 		],
// 		[
// 			1373328000000,
// 			0.7824
// 		],
// 		[
// 			1373414400000,
// 			0.7705
// 		],
// 		[
// 			1373500800000,
// 			0.7635
// 		],
// 		[
// 			1373587200000,
// 			0.7652
// 		],
// 		[
// 			1373760000000,
// 			0.7656
// 		],
// 		[
// 			1373846400000,
// 			0.7655
// 		],
// 		[
// 			1373932800000,
// 			0.7598
// 		],
// 		[
// 			1374019200000,
// 			0.7619
// 		],
// 		[
// 			1374105600000,
// 			0.7628
// 		],
// 		[
// 			1374192000000,
// 			0.7609
// 		],
// 		[
// 			1374364800000,
// 			0.7599
// 		],
// 		[
// 			1374451200000,
// 			0.7584
// 		],
// 		[
// 			1374537600000,
// 			0.7562
// 		],
// 		[
// 			1374624000000,
// 			0.7575
// 		],
// 		[
// 			1374710400000,
// 			0.7531
// 		],
// 		[
// 			1374796800000,
// 			0.753
// 		],
// 		[
// 			1374969600000,
// 			0.7526
// 		],
// 		[
// 			1375056000000,
// 			0.754
// 		],
// 		[
// 			1375142400000,
// 			0.754
// 		],
// 		[
// 			1375228800000,
// 			0.7518
// 		]
// 	];
// 	Highcharts.chart('container', {
// 		chart: {
// 			zoomType: 'x',
// 			backgroundColor: '#292E46',
// 			plotBorderColor: '#30354E',
// 			plotBorderWidth: 1,
// 			plotBackgroundImage: 'images/cbsnew/总功率.png'
// 		},
// 		credits: {
// 			enabled: false
// 		},
// 		title: {
// 			text: ''
// 		},
// 		xAxis: {
// 			type: 'datetime',
// 			dateTimeLabelFormats: {
// 				millisecond: '%H:%M:%S.%L',
// 				second: '%H:%M:%S',
// 				minute: '%H:%M',
// 				hour: '%H:%M',
// 				day: '%m-%d',
// 				week: '%m-%d',
// 				month: '%Y-%m',
// 				year: '%Y'
// 			},
// 			visible: false
// 		},
// 		tooltip: {
// 			dateTimeLabelFormats: {
// 				millisecond: '%H:%M:%S.%L',
// 				second: '%H:%M:%S',
// 				minute: '%H:%M',
// 				hour: '%H:%M',
// 				day: '%Y-%m-%d',
// 				week: '%m-%d',
// 				month: '%Y-%m',
// 				year: '%Y'
// 			}
// 		},
// 		yAxis: {
// 			title: {
// 				text: ''
// 			},
// 			gridLineWidth: 0
// 		},
// 		legend: {
// 			enabled: false
// 		},
// 		plotOptions: {
// 			area: {
// 				fillColor: {
// 					linearGradient: {
// 						x1: 0,
// 						y1: 0,
// 						x2: 0,
// 						y2: 1
// 					},
// 					stops: [
// 						[0, Highcharts.getOptions().colors[0]],
// 						[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
// 					]
// 				},
// 				marker: {
// 					radius: 2
// 				},
// 				lineWidth: 1,
// 				states: {
// 					hover: {
// 						lineWidth: 1
// 					}
// 				},
// 				threshold: null
// 			}
// 		},
// 		series: [{
// 			type: 'area',
// 			name: '总功率',
// 			data: data
// 		}]
// 	}, function(chart) { // on complete
// 		var min = 100000,
// 			max = 0,
// 			pointsToShow = [0, 0],
// 			points = chart.series[0].points;
// 		Highcharts.each(points, function(p) {
// 			if (p.y > max) {
// 				pointsToShow[0] = p.index;
// 				max = p.y;
// 			}
// 			if (p.y < min) {
// 				pointsToShow[1] = p.index;
// 				min = p.y;
// 			}
// 		});
// 		render(chart, points[pointsToShow[0]], '<br><span style="color:#B5A6B2">最大值</span>');
// 		render(chart, points[pointsToShow[1]], '<br><span style="color:#B5A6B2">最小值</span>');
// 	});

// 	function render(chart, point, text) {
// 		chart.renderer.label(point.y + 'kw' + text, point.plotX + chart.plotLeft - 20, point.plotY + chart.plotTop - 45, 'callout', point.plotX + chart.plotLeft, point.plotY + chart.plotTop)
// 			.css({
// 				color: '#F1F2F3',
// 				align: 'center',
// 			})
// 			.attr({
// 				// fill: 'rgba(0, 0, 0, 0.75)',
// 				// padding: 8,
// 				// r: 5,
// 				zIndex: 6
// 			})
// 			.add();
// 	}
// });


