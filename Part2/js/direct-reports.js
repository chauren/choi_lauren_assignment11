/*global $, jQuery */
$(function () {
    "use strict";
    $("#click-reports").on("click", function () {
        var managerName = $("#employee-name").html();
        $.getJSON("/Part2/data/json.js", function (data) {
            var i, j, k, l, managerId, listSubs = [], countReports2 = 0;
            for (i = 0; i < data.teammembers.length; i += 1) {
                if (data.teammembers[i].name === managerName) {
                    managerId = data.teammembers[i].id;
                }
            }
            for (j = 0; j < data.teammembers.length; j += 1) {
                if (managerId === data.teammembers[j].reportsTo) {
                    listSubs.push(data.teammembers[j]);
                }
            }
            $("#direct-reports-results").html("");
            for (k = 0; k < listSubs.length; k += 1) {
                $("#direct-reports-results").append("<li class='ui-li-has-count ui-li-has-thumb'><a href=\"#employee-details\" class='ui-btn ui-btn-icon-right ui-icon-carat-r'><img src=\"" + listSubs[k].imagePath + "\">" + "<h2>" + listSubs[k].name + "</h2>" + "<p>" + listSubs[k].title + "</p>" + "</a></li>");
            }
        });
    });
    
    $("#direct-reports-results").on("click", "a.ui-icon-carat-r", function () {
        var strName = $(this).find("h2").text();
        
        $.getJSON("/Part2/data/json.js", function (data) {
            var i;
            for (i = 0; i < data.teammembers.length; i += 1) {
                if (data.teammembers[i].name === strName) {
                    $("#employee-card").html("");
                    $("#call-office").html("");
                    $("#call-cell").html("");
                    $("#email").html("");
                    $("#employee-card").append("<img src=\"" + data.teammembers[i].imagePath + "\">" + "<h2 id='employee-name'>" + data.teammembers[i].name + "</h2>" + "<p>" + data.teammembers[i].title + "</p>");
                    $("#call-office").append("<p>" + data.teammembers[i].officeNumber + "</p>");
                    $("#call-cell").append("<p>" + data.teammembers[i].cellNumber + "</p>");
                    $("#email").append("<p>" + data.teammembers[i].email + "</p>");
                    var strManager = data.teammembers[i].reportsTo, j, reportCount = 0, k;
                    for (j = 0; j < data.teammembers.length; j += 1) {
                        if (strManager === data.teammembers[j].id) {
                            $("#view-manager").html("");
                            $("#view-manager").append(data.teammembers[j].name);
                        }
                        if (strManager === "") {
                            $("#view-manager").html("");
                        }
                    }
                    for (k = 0; k < data.teammembers.length; k += 1) {
                        if (data.teammembers[k].reportsTo === data.teammembers[i].id) {
                            reportCount += 1;
                        }
                    }
                    $("#view-reports").html("");
                    $("#view-reports").append(reportCount);
                }
            }
        });

    });
});