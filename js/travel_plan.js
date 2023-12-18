var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(36.366453, 127.34481), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var markers = [new kakao.maps.Marker({
  map: map,
  position: map.getCenter()
}), [], [], [], [], [], [], [], [], [], []
];

for(var i=1;i<11;i++){
  for(var j=0;j<10;j++){
    markers[i][j] = new kakao.maps.Marker({
      map: null,
      position: null
    });
  }
}
var customOverlay = [[], [], [], [], [], [], [], [], [], []];

// 각 일차별 색상 배열 (예: 빨강, 파랑, 노랑, 초록, ... )
var dayColors = ['#00ffff', '#00bbff', '#0088ff', '#0055ff', '#00ff00', '#00cc55', '#00aaaa', '#ffcc00', '#ff9900', 'ff5500'];

// 각 코스별 텍스트 배열
var courseTexts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

var style = document.createElement('style');
style.textContent = '.custom-marker { width: 35px; height: 35px; line-height: 35px; text-align: center; font-size: 14px; font-weight: bold; color: #FFFFFF; border-radius: 50%; }';
document.head.appendChild(style);

function createMarkerDiv(color, text) {
  var markerDiv = document.createElement('div');
  markerDiv.className = 'custom-marker';
  markerDiv.style.backgroundColor = color;
  markerDiv.innerText = text;

  return markerDiv;
}

for(var i=0;i<10;i++){
  for(var j=0;j<10;j++){
    var color = dayColors[i];
    var text = courseTexts[j];
    var markerDiv = createMarkerDiv(color, text);
    customOverlay[i][j] = new kakao.maps.CustomOverlay({
      map: null,
      position: null,
      content: markerDiv,
      zIndex: 3,
      yAnchor: 1
    });
  }
}

// 지도에 마커를 표시합니다
markers[0].setMap(map);

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
  // 클릭한 위도, 경도 정보를 가져옵니다 
  var latlng = mouseEvent.latLng; 
  
  // 마커 위치를 클릭한 위치로 옮깁니다
  markers[0].setPosition(latlng);

  // 지도 중심 위치 변경
  map.panTo(latlng);
});

var lines = [];

var linecolor = ['#00ffff', '#00bbff', '#0088ff', '#0055ff', '#00ff00', '#00cc55', '#00aaaa', '#ffcc00', '#ff9900', 'ff5500'];

// 선을 그리는 함수
function drawLines() {
  // 기존에 추가된 선을 모두 제거합니다.
  for (var i = 0; i < lines.length; i++) {
      lines[i].setMap(null);
  }

  // 새로운 선을 추가합니다.
  for (var i = 0; i < day; i++) {
      var path = [];
      for (var j = 0; j < course[i+1]; j++) {
          if (customOverlay[i][j].getMap() !== null) {
              path.push(customOverlay[i][j].getPosition());
          }
      }
      if (path.length > 0) {
        for (var n = i+1; n < day; n++) {
          var check = false;
          for (var e = 0; e < course[n]; e++) {
              if (customOverlay[n][e].getMap() !== null) {
                  path.push(customOverlay[n][e].getPosition());
                  check = true;
                  break;
              }
          }
          if (check){break;}
        }
      }
      if (path.length > 1) {
          var polyline = new kakao.maps.Polyline({
              path: path, // 선을 구성하는 좌표배열 입니다
              strokeWeight: 5, // 선의 두께 입니다
              strokeColor: linecolor[i], // 선의 색깔입니다
              strokeOpacity: 0.7, // 선의 불투명도 입니다
              strokeStyle: 'solid' // 선의 스타일입니다
          });

          lines.push(polyline);

          polyline.setMap(map); // 지도에 선을 표시합니다.
      }
  }
}

var day = 1;
var course = [1];

function clickshow(elem,ID) {
 var menu = document.getElementById(ID);
 if (elem.className !='plan_list_oc') {
    elem.className = 'plan_list_oc';
    menu.style.display = "none";
 } else {
    elem.className ='opened';
    menu.style.display ="block";
}}

