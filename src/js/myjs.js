const URL = "http://dati.lazio.it/catalog/api/action/datastore_search?resource_id=4a5a084c-b63c-4f4d-b3f0-b1163c0ad077"

const Lat = [41.85846, 41.9191498, 41.9077141, 41.9292038, 41.89673409999999, 41.9191498]
const Long = [12.62990000000002, 12.53897040000004, 12.512596700000017, 12.429048200000011, 12.460884599999986, 12.53897040000004]

var mymap = L.map('mapid').setView([41.90278349999999, 12.496365500000024], 11);

var risultati = [];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

function myscale(mymax, myvalue){
    return (80*myvalue)/mymax;
}

$.getJSON(URL, function (data) {
    $('#tot_ps').html('Strutture Totali: ' + data.result.total);
    $.each(data.result.records, function (key, value) {
        risultati.push(value.TUTTI);
    });
    $.each(data.result.records, function (key, value) {
        var maxValue = Math.max(...risultati);
        var scaledWidth = myscale(maxValue, value.TUTTI);
        $('#graph').append('<div class="row"><div class="col name">' + value.ISTITUTO + '</div><div class="col base"></div><div class="col value" style="width:' + scaledWidth + '%">' + value.TUTTI + '</div></div>')
        if (Lat[key] & Long[key] != "undefined") {
            var circle = L.circle([Lat[key], Long[key]], {
                color: '#17CECE',
                fillColor: '#17CECE',
                fillOpacity: 0.3,
                radius: 500
            }).bindPopup(value.ISTITUTO).openPopup().addTo(mymap);
        }
    });
    
});