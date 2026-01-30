let map, userMarker, centerCircle;

function initMap() {
  if (!navigator.geolocation) {
    document.getElementById("status").textContent = "Navegador não suporta geolocalização.";
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    document.getElementById("status").textContent = `Localização obtida: ${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}`;

    map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation,
      zoom: 15
    });

    // marcador do usuário
    userMarker = new google.maps.Marker({
      position: userLocation,
      map: map,
      title: "Você está aqui"
    });

    // círculo de 1km
    centerCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
      map: map,
      center: userLocation,
      radius: 1000
    });

    // sugerir ponto aleatório dentro do raio
    suggestCenterLocation(userLocation);
  }, error => {
    document.getElementById("status").textContent = "Falha ao obter localização 😕";
  });
}

function suggestCenterLocation(userLocation) {
  // calcula um ponto aleatório dentro de 1km
  const randomPoint = generateRandomPoint(userLocation, 1000);

  new google.maps.Marker({
    position: randomPoint,
    map: map,
    title: "Sugestão de centro de formação",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    }
  });

  map.panTo(randomPoint);
}

// gera ponto aleatório dentro de um raio em metros
function generateRandomPoint(center, radius) {
  const y0 = center.lat;
  const x0 = center.lng;

  const rd = radius / 111300; // approx degrees

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newLat = y + y0;
  const newLng = x + x0;

  return { lat: newLat, lng: newLng };
}
