gitPage.views.Projects = function () {
    var _model = gitPage.models.projectsModel,
        _tags = gitPage.models.tagsModel;

    var _prepareTags = function () {
        for (var proj in _model.projects) {
            var tags = _model.projects[proj].tags;

            for (var tag in tags) {
                _tags.addTag(tags[tag]);
            }

            _model.projects[proj].tagsString = _model.projects[proj].tags.join(' ');
        }
    }

    var _onFilterCheck = function (e) {
        gitPage.config.activeFilter = $(e.target).data('filter');

        $('.filters__item').removeClass('filters__item_active');

        /*
         var items = $('.project__item'),
         itemsDel = [];

         items.removeClass('hidden');

         for (var i = 0; i<= items.length; i++) {
         if ($(items[i]).data('tag') != gitPage.config.activeFilter) {
         itemsDel.push(items[i]);
         }
         }

         for (var i = 0; i<= itemsDel.length; i++) {
         $(itemsDel[i]).addClass('hidden');
         }

         $('.filters__item').removeClass('filters__item_active');
         */

        _showProjects();

        $(e.target).addClass('filters__item_active');
    }

    var _showFiltes = function () {
        var obj = gitPage.utils.tpl(gitPage.templates.filter, 'all', 'filter'),
            filters = $('.filters');

        for (var tag in _tags.tags) {
            obj += gitPage.utils.tpl(gitPage.templates.filter, tag, 'filter');
        }

        filters.html(obj);

        for (var i = 0; i < filters.children().length; i++) {
            var $filter = $(filters.children()[i]);
            if ($filter.data('filter') == gitPage.config.activeFilter) {
                $filter.addClass('filters__item_active');
            }
        }


    }

    var _showProjects = function () {
        var obj = '';

        for (var proj in _model.projects) {
            var project = _model.projects[proj];

            if ((gitPage.config.activeFilter !== 'all') &&
                (project.tagsString.search(gitPage.config.activeFilter) == -1)) {

                continue;
            }

            obj += Mustache.render(gitPage.templates.project, project);
        }

        $('.projects').html(obj);
        ;


        //console.log(obj);
        //gitPage.utils.tpl(gitPage.templates.project, 'filter', 'all');
    }

    this.show = function () {

        _showFiltes();
        _showProjects();

        $('.filters__item').click(_onFilterCheck);
    }

    _prepareTags();
}

gitPage.views.projects = new gitPage.views.Projects();