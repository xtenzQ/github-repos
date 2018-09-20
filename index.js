function showDays(firstDate, secondDate){
    let startDay = new Date(firstDate);
    let endDay = new Date(secondDate);
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let millisBetween = startDay.getTime() - endDay.getTime();
    let days = millisBetween / millisecondsPerDay;
    let result;
    // Round down.
    let daysLeft = Math.floor(days);
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
function getRepos(container, username, columns, options) {
    let color = '';
    let columnCounter = 0;

    //container = $(container);

    // header
    //$(document.createElement('div'));

    // colors data
    const urlColors = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
    let colors;

    // repository data of a given user
    const urlRepositories = 'https://api.github.com/users/' + username + '/repos';
    let repositories;

    /*
    // container div
    const containerDiv = $('<div/>',
        { class: 'container', id: 'rowHost' });
    // row div
    const rowDiv = $('<div/>', {
        class: 'row my-15' });
    //
    const colDiv = $('<div/>', {
        class: 'col-12 align-items-stretch' });
    //
    const deckDiv = $('<div/>', {
        class: 'card-deck', id: 'cardHost' });
    //
    const footer = $('</div></div></div>');
    //
    const cardDiv = $('<div/>', {
        class: 'card' });
    //
    const cardBody = $('<div/>', {
        class: 'card-body d-flex flex-column' });
    //
    const h5 = $('<div/>', {
        class: 'card-title' });
    //
    let iconType = '';
    //
    let icon = $('<div/>', {
        class: 'fa ' + iconType + '' });
    //
    let alink = $('<div/>', {
        href: url });
    //
    const cardText = $('<div/>', {
        class: 'card-text' });
    //
    const divInside = $('<div/>', {
        class: 'mt-auto align-items-end' });
    //
    let title = '';

    let button = $('<div/>', {
        type: 'button',
        class: 'btn btn-link',
        title: title });*/

    // get language colors
    $.getJSON(urlColors)
        .then(function(data) {
            colors = data;
        })
        .fail(function(reason) {
            console.log("Can't get colors data from given URL: " + reason);
        });

    let myOptions = options.replace(/ /g,'').split(",");
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let output = d.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;
    let header = '<div class="container" id="rowHost">' +
        '<div class="row my-15"><div class="col-12">' +
        '<div class="card-deck" id="cardHost">';
    let footer = '</div></div></div>';
    $(container).append(header);

    // get repositories
    $.getJSON(urlRepositories)
        .then(function(data) {
            repositories = data;
            $.each(repositories , function(key , value) {
                // if there's no such repo then next
                if (!myOptions.includes(value.name)) {
                    return;
                }
                // get contributors and commits
                $.getJSON('https://api.github.com/repos/' + username + '/' + value.name + '/contributors')
                    .then(function (data) {

                        $.each(colors, function(c, v) {
                            if (c === value.language) {
                                color = v.color;
                                return false;
                            }
                        });

                        let contCount = 0;
                        // count contributors
                        $.each(data, function (k, v) {
                            // First Level
                            contCount += v.contributions;
                        });

                        $('#cardHost').append(
                            '<div class="card">' +
                            '<div class="card-body d-flex flex-column">' +
                            '<h5 class="card-title"><i class="fa fa-laptop" aria-hidden="true"></i> <a href="' + value.html_url + '">' + value.name + '</a> ' + (value.fork !== false ? '<span class="badge badge-success">Forked</span>' : '') + '</h5>' +
                            '<p class="card-text">' + (value.description == null ? "No description" : value.description) + '</p>' +
                            '<div class="mt-auto align-items-end">' +
                            (value.language !== null ? '<button type="button" class="btn btn-primary" data-toggle="tooltip" title="License" style="background: ' + color + ' !important; border-color: ' + color + ' !important;"><i class="fa fa-code"></i> ' + value.language + '</button>' : '') +
                            '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Commits"><i class="fa fa-circle-o-notch" aria-hidden="true"></i> ' + contCount + '</button>' +
                            '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Contributors"><i class="fa fa-users" aria-hidden="true"></i> ' + data.length + '</button>' +
                            '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Stargazers"><i class="fa fa-star" aria-hidden="true"></i> ' + value.stargazers_count + ' </button>' +
                            '<button type="button" class="btn btn-link" data-toggle="tooltip" title="Forks"><i class="fa fa-code-fork" aria-hidden="true"></i> ' + value.forks_count + '</button>' +
                            (value.license !== null ? '<button type="button" class="btn btn-link" aria-hidden="true"><i class="fa fa-file"></i> ' + value.license.name + '</button>' : '') +
                            '</div>' +
                            '</div>' +
                            '<div class="card-footer">' +
                            '<small class="text-muted">Last update ' + showDays(output, value.updated_at) + '</small>' +
                            '</div>' +
                            '</div>'
                        );
                        columnCounter++;

                        if (columnCounter % columns === 0) {
                            $('#cardHost').append('<div class="w-100 py-2"></div>');
                        }

                    })
                    .fail(function (reason) {
                        console.log("Can't get contributors data from given URL: " + reason);
                    })
            })
        })
        .fail(function(reason) {
            console.log("Can't get repository information from given URL: " + reason);
        });

    $(container).add(footer);
}