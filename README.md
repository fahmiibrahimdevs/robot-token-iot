# Robot Token IoT

Dahsboard IoT Web untuk input token listrik jarak jauh dan monitoring via kamera berbasis MQTT.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Deskripsi

**Robot Token IoT** adalah sebuah antarmuka web yang dirancang untuk memudahkan pengguna dalam memasukkan token listrik ke meteran prabayar secara remote. Menggunakan protokol MQTT untuk komunikasi real-time, sistem ini memungkinkan pengguna mengontrol robot penekan tombol (servo/actuator) dan melihat umpan balik visual langsung dari lokasi meteran.

## ✨ Fitur Utama

- **Kendali Jarak Jauh**: Memasukkan 20 digit token listrik dari mana saja melalui dashboard web.
- **Monitoring Visual**: Integrasi feed kamera (via MQTT) untuk memverifikasi input pada layar KWH meter.
- **Koneksi Aman**: Mendukung autentikasi MQTT (Username & Password) untuk keamanan akses.
- **Konfigurasi Fleksibel**: Modal konfigurasi untuk mengatur Host, Port, dan Kredensial MQTT dengan mudah.
- **Penyimpanan Kredensial**: Opsi "Save Credential" agar tidak perlu login ulang setiap saat.
- **Desain Responsif**: Tampilan modern dan responsif menggunakan Tailwind CSS dan Flowbite.

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, Tailwind CSS, Flowbite
- **Logic**: JavaScript (jQuery)
- **Protokol Komunikasi**: Paho MQTT (Websocket)
- **Notifikasi**: SweetAlert2

## 🚀 Instalasi & Penggunaan

Proyek ini adalah static web page, sehingga tidak memerlukan instalasi backend yang rumit.

1.  **Clone Repository**

    ```bash
    git clone https://github.com/fahmiibrahimdevs/robot-token-iot.git
    cd robot-token-iot
    ```

2.  **Jalankan Aplikasi**

    - Anda bisa langsung membuka `index.html` di browser Anda.
    - Atau gunakan Live Server (VS Code Extension) untuk pengalaman yang lebih baik.

3.  **Konfigurasi MQTT**

    - Saat halaman dibuka, akan muncul modal konfigurasi.
    - Masukkan **Host**, **Port** (pastikan port Websocket, biasanya 8083 atau 9001), **Username**, dan **Password** broker MQTT Anda.
    - Klik **Connect**.

4.  **Cara Pakai**
    - Masukkan 20 digit kode token pada keypad virtual.
    - Tekan tombol kirim (`->`) untuk mengirim perintah ke robot.
    - Pantau status melalui feed kamera di dashboard.

## 📡 Topik MQTT

- `power/token`: Mengirim data token yang diinput (format: `go<TOKEN>>`).
- `cam/token`: Menerima stream gambar (Base64) dari perangkat IoT.
- `token/stat`: Perintah untuk mengambil gambar (trigger kamera).

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan fork repository ini dan buat Pull Request untuk perbaikan atau fitur baru.

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT.
