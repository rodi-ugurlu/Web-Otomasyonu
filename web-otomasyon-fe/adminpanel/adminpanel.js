document.getElementById('loginForm').addEventListener('submit', function (event) {
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
                var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
                    keyboard: true
                });
                document.querySelector('.modal-body').innerText = "KULLANICI ADINIZ VEYA ŞİFRENİZ HATALI";
                myModal.show();
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



