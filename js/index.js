$(function() {
    var activeFilter = null;

    function goToByScroll(id){
        $('html,body').animate({scrollTop: $('#' + id).offset().top},'fast');
    }

    $('.menu__item').click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        goToByScroll($(e.target).data('anchor'));
    });

    $('.filters__item').click(function(e) {
        activeFilter = $(e.target).data('filter');

        var items = $('.project__item'),
            itemsDel = [];

        items.removeClass('hidden');

        if (activeFilter) {
            for (var i = 0; i<= items.length; i++) {
                if ($(items[i]).data('tag') != activeFilter) {
                    itemsDel.push(items[i]);
                }
            }

            for (var i = 0; i<= itemsDel.length; i++) {
                $(itemsDel[i]).addClass('hidden');
            }
        }

        $('.filters__item').removeClass('filters__item_active');

        $(e.target).addClass('filters__item_active');


    });

    $('.twitter').click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        var width  = 575,
            height = 400,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = this.href +
                '?hashtags='+$(e.target).parent().data('hashtags') +
                '&text='   + $(e.target).parent().data('text') +
                '&url='     + $(e.target).parent().data('url')
            ,
            opts   = 'status=1' +
                ',width='  + width  +
                ',height=' + height +
                ',top='    + top    +
                ',left='   + left;


        window.open(url, 'Twitter', opts);

    });

    $('.google').click(function(e){
        e.stopImmediatePropagation();
        e.preventDefault();

        var width  = 480,
            height = 380,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            opts   = 'status=1' +
            ',width='  + width  +
            ',height=' + height +
            ',top='    + top    +
            ',left='   + left;

        window.open('https://plus.google.com/share?url=' + $(e.target).parent().data('url') +
            '&title=' + $(e.target).parent().data('url'), 'Google+',opts);
    });


    var animateThread = null,
        flask = $('#flask');

    flask.on('mouseenter', function(e) {
        var target = $(e.target);



        target.addClass('wobble');

        if (animateThread) {
            clearTimeout(animateThread);
        }

        animateThread = setTimeout(function() {
            target.removeClass('wobble');
            clearTimeout(animateThread);
        }, 1000);


    });

    /*flask.on('mouseleave', function(e) {
        var target = $(e.target);

        target.removeClass('wobble');

        if (animateThread) {
            clearTimeout(animateThread);
        }
    });*/

    setInterval(function() {
        $('#flask').addClass('bounce');

        if (animateThread) {
            clearTimeout(animateThread);
        }

        animateThread = setTimeout(function() {
            $('#flask').removeClass('bounce');
            clearTimeout(animateThread);
        }, 1000);
    }, 60000);


});