function add_day() {
  if(day<11){
  course.push(1)

  var newList = document.createElement('li');
  newList.setAttribute('id','day'+day);

  var newText = document.createElement('p');
  newText.textContent = day+'일차';
  newList.appendChild(newText);

  var newUL = document.createElement('ul');
  newList.appendChild(newUL);

  var newButton = document.createElement('button');
  var newFunction = 'add_dailyplan('+(day)+')'
  newButton.setAttribute('onclick',newFunction);
  newButton.textContent = '일정 추가'
  newList.appendChild(newButton);
  
  day++;

  document.querySelector('.plan_day').querySelector('ul').appendChild(newList);
  var line = '<hr style="width: 98%; height: 5px;border: none;background-color: #000;border-radius: 20px;">'
  document.querySelector('.plan_day').querySelector('ul').insertAdjacentHTML('before', line);
  }
}

function add_dailyplan(daynumber){
  if(course[daynumber]<11){
  var newPlan = document.createElement('li');

  var newArticle = document.createElement('article');
  newPlan.appendChild(newArticle);

  var newText = document.createElement('p');
  newText.textContent = course[daynumber];
  newPlan.appendChild(newText);

  var newDetails = document.createElement('detail');
  var newDetails1 = document.createElement('li');
  var newDetails2 = document.createElement('li');
  var newDetails3 = document.createElement('li');
  var newDetails4 = document.createElement('li');

  var newPlace = document.createElement('place');
  newPlace.setAttribute('class',daynumber+'_'+course[daynumber]);
  newPlace.textContent = '지도에서 위치를 선택하세요.';
  newDetails1.appendChild(newPlace);

  var newButton1 = document.createElement('button');
  var newFunction1 = 'choose_place('+daynumber+','+course[daynumber]+')'
  newButton1.setAttribute('onclick',newFunction1);
  newButton1.textContent = '장소 선택'
  newDetails2.appendChild(newButton1);

  var textBox = '<textarea placeholder="경비, 교통편 등의 기타 정보를 적어주세요." autofocus></textarea>'
  newDetails3.insertAdjacentHTML('beforeend', textBox);

  var newButton2 = document.createElement('button');
  var newFunction2 = 'add_file('+daynumber+','+course[daynumber]+')'
  newButton2.setAttribute('onclick',newFunction2);
  newButton2.textContent = '파일 추가'
  newDetails4.appendChild(newButton2);

  newDetails.appendChild(newDetails1);
  newDetails.appendChild(newDetails2);
  newDetails.appendChild(newDetails3);
  newDetails.appendChild(newDetails4);

  newPlan.appendChild(newDetails);

  document.querySelector('.plan_day').querySelector('ul').querySelectorAll('ul')[daynumber-1].appendChild(newPlan);
  
  course[daynumber]++;

  var line = '<hr style="width: 90%; height: 4px;border: none;background-color: #AACCFF;margin-left: 7%;border-radius: 20px;">'
  document.querySelector('.plan_day').querySelector('ul').querySelectorAll('ul')[daynumber-1].insertAdjacentHTML('beforeend', line);
  }
}

function choose_place(daynumber, coursenumber){
  center = map.getCenter();
  
  markers[daynumber][coursenumber-1].setPosition(center);

  customOverlay[daynumber-1][coursenumber-1].setPosition(center);
  customOverlay[daynumber-1][coursenumber-1].setMap(map);

  var address = '위도: ' + center.getLng() + ', 경도: ' + center.getLat();

  var classtag = daynumber+'_'+coursenumber;

  let x = document.getElementsByClassName(classtag)[0];
  x.innerText = address;

  drawLines();
}

function renamePlan(){
  var text = 'abcd';
  let name = document.querySelector('.plan_name').querySelector(h1);
  name.textContent = text;
}

function addPlan(){

}

function add_file(daynumber, coursenumber){
  newLI = document.createElement('li');
  var img = document.createElement('img'); // 이미지 객체 생성
 
  var rnd = Math.round(Math.random() * 20) + 1; // 이미지 랜덤하게 보여주기 위한 ..
  if(rnd < 10)rnd = '0' + rnd;
        
  img.src = "../img/test.png";

  newLI.appendChild(img);
  document.querySelector('.plan_day').querySelector('ul').querySelectorAll('ul')[daynumber-1].querySelectorAll('detail')[coursenumber-1].appendChild(newLI);
}