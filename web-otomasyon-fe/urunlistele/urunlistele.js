let selectedRow = null;

window.onload = function() {
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
    window.location.href="../homepage/home.html"
}

function removeSelected() {
    if (selectedRow) {
        const productId = selectedRow.getAttribute('data-id');
        fetch(`http://localhost:8080/api/products/delete/${productId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    selectedRow.remove(); // Satırı tablodan kaldır
                    selectedRow = null;
                } else {
                    alert("Ürün silinemedi. Lütfen tekrar deneyin.");
                }
            })
            .catch(error => {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
            });
    } else {
        alert("Lütfen kaldırmak için bir ürün seçin.");
    }
}

function yenile() {
    window.location.reload();
}
