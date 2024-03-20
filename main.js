const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btn");
const resultDiv = document.getElementById("result");

const API_KEY = "e9f6d62d4a799a271582cdca26305fe4"; // 카카오 API 키를 넣으시면 됩니다.

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value;

    try {
        const res = await fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}+식당`, {
            headers: { 'Authorization': 'KakaoAK ' + API_KEY }
        });
        const data = await res.json();
        const restaurants = data.documents;
        
        if (!restaurants.length) {
            resultDiv.innerHTML = "검색 결과가 없습니다.";
        } else {
            const randomIndex = Math.floor(Math.random() * restaurants.length);
            const selectedRestaurant = restaurants[randomIndex];

            const restaurantInfo = `
                <h2>${selectedRestaurant.place_name}</h2>
                <p>주소: ${selectedRestaurant.address_name}</p>
                <p>전화번호: ${selectedRestaurant.phone}</p>
                <a href="${selectedRestaurant.place_url}" target="_blank">카카오맵에서 보기</a>
            `;

            resultDiv.innerHTML = restaurantInfo;
        }
    } catch (error) {
        resultDiv.innerHTML = "오류가 발생했습니다.";
    }
});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

