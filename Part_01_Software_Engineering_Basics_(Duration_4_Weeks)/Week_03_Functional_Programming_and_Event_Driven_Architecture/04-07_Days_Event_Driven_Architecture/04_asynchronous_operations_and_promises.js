//TODO Bölüm 4: Asenkron İşlemler ve Promise API
//  - JavaScript, doğası gereği tek iş parçacıklı (single-threaded) bir dildir, yani aynı anda sadece bir komutu işleyebilir.
//  Ancak, G/Ç (I/O) işlemleri (dosya okuma/yazma, ağ istekleri) gibi zaman alıcı operasyonlar programın
//  donmasına (blocking) neden olabilir. Asenkron programlama, bu tür işlemlerin programın geri kalanını engellemeden
//  arka planda çalışmasını ve tamamlandığında bir şekilde bildirimde bulunmasını sağlar.
//  - EDA, asenkron işlemlerle çok yakından ilişkilidir çünkü olaylar genellikle asenkron olarak gerçekleşir ve işlenir.

//! 4.1. Asenkron Programlamanın Temelleri

//? Senkron (Synchronous):
//  - İşlemler sırayla, biri bitmeden diğeri başlamaz. Eğer bir işlem uzun sürerse, sonraki işlemler beklemek zorunda kalır.
//? Asenkron (Asynchronous):
//  - Bir işlem başlatılır, ancak tamamlanması beklenmeden program akışına devam edilir.
//  İşlem tamamlandığında (başarıyla veya hatayla), genellikle bir callback fonksiyonu çağrılır veya bir Promise çözülür/reddedilir.

//! 4.2. Callback Fonksiyonları (Geleneksel Yöntem)
//  - Bir asenkron işlem tamamlandığında çağrılmak üzere başka bir fonksiyona parametre olarak geçirilen fonksiyonlardır.

//? Sorunları:
//* Callback Cehennemi (Callback Hell / Pyramid of Doom):
//  - İç içe geçmiş çok sayıda callback fonksiyonu, kodun okunabilirliğini ve yönetilebilirliğini zorlaştırır.
//* Hata Yönetimi:
//  - Her callback içinde ayrı ayrı hata kontrolü yapmak gerekebilir, bu da karmaşıklığı artırır.
//* Kontrolün Tersine Çevrilmesi (Inversion of Control):
//  - Callback'i verdiğimiz fonksiyonun onu ne zaman, kaç kere veya hangi koşullarda çağıracağına dair tam kontrolümüz olmayabilir.

{
  // Callback Örneği (setTimeout ile simülasyon)
  function fetchData(id, callback) {
    console.log(`${id} için veri getiriliyor...`);
    setTimeout(() => {
      const error = null; // Math.random() > 0.8 ? new Error("Veri getirme hatası!") : null;
      if (error) {
        callback(error, null);
      } else {
        const data = { id: id, content: `Veri ${id}` };
        callback(null, data);
      }
    }, 1000);
  }
  fetchData(1, (error1, data1) => {
    if (error1) {
      console.error("Hata 1:", error1.message);
      return;
    }
    console.log("Veri 1:", data1);
    fetchData(2, (error2, data2) => {
      // Callback Hell başlangıcı
      if (error2) {
        console.error("Hata 2:", error2.message);
        return;
      }
      console.log("Veri 2:", data2);
      fetchData(3, (error3, data3) => {
        // ... ve bu böyle devam edebilir
      });
    });
  });
}

//! 4.3. Promise API (ES6+)
//? Tanım:
//  - Bir Promise, asenkron bir işlemin nihai sonucunu (başarı veya başarısızlık) temsil eden bir nesnedir. Callback cehennemini ve asenkron kodun yönetimini kolaylaştırmak için tasarlanmıştır.

//? Bir Promise'in Üç Durumu Olabilir:
//* Pending (Beklemede): Başlangıç durumu, işlem henüz tamamlanmamış.
//* Fulfilled (Başarılı / Resolved): İşlem başarıyla tamamlandı, bir sonuç değeri mevcut.
//* Rejected (Başarısız / Reddedilmiş): İşlem bir hatayla sonuçlandı, bir hata nesnesi (reason) mevcut.

//  - Bir Promise, pending durumundan ya fulfilled ya da rejected durumuna geçer ve bu durum değişmezdir
//  (bir kez çözüldüğünde veya reddedildiğinde tekrar durumu değişmez).

//? Promise Oluşturma:
{
  const myPromise = new Promise((resolve, reject) => {
    // Asenkron işlem buraya gelir (örn: setTimeout, fetch API çağrısı)
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.3; // %70 başarı şansı
      if (isSuccessful) {
        resolve("İşlem başarıyla tamamlandı!"); // Promise'i çöz (fulfill)
      } else {
        reject(new Error("İşlem başarısız oldu!")); // Promise'i reddet (reject)
      }
    }, 1000);
  });
  console.log(myPromise);
}

//? Promise Kullanımı (then, catch, finally):

