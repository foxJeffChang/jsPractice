var nowId = "R1C0";
var rowNum = 1;
var columnNum = 0;
var todayId = "";
var nowYearMonth;
var today = new Date();
var isFirstDrawDiv = 0;
var preMonthCountDay;
var preDateNum = 0;
var isFinishPreFillUp = 0;
var gridNum = 0;

$(function () {
    BindButtons();
    SetCalendar(new Date());
    SetArrowKeys();
});

function BindButtons() {

    $("#R0C0").css("background-color", "red");
    $('#preYear').bind("click", function () {
        SetCalendar(new Date(GetYearMonthStr(nowYearMonth, "YY", -1)));
    });
    $('#preMonth').bind("click", function () {
        SetCalendar(new Date(GetYearMonthStr(nowYearMonth, "MM", 0)));
    });
    $('#nextMonth').bind("click", function () {

        SetCalendar(new Date(GetYearMonthStr(nowYearMonth, "MM", 2)));
    });
    $('#nextYear').bind("click", function () {
        SetCalendar(new Date(GetYearMonthStr(nowYearMonth, "YY", 1)));
    });
    $('#todayMonth').bind("click", function () {
        SetCalendar(new Date());
    });

}

function SetArrowKeys() {
    $(this).keydown(function (e) {
        switch (e.keyCode) {
            case 38:
                SetColor("up");
                break;
            case 40:
                SetColor("down");
                break;
            case 37:
                SetColor("left");
                break;
            case 39:
                SetColor("right");
                break;
        }
    })
}

function GetYearMonthStr(_date, _yearOrMonth, _num, _day = 1) {

    switch (_yearOrMonth) {
        case "YY":
            return (_date.getFullYear() + _num) + "/" + (_date.getMonth() + 1) + "/" + _day
        case "MM":
            if ((_date.getMonth() + _num) > 12) {
                return _date.getFullYear() + Math.floor((_date.getMonth() + _num) / 12) + "/" + ((_date.getMonth() + _num) % 12) + "/" + _day
            }
            else if ((_date.getMonth() + _num) < 1) {
                return _date.getFullYear() - Math.ceil((Math.abs(_num) - _date.getMonth() + 1) / 12) + "/" + ((_date.getMonth() - Math.abs(_num)) % 12 + 12) + "/" + _day
            }
            else {
                return _date.getFullYear() + "/" + (_date.getMonth() + _num) + "/" + _day
            }
        default:
            break;
    }

}

function SetColor(_type) {
    $("#" + nowId).css("background-color", "white");
    switch (_type) {
        case "up":
            rowNum - 1 < 1 ? rowNum = 1 : rowNum -= 1;
            break;
        case "down":
            rowNum + 1 > 6 ? rowNum = 6 : rowNum += 1;
            break;
        case "left":
            columnNum - 1 < 0 ? columnNum = 0 : columnNum -= 1;
            break;
        case "right":
            columnNum + 1 > 6 ? columnNum = 6 : columnNum += 1;
            break;
    }
    nowId = "R" + rowNum + "C" + columnNum;
    if (GetYearMonthStr(nowYearMonth, "MM", 1) == GetYearMonthStr(today, "MM", 1)) {
        $('#' + todayId).css("background-color", "green");
    }
    $("#" + nowId).css("background-color", "red");
};

function FillUpPreMonthDate(_preNeedFillDateNum, _preMonthCountDay) {
    for (let k = 0; k <= _preNeedFillDateNum; k++) {
        $("#R1C" + k).text(_preMonthCountDay - _preNeedFillDateNum + k + 1).css("color", "grey").css("text-align", "center").css("background-color", "white");

    }
    isFinishPreFillUp = 1;
}

function SetCalendar(_setDate) {
    nowYearMonth = _setDate;
    isFinishPreFillUp = 0;
    gridNum = 0;
    preMonthCountDay = new Date(nowYearMonth.getFullYear(), nowYearMonth.getMonth(), 0).getDate();
    let _monthCountDay = new Date(nowYearMonth.getFullYear(), nowYearMonth.getMonth() + 1, 0).getDate();
    let _firstDayOfMonth = new Date(GetYearMonthStr(nowYearMonth, "MM", 1)).getDay()
    let _gridStartNum = 0;
    let _dateNum = 1;
    let _preNeedFillDateCount = 0;
    let _nextNeedFillDateCount = 0;
    $('#CaptionYear').text(nowYearMonth.getFullYear() + "/" + (nowYearMonth.getMonth() + 1));
    for (let i = 1; i <= 6; i++) {
        isFirstDrawDiv == 0 ? $('#csstable').last().append("<div  class='csstr'></div>") : null;
        for (let j = 0; j <= 6; j++) {
            isFirstDrawDiv == 0 ? $('#csstable .csstr').last().append("<div class='csstd' id='R" + i + "C" + j + "' ></div>") : null;
            if (i == 1 && j == _firstDayOfMonth && isFinishPreFillUp == 0) {
                _gridStartNum = j * i;
                FillUpPreMonthDate(_preNeedFillDateCount, preMonthCountDay);
            }
            if (isFinishPreFillUp != 1) {
                _preNeedFillDateCount++;
            }
            if (_dateNum <= _monthCountDay) {

                if (i == 1 && _preNeedFillDateCount - gridNum == 0) {
                    _dateNum = 1;
                }
                //first day is sunday
                if (gridNum == 0 && _preNeedFillDateCount == 0) {
                    FillUpPreMonthDate(7, preMonthCountDay);
                    _dateNum = 0;
                    i++;
                    j--;
                }
                else {
                    $("#R" + i + "C" + j).text(_dateNum).css("text-align", "center").css("background-color", "white").css("color", "black");
                }
                _dateNum++;
                gridNum++;
            }
            else {
                _nextNeedFillDateCount++
                //fill Up Next Month Date
                $("#R" + i + "C" + j).text(_nextNeedFillDateCount).css("color", "grey").css("text-align", "center");
            }
            if (
                GetYearMonthStr(nowYearMonth, "MM", 1, (_dateNum - 1)) == GetYearMonthStr(today, "MM", 1, today.getDate())) {
                $("#R" + i + "C" + j).css("background-color", "green");
                todayId = "R" + i + "C" + j;
            }
            _gridStartNum == 7 ? _gridStartNum = i * 7 : null;
        }
    }
    isFirstDrawDiv = 1;
    $("#" + nowId).css("background-color", "red");
};