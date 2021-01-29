function initMap(){
    // map options
    let options = {
        zoom:16,
        center:{lat:54.82117251665241,lng:-1.7422410714862142}
    }

    // new map
    let map = new
    google.maps.Map(document.getElementById('map'), options);

    // add marker
    let marker = new google.maps.Marker({
        position:{lat:54.82117251665241,lng:-1.7422410714862142},
        map:map
    });
}