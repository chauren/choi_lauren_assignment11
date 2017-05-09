/*global $, jQuery*/

$(function () {
    "use strict";
    $.ajax({
        type: "get",
        url: "/Part2/data/json.js",
        beforeSend: function () {
            $("#search-employees").html("Loading...");
        },
        timeout: 10000,
        error: function (xhr, status, error) {
            window.alert("Error: " + xhr.status + " - " + error);
        },
        dataType: "json",
        success: function (response) {
            $("#search-employees").html("");
            $.each(response, function () {
                var dataSet = response.teammembers, dataSetLength = response.teammembers.length;
                $.each(this, function (key, value) {

                    var i, countReports = 0;
                    for (i = 0; i < dataSetLength; i += 1) {
                        if (value.id === dataSet[i].reportsTo) {
                            countReports += 1;
                        }
                    }
                    $("#search-employees").append("<li class=\"ui-screen-hidden\"><a href=\"#employee-details\"><img src=\"" + value.imagePath + "\">" + "<h2>" + value.name + "</h2>" + "<p>" + value.title + "</p>" + "<span class=\"ui-li-count\">" + countReports + "</span>" + "</a></li>");
 
                });
            });
        }
    });
    
});