//TODO Bölüm 5: Async/Await Kullanımı (ES2017+)

//? Amaç:
//  - Asenkron kodu, senkron koda benzer bir sözdizimiyle yazmayı sağlayan bir "sentaktik şeker"dir.
//  Temelde Promise'ler üzerine kuruludur. Promise zincirlerini (.then(), .catch()) daha okunabilir hale getirir.

//? async Anahtar Kelimesi:
//  - Bir fonksiyon tanımının başına async yazıldığında, o fonksiyon otomatik olarak bir Promise döndürür.
//  - Eğer fonksiyon bir değer return ederse, bu değerle çözülmüş bir Promise döndürür.
//  - Eğer fonksiyon bir hata throw ederse, bu hatayla reddedilmiş bir Promise döndürür.

//? await Anahtar Kelimesi:
//  - Sadece async fonksiyonlar içinde kullanılabilir.
//  - Bir Promise'in önüne konulduğunda, Promise çözülene veya reddedilene kadar async fonksiyonun çalışmasını duraklatır
//  (ancak JavaScript motorunun ana iş parçacığını engellemez).
//  - Promise çözüldüğünde, await ifadesi Promise'in çözülmüş değerini döndürür.
//  - Promise reddedildiğinde, await ifadesi bir hata fırlatır (bu hata try...catch ile yakalanabilir).

//? Async/Await Örneği:
{
  function fetchData(id, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`fetchData(${id}) çağrıldı...`);
        if (id > 0) {
          resolve({ id: id, message: `Veri ${id} başarıyla alındı.` });
        } else {
          reject(new Error(`Geçersiz ID: ${id}`));
        }
      }, delay);
    });
  }

  // Async/Await ile (daha okunabilir)
  async function processDataAsync() {
    console.log("Async fonksiyon başlatıldı.");
    try {
      const data1 = await fetchData(1, 1000); // Duraklar, Promise çözülene kadar bekler
      console.log("Async 1:", data1);

      const data2 = await fetchData(2, 500);
      console.log("Async 2:", data2);

      const data3 = await fetchData(3, 1200);
      console.log("Async 3:", data3);

      // Hatalı ID ile deneme
      // const data4 = await fetchData(-1, 300);
      // console.log("Async 4:", data4); // Bu satıra ulaşmayacak

      console.log("Tüm veriler işlendi (Async/Await).");
      return "Async işlem tamamlandı!"; // Bu, fonksiyonun döndürdüğü Promise'in çözülmüş değeri olur
    } catch (error) {
      console.error("Hata (Async/Await):", error.message);
      throw error; // Hatanın dışarıya da yayılmasını sağlar (opsiyonel)
    } finally {
      console.log("Async fonksiyon sonlandı (finally bloğu).");
    }
  }

  processDataAsync()
    .then((result) => console.log("Ana Akış - Async Başarılı:", result))
    .catch((error) => console.error("Ana Akış - Async Hata:", error.message));

  console.log("Async fonksiyon çağrıldı, işlemler devam ediyor...");

  // Paralel Async/Await (Promise.all ile)
  async function fetchDataParallel() {
    try {
      console.log("\nParalel veri alma başlıyor...");
      // Promise.all, Promise'leri paralel başlatır, hepsi tamamlandığında devam eder
      const [resultA, resultB, resultC] = await Promise.all([
        fetchData(10, 800),
        fetchData(20, 400),
        fetchData(30, 1000),
      ]);
      console.log("Paralel Sonuç A:", resultA);
      console.log("Paralel Sonuç B:", resultB);
      console.log("Paralel Sonuç C:", resultC);
    } catch (error) {
      console.error("Paralel Hata:", error.message);
    }
  }
  fetchDataParallel();
}

//! Async/await, asenkron kodu daha yönetilebilir ve anlaşılır hale getirerek modern JavaScript geliştirmesinin önemli bir parçası olmuştur.
