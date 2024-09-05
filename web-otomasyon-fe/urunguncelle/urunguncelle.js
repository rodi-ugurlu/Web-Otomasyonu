let selectedRow = null;
const saveChangeButton=document.getElementById("saveChangesButton")
const markaField = document.getElementById("markafield");
const urunadiField = document.getElementById("urunadiField");
const alisfiyatField = document.getElementById("alisfiyatField");
const satisfiyatField = document.getElementById("satisfiyatField");
const stokField = document.getElementById("stokField");

function selectRow(row) {
    if (selectedRow !== null) {
        selectedRow.classList.remove("selected");
    }

    selectedRow = row;
    selectedRow.classList.add("selected");

    urunadiField.value = selectedRow.cells[1].textContent;
    markaField.value = selectedRow.cells[2].textContent;
    alisfiyatField.value = selectedRow.cells[3].textContent;
    satisfiyatField.value = selectedRow.cells[4].textContent;
    stokField.value = selectedRow.cells[5].textContent;
}

// Ürün sorgulama işlemi
function executeQuery() {
    const urunadi = document.getElementById('aramafield').value;
    const url = `http://localhost:8080/api/products/query?urunadi=${encodeURIComponent(urunadi)}`;

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';


            products.forEach(product => {
                const row = `<tr onclick="selectRow(this)">
                                <td>${product.id}</td>
                                <td>${product.urunadi}</td>
                                <td>${product.marka}</td>
                                <td>${product.alisfiyat}</td>
                                <td>${product.satisfiyat}</td>
                                <td>${product.stok}</td>
                            </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Ürünler getirilirken hata oluştu:', error);
        });
}

// Ürün güncelleme işlemi
function updateProduct() {
    if (selectedRow !== null) {
        fetch("http://localhost:8080/api/products/updateProduct", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                id: selectedRow.cells[0].textContent,
                urunadi: urunadiField.value,
                marka: markaField.value,
                alisfiyat: alisfiyatField.value,
                satisfiyat: satisfiyatField.value,
                stok: stokField.value,
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Ürün başarıyla güncellendi.');
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