//* .then(onFulfilled, onRejected):
//  - Promise çözüldüğünde (fulfilled) onFulfilled callback'i çağrılır (sonuç değeri ile).
//  - Promise reddedildiğinde (rejected) onRejected callback'i çağrılır (hata nesnesi ile). (Bu genellikle .catch ile daha iyi yönetilir).
//  - .then() metodu yeni bir Promise döndürür, bu da zincirleme (chaining) yapmayı sağlar.

//* .catch(onRejected):
//  - Promise zincirinde herhangi bir noktada bir hata (rejection) oluşursa çağrılır. Sadece reddedilme durumunu ele alır.
//  - .then(null, onRejected)'in kısa yoludur.

//* .finally(onFinally):
//  - Promise çözülsün veya reddedilsin, her durumda çalıştırılacak bir callback tanımlar.
//  Genellikle temizleme işlemleri (kaynakları serbest bırakma vb.) için kullanılır. .finally() bir Promise döndürür.

{
  const myPromise = new Promise((resolve, reject) => {
    // Asenkron işlem buraya gelir (örn: setTimeout, fetch API çağrısı)
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.3; // %70 başarı şansı
      if (isSuccessful) {
        resolve("İşlem başarıyla tamamlandı!"); // Promise'i çöz (fulfill)
      } else {
        reject(new Error("İşlem başarısız oldu!")); // Promise'i reddet (reject)
      }
    }, 1000);
  });

  console.log("Promise başlatılıyor...");
  myPromise
    .then((result) => {
      // onFulfilled
      console.log("Başarı:", result);
      return "THEN 1'den gelen değer"; // Bir sonraki then'e aktarılır
    })
    .then((previousResult) => {
      console.log("İkinci Başarı:", previousResult);
      // Kasıtlı hata fırlatalım
      if (Math.random() > 0.5) {
        throw new Error("İkinci then'de bir hata oluştu!");
      }
      return "THEN 2'den gelen değer";
    })
    .catch((error) => {
      // onRejected (herhangi bir önceki then veya Promise'in kendisinden gelen hata)
      console.error("Hata Yakalandı:", error.message);
      // Hata yakalandıktan sonra zincir devam edebilir (eğer catch bir değer döndürürse)
      // veya yeni bir hata fırlatılabilir.
      return "Catch bloğundan sonra devam ediliyor.";
    })
    .then((finalValue) => {
      console.log("Catch sonrası then:", finalValue);
    })
    .finally(() => {
      console.log("Promise işlemi tamamlandı (başarılı veya başarısız).");
    });
  console.log("Promise başlatıldı, sonuç bekleniyor...");
}

//? Promise Yardımcı Metotları:

//* 1- Promise.resolve(deger):
//  - Verilen değerle çözülmüş (fulfilled) bir Promise döndürür.

//* 2- Promise.reject(hata):
//  - Verilen hatayla reddedilmiş (rejected) bir Promise döndürür.

//* 3- Promise.all(promiselerDizisi):
//  - Bir dizi Promise alır. Tüm Promise'ler çözüldüğünde çözülür. Sonuç, tüm Promise'lerin sonuçlarını içeren bir dizidir (aynı sırada).
//  - Eğer dizideki herhangi bir Promise reddedilirse, Promise.all hemen reddedilir (ilk reddedilen Promise'in hatasıyla).

//* 4- Promise.race(promiselerDizisi):
//  - Bir dizi Promise alır. Dizideki ilk çözülen veya reddedilen Promise'in sonucuyla/hatasıyla çözülür/reddedilir.

//* 5- Promise.allSettled(promiselerDizisi) (ES2020):
//  - Bir dizi Promise alır. Tüm Promise'ler sonuçlandığında (çözülsün veya reddedilsin) çözülür.
//  Sonuç, her bir Promise'in durumunu (status: 'fulfilled' veya 'rejected') ve değerini/nedenini içeren bir nesne dizisidir.

//* 6- Promise.any(promiselerDizisi) (ES2021):
//  - Bir dizi Promise alır. Dizideki ilk çözülen Promise'in sonucuyla çözülür.
//  Eğer tüm Promise'ler reddedilirse, bir AggregateError ile reddedilir.

{
  function delayedPromise(ms, value, isSuccessful = true) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(
          `${ms}ms sonra ${value} ile ${
            isSuccessful ? "çözülecek" : "reddedilecek"
          }`
        );
        if (isSuccessful) {
          resolve(value);
        } else {
          reject(new Error(`${value} hatası`));
        }
      }, ms);
    });
  }

  // Promise.all örneği
  Promise.all([
    delayedPromise(1000, "Veri A"),
    delayedPromise(500, "Veri B"),
    delayedPromise(1500, "Veri C"),
  ])
    .then((results) => console.log("Promise.all Sonuçları:", results)) // ["Veri A", "Veri B", "Veri C"] (orijinal sıra korunur)
    .catch((error) => console.error("Promise.all Hatası:", error.message));

  // Promise.race örneği
  Promise.race([
    delayedPromise(1000, "Yarış A"),
    delayedPromise(500, "Yarış B (kazanan)"), // Bu ilk sonuçlanacak
    delayedPromise(1500, "Yarış C"),
  ])
    .then((winner) => console.log("Promise.race Kazananı:", winner))
    .catch((error) => console.error("Promise.race Hatası:", error.message));
}
