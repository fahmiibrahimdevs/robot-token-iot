# Dokumentasi Proyek: Robot Token IoT

## 📌 Ringkasan

**Robot Token IoT** adalah solusi inovatif untuk masalah pengisian token listrik pada KWH meter prabayar yang terletak di lokasi sulit dijangkau atau ketika pemilik rumah sedang tidak berada di tempat. Proyek ini menggabungkan antarmuka web modern dengan teknologi IoT untuk menciptakan sistem kendali jarak jauh yang responsif dan user-friendly.

Dengan memanfaatkan protokol MQTT yang ringan dan cepat, dashboard ini bertindak sebagai "remote control" universal yang dapat berkomunikasi dengan mikrokontroler (seperti ESP32/Arduino) yang terpasang pada alat robotik penekan tombol fisik di meteran listrik.

## 🎯 Tujuan

Tujuan utama dari pengembangan proyek ini adalah:

1.  **Efisiensi**: Mempercepat proses pengisian token listrik tanpa harus berinteraksi fisik langsung dengan meteran.
2.  **Aksesibilitas**: Memungkinkan pengisian token dari jarak jauh (remote), sangat berguna untuk properti sewaan, rumah kosong, atau lokasi meteran yang tinggi/tersembunyi.
3.  **Monitoring**: Memberikan kepastian keberhasilan input melalui umpan balik visual real-time.

## 🌟 Fitur Utama

### 1. Dashboard Interaktif

Antarmuka pengguna (UI) dirancang menyerupai keypad fisik KWH meter untuk familiaritas pengguna. Dilengkapi dengan tampilan digital yang menunjukkan digit yang sedang diketik.

### 2. Konfigurasi Koneksi Dinamis

Pengguna tidak perlu mengedit kode untuk mengubah server broker. Fitur modal konfigurasi memungkinkan pengguna memasukkan alamat Broker MQTT, Port, Username, dan Password langsung dari browser. Sistem juga menyimpan kredensial ini secara lokal (Local Storage) untuk kemudahan akses berikutnya.

### 3. Integrasi Kamera Real-Time

Salah satu fitur unggulan adalah kemampuan menampilkan gambar langsung dari lokasi meteran. Melalui topik MQTT khusus, perangkat IoT dapat mengirimkan capture gambar kondisi layar KWH meter ke dashboard, memastikan token yang dimasukkan benar atau melihat sisa pulsa.

### 4. Keamanan Koneksi

Mendukung autentikasi username dan password MQTT, memastikan hanya pemilik otoritas yang dapat mengendalikan robot token tersebut.

## ⚙️ Cara Kerja Sistem

1.  **Inisialisasi**: Pengguna membuka web dashboard dan menghubungkannya ke Broker MQTT melalui WebSocket.
2.  **Input Token**: Pengguna mengetik 20 digit nomor token pada keypad virtual di layar.
3.  **Eksekusi**: Saat tombol kirim ditekan, dashboard memvalidasi input dan mengirimkannya sebagai payload enkripsi/string ke topik `power/token`.
4.  **Aksi Perangkat**: Mikrokontroler (Subscriber) menerima pesan tersebut, mem-parsing nomor token, dan menggerakkan actuator/servo untuk menekan tombol fisik pada KWH meter sesuai urutan angka.
5.  **Validasi Visual**: Perangkat mengirimkan balikan gambar melalui topik `cam/token` yang langsung ditampilkan di dashboard agar pengguna bisa melihat hasil penekanan tombol.

---

_Dibuat dengan ❤️ untuk kemudahan otomatisasi rumah Anda._
