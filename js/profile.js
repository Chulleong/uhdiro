var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(36.579584, 127.935242), // 지도의 중심좌표
        level: 13 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 


var plan = [
  {
      title: '양양', 
      latlng: new kakao.maps.LatLng(38.0045219, 128.5950959)
  },
  {
      title: '여수', 
      latlng: new kakao.maps.LatLng(34.7603737, 127.6622221)
  }];


  var imageSrc1 = "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";

  for (var i = 0; i < plan.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc1, imageSize); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: plan[i].latlng, // 마커를 표시할 위치
        title : plan[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
}


// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);