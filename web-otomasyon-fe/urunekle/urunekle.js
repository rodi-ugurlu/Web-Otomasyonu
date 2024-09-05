const markaField = document.getElementById("markaField");
const urunadiField = document.getElementById("urunadiField");
const alisfiyatField = document.getElementById("alisfiyatField");
const satisfiyatField = document.getElementById("satisfiyatField");
const stokField = document.getElementById("stokField");
function urunEkle() {
    if (markaField.value == "" || urunadiField.value == "" || alisfiyatField.value == "" || satisfiyatField.value == "" || stokField.value == "") {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
            keyboard: true
        });
        document.querySelector('.modal-body').innerText = "LÜTFEN TÜM KUTUCUKLARI DOLDURUNUZ";
        myModal.show();
        return;
    }

    if (markaField.value != "" && urunadiField.value != "" && alisfiyatField.value != "" && stokField.value != "") {
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
            .then(response => {

                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Sunucu hatası: ${response.status}`);
                }
            })
            .then(data => {
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                });
                document.querySelector('.modal-body').innerText = "ÜRÜN BAŞARIYLA EKLENDİ";
                document.getElementById("exampleModalLabel").innerText = "BAŞARILI";
                myModal.show();

            })
            .catch(error => {
                console.error('İstek sırasında hata oluştu:', error);
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                });
                document.querySelector('.modal-body').innerText = "ÜRÜN EKLENİRKEN BİR HATA OLUŞTU";
                document.getElementById("exampleModalLabel").innerText = "HATA!!!!";
                myModal.show()

            });
    }
}

function goBack() {
    window.history.back();
}
