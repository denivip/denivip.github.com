gitPage.templates = {
    filter: '<span class="filters__item" data-filter="{{filter}}">{{filter}}</span>',

    project: '<div class="project__item" data-tag="{{tagsString}}">' +
                '<i class="icon-cog project__item__background"></i>' +
                '<img class="project__item__img" src="projects/{{image}}">' +
                '<div class="project__item__title">{{title}}</div>' +
                '<div class="project__item__descr">{{description}}</div>' +

                '<div class="project__item__tags">{{tagsString}}</div>' +

                '<div class="project__item__socials">' +
                    '<a href="https://twitter.com/share" target="_blank" title="Tweet It" class="twitter"' +
                        'data-lang="en"' +
                        'data-url="{{#pageUrl}}{{pageUrl}}{{/pageUrl}}' +
                        '{{^pageUrl}}https://github.com/{{gitFullName}}{{/pageUrl}}"' +
                        'data-hashtags="DENIVIP,{{title}}"' +
                        'data-text="{{description}}">' +
                        '<i class="icon-twitter"></i>' +
                    '</a>' +

                    '<a href="https://plusone.google.com/" target="_blank" title="Google+" class="google"' +
                        'data-lang="en"' +
                        'data-url="{{#pageUrl}}{{pageUrl}}{{/pageUrl}}' +
                            '{{^pageUrl}}https://github.com/{{gitFullName}}{{/pageUrl}}"' +
                        'data-hashtags="DENIVIP,{{title}}"' +
                        'data-text="{{description}}">' +
                        '<i class="icon-google-plus"></i>' +
                    '</a>' +
                '</div>' +

                '<div class="project__item__btns">' +
                    '{{#pageUrl}}<div class="project__item__more">' +
                        '<a href="{{pageUrl}}">' +
                            '<i class="icon-home"></i> visit page' +
                        '</a>' +
                    '</div>{{/pageUrl}}' +

                    '<div class="project__item__forkit">' +
                        '<a href="https://github.com/{{gitFullName}}">' +
                            '<i class="icon-github"></i> fork it' +
                        '</a>' +
                    '</div>' +

                    '<div class="project__item__download">' +
                        '<a href="https://github.com/{{gitFullName}}/archive/master.zip">' +
                            '<i class="icon-download"></i> get it' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</div>'
}