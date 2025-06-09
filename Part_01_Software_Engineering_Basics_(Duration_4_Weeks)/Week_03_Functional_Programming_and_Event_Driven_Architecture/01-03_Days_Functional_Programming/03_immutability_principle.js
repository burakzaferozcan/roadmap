//TODO Bölüm 3: İmmutability (Değişmezlik) Prensibi

//? Tanım:
//  - Bir veri yapısının (nesne, dizi vb.) oluşturulduktan sonra durumunun değiştirilememesi prensibidir.
//  Bir değişiklik gerektiğinde, orijinal veri yapısı kopyalanarak üzerinde değişiklik yapılır ve
//  yeni bir veri yapısı oluşturulur. Orijinal veri bozulmadan kalır.

//? Neden Önemli?

//* Beklenmedik Yan Etkileri Önler:
//  - Bir fonksiyonun veya kod parçasının, paylaşılan bir veri yapısını istemeden değiştirmesini engeller.
//* Hata Ayıklamayı Kolaylaştırır:
//  - Verinin geçmişteki bir durumunu incelemek daha kolaydır çünkü veri hiç değişmemiştir.
//* Durum Yönetimini Basitleştirir:
//  - Özellikle karmaşık uygulamalarda (örn: React/Redux), durumun ne zaman ve nasıl değiştiğini takip etmek kolaylaşır.
//* Performans Optimizasyonları:
//  - Bazı durumlarda, değişmez veri yapıları karşılaştırma (change detection) işlemlerini hızlandırabilir
//  (sadece referansları karşılaştırmak yeterli olabilir).
//* Eş Zamanlılık (Concurrency):
//  - Birden fazla iş parçacığının aynı veriye güvenle erişmesini sağlar, çünkü veri değişmeyecektir.

//! JavaScript'te Değişmezliği Sağlama Yolları:
//  - JavaScript'te ilkel veri tipleri (string, number, boolean, null, undefined, symbol, bigint) doğal olarak değişmezdir.
//  Asıl zorluk nesneler ve diziler gibi referans tiplerindedir.

//* 1- Manuel Kopyalama ve Değiştirme:
//? Nesneler İçin:
//  Object.assign({}, orijinalNesne, { degisecekAlan: yeniDeger })
//  Spread Operatörü (ES6+): { ...orijinalNesne, degisecekAlan: yeniDeger }
//? Diziler İçin:
//  slice(): orijinalDizi.slice() (sığ kopya)
//  concat(): orijinalDizi.concat(yeniEleman) veya [].concat(orijinalDizi)
//  Spread Operatörü (ES6+): [...orijinalDizi, yeniEleman] veya [...orijinalDizi.slice(0, index), yeniEleman, ...orijinalDizi.slice(index + 1)] (belirli bir indeksi güncellemek)
//  map(), filter(), reduce() gibi dizi metotları zaten yeni bir dizi döndürür.

{
  // Değişmez Nesne Güncelleme
  const kullanici = { id: 1, ad: "Ayşe", aktif: true };
  // Ayşe'nin aktif durumunu false yapalım (değişmez şekilde)
  const guncelKullanici = { ...kullanici, aktif: false };
  console.log(kullanici); // { id: 1, ad: 'Ayşe', aktif: true } (orijinal değişmedi)
  console.log(guncelKullanici); // { id: 1, ad: 'Ayşe', aktif: false }

  // Değişmez Dizi Güncelleme
  const renkler = ["kırmızı", "yeşil", "mavi"];
  // "sarı" ekleyelim
  const yeniRenkler = [...renkler, "sarı"];
  console.log(renkler); // ["kırmızı", "yeşil", "mavi"] (orijinal değişmedi)
  console.log(yeniRenkler); // ["kırmızı", "yeşil", "mavi", "sarı"]

  // "yeşil"i çıkaralım
  const yesilsizRenkler = renkler.filter((renk) => renk !== "yeşil");
  console.log(yesilsizRenkler); // ["kırmızı", "mavi"]
}

//? Not:
//  - Bu yöntemler genellikle "sığ kopya" (shallow copy) yapar.
//  Yani, nesne veya dizi içindeki iç içe geçmiş nesne veya diziler hala referans olarak kopyalanır.
//  Derinlemesine değişmezlik (deep immutability) için ek çaba veya kütüphane gerekebilir.

//* 2- Object.freeze():
//  - Bir nesneyi "dondurur". Dondurulmuş bir nesnenin özellikleri eklenemez, silinemez veya değerleri değiştirilemez.
//  - Ancak, Object.freeze() da sığdır. Eğer özellikler başka nesnelere referans içeriyorsa,
//  bu iç nesneler hala değiştirilebilir. Derin dondurma için özel bir fonksiyon yazmak gerekir.

{
  const ayarlar = { tema: "karanlık", dil: "tr" };
  Object.freeze(ayarlar);

  // ayarlar.tema = "açık"; // Strict mode'da hata verir, normal modda sessizce başarısız olur.
  // ayarlar.fontBoyutu = 12; // Eklenemez.
  console.log(ayarlar.tema); // "karanlık"

  const karmasikAyarlar = {
    kullanici: { ad: "Can" },
    renkler: ["#FFF", "#000"],
  };
  Object.freeze(karmasikAyarlar);
  // karmasikAyarlar.kullanici.ad = "Deniz"; // Bu hala çalışır! Çünkü kullanici nesnesi dondurulmadı.
  // karmasikAyarlar.renkler.push("#CCC"); // Bu da çalışır.
  console.log(karmasikAyarlar.kullanici.ad); // "Deniz"
}

//* 3- Değişmez Veri Yapıları Kütüphaneleri:

//? Immutable.js (Facebook):
//  - Değişmez List, Map, Set gibi veri yapıları sunar. Bu yapılar üzerinde yapılan işlemler
//  her zaman yeni bir yapı döndürür ve yapısal paylaşım (structural sharing) sayesinde performansı optimize eder.
//? Immer:
//  - Değişmez veri yapılarıyla çalışmayı daha kolay hale getirir.
//  Geçici bir "draft" durum üzerinde normal JavaScript mutasyonları yapmanıza izin verir ve
//  Immer bu değişiklikleri temel alarak yeni bir değişmez durum üretir.
//? Bu kütüphaneler, büyük uygulamalarda değişmezliği yönetmeyi önemli ölçüde kolaylaştırır.
