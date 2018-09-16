var nowid = "R1C0";
var rnum = 1;
var cnum = 0;
var todayid = "";
var nowYearMonth;
var today = new Date();
var firstDrawDiv = 0;
var preMonthCountDay;
var preDateNum = 0;
var isFinishPreFillup = 0;
var grid = 0;
$(function () {
    setCalendar(new Date());
    $("#R0C0").css("background-color", "red");
    $('#preYear').bind("click", function () {
        setCalendar(new Date((nowYearMonth.getFullYear() - 1) + "/" + (nowYearMonth.getMonth() + 1) + "/1"));
    });
    $('#preMonth').bind("click", function () {
        nowYearMonth.getMonth() == 0 ? setCalendar(new Date((nowYearMonth.getFullYear() - 1) + "/12/1")) : setCalendar(new Date(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1 - 1) + "/1"));
    });
    $('#nextMonth').bind("click", function () {
        nowYearMonth.getMonth() == 11 ? setCalendar(new Date((nowYearMonth.getFullYear() + 1) + "/1/1")) : setCalendar(new Date(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1 + 1) + "/1"));
    });
    $('#nextYear').bind("click", function () {
        setCalendar(new Date((nowYearMonth.getFullYear() + 1) + "/" + (nowYearMonth.getMonth() + 1) + "/1"));
    });
    $('#todayMonth').bind("click", function () {
        setCalendar(new Date());
    });
    $(window).keydown(function (event) {
        switch (event.keyCode) {
            case 38:
                setColor("up");
                break;
            case 40:
                setColor("down");
                break;
            case 37:
                setColor("left");
                break;
            case 39:
                setColor("right");
                break;
        }
    });
});

function setColor(type) {
    $("#" + nowid).css("background-color", "white");
    switch (type) {
        case "up":
            rnum - 1 < 1 ? rnum = 1 : rnum -= 1;
            break;
        case "down":
            rnum + 1 > 6 ? rnum = 6 : rnum += 1;
            break;
        case "left":
            cnum - 1 < 0 ? cnum = 0 : cnum -= 1;
            break;
        case "right":
            cnum + 1 > 6 ? cnum = 6 : cnum += 1;
            break;
    }
    nowid = "R" + rnum + "C" + cnum;
    if (nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1) + "/1" == today.getFullYear() + "/" + (today.getMonth() + 1) + "/1") {
        $('#' + todayid).css("background-color", "green");
    }
    $("#" + nowid).css("background-color", "red");
};

function fillUpPreMonthDate(preNeedFillDateNum, preMonthCountDay) {
    for (let k = 0; k <= preNeedFillDateNum; k++) {
        $("#R1C" + k).text(preMonthCountDay - preNeedFillDateNum + k + 1).css("color", "grey").css("text-align", "center").css("background-color", "white");

    }
    isFinishPreFillup = 1;
}

function setCalendar(setDate) {
    nowYearMonth = setDate;
    isFinishPreFillup = 0;
    grid = 0;
    preMonthCountDay = new Date(nowYearMonth.getFullYear(), nowYearMonth.getMonth(), 0).getDate();
    var MonthCountDay = new Date(nowYearMonth.getFullYear(), nowYearMonth.getMonth() + 1, 0).getDate();
    var FirstDayWeek = new Date(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1) + "/1").getDay()
    var flagStart = 0;
    var datenum = 1;
    var preNeedFillDateNum = 0;
    var nextNeedFillDateNum = 0;
    $('#CaptionYear').text(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1));
    for (let i = 1; i <= 6; i++) {
        firstDrawDiv == 0 ? $('#csstable').last().append("<div  class='csstr'></div>") : null;
        for (let j = 0; j <= 6; j++) {
            firstDrawDiv == 0 ? $('#csstable .csstr').last().append("<div class='csstd' id='R" + i + "C" + j + "' ></div>") : null;
            if (i == 1 && j == FirstDayWeek && isFinishPreFillup == 0) {
                flagStart = j * i;
                fillUpPreMonthDate(preNeedFillDateNum, preMonthCountDay);
            }
            if (isFinishPreFillup != 1) {
                preNeedFillDateNum++;
            }
            if (datenum <= MonthCountDay) {

                if (i == 1 && preNeedFillDateNum - grid == 0) {
                    datenum = 1;
                }
                //first day is sunday
                if (grid == 0 && preNeedFillDateNum == 0) {
                    fillUpPreMonthDate(7, preMonthCountDay);
                    datenum = 0;
                    i++;
                    j--;
                }
                else {
                    $("#R" + i + "C" + j).text(datenum).css("text-align", "center").css("background-color", "white").css("color", "black");
                }
                datenum++;
                grid++;
            }
            else {
                nextNeedFillDateNum++
                //fill Up Next Month Date
                $("#R" + i + "C" + j).text(nextNeedFillDateNum).css("color", "grey").css("text-align", "center");
            }
            if (nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1) + "/" + (datenum - 1) == today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()) {
                $("#R" + i + "C" + j).css("background-color", "green");
                todayid = "R" + i + "C" + j;
            }
            flagStart == 7 ? flagStart = i * 7 : null;
        }
    }
    firstDrawDiv = 1;
    $("#" + nowid).css("background-color", "red");
};