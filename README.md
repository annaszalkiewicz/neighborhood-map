# National Parks of Poland - Neighborhood Map Project
---
## Project Overview

Neighborhood Map project is part of Front-End Web Developer Nanodegree Program by Udacity. It's single page application that features National Parks of Poland. 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run project?

### Run on local machine

1. Clone repository to local machine using
```
$ git clone https://github.com/annaszalkiewicz/neighborhood-map
```

2. Install all dependencies
```
$ npm install
```
3. Run application
```
$ npm start
```
visit the site: `http://localhost:5005`
You can change port by editing `package.json` file. In line 16 `"start": " set PORT=5005 && react-scripts start",` change port number 5005 to any other.Save file.

### Live preview

[https://mywebgraphicdesign.com/national-parks-of-poland](https://mywebgraphicdesign.com/national-parks-of-poland)

## Offline usage

This project use service workers and cache its content. Set up your favorite HTTP server so that a visitor to your site is served index.html, and requests to static paths like /static/js/main.<hash>.js are served with the contents of the /static/js/main.<hash>.js file. Service worker runs only on production `build` directory. If you would like to test it on your local machine, please follow this guide: 

1. Make sure you have installed [Node](https://nodejs.org/).
```
2. Install [Serve](https://github.com/zeit/serve).
```
$ npm install -g serve
```
```
3. Serve your static site on the port 5000. 
```
$ serve -s build
```
Like many of serve’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

4. Open project on loac server `localhost:5000`
```

## Dependencies

* [React](https://reactjs.org/)
* [React DOM](https://www.npmjs.com/package/react-dom)
* [React Router DOM](https://www.npmjs.com/package/react-router-dom)
* [React Modal](https://www.npmjs.com/package/react-modal)
* [Prop-Types](https://www.npmjs.com/package/prop-types)
* [Font Montserrat on Google](https://fonts.google.com/specimen/Montserrat)
* [Font Pacifico on Google](https://fonts.google.com/specimen/Pacifico)
* [Material Icons](https://material.io/tools/icons/?style=baseline)
* [Google Maps API](https://cloud.google.com/maps-platform/)
* [Flickr API](https://www.flickr.com/services/api/)

## Contributions

As this project is part of Front-End Nanodegree Program no contribution will be accepted.