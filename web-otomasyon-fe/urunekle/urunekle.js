const markaField = document.getElementById("markaField");
const urunadiField = document.getElementById("urunadiField");
const alisfiyatField = document.getElementById("alisfiyatField");
const satisfiyatField = document.getElementById("satisfiyatField");
const stokField = document.getElementById("stokField");

function urunEkle() {

    fetch("http://localhost:8080/api/products/addProduct", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            marka: markaField.value,
            urunadi: urunadiField.value,
            alisfiyat: alisfiyatField.value,
            satisfiyat: satisfiyatField.value,
            stok: stokField.value,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Ürün başarıyla eklendi.');
            } else {
                console.error('Ürün eklenirken hata oluştu:', data.message);
            }
        })
        .catch(error => {
            console.error('İstek sırasında hata oluştu:', error);
        });
}

function goBack() {
    window.history.back();
}
