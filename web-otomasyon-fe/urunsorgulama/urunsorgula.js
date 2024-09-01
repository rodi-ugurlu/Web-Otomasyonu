function executeQuery() {

    const urunadi = document.getElementById('queryInput').value;

    const url = `http://localhost:8080/api/products/query?urunadi=${encodeURIComponent(urunadi)}`;

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';


            products.forEach(product => {
                const row = `<tr>
                                 <td>${product.id}</td>
                                <td>${product.marka}</td>
                                <td>${product.urunadi}</td>
                                <td>${product.alisfiyat}</td>
                                <td>${product.satisfiyat}</td>
                                <td>${product.stok}</td>
                            </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}
