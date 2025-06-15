//TODO Bölüm 7: Node.js Event Loop'u Anlama
//  - Node.js, asenkron, olay güdümlü bir JavaScript çalışma zamanı ortamıdır.
//  Temelinde, G/Ç işlemlerini engellemeden (non-blocking I/O) yüksek performanslı uygulamalar geliştirmek için
//  tasarlanmış bir olay döngüsü (event loop) bulunur.

//? Tek İş Parçacığı (Single Thread):
//  - Node.js, ana JavaScript kodunuzu tek bir iş parçacığında çalıştırır.
//  Bu, karmaşık eşzamanlılık sorunlarından (race conditions, deadlocks) kaçınmayı kolaylaştırır.

//? Olay Döngüsü Nedir?
//  - Programın çalışır durumda kalmasını ve olayları (G/Ç tamamlanmaları, zamanlayıcılar, ağ istekleri vb.)
//  alıp işlemesini sağlayan bir döngüdür.
//  - Sürekli olarak "Olay Kuyruğu'nda (Event Queue) işlenecek bir olay var mı?" diye kontrol eder.
//  - Eğer Çağrı Yığını (Call Stack) boşsa ve Olay Kuyruğu'nda bir olay varsa,
//  bu olayın ilişkili callback fonksiyonunu alır ve Çağrı Yığını'na atarak çalıştırır.

//? Engellemeyen G/Ç (Non-blocking I/O):
//  - Node.js, dosya okuma, ağ isteği gibi G/Ç işlemlerini işletim sistemine veya libuv (C++ kütüphanesi) gibi alt seviye mekanizmalara devreder.
//  - Bu işlemler arka planda çalışırken, Node.js olay döngüsü diğer olayları işlemeye devam eder.
//  - G/Ç işlemi tamamlandığında, ilgili callback fonksiyonu Olay Kuyruğu'na eklenir.

//? Olay Döngüsünün Aşamaları (Phases - Basitleştirilmiş):
//* 1- Timers (Zamanlayıcılar):
//  - setTimeout() ve setInterval() tarafından planlanan callback'leri çalıştırır.
//* 2- Pending Callbacks / I/O Callbacks:
//  - Çoğu G/Ç işleminin (ağ, dosya sistemi) tamamlanma callback'lerini çalıştırır (zamanlayıcılar ve setImmediate() hariç).
//* 3- Idle, Prepare:
//  - Sadece dahili kullanım içindir.
//* 4- Poll (Yoklama):
//  - Yeni G/Ç olaylarını alır; uygunsa G/Ç ile ilgili callback'leri çalıştırır.
//  Eğer kuyrukta işlenecek bir şey yoksa ve zamanlayıcılar da yoksa, burada yeni olayların gelmesini bekleyebilir (block).
//* 5- Check (Kontrol):
//  - setImmediate() callback'lerini çalıştırır (Poll aşaması tamamlandıktan hemen sonra).
//* 6- Close Callbacks:
//  - Kapatma olaylarının (socket.on('close', ...) gibi) callback'lerini çalıştırır.

//! - Bu aşamalar arasında "nextTickQueue" (process.nextTick() ile eklenenler) ve
//! "microtaskQueue" (Promise'ların .then/.catch/.finally callback'leri) gibi daha yüksek öncelikli kuyruklar da işlenir.
//!  Genellikle bir aşama tamamlandıktan sonra bu kuyruklar boşaltılır.

//? Neden Önemli?
//  - Node.js'in nasıl çalıştığını anlamak, performanslı ve duyarlı uygulamalar yazmak için kritiktir.
//  - Uzun süren senkron işlemler (CPU-yoğun hesaplamalar) olay döngüsünü engelleyebilir ve
//  uygulamanın yanıt vermemesine neden olabilir. Bu tür işlemler worker thread'lere veya daha küçük parçalara bölünerek yönetilmelidir.
//  - Callback'lerin ne zaman çalışacağını ve asenkron kodun akışını tahmin edebilmek için önemlidir.

{
  // Node.js Event Loop Örneği
  console.log("1. Başlangıç"); // Call Stack'e girer, çalışır, çıkar

  setTimeout(() => {
    console.log("5. setTimeout callback (Timer Aşaması)"); // Timer kuyruğuna eklenir
  }, 0); // 0ms gecikme bile olsa, hemen çalışmaz, döngüden geçer

  setImmediate(() => {
    console.log("6. setImmediate callback (Check Aşaması)"); // Check kuyruğuna eklenir
  });

  Promise.resolve().then(() => {
    console.log("3. Promise.then callback (Microtask Kuyruğu)"); // Microtask kuyruğuna eklenir
  });

  process.nextTick(() => {
    console.log("2. process.nextTick callback (NextTick Kuyruğu)"); // NextTick kuyruğuna eklenir (en yüksek öncelik)
  });

  const fs = require("fs");
  fs.readFile(__filename, () => {
    // Bu dosyanın kendisini oku
    console.log("7. Dosya okuma callback (I/O Callbacks / Poll Aşaması)"); // I/O kuyruğuna eklenir
    setTimeout(() => console.log("8. Dosya okuma içindeki setTimeout"), 0);
    setImmediate(() => console.log("9. Dosya okuma içindeki setImmediate"));
  });

  console.log("4. Bitiş"); // Call Stack'e girer, çalışır, çıkar

  // Beklenen Çıktı Sırası (yaklaşık, I/O zamanlamasına göre değişebilir):
  // 1. Başlangıç
  // 4. Bitiş
  // 2. process.nextTick callback (NextTick Kuyruğu)
  // 3. Promise.then callback (Microtask Kuyruğu)
  // 5. setTimeout callback (Timer Aşaması)
  // 6. setImmediate callback (Check Aşaması)
  // 7. Dosya okuma callback (I/O Callbacks / Poll Aşaması)
  // (Dosya okuma callback'i içindekiler de kendi sıralarına göre çalışır)
  // 9. Dosya okuma içindeki setImmediate (dosya okuma callback'i içindeki check aşaması)
  // 8. Dosya okuma içindeki setTimeout (dosya okuma callback'i içindeki bir sonraki timer aşaması)
}

//! Bu sıralama, kuyrukların önceliklerine ve olay döngüsünün aşamalarına bağlıdır.
