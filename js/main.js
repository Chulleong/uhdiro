  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(36.3504119, 127.3845475), // 시작점
    level: 6
  };

  let kakaoMapDiv = document.querySelector("#kakao-map")

  var map = new kakao.maps.Map(container, options);

  const middleDiv = document.querySelectorAll(".middle-div > article > div")

  console.log(middleDiv)

  const deajeon = [{
    title: "보문산",
    x: "36.301724",
    y: "127.421545",
    startx: "36.3504119",
    starty: "127.3845475",
    level: 7
  },{
    title: "성심당",
    x: "36.3323220",
    y: "127.4000000"
  },{
    title: "한빛탑",
    x: "36.3765465",
    y: "127.388132"
  },{
    title: "유성온천",
    x: '36.3553445',
    y: "127.3433765"
  }]

  const jeonju = [{
    title: "전주 수목원",
    x: "35.8709862",
    y: "127.0549618",
    startx: "35.8203799",
    starty: "127.1086669",
    level: 8
  },{
    title: "전주 한옥마을",
    x: "35.8187991",
    y: "127.1537905"
  },{
    title: "아중 호수",
    x: "35.8219604",
    y: "127.1773776"
  },{
    title: "전주 영화의 거리",
    x: "35.73232203",
    y: "127.1441541"
  }]

  const gunsan = [
    {
      title: "철길 마을",
      x: "35.9812506",
      y: "126.7326194",
      startx: "35.9812506",
      starty: "126.7226194",
      level: 6
    },{
      title: "홍굴이 해물짬뽕",
      x: "35.9647244",
      y: "126.7163921"
    },
    {
      title: "일본 전통가옥",
      x: "35.986103",
      y: "126.706021"
    },{
      title: "이성당",
      x: "35.9872026",
      y: "126.7112691"
    }
  ]

  middleDiv.forEach(element => {
    element.addEventListener("click", () => {
      positions = []
      linePath = []
      options = {}
      if(element.id == "1"){
        for(let i = 0; i<deajeon.length; i++){
          positions.push({
            title: deajeon[i].title,
            latlng: new kakao.maps.LatLng(deajeon[i].x, deajeon[i].y)
          })
          linePath.push(
            new kakao.maps.LatLng(deajeon[i].x, deajeon[i].y)
          )
        }
        options.center = new kakao.maps.LatLng(deajeon[0].startx, deajeon[0].starty)
        options.level = deajeon[0].level
      }else if(element.id == "2"){
        for(let i = 0; i<jeonju.length; i++){
          positions.push({
            title: jeonju[i].title,
            latlng: new kakao.maps.LatLng(jeonju[i].x, jeonju[i].y)
          })
          linePath.push(
            new kakao.maps.LatLng(jeonju[i].x, jeonju[i].y)
          )
        }
        options.center = new kakao.maps.LatLng(jeonju[0].startx, jeonju[0].starty)
        options.level = jeonju[0].level
      }else if(element.id == "3"){
        for(let i = 0; i<gunsan.length; i++){
          positions.push({
            title: gunsan[i].title,
            latlng: new kakao.maps.LatLng(gunsan[i].x, gunsan[i].y)
          })
          linePath.push(
            new kakao.maps.LatLng(gunsan[i].x, gunsan[i].y)
          )
        }
        options.center = new kakao.maps.LatLng(gunsan[0].startx, gunsan[0].starty)
        options.level = gunsan[0].level
      }

      draw()
    })
  });

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

const draw = () => {
  kakaoMapDiv.innerHTML = ""
  const div = document.createElement("div")
  div.id = "map"
  div.style = "width:480px;height:700px;"
  kakaoMapDiv.appendChild(div)
  var map = new kakao.maps.Map(div, options);
  var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: '#FFAE00', // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
  });

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

  polyline.setMap(map);
}
