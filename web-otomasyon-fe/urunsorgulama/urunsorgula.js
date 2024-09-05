
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
            }
            else if(urunadi===""){
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                });
                document.querySelector('.modal-body').innerText = "LÜTFEN TÜM KUTUCUKLARI DOLDURUNUZ";
                myModal.show();
            }
            else {
                products.forEach(product => {
                    const row = `<tr>
                                    <td>${product.id}</td>
                                    <td>${product.urunadi}</td>
                                    <td>${product.marka}</td>
                                    <td>${product.alisfiyat}</td>
                                    <td>${product.satisfiyat}</td>
                                    <td>${product.stok}</td>
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


