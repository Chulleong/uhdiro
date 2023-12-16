var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var positions = [
  [new kakao.maps.LatLng(33.450705, 126.570677)],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

for (var i = 0; i < positions.length; i ++) {
  for (var j = 0; j<positions[i].length; j++) {
    // 마커를 생성합니다
    try{
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i][j]
      });
    } catch {}
  }
}

// 지도에 마커를 표시합니다
marker.setMap(map);

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
  // 클릭한 위도, 경도 정보를 가져옵니다 
  var latlng = mouseEvent.latLng; 
  
  // 마커 위치를 클릭한 위치로 옮깁니다
  positions[0] = latlng;

  // 지도 중심 위치 변경
  map.panTo(latlng);
});

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
  var newFunction = 'add_dailyplan('+(day-1)+')'
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

  var newPlace = document.createElement('place');
  newPlace.setAttribute('class',daynumber+'_'+course[daynumber]);
  newPlace.textContent = '지도에서 위치를 선택하세요.';
  newDetails1.appendChild(newPlace);

  var newButton = document.createElement('button');
  var newFunction = 'choose_place('+daynumber+','+course[daynumber]+')'
  newButton.setAttribute('onclick',newFunction);
  newButton.textContent = '장소 선택'
  newDetails2.appendChild(newButton);

  var textBox = '<textarea placeholder="경비, 교통편 등의 기타 정보를 적어주세요." autofocus></textarea>'
  newDetails3.insertAdjacentHTML('beforeend', textBox);

  newDetails.appendChild(newDetails1);
  newDetails.appendChild(newDetails2);
  newDetails.appendChild(newDetails3);

  newPlan.appendChild(newDetails);

  document.querySelector('.plan_day').querySelector('ul').querySelectorAll('ul')[daynumber].appendChild(newPlan);
  
  course[daynumber]++;

  var line = '<hr style="width: 90%; height: 4px;border: none;background-color: #AACCFF;margin-left: 7%;border-radius: 20px;">'
  document.querySelector('.plan_day').querySelector('ul').querySelectorAll('ul')[daynumber].insertAdjacentHTML('beforeend', line);
  }
}

function choose_place(daynumber, coursenumber){
  positions[daynumber][coursenumber] = map.getCenter();

  var address = '위도: ' + positions[daynumber][coursenumber].getLng() + ', 경도: ' + positions[daynumber][coursenumber].getLat();

  var classtag = daynumber+'_'+coursenumber;

  let x = document.getElementsByClassName(classtag)[0];
  x.innerText = address;
}