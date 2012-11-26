gitPage.views.Projects = function () {
    var _model = gitPage.models.projectsModel,
        _tags = gitPage.models.tagsModel;

    var _prepareTags = function () {
        for (var proj in _model.projects) {
            var tags = _model.projects[proj].tags;

            for (var tag in tags) {
                _tags.addTag(tags[tag]);
            }

            _model.projects[proj].tagsString = _model.projects[proj].tags.join(' ') + ' ';
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
            filters = $('.filters'),
            sortable = [];

        for (var tag in _tags.tags) {
            sortable.push([tag, _tags.tags[tag]]);
        }

        sortable.sort(function(a,b) {
            if (a[1] < b[1]) {
                return 1;
            }

            if (a[1] > b[1]) {
                return -1;
            }

            return 0;
        });

        for (var i = 0; i < sortable.length; i++) {
            obj += gitPage.utils.tpl(gitPage.templates.filter, sortable[i][0], 'filter');
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
                (project.tagsString.search(gitPage.config.activeFilter + ' ') == -1)) {

                continue;
            }

            obj += Mustache.render(gitPage.templates.project, project);
        }

        $('.projects').html(obj);

        //console.log(obj);
        //gitPage.utils.tpl(gitPage.templates.project, 'filter', 'all');
    }

    var _getForks = function(proj, callback) {
        var self = this;

        $.ajax({
            url: proj.git.forks_url,
            type: "get",
            success: function(data) {
                proj.forks = data.data;

                callback.call(self);
            },
            dataType: "jsonp"
        });

    }

    var _getStargazers = function(proj, callback) {
        var self = this;

        $.ajax({
            url: proj.git.stargazers_url,
            type: "get",
            success: function(data) {
                proj.stargazers = data.data;

                _getForks(proj, callback);
            },
            dataType: "jsonp"
        });
    }

    var _prepareGitData = function(callback) {
        for (var proj in _model.projects) {
            //copy data to projects
            for (var gitProj in _model.gitData) {
                if (_model.projects[proj].gitFullName == _model.gitData[gitProj].full_name) {
                    _model.projects[proj].git = _model.gitData[gitProj];
                }
            }

            _getStargazers(_model.projects[proj], callback);

        }



    }

    var _getProjectsInfo = function(callback) {
        var self = this;

        $.ajax({
            url: "https://api.github.com/orgs/denivip/repos",
            type: "get",
            success: function(data) {
                if (data.data.message) {
                    callback.call(self);
                } else {
                    _model.gitData = data.data;

                    _prepareGitData(callback);
                }
            },
            dataType: "jsonp"
        });
    }

    this.show = function () {



        //_getProjectsInfo(function() {
            $('.preloader').remove();

            _showFiltes();
            _showProjects();
        //});

        $('.filters__item').click(_onFilterCheck);
    }

    _prepareTags();
}

gitPage.views.projects = new gitPage.views.Projects();