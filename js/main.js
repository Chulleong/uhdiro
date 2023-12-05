//페이지 로드 이벤트
window.addEventListener("load", ()=>{
    const grid = new Isotope("section", {
      itemSelector: "article",
      columnWidth: "article",
      transitionDuration: "0.5s"
    })
  })

  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(36.3504119, 127.3845475), // 시작점
    level: 6
  };

  var map = new kakao.maps.Map(container, options);


  var positions = [
    {
        title: '충남대', 
        latlng: new kakao.maps.LatLng(36.3688253, 127.3468684)
    },
    {
        title: '한화이글스', 
        latlng: new kakao.maps.LatLng(36.3172026, 127.4285703)
    },
    {
        title: '텃밭', 
        latlng: new kakao.maps.LatLng(33.450879, 126.569940)
    },
    {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    }
];

var linePath = [
  new kakao.maps.LatLng(36.3688253, 127.3468684),
  new kakao.maps.LatLng(36.3172026, 127.4285703),
];

var polyline = new kakao.maps.Polyline({
  path: linePath, // 선을 구성하는 좌표배열 입니다
  strokeWeight: 5, // 선의 두께 입니다
  strokeColor: '#FFAE00', // 선의 색깔입니다
  strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
  strokeStyle: 'solid' // 선의 스타일입니다
});

polyline.setMap(map);

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
for (var i = 0; i < positions.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
}