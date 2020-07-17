# gif-box <img src="https://travis-ci.com/MessierOne/gif-box.svg?token=aMqKBGoL7mygzf5N5qzJ&branch=master" alt="Travis Build"/>  [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

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
