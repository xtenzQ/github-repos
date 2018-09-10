function getRepos(username) {
    var url;
    var id;
    var name;
    var language;
    var description;
    var color;
    var colors;
    var stargazers_count;
    var forks;
    var frks;
    var stars;
    $.getJSON('colors.json', function(json) {
        colors = json;
    });
    $('#repos').append('<ol class="pinned-repos-list  mb-4 js-pinned-repos-reorder-list">');
    $.getJSON('https://api.github.com/users/' + username + '/repos', function (obj) {
        $.each(obj , function(key , value){ // First Level

            url = value.html_url;
            id = value.id;
            language = value.language;
            name = value.name;
            description = value.description;
            forks = value.forks;
            stargazers_count = value.stargazers_count;

            $.each(colors, function(c, v) {
                if (c === language) {
                    color = v.color;
                    return false;
                }
            });

            if (forks !== 0) {
                frks = '<a href="'+ url +'/network" class="pinned-repo-meta muted-link">\n' +
                '<svg aria-label="forks" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>\n' +
                + forks + '\n' +
                '</a>';
            }
            else {
                frks = '';
            }

            if (stargazers_count !== 0) {
                stars = '<a href="'+ url + '/stargazers" class="pinned-repo-meta muted-link">\n' +
                    '<svg aria-label="stars" class="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/></svg>\n' +
                    stargazers_count + '\n' +
                    ' </a>\n';
            }
            else {
                stars = '';
            }

            if (description == null) {
                description = "No description";
            }

            if (language === null) {
                language = '';
                color = '#fff';
            }

            $('#repos').append(
                '<li class="pinned-repo-item  p-3 mb-3 border border-gray-dark rounded-1 js-pinned-repo-list-item public source reorderable sortable-button-item">' +
                '<div class="pinned-repo-item-content">' +
                '<span class="d-block position-relative">' +
                '<input type="hidden" name="repo_ids[]" id="pinned-repo-reorder-' + id + ' value="' + id + '" class="form-control" />' +
                '<span class="pinned-repository-handle js-pinned-repository-reorder float-left pr-2" title="Drag to reorder">' +
                '<svg class="octicon octicon-grabber" viewBox="0 0 8 16" version="1.1" width="8" height="16" aria-hidden="true">' +
                '<path fill-rule="evenodd" d="M8 4v1H0V4h8zM0 8h8V7H0v1zm0 3h8v-1H0v1z"/></svg></span>' +
                '<a href="' + url + '" class="text-bold">' +
                '<span class="repo js-repo" title="' + name + '">' + name + '</span>' +
                '</a>' +
                '<button type="button" class="btn btn-outline btn-sm show-on-focus sortable-button js-sortable-button right-0" data-direction="up"><svg aria-label="Move ' + name + ' up" class="octicon octicon-chevron-up" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M10 10l-1.5 1.5L5 7.75 1.5 11.5 0 10l5-5 5 5z"/></svg></button>\n' +
                '<button type="button" class="btn btn-outline btn-sm show-on-focus sortable-button js-sortable-button right-0" data-direction="down"><svg aria-label="Move ' + name + ' down" class="octicon octicon-chevron-down" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"/></svg></button>\n' +
                '</span>' +
                '<p class="pinned-repo-desc text-gray text-small d-block mt-2 mb-3">' + description + '</p>\n' +
                '\n' +
                '<p class="mb-0 f6 text-gray">\n' +
                '<span class="repo-language-color pinned-repo-meta" style="background-color:' + color + ';"></span>\n' +
                language +
                stars + '\n' +
                frks + '\n' +
                '</p>\n' +
                '</div>\n' +
                '</li>');
        });
    });
    $('#repos').append('</ol>');
}