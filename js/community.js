document.addEventListener("DOMContentLoaded", function() {
    const hashTags = document.querySelectorAll('.articles p:last-child');
    const searchInput = document.getElementById('searchInput');

    // 각 게시물에 여러 개의 해시태그 추가
    hashTags[0].textContent += '#유명스팟 #보문산 #성심당';
    hashTags[1].textContent += '#전주 #수목원 #한옥';
    hashTags[2].textContent += '#테스트 #해시태그';

    // 선택된 해시태그에 따라 게시물 필터링
    function filterByTags() {
        const selectedTags = searchInput.value.split(' ');

        const articles = document.querySelectorAll('.articles');
        articles.forEach(article => {
            const tags = article.querySelector('p:last-child').textContent.split(' ');
            if (selectedTags.every(tag => tags.includes('#' + tag))) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
});