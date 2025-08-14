<?php
// users.json dosyasının yolu
$file = 'users.json';

// Dosya varsa oku, yoksa boş dizi
$users = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Formdan gelen veriler
$username = trim($_POST['username']);
$email = trim($_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Zaten kayıtlı mı kontrol et
foreach ($users as $user) {
  if ($user['username'] === $username || $user['email'] === $email) {
    echo "Bu kullanıcı adı veya e-posta zaten kullanılıyor!";
    exit;
  }
}

// Yeni kullanıcıyı diziye ekle
$users[] = [
  'username' => $username,
  'email' => $email,
  'password' => $password
];

// Güncellenmiş diziyi dosyaya yaz
file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));

echo "Kayıt başarılı!";
?>
