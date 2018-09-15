var nowid = "R1C1";
var rnum = 1;
var cnum = 1;
var todayid = "";
var nowYearMonth;
var today = new Date();
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

            cnum - 1 < 1 ? cnum = 1 : cnum -= 1;
            break;
        case "right":
            cnum + 1 > 7 ? cnum = 7 : cnum += 1;

            break;

    }
    nowid = "R" + rnum + "C" + cnum;

    if ( nowYearMonth.getFullYear()+"/"+(nowYearMonth.getMonth()+1)+"/1" ==  today.getFullYear()+"/"+(today.getMonth()+1)+"/1") {
    $('#' + todayid).css("background-color", "green");
    }
    $("#" + nowid).css("background-color", "red");
};

function setCalendar(setDate) {

    nowYearMonth = setDate;
    var MonthCountDay = new Date(nowYearMonth.getFullYear(), nowYearMonth.getMonth() + 1, 0).getDate();
    var preMonthCountDay = new Date(nowYearMonth.getFullYear(), nowYearMonth.getMonth(), 0).getDate();
    var FirstDayWeek = new Date(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1) + "/1").getDay()
    FirstDayWeek == 0 ? FirstDayWeek = 7 : null;
    var flagStart = 0;
    var datenum = 1;
    
    var preNeedFillDateNum = 0;
    var preDateNum = 0;
    var nextNeedFillDateNum = 0;
    $('#CaptionYear').text(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1));




    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 7; j++) {


            if (i == 1 && j == FirstDayWeek) {

                flagStart = j * i;
                //填滿上月的日期
                for (let k = 1; k <= preNeedFillDateNum; k++) {

                    $("#R1C" + k).text(preMonthCountDay - preNeedFillDateNum + k).css("color", "grey").css("text-align", "center").css("background-color", "white");
                    preDateNum++;
                }

            }
            else {
                preNeedFillDateNum++;
            }

            if (flagStart != 0 && datenum <= MonthCountDay) {
                $("#R" + i + "C" + j).text(datenum).css("text-align", "center").css("background-color", "white").css("color", "black");
                datenum++;

            }
            else {
                nextNeedFillDateNum++
                //填滿下月的日期
                $("#R" + i + "C" + j).text(nextNeedFillDateNum - preDateNum).css("color", "grey").css("text-align", "center");



            }
            if ( nowYearMonth.getFullYear()+"/"+(nowYearMonth.getMonth()+1)+"/"+(datenum-1) ==  today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate()) {

                $("#R" + i + "C" + j).css("background-color", "green");
                todayid = "R" + i + "C" + j;
            }
            flagStart == 7 ? flagStart = i * 7 :null;

        }

    }

    $("#" + nowid).css("background-color", "red");
};


$(function () {

    setCalendar(new Date());
    $("#R1C1").css("background-color", "red");

    $('#preYear').bind("click", function (e) {
        setCalendar(new Date((nowYearMonth.getFullYear() - 1) + "/" + (nowYearMonth.getMonth() + 1) + "/1"));
    });

    $('#preMonth').bind("click", function (e) {
        nowYearMonth.getMonth() == 0 ? setCalendar(new Date((nowYearMonth.getFullYear() - 1) + "/12/1")) : setCalendar(new Date(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1 - 1) + "/1"));
    });
    $('#nextMonth').bind("click", function (e) {
        nowYearMonth.getMonth() == 11 ? setCalendar(new Date((nowYearMonth.getFullYear() + 1) + "/1/1")) : setCalendar(new Date(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1 + 1) + "/1"));
    });
    $('#nextYear').bind("click", function (e) {
        setCalendar(new Date((nowYearMonth.getFullYear() + 1) + "/" + (nowYearMonth.getMonth() + 1) + "/1"));
    });
    $('#todayMonth').bind("click", function (e) {
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
