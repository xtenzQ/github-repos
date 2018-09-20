# github-repos

*Work in progress*

> Github Repos is a widget which allows you to embed repositories into your website

![Image of Yaktocat](https://i.imgur.com/UbJ8rrG.jpg)

## How to use
**`getRepos(container, username, columns, repositories)`**

Using this command you can embed repository cards into your page
This widget is based on bootstrap 4, Font Awesome and jQuery so you have to insert libraries in your `<head>` tag.

```HTML
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js" integrity="sha384-pjaaA8dDz/5BgdFUPX6M/9SUZv4d12SUPF0axWc+VRZkx5xU3daN+lYb49+Ax+Tl" crossorigin="anonymous"></script>

<script src="index.js"></script>
```

**Parameters:**
- **String|HTMLElement** `container`: Repositories container
- **String** `username`: The GitHub username.
- **Integer** `columns`: Number of columns for repositories
- **String** `repositories`: Repositories that you want to embed

## IDEs and plugins used
Developed with JetBrains WebStorm
