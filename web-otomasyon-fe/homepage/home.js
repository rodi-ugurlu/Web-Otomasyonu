const listeleButonu=document.getElementById("listele-butonu");
const sorgulaButonu=document.getElementById("sorgula-butonu");
const ekleButonu=document.getElementById("ekle-butonu");
const guncelleButonu=document.getElementById("guncelle-butonu");


listeleButonu.addEventListener("click",()=>{
    window.location.href="../urunlistele/urunlistele.html"
})


sorgulaButonu.addEventListener("click",()=>{
    window.location.href="../urunsorgulama/urunsorgula.html"
})

ekleButonu.addEventListener("click",()=>{
    window.location.href="../urunekle/urunekle.html"
})
guncelleButonu.addEventListener("click",()=>{
    window.location.href="../urunguncelle/urunguncelle.html"
})
