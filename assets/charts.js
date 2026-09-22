/* Chart initialization for career-report */
(function () {
  function getVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  var chartSeries1 = getVar('--chart-series-1') || '#0969DA';
  var chartSeries2 = getVar('--chart-series-2') || '#8250DF';
  var chartSeries3 = getVar('--chart-series-3') || '#06B6D4';
  var chartSeries4 = getVar('--chart-series-4') || '#BF3989';
  var chartGrid = getVar('--chart-grid') || 'rgba(27,31,36,0.10)';
  var chartAxis = getVar('--chart-axis') || '#6B7280';
  var chartLabel = getVar('--chart-label') || '#6B7280';
  var chartTooltipBg = getVar('--chart-tooltip-bg') || '#FFFFFF';

  function initChart(id, option) {
    var el = document.getElementById(id);
    if (!el || typeof echarts === 'undefined') return null;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption(option);
    return chart;
  }

  var charts = [];

  function initAll() {
    /* Chart 1: Industry growth rates bar chart */
    var growthChart = initChart('chart-growth', {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: chartTooltipBg,
        borderColor: getVar('--page-border') || '#D1D9E0',
        textStyle: { color: getVar('--page-text') || '#1B1F24', fontSize: 13 },
        formatter: function (params) {
          var s = params[0].name + '<br/>';
          params.forEach(function (p) {
            s += p.marker + ' ' + p.seriesName + ': ' + p.value + '%<br/>';
          });
          return s;
        }
      },
      grid: { left: '3%', right: '5%', bottom: '3%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['5G基础设施', '5G网络安全', 'SDN', '通讯网络安全'],
        axisLine: { lineStyle: { color: chartGrid } },
        axisLabel: { color: chartLabel, fontSize: 12 },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '同比增长率 (%)',
        nameTextStyle: { color: chartAxis, fontSize: 12 },
        axisLabel: { color: chartLabel, fontSize: 12, formatter: '{value}%' },
        splitLine: { lineStyle: { color: chartGrid } },
        axisLine: { show: false }
      },
      series: [{
        name: '同比增长率',
        type: 'bar',
        data: [
          { value: 34.7, itemStyle: { color: chartSeries1 } },
          { value: 31, itemStyle: { color: chartSeries2 } },
          { value: 21.7, itemStyle: { color: chartSeries3 } },
          { value: 15.0, itemStyle: { color: chartSeries4 } }
        ],
        barWidth: '45%',
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: {
          show: true,
          position: 'top',
          color: chartLabel,
          fontSize: 12,
          formatter: '{c}%'
        }
      }],
      animation: false
    });
    if (growthChart) charts.push(growthChart);

    /* Chart 2: Salary comparison grouped bar chart */
    var salaryChart = initChart('chart-salary', {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: chartTooltipBg,
        borderColor: getVar('--page-border') || '#D1D9E0',
        textStyle: { color: getVar('--page-text') || '#1B1F24', fontSize: 13 },
        formatter: function (params) {
          var s = params[0].name + '<br/>';
          params.forEach(function (p) {
            s += p.marker + ' ' + p.seriesName + ': ' + p.value + 'K/月<br/>';
          });
          return s;
        }
      },
      legend: {
        data: ['入门薪资', '进阶薪资'],
        top: 5,
        textStyle: { color: chartLabel, fontSize: 12 }
      },
      grid: { left: '3%', right: '5%', bottom: '3%', top: '20%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['数通方向', '网络安全方向', '云网络方向'],
        axisLine: { lineStyle: { color: chartGrid } },
        axisLabel: { color: chartLabel, fontSize: 12 },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '月薪 (K)',
        nameTextStyle: { color: chartAxis, fontSize: 12 },
        axisLabel: { color: chartLabel, fontSize: 12, formatter: '{value}K' },
        splitLine: { lineStyle: { color: chartGrid } },
        axisLine: { show: false }
      },
      series: [
        {
          name: '入门薪资',
          type: 'bar',
          data: [6, 8, 7],
          barWidth: '25%',
          itemStyle: { color: chartSeries1, borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: chartLabel, fontSize: 11, formatter: '{c}K' }
        },
        {
          name: '进阶薪资',
          type: 'bar',
          data: [12, 20, 17],
          barWidth: '25%',
          itemStyle: { color: chartSeries2, borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: chartLabel, fontSize: 11, formatter: '{c}K' }
        }
      ],
      animation: false
    });
    if (salaryChart) charts.push(salaryChart);
  }

  function handleResize() {
    charts.forEach(function (c) { c.resize(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.addEventListener('resize', handleResize);
})();
