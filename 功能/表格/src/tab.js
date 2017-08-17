  
  $(function(){
    fixTabHead('content','ff')
        // var right_div2 = document.getElementById("content");
        // right_div2.onscroll  =function(){


        //      var id = '#' + this.id;
        //     var scrollTop = $(id).scrollTop() || $(id).get(0).scrollTop,
        //         style = {
        //             'position': 'absolute',
        //             'left': '0',
        //             'right': '0',
        //             'top':'0'
        //         };
        //     var th_width = [];

        //     $(id + ' .scrollTable th').each(function() {
        //         th_width.push(this.offsetWidth);
        //     });
        //      // $(id + ' .fixTable').css(style);
        //      var ids = '#ff';
        //     if ($(ids + ' .fixTable') && $(ids + ' .fixTable').length) {
        //         (scrollTop === 0) ? $(ids + ' .fixTable').addClass('hidden') : $(ids + ' .fixTable').removeClass('hidden');
        //         // (scrollTop === 0) ? $(id + ' .fixTable').addClass('hidden') : $(id + ' .fixTable').removeClass('hidden');

        //         // $(id + ' .fixTable').find('th').each(function(i) {
        //         //     $(this).css('width', th_width[i] + 'px');  //注释掉这行在火狐下就不会抖动了
        //         // });
               
        //     } else {
        //         var html = $(id + ' .scrollTable thead').get(0).innerHTML;
        //         var table = $('<table class="table fixTable table table-striped table-primary"><thead>' + html + '</thead></table>');
        //         table.find('th').each(function(i) {
        //             $(this).css('width', th_width[i] + 'px');  //注释掉这行在火狐下就不会抖动了
        //         });
        //         table.css(style);
        //         $('#ff').append(table);
        //     }
        // }

    // $('#content').scroll(function() {
    //         var id = '#' + this.id;
    //         var scrollTop = $(id).scrollTop() || $(id).get(0).scrollTop,
    //             style = {
    //                 'position': 'absolute',
    //                 'left': '0',
    //                 'right': '0',
    //                 'top':'0'
    //             };
    //         var th_width = [];
    //         $(id + ' .scrollTable th').each(function() {
    //             th_width.push(this.offsetWidth);
    //         });
    //          // $(id + ' .fixTable').css(style);
    //          var ids = '#ff';
    //         if ($(ids + ' .fixTable') && $(ids + ' .fixTable').length) {
    //             (scrollTop === 0) ? $(ids + ' .fixTable').addClass('hidden') : $(ids + ' .fixTable').removeClass('hidden');
    //             // (scrollTop === 0) ? $(id + ' .fixTable').addClass('hidden') : $(id + ' .fixTable').removeClass('hidden');

    //             // $(id + ' .fixTable').find('th').each(function(i) {
    //             //     $(this).css('width', th_width[i] + 'px');  //注释掉这行在火狐下就不会抖动了
    //             // });
               
    //         } else {
    //             var html = $(id + ' .scrollTable thead').get(0).innerHTML;
    //             var table = $('<table class="table fixTable table table-striped table-primary"><thead>' + html + '</thead></table>');
    //             table.find('th').each(function(i) {
    //                 $(this).css('width', th_width[i] + 'px');  //注释掉这行在火狐下就不会抖动了
    //             });
    //             table.css(style);
    //             $('#ff').append(table);
    //         }
    //     }); 

  })

  function fixTabHead(scrollid,appendid){
        var scroll_div = document.getElementById(scrollid);
        scroll_div.onscroll  =function(){


             var id = '#' + scrollid;
             var ids = '#'+appendid;
            var scrollTop = $(id).scrollTop() || $(id).get(0).scrollTop,
                style = {
                    'position': 'absolute',
                    'left': '0',
                    'right': '0',
                    'top':'0'
                };    
                 var th_width = [];      
                   $(id + ' .scrollTable th').each(function() {
                th_width.push(this.offsetWidth);
            });
            if ($(ids + ' .fixTable') && $(ids + ' .fixTable').length) {
                // (scrollTop === 0) ? $(ids + ' .fixTable').addClass('hidden') : $(ids + ' .fixTable').removeClass('hidden');
                // (scrollTop === 0) ? $(id + ' .fixTable').addClass('hidden') : $(id + ' .fixTable').removeClass('hidden');

                // $(id + ' .fixTable').find('th').each(function(i) {
                //     $(this).css('width', th_width[i] + 'px');  //注释掉这行在火狐下就不会抖动了
                // });
               
            } else {
                var html = $(id + ' .scrollTable thead').get(0).innerHTML;
                var table = $('<table class="table fixTable table table-striped table-primary"><thead>' + html + '</thead></table>');
                table.find('th').each(function(i) {
                    $(this).css('width', th_width[i] + 'px');  //注释掉这行在火狐下就不会抖动了
                });
                table.css(style);
                $(ids).append(table);
            }
        }
  }