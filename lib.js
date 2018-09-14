function getRepos(container, username, columns, repositories) {

    repositories = repositories || {};

    const mainDiv = document.getElementById(container);
    const url = 'https://api.github.com/users/' + username + '/repos';

    fetch(url).then((response) => response.json())
        .then(function(data) {
            data.forEach()

    });

}