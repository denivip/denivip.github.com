window.gitPage = {};
gitPage.models = {};
gitPage.views = {};

gitPage.utils = {
    tpl:function (template, data, field) {
        if (field) {
            if (typeof  template == 'string') {
                template = template.replace(new RegExp('{{' + field + '}}', 'g'), data);
            }
        } else {
            if (typeof  template == 'string') {
                for (var field in data) {

                    if (data[field].constructor.name == 'Array') {
                        data[field] = data[field].join(' ');
                    }

                    template = template.replace(new RegExp('{{' + field + '}}', 'g'), data[field]);
                }
            }
        }

        return template;
    }
};

gitPage.config = {
    activeFilter:'all'
};

gitPage.App = function () {
    var FLASK_BOUNCE_TIMEOUT = 60 * 1000;

    var _animateThread = null,
        _flask = null,
        _views = {};

    var _goToByScroll = function (id) {
        $('html,body').animate({scrollTop:$('#' + id).offset().top}, 'fast');
    }

    var _onMenuItemClick = function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        _goToByScroll($(e.target).data('anchor'));
    }


    var _onTwitterClick = function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = this.href +
                '?hashtags=' + $(e.target).parent().data('hashtags') +
                '&text=' + $(e.target).parent().data('text') +
                '&url=' + $(e.target).parent().data('url')
            ,
            opts = 'status=1' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;

        window.open(url, 'Twitter', opts);
    }

    var _onGoogleClick = function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        var width = 480,
            height = 380,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;

        window.open('https://plus.google.com/share?url=' + $(e.target).parent().data('url') +
            '&title=' + $(e.target).parent().data('url'), 'Google+', opts);
    }

    var _wobbleFlask = function (e) {
        var target = $(e.target);

        target.addClass('wobble');

        if (_animateThread) {
            clearTimeout(_animateThread);
        }

        _animateThread = setTimeout(function () {
            target.removeClass('wobble');
            clearTimeout(_animateThread);
        }, 1000);
    }

    var _delegateEvents = function () {
        $('.menu__item').click(_onMenuItemClick);
        //$('.filters__item').click(_onFilterCheck);
        $('.twitter').click(_onTwitterClick);
        $('.google').click(_onGoogleClick);

        _flask.on('mouseenter', _wobbleFlask);
    }

    var _startFlaskBounce = function () {
        setInterval(function () {
            _flask.addClass('bounce');

            if (_animateThread) {
                clearTimeout(_animateThread);
            }

            _animateThread = setTimeout(function () {
                _flask.removeClass('bounce');
                clearTimeout(_animateThread);
            }, 1000);
        }, FLASK_BOUNCE_TIMEOUT);
    }


    this.initialize = function () {


        _views.projects = gitPage.views.projects;

        _views.projects.show();

        _flask = $('#flask');

        _startFlaskBounce();

        _delegateEvents();
    }


}

gitPage.app = new gitPage.App();


$(function () {
    gitPage.app.initialize();
});