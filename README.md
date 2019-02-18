# 📄 github-repos

> Github Repos is a widget which allows you to embed repositories into your website

[Check it](https://xtenzq.github.io/github-repos/example/)!

![Image of Yaktocat](https://i.imgur.com/UbJ8rrG.jpg)

## ❓ How to use
**`getRepos(container, username, columns, repositories)`**

Using this command you can embed repository cards into your page
This widget is based on [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/), [Font Awesome](https://fontawesome.com/v4.7.0/) and [jQuery](https://jquery.com/download/) so you have to insert libraries in your `<head>` tag.

```HTML
<html>
<head>
<!-- Bootstrap 4.1.3 CSS -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

<!-- Font Awesome 4.7.0 CSS ->
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<!-- jQuery 3.3.1 JS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- Bootstrap  4.1.3 JS -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js" integrity="sha384-pjaaA8dDz/5BgdFUPX6M/9SUZv4d12SUPF0axWc+VRZkx5xU3daN+lYb49+Ax+Tl" crossorigin="anonymous"></script>

<!-- CDN Rawgit link to widget css -->
<link href="https://cdn.rawgit.com/xtenzQ/github-repos/master/style.css" rel="stylesheet">  
  
<!-- CDN Rawgit link to widget script -->
<script src="https://cdn.rawgit.com/xtenzQ/github-repos/master/index.js"></script>
  
</head>
<body>
  <!-- container -->
  <div id="repos">
  </div>
  <!-- script -->
  <script>
    getRepos('#repos', 'xtenzQ', 2, "2D-metaballs, MetaBalls, github-repos, xtenzQ.github.io, Jogl-Helicopter, QBrowser");
  </script>
</body>
</html>
```

**Parameters:**
- **String|HTMLElement** `container`: Repositories container
- **String** `username`: The GitHub username.
- **Integer** `columns`: Number of columns for repositories
- **String** `repositories`: Repositories that you want to embed
- **String** `color`: Custom language button color

## 🛠 IDEs and plugins used
Developed with [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)

## 🔃 TODO list
The things I haven't implemented yet =/
- Strict order card layout (following `repositories` parameter)

## 📜 License
MIT License
