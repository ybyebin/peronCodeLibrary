/**
 * 分页1
 */
(function($) {
    $.fn.extendPagination = function(options) {
        var defaults = {
            //pageId:'',
            totalCount: '30',
            showPage: '5',
            limit: '10',
            callback: function() {
                return false;
            }
        };
        $.extend(defaults, options || {});
        console.log(JSON.stringify(defaults, null, 2))
        if (defaults.totalCount == '') {
            //alert('总数不能为空!');
            $(this).empty();
            return false;
        } else if (Number(defaults.totalCount) <= 0) {
            //alert('总数要大于0!');
            $(this).empty();
            return false;
        }
        if (defaults.showPage == '') {
            defaults.showPage = '10';
        } else if (Number(defaults.showPage) <= 0) defaults.showPage = '10';
        if (defaults.limit == '') {
            defaults.limit = '5';
        } else if (Number(defaults.limit) <= 0) defaults.limit = '5';
        var totalCount = Number(defaults.totalCount),
            showPage = Number(defaults.showPage),
            limit = Number(defaults.limit),
            totalPage = Math.ceil(totalCount / limit);
        if (totalPage > 0) {
            var html = [];
            html.push(' <ul class="pagination">');
            html.push(' <li class="previous"><a href="#">&laquo;</a></li>');
            html.push('<li class="disabled hidden"><a href="#">...</a></li>');
            if (totalPage <= showPage) {
                for (var i = 1; i <= totalPage; i++) {
                    if (i == 1) html.push(' <li class="active"><a href="#">' + i + '</a></li>');
                    else html.push(' <li><a href="#">' + i + '</a></li>');
                }
            } else {
                for (var j = 1; j <= showPage; j++) {
                    if (j == 1) html.push(' <li class="active"><a href="#">' + j + '</a></li>');
                    else html.push(' <li><a href="#">' + j + '</a></li>');
                }
            }
            html.push('<li class="disabled hidden"><a href="#">...</a></li>');
            html.push('<li class="next"><a href="#">&raquo;</a></li></ul>');
            $(this).html(html.join(''));
            if (totalPage > showPage) $(this).find('ul.pagination li.next').prev().removeClass('hidden');

            var pageObj = $(this).find('ul.pagination'),
                preObj = pageObj.find('li.previous'),
                currentObj = pageObj.find('li').not('.previous,.disabled,.next'),
                nextObj = pageObj.find('li.next');

            function loopPageElement(minPage, maxPage) {
                var tempObj = preObj.next();
                for (var i = minPage; i <= maxPage; i++) {
                    if (minPage == 1 && (preObj.next().attr('class').indexOf('hidden')) < 0)
                        preObj.next().addClass('hidden');
                    else if (minPage > 1 && (preObj.next().attr('class').indexOf('hidden')) > 0)
                        preObj.next().removeClass('hidden');
                    if (maxPage == totalPage && (nextObj.prev().attr('class').indexOf('hidden')) < 0)
                        nextObj.prev().addClass('hidden');
                    else if (maxPage < totalPage && (nextObj.prev().attr('class').indexOf('hidden')) > 0)
                        nextObj.prev().removeClass('hidden');
                    var obj = tempObj.next().find('a');
                    if (!isNaN(obj.html())) obj.html(i);
                    tempObj = tempObj.next();
                }
            }

            function callBack(curr) {
                defaults.callback(curr, defaults.limit, totalCount);
            }

            currentObj.click(function(event) {
                event.preventDefault();
                var currPage = Number($(this).find('a').html()),
                    activeObj = pageObj.find('li[class="active"]'),
                    activePage = Number(activeObj.find('a').html());
                if (currPage == activePage) return false;
                if (totalPage > showPage && currPage > 1) {
                    var maxPage = currPage,
                        minPage = 1;
                    if (($(this).prev().attr('class')) && ($(this).prev().attr('class').indexOf('disabled')) >= 0) {
                        minPage = currPage - 1;
                        maxPage = minPage + showPage - 1;
                        loopPageElement(minPage, maxPage);
                    } else if (($(this).next().attr('class')) && ($(this).next().attr('class').indexOf('disabled')) >= 0) {
                        if (totalPage - currPage >= 1) maxPage = currPage + 1;
                        else maxPage = totalPage;
                        if (maxPage - showPage > 0) minPage = (maxPage - showPage) + 1;
                        loopPageElement(minPage, maxPage)
                    }
                }
                activeObj.removeClass('active');
                $.each(currentObj, function(index, thiz) {
                    if ($(thiz).find('a').html() == currPage) {
                        $(thiz).addClass('active');
                        callBack(currPage);
                    }
                });
            });
            preObj.click(function(event) {
                event.preventDefault();
                var activeObj = pageObj.find('li[class="active"]'),
                    activePage = Number(activeObj.find('a').html());
                if (activePage <= 1) return false;
                if (totalPage > showPage) {
                    var maxPage = activePage,
                        minPage = 1;
                    if ((activeObj.prev().prev().attr('class')) && (activeObj.prev().prev().attr('class').indexOf('disabled')) >= 0) {
                        minPage = activePage - 1;
                        if (minPage > 1) minPage = minPage - 1;
                        maxPage = minPage + showPage - 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                $.each(currentObj, function(index, thiz) {
                    if ($(thiz).find('a').html() == (activePage - 1)) {
                        activeObj.removeClass('active');
                        $(thiz).addClass('active');
                        callBack(activePage - 1);
                    }
                });
            });
            nextObj.click(function(event) {
                event.preventDefault();
                var activeObj = pageObj.find('li[class="active"]'),
                    activePage = Number(activeObj.find('a').html());
                if (activePage >= totalPage) return false;
                if (totalPage > showPage) {
                    var maxPage = activePage,
                        minPage = 1;
                    if ((activeObj.next().next().attr('class')) && (activeObj.next().next().attr('class').indexOf('disabled')) >= 0) {
                        maxPage = activePage + 2;
                        if (maxPage > totalPage) maxPage = totalPage;
                        minPage = maxPage - showPage + 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                $.each(currentObj, function(index, thiz) {
                    if ($(thiz).find('a').html() == (activePage + 1)) {
                        activeObj.removeClass('active');
                        $(thiz).addClass('active');
                        callBack(activePage + 1);
                    }
                });
            });
        }
    };
})(jQuery);

// $('#equipmentStatusPage').extendPagination({
//     totalCount: totalCount,
//     showPage: 10,
//     limit: 10,
//     callback: function(curr, limit, totalCount) {
//         dataMontoring.pageEquipment = curr;
//         console.log(curr)
//         console.log(limit);

//     }
// });



// 分页2
(function($) {
    var ms = {
        init: function(obj, args) {
            return (function() {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function(obj, args) {
            return (function() {

                obj.empty();
                if (args.pageCount === 0) {
                    return false;
                }
                //上一页
                if (args.current > 1) {
                    obj.append('<a href="javascript:;" class="prevPage">«</a>');
                } else {
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled disabled-prve">«</span>');
                }
                //中间页码
                if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
                }
                if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
                    obj.append('<a class="page-omit"><span>...</span></a>');
                }
                var start = args.current - 2,
                    end = args.current + 2;
                if ((start > 1 && args.current < 4) || args.current == 1) {
                    end++;
                }
                if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
                    start--;
                }
                for (; start <= end; start++) {
                    if (start <= args.pageCount && start >= 1) {
                        if (start != args.current) {
                            obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
                        } else {
                            obj.append('<span class="current">' + start + '</span>');
                        }
                    }
                }
                if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
                    obj.append('<a class="page-omit"><span>...</span></a>');
                }
                if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
                    obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
                }
                //下一页
                if (args.current < args.pageCount) {
                    obj.append('<a href="javascript:;" class="nextPage">»</a>');
                } else {
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled disabled-next">»</span>');
                }
            })();
        },
        //绑定事件
        bindEvent: function(obj, args) {
            return (function() {
                obj.off("click", "a.tcdNumber");
                obj.off("click", "a.prevPage");
                obj.off("click", "a.nextPage");
                if (args.pageCount === 0) {
                    return false;
                }
                obj.on("click", "a.tcdNumber", function() {
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj, {
                        "current": current,
                        "pageCount": args.pageCount
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click", "a.prevPage", function() {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, {
                        "current": current - 1,
                        "pageCount": args.pageCount
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function() {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, {
                        "current": current + 1,
                        "pageCount": args.pageCount
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });

            })();
        }
    }
    $.fn.createPage = function(options) {
        var args = $.extend({
            pageCount: 10,
            current: 1,
            backFn: function() {}
        }, options);
        ms.init(this, args);
    }
})(jQuery);




angular.module('main', []).factory('bayaxService', function() {
    return {
         upData:function(){
            
         } 
    }
}) 