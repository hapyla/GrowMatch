// Fungsi untuk reverse geocoding menggunakan OpenCage API
async function reverseGeocode(latitude, longitude) {
  const apiKey = "da86d0562cc04eea8d594de02b802353"; // API Key Anda
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal mendapatkan data lokasi.");

      const data = await response.json();

      // Ambil nama kota atau lokasi
      const location = data.results[0]?.components?.city || 
                       data.results[0]?.components?.town || 
                       data.results[0]?.components?.village || 
                       "Lokasi Tidak Diketahui";
      return location;
  } catch (error) {
      console.error("Error saat reverse geocoding:", error);
      return "Lokasi Tidak Diketahui";
  }
}

// Fungsi untuk mendapatkan lokasi pengguna dan melakukan reverse geocoding
async function getLiveLocation() {
  if (!navigator.geolocation) {
      alert("Geolocation tidak didukung di browser Anda.");
      return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Panggil reverse geocode
      const location = await reverseGeocode(latitude, longitude);
      document.getElementById('lokasi').value = location; // Tampilkan nama lokasi di input form

      // Tambahkan logika cuaca jika diperlukan
      alert(`Lokasi Anda: ${location}`);
  }, (error) => {
      alert("Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.");
  });
}

// Event Listener untuk tombol "Gunakan Lokasi Saya"
document.getElementById('live-location-btn').addEventListener('click', getLiveLocation);

