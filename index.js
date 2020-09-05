'use strict';

const searchURL = 'https://api.github.com/users/'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

function getRepo(userName) {
    const params = {
        sort: 'created',
        direction: 'desc'
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + userName + '/repos' + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => 
            listRepos(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function listRepos(responseJson) {
    console.log(responseJson);
    $('.results').removeClass('hidden')
    $('.results ul').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.results ul').append(
            `<li>Name: ${responseJson[i].name}</li>
            <li>URL: <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>
            <br>`
        )
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userName = $('#js-handle-search').val();
        getRepo(userName);
    });
}

$(watchForm);