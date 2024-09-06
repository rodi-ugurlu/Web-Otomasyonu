let selectedRow = null;
const markaField = document.getElementById('markaField');
const urunadField = document.getElementById('urunadField');
const alisfiyatField = document.getElementById('alisfiyatField');
const satisfiyatField = document.getElementById('satisfiyatField');
const stokField = document.getElementById('stokField');

window.onload = function () {
    fetch("http://localhost:8080/api/products")
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('tableBody');
            products.forEach(product => {
                const row = `<tr onclick="selectRow(this)" data-id="${product.id}">
                <td>${product.id}</td>
                <td>${product.marka}</td>
                <td>${product.urunadi}</td>
                <td>${product.alisfiyat}</td>
                <td>${product.satisfiyat}</td>
                <td>${product.stok}</td>
                <td id="dynamicGuncelle">
                    <button style="margin-right: 10px;" onclick="urunGuncelle(this)">Güncelle</button>
                    <button id="dynamicSil" onclick="removeSelected(this)">Sil</button>
                </td>
            </tr>`;

                tableBody.innerHTML += row;
            });
        });
};

function selectRow(row) {
    if (selectedRow !== null) {
        selectedRow.classList.remove("selected");
    }
    selectedRow = row;
    selectedRow.classList.add("selected");
}

function goBack() {
    window.location.href = "../homepage/home.html";
}

function removeSelected(button) {
    var row = button.parentNode.parentNode; // Butonun bulunduğu satırı seçmek için parentNode kullan
    if (selectedRow !== null) {
        selectedRow.classList.remove("selected");
    }
    selectedRow = row;
    selectedRow.classList.add("selected");

    if (selectedRow) {
        const productId = selectedRow.getAttribute('data-id');
        fetch(`http://localhost:8080/api/products/delete/${productId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    selectedRow.remove(); // Satırı tablodan kaldır
                    selectedRow = null;
                } else if (selectedRow === null) {
                    // Hata yönetimi
                }
            })
            .catch(error => {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
            });
    } else {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
            keyboard: true
        });
        document.querySelector('.modal-body').innerText = "LÜTFEN SİLMEK İÇİN BİR ÜRÜN SEÇİNİZ";
        myModal.show();
    }
}

function yenile() {
    window.location.reload();
}

// ÜRÜN SORGULAMA FONKSİYONU
function executeQuery() {
    const urunadi = document.getElementById('queryInput').value;
    const url = `http://localhost:8080/api/products/query?urunadi=${encodeURIComponent(urunadi)}`;

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            if (products.length === 0) {
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                });
                document.querySelector('.modal-body').innerText = "Böyle bir ürün bulunamadı.";
                myModal.show();
            } else if (urunadi === "") {
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                });
                document.querySelector('.modal-body').innerText = "LÜTFEN TÜM KUTUCUKLARI DOLDURUNUZ";
                myModal.show();
            } else {
                products.forEach(product => {
                    const row = `<tr onclick="selectRow(this)" data-id="${product.id}">
                                    <td>${product.id}</td>
                                    <td>${product.marka}</td>
                                    <td>${product.urunadi}</td>
                                    <td>${product.alisfiyat}</td>
                                    <td>${product.satisfiyat}</td>
                                    <td>${product.stok}</td>
                                    <td id="dynamicGuncelle">
                                        <button style="margin-right: 10px;" onclick="urunGuncelle(this)">Güncelle</button>
                                        <button id="dynamicSil">Sil</button>
                                    </td>
                                </tr>`;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                keyboard: true
            });
            document.querySelector('.modal-body').innerText = "Ürün araması sırasında bir hata oluştu.";
            myModal.show();
        });
}

function urunGuncelle(button) {
    var row = button.parentNode.parentNode; // Butonun bulunduğu satırı seçmek için parentNode kullan
    var guncelleModal = new bootstrap.Modal(document.getElementById('updateProductModal'), {
        keyboard: true
    });
    guncelleModal.show();

    if (selectedRow !== null) {
        selectedRow.classList.remove("selected");
    }
    selectedRow = row;
    selectedRow.classList.add("selected");

    markaField.value = selectedRow.cells[1].textContent;
    urunadField.value = selectedRow.cells[2].textContent;
    alisfiyatField.value = selectedRow.cells[3].textContent;
    satisfiyatField.value = selectedRow.cells[4].textContent;
    stokField.value = selectedRow.cells[5].textContent;
}

function updateMyProduct() {
    if (alisfiyatField.value < 0 || satisfiyatField.value < 0 || stokField.value < 0) {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
            keyboard: true
        });
        document.querySelector('.modal-body').innerText = "EKSI DEGER GIRMEYINIZ";
        document.getElementById("exampleModalLabel").innerText = "HATA!!!!!!!"
        var guncelleModal = bootstrap.Modal.getInstance(document.getElementById('updateProductModal'));
        guncelleModal.hide();
        myModal.show();
        return;
    }
    if (selectedRow !== null) {
        fetch("http://localhost:8080/api/products/updateProduct", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                id: selectedRow.cells[0].textContent,
                urunadi: urunadField.value,
                marka: markaField.value,
                alisfiyat: alisfiyatField.value,
                satisfiyat: satisfiyatField.value,
                stok: stokField.value,
            })
        })
            .then(response => {
                if (response.ok) {
                    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                        keyboard: true
                    });
                    document.querySelector('.modal-body').innerText = "ÜRÜN BAŞARIYLA GÜNCELLENDİ";
                    document.getElementById("exampleModalLabel").innerText = "BAŞARILI"
                    myModal.show();
                    var guncelleModal = bootstrap.Modal.getInstance(document.getElementById('updateProductModal'));
                    guncelleModal.hide();
                } else {
                    console.error('Ürün güncellenirken hata oluştu.');
                }
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    } else {
        console.error("Hiçbir satır seçilmedi.");
    }

}



