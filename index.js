function showDays(firstDate, secondDate){
    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / millisecondsPerDay;
    var result;
    // Round down.
    var daysLeft = Math.floor(days);
    switch (daysLeft) {
        case 0: result = 'today'; break;
        case 1: result = 'yesterday'; break;
        default: result = daysLeft + ' days ago';
    }

    return result;
}

function getColors() {
    $.getJSON('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json', function(json) {
        return json;
    });
}

/*function getAsyncData(targetedUrl) {
    var result = null;
    $.ajax({
            async: false,
            url: targetedUrl,
            dataType: "json",
            success: function(data){
                result = data;
            }
        });
        return result;
}*/

/***
 * GitHub Repository Embed Widget
 * @param {String|HTMLElement} Container for repositories
 * @param {String} username The GitHub username
 * @param {Object} option embedded repositories
 */
function getRepos(container, username, columns, options) {
    let url = '';
    let id;
    let name = '';
    let language = '';
    let description = '';
    let color = '';
    let stargazers_count = '';
    let forks_count = '';
    let lcns;
    let update;
    let columnCounter = 0;
    let frk;
    let graph;

    container = $(container);

    // header
    $(document.createElement('div'));

    // colors data
    const urlColors = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
    let colors;

    // repository data of a given user
    const urlRepositories = 'https://api.github.com/users/' + username + '/repos';
    let repositories;
    
    // get language colors
    $.getJSON(urlColors)
        .then(function(data) {
            colors = data;
        })
        .fail(function(reason) {
            console.log("Can't get colors data from given URL: " + reason);
        });

    // get repositories
    $.getJSON(urlRepositories)
        .then(function(data) {
            repositories = data;
            $.each(repositories , function(key , value) {
                // if there's no such repo then next
                if (!options.includes(value.name)) {
                    return false;
                }
                // get contributors and commits
                $.getJSON('https://api.github.com/repos/' + username + '/' + value.name + '/contributors').
                    then(function (data) {

                    })
                    .fail(function (reason) {
                        console.log("Can't get contributors data from given URL: " + reason);
                    })
            })
        })
        .fail(function(reason) {
            console.log("Can't get repository information from given URL: " + reason);
        });



    const myOptions = repositories.replace(/ /g,'').split(",");

    let d = new Date();

    let month = d.getMonth()+1;
    let day = d.getDate();

    let output = d.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    var header = '<div class="container" id="rowHost">' +
                    '<div class="row my-15"><div class="col-12 align-items-stretch">' +
                        '<div class="card-deck" id="cardHost">';
    var footer = '</div></div></div>';
    $(container).append(header);

    $.getJSON('https://api.github.com/users/' + username + '/repos', function (obj) {
        $.each(obj , function(key , value) {

            if (!(myOptions.includes(value.name))) {
                return;
            }

            $.getJSON('https://api.github.com/repos/' + username + '/' + name + '/contributors', function(obj) {

                let contCount = 0;
                let pplCount = 0;

                name = value.name;

                url = value.html_url;
                id = value.id;
                language = value.language;

                description = value.description;
                forks_count = value.forks_count;
                stargazers_count = value.stargazers_count;
                update = value.updated_at;

                if (value.license !== null) {
                    lcns = '<button type="button" class="btn btn-link" aria-hidden="true"><i class="fa fa-file"></i> ' + value.license.name + '</button>';
                }
                else {
                    lcns = '';
                }

                $.each(colors, function(c, v) {
                    if (c === language) {
                        color = v.color;
                        return false;
                    }
                });

                if (description == null) {
                    description = "No description";
                }

                let lngv;

                if (language === null) {
                    lngv = ''
                }
                else {
                    lngv ='<button type="button" class="btn btn-primary" data-toggle="tooltip" title="License" style="background: ' + color + ' !important; border-color: ' + color + ' !important;"><i class="fa fa-code"></i> ' + language + '</button>';
                }

                pplCount = obj.length;
                $.each(obj, function (k, v) { // First Level
                    contCount += v.contributions;
                });

                if (value.fork !== false) {
                    frk = '<span class="badge badge-success">Forked</span>';
                }
                else
                {
                    frk = '';
                }

                $('#cardHost').append(
                    '<div class="card">' +
                    '<div class="card-body d-flex flex-column">' +
                    '<h5 class="card-title"><i class="fa fa-laptop" aria-hidden="true"></i> <a href="' + url + '">' + name + '</a> ' + frk + '</h5>' +
                    '<p class="card-text">' + description + '</p>' +
                    '<div class="mt-auto align-items-end">' +
                    lngv +
                    '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Commits"><i class="fa fa-circle-o-notch" aria-hidden="true"></i> ' + contCount + '</button>' +
                    '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Contributors"><i class="fa fa-users" aria-hidden="true"></i> ' + pplCount + '</button>' +
                    '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Stargazers"><i class="fa fa-star" aria-hidden="true"></i> ' + stargazers_count + ' </button>' +
                    '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Forks"><i class="fa fa-code-fork" aria-hidden="true"></i> ' + forks_count + '</button>' +
                    lcns +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer">' +
                    '<small class="text-muted">Last update ' + showDays(output, update) + '</small>' +
                    '</div>' +
                    '</div>'
                );
                columnCounter++;

                if (columnCounter % columns === 0) {
                    $('#cardHost').append('<div class="w-100 py-2"></div>');
                }
            });
        });
    });
    $(container).add(footer);
}