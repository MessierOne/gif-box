# gif-box ![Travis CI](https://github.com/MessierOne/gif-box/workflows/Travis%20CI/badge.svg)  ![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

Web component for random Gif generator, using the [Giphy API.](https://developers.giphy.com/docs/api/endpoint/#search)

<img src="https://media.giphy.com/media/IzVquL965ib4s/giphy.gif" alt="giphy" />


Usage With ReactJS 
``` shell script
$ npm i gif-box
```
``` javascript
import "gif-box"; 

<>
    <gif-box size="medium" keyword="unicorn"></gif-box>
</>
```


Usage in index.html 
``` html
<head>
    <script src="cdn" type="text/javascript"></script>
</head>

<body>
    <gif-box size="medium" keyword="unicorn"></gif-box>
</body>
```
