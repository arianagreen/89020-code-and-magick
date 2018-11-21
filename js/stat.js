'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_ROUND = 20;
var CLOUD_GAP = 10;
var INNER_GAP = 20;
var FONT_GAP = 20;
var BAR_CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_LEGEND_HEIGHT = 25;
var barMaxHeigth = BAR_CHART_HEIGHT - BAR_LEGEND_HEIGHT;
var barChartBottomline = CLOUD_Y + CLOUD_HEIGHT - INNER_GAP;
var barChartTopline = CLOUD_Y + CLOUD_HEIGHT - INNER_GAP - BAR_CHART_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + CLOUD_ROUND, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_ROUND, y);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + CLOUD_ROUND);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_ROUND);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - CLOUD_ROUND, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_ROUND, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - CLOUD_ROUND);
  ctx.lineTo(x, y + CLOUD_ROUND);
  ctx.quadraticCurveTo(x, y, x + CLOUD_ROUND, y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = 0;

  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }

  return maxElement;
};

var getRandom = function (min, max) { // включая min, не включая max
  return Math.random() * (max - min) + min;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px, PT Mono';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP + FONT_GAP);

  ctx.textBaseline = 'bottom';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = times[i] * barMaxHeigth / maxTime;
    var barX = CLOUD_X + INNER_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = barChartTopline + barMaxHeigth - barHeight;

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), barX, barY - FONT_GAP / 4);
    ctx.fillText(players[i], barX, barChartBottomline);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandom(0.01, 1) + ')';
    }

    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  }
};
