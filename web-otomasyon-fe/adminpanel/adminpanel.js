document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan submit işlemini durdurur.

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json' // JSON formatında veri gönderiyoruz
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Yanıtı JSON olarak döner
        } else {
            throw new Error('Giriş işlemi başarısız oldu'); // Hata durumunda hata fırlatılır
        }
    })
    .then(result => {
        if (result.success) {
            window.location.href = "../homepage/home.html"; // Başarılı giriş sonrası yönlendirme
        } else {
            alert('Invalid username or password'); // Hatalı giriş bilgisi
        }
    })
    .catch(error => {
        console.error('Hata:', error); // Hata varsa konsola yazdırılır
    });
});



