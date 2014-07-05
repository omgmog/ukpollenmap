var map_rendered = false;
var map;

var got_location = function (loc_lat,loc_long) {
    if (!map_rendered) {
        map = L.map('map');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);
    }
    map.setView([loc_lat, loc_long], 13);
    map_rendered = true;

};
var failed = function (message) {
    var location_form = document.getElementById('location_form');

    location_form.style.display = 'block';

    location_form.addEventListener("submit", function (event) {
        event.preventDefault();
        var data = JSON.parse(AJAXPost(this));
        got_location(data[0].lat, data[0].lon);
    }, false);

    if (message) {
        console.log(message);
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        got_location(position.coords.latitude, position.coords.longitude);
    }, failed);
} else {
    failed('geolocation not supported');
}


function AJAXPost(form){
    var elem = form.elements;
    var params = "";
    var url = form.action;
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].tagName == "SELECT") {
            params += elem[i].name + "=" + encodeURIComponent(elem[i].options[elem[i].selectedIndex].value) + "&";
        }else{
            params += elem[i].name + "=" + encodeURIComponent(elem[i].value) + "&";
        }
    }
    var xmlhttp=new XMLHttpRequest();

    xmlhttp.open("POST",url,false);
    xmlhttp.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    return xmlhttp.responseText;
}
