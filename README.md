![](http://i.imgur.com/AWPN6Bb.png)

# UK Pollen Map

Eventually will be a thing where you can see the pollen forecast on a nice map (thanks to OpenStreetMap).

## Usage

``` bash
npm install express body-parser request
node index.js
```

Then open your browser at `localhost:3000`

## Features

Well it's early days, so far I've just setup `leaflet.js` for map rendering, and tied together some basic client-side geolocation (falling back to OpenStreetMap geolookup by input).
