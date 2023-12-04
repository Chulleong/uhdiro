//페이지 로드 이벤트
window.addEventListener("load", ()=>{
  const grid = new Isotope("section", {
    itemSelector: "article",
    columnWidth: "article",
    transitionDuration: "0.5s"
  })
})