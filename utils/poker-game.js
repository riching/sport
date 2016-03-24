/**
 * Created by riching on 16/3/22.
 */

var POKER_MIN = 5;
var POKER_MAX = 52;
var POKER_DEFAULT = 20;

var REM_TIME_MIN = 5;
var REM_TIME_MAX = 100;
var REMBER_TIMEOUT_DEFAULT = 40;//最长记忆时间100秒
var remeber_timeout = REMBER_TIMEOUT_DEFAULT;//需要的记忆时间（秒）

var poker_number = POKER_DEFAULT; //需要记忆的扑克牌数量


var sel_pokers = new Array(); //随机选择的扑克牌集合
var sel_pokers_images = new Array();
var show_sel_pokers = new Array();

var canMem = false;
var remeber_index = 0;

var canvas;
var ctx;
var drawing = false;
var time_out = false;
var timer_id = 0;

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = canvas.parentNode.clientWidth - 400;
    ctx = canvas.getContext("2d");
    $('.rem_op').hide();
    $('.check_op').hide();
    $('.show-poker-row').hide();

    var poker_num = localStorage.getItem('poker_num');
    if (poker_num) {
        $("#poker_num").val(poker_num);
        poker_number=poker_num;
    }

    var rem_timeout = localStorage.getItem('rem_timeout');
    if (rem_timeout) {
        $('#remeber_timeout').val(rem_timeout);
        remeber_timeout = rem_timeout;
    }
}

function checkPokerNumber() {
    poker_number = $("#poker_num").val();
    if (poker_number < POKER_MIN || poker_number > POKER_MAX || Math.floor(poker_number) != poker_number) {
        alert("扑克牌数量必须在5-52之间的整数");
        $("#poker_num").val(POKER_DEFAULT);
        poker_number = POKER_DEFAULT;
        return false;
    }
    localStorage.setItem('poker_num', poker_number);
    return true;
}

function checkSelTime() {
    remeber_timeout = $("#remeber_timeout").val();
    if (remeber_timeout < REM_TIME_MIN || remeber_timeout > REM_TIME_MAX || Math.floor(remeber_timeout) != remeber_timeout) {
        alert("扑克牌数量必须在5-100之间的整数");
        $("#remeber_timeout").val(REMBER_TIMEOUT_DEFAULT);
        remeber_timeout = REMBER_TIMEOUT_DEFAULT;
        return false;
    }
    localStorage.setItem('rem_timeout', remeber_timeout);
    return true;
}

function randomSelPoker() {

    sel_pokers = new Array(); //随机选择的扑克牌集合
    sel_pokers_images = new Array();
    canMem = false;
    remeber_index = 0;

    var pokers = new Array();
    for (var index = 1; index < 53; index++) {
        pokers.push(index);
    }
    for (var index = 0; index < poker_number; index++) {
        var poker_index = Math.floor(Math.random() * (pokers.length));
        var poker = pokers.splice(poker_index, 1);
        sel_pokers.push(poker.pop());
    }
    canMem = true;
    $('.sel_op').hide();
    $('.rem_op').show();
}


function remeberPoker() {
    if (!canMem || remeber_index > 0) {
        return;
    }

    $(document).keydown(function (event) {
        if (event.keyCode == 40) {
            drawNextSelPoker(ctx);
        }
    });

    $('#next_poker').click(function () {
        drawNextSelPoker(ctx);
    });


    //   setTimeout("finishRemember()", remeber_timeout * 1000);
    timer_id = setInterval("showLeftTime()", 1000);

    drawNextSelPoker(ctx);


    //for (var i = 0; i < sel_pokers.length; i++) {
    //    var poker_image = new Image();
    //    sel_pokers_images[i] = poker_image;
    //    poker_image.onload = drawCanvasImage(ctx, i, 100 + (i % 5) * 110, Math.floor(i / 5) * 160);
    //    poker_image.src = "img/pokers/veryhuo.com_pkp_" + sel_pokers[i] + ".jpg";
    //}
}

function drawNextSelPoker(ctx) {
    if (!canMem || drawing) {
        return;
    }
    if (time_out || remeber_index >= poker_number) {
        finishRemember();
        return;
    }
    drawing = true;
    var poker_image = new Image();
    sel_pokers_images[remeber_index] = poker_image;
    poker_image.onload = drawCanvasImage(ctx, remeber_index, canvas.width / 2 - 50, 100);
    poker_image.src = "img/pokers/veryhuo.com_pkp_" + sel_pokers[remeber_index] + ".jpg";
    remeber_index++;
}


var drawCanvasImage = function (ctx, img_index, x, y) {
    return function () {
        ctx.drawImage(sel_pokers_images[img_index], x, y);
        drawing = false;
    }
}
/**
 * 显示计时器
 * @type {number}
 */
var cost = 0;
function showLeftTime() {
    cost++;
    if (cost > remeber_timeout) {
        finishRemember();
        return;
    }
    ctx.clearRect(canvas.width - 100, 0, 100, 30);
    ctx.fillText("剩余时间：" + (remeber_timeout - cost), canvas.width - 100, 30);
}
/**
 * 完成记忆：浏览完扑克牌的顺序 或者 超时，执行该方法
 */
function finishRemember() {
    clearInterval(timer_id);
    time_out = true;
    $('#next_poker').unbind('click');
    $(document).unbind('keydown');
    $('#canvas').hide();
    $('.check_op').show();
    $('.rem_op').hide();
    $('.show-poker-row').show();

    //show_sel_pokers
    for (var i = 0; i < sel_pokers.length; i++) {
        show_sel_pokers[i] = sel_pokers[i];
    }
    show_sel_pokers.sort();

    showAllSelPoker();

    return;
}
/**
 * 记忆过程完成之后，显示已选择的扑克牌的乱序
 */
function showAllSelPoker() {
    for (var i = 0; i < show_sel_pokers.length; i++) {
        var element_id = 'poker_' + show_sel_pokers[i];
        var element_src = "img/pokers/veryhuo.com_pkp_" + show_sel_pokers[i] + ".jpg";
        $('.pokers').append('<li id=' + element_id + '><img class="img-thumbnail" src="' + element_src + '" </li>');
    }
    $('.sortable').sortable();
}

function checkResult() {
    var result = new Array();
    $('.pokers li').each(function (index, element) {
        result.push(element.id.substr(6));
    });
    var cmp_result = true;
    for (var i = 0; i < result.length; i++) {
        if (result[i] != sel_pokers[i]) {
            cmp_result = false;
            break;
        }
    }
    if (cmp_result) {
        alert("恭喜！挑战成功，顺序正确，用" + remeber_timeout + "秒记住了" + poker_number + "张扑克牌的顺序");
    } else {
        alert("Sry，挑战失败，顺序不对，请刷新页面重试");
        window.location.reload(true);
    }

}
