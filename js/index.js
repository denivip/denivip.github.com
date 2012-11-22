$(function() {
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