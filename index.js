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

/***
 * GitHub Repository Embed Widget
 * @param {String|HTMLElement} Container for repositories
 * @param {String} username The GitHub username
 * @param {Object} option embedded repositories
 */
function getRepos(username, columns, spacing, repositories) {
    var url = '';
    var id;
    var name = '';
    var language = '';
    var description = '';
    var color = '';
    var colors;
    var stargazers_count = '';
    var forks_count = '';
    var frks;
    var stars = '';
    var lcns;
    var update;
    var license = '';
    var cnt = 0;
    var rowNumber = 0;
    var columnCounter = 0;

    // hosting container
    // container = $(container);

    $.getJSON('colors.json', function(json) {
        colors = json;
    });

    // 
    let myoptions = repositories.replace(/ /g,'').split(",");

    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    var header = '<div class="container" id="rowHost">' +
                    '<div class="row my-' + spacing + '"><div class="col-12 align-items-stretch">' +
                        '<div class="card-deck" id="cardHost">';
    var footer = '</div></div></div>';
    $('#repos').append(header);

    let opLenth = myoptions.length;

    $.getJSON('https://api.github.com/users/' + username + '/repos', function (obj) {
        $.each(obj , function(key , value){ // First Level
            // Name of a repository with - instead of spaces
            name = value.name;

            if (!(myoptions.includes(name))) {
                return;
            }

            url = value.html_url;
            id = value.id;
            language = value.language;

            description = value.description;
            forks_count = value.forks_count;
            stargazers_count = value.stargazers_count;
            update = value.updated_at;

            if (value.license !== null) {
                lcns = '<button type="button" class="btn btn-link"><i class="fa fa-file"></i> ' + value.license.name + '</button>';
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

            if (language === null) {
                language = '';
                color = '#fff';
            }

            $('#cardHost').append(
                        '<div class="card">' +
                            '<div class="card-body">' +
                                '<h5 class="card-title"><i class="fa fa-laptop" aria-hidden="true"></i> <a href="' + url + '">' + name + '</a></h5>' +
                                '<p class="card-text">' + description + '</p>' +
                                '<div class="align-items-end">' +
                                    '<button type="button" class="btn btn-primary" style="background: ' + color + ' !important; border-color: ' + color + ' !important;"><i class="fa fa-code"></i> ' + language + '</button>' +
                                    '<button type="button" class="btn btn-link"><i class="fa fa-star"></i> ' + stargazers_count + ' </button>' +
                                    '<button type="button" class="btn btn-link"><i class="fa fa-code-fork" aria-hidden="true"></i> ' + forks_count + '</button>' +
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
    $('#repos').add(footer);
}