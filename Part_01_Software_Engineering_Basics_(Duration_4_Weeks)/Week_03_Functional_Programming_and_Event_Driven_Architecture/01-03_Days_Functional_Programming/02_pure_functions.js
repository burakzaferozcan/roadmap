//TODO Bölüm 2: Saf Fonksiyonlar (Pure Functions)

//? Tanım: Bir fonksiyonun "saf" olarak kabul edilmesi için iki temel koşulu sağlaması gerekir:

//* Belirlenimcilik (Deterministic):
//  - Aynı girdiler verildiğinde her zaman aynı çıktıyı üretir.
//  Fonksiyonun sonucu sadece girdilerine bağlıdır, dışsal bir duruma
//  (global değişkenler, sistem saati, rastgele sayılar vb.) bağlı değildir.
//* Yan Etkisiz (No Side Effects):
//  - Çalışması sırasında kendi kapsamı dışındaki herhangi bir durumu değiştirmez veya
//  dış dünyayla gözlemlenebilir bir etkileşime girmez.
//! Yan Etki Örnekleri (Kaçınılması Gerekenler):
//  - Global bir değişkeni veya nesne özelliğini değiştirmek.
//  - Argüman olarak aldığı bir nesneyi (referans tipini) değiştirmek.
//  - Konsola bir şey yazdırmak veya loglamak (gözlemlenebilir etki).
//  - Bir dosyaya yazmak veya bir dosyadan okumak.
//  - Bir API isteği yapmak.
//  - DOM'u manipüle etmek.
//  - Math.random() veya new Date() gibi sonuçları dış duruma bağlı fonksiyonları çağırmak
//  (eğer fonksiyonun sonucu bunlara göre değişiyorsa).

//! Saf Fonksiyon Örnekleri (JavaScript):
{
  // Saf Fonksiyon
  function sum(a, b) {
    return a + b;
  }
  console.log(sum(2, 3)); // Her zaman 5 döner
  console.log(sum(2, 3)); // Yine 5 döner

  // Saf Fonksiyon (Nesne döndürürken dikkat!)
  function createUser(id, ad) {
    return { id: id, ad: ad }; // Yeni bir nesne oluşturur
  }
  const user1 = createUser(1, "Ali");
  const user2 = createUser(1, "Ali");
  // user1 ve user2 farklı nesne referanslarıdır ama içerikleri aynıdır.

  // Saf Fonksiyon (Dizi üzerinde işlem yapar ama orijinali değiştirmez)
  function addElement(dizi, element) {
    return [...dizi, element]; // Yeni bir dizi oluşturur (spread operatörü)
  }
  const numbers = [1, 2, 3];
  const newNumbers = addElement(numbers, 4);
  console.log(numbers); // [1, 2, 3] (orijinal değişmedi)
  console.log(newNumbers); // [1, 2, 3, 4]
}

//! Saf Olmayan (Impure) Fonksiyon Örnekleri (JavaScript):

{
  // Saf Olmayan Fonksiyon (Global değişkene bağlı ve onu değiştiriyor)
  let globalTotal = 0;
  function addToTotal(deger) {
    globalTotal += deger; // Yan etki: Global değişkeni değiştiriyor
    return globalTotal;
  }
  console.log(addToTotal(5)); // 5
  console.log(addToTotal(5)); // 10 (Aynı girdi, farklı çıktı)

  // Saf Olmayan Fonksiyon (Argüman olarak aldığı nesneyi değiştiriyor)
  function incrementUserAge(user) {
    user.age++; // Yan etki: Argüman nesnesini değiştiriyor
    return user;
  }
  const aUser = { ad: "Veli", age: 30 };
  incrementUserAge(aUser);
  console.log(aUser.age); // 31 (Orijinal nesne değişti)

  // Saf Olmayan Fonksiyon (Konsola yazdırıyor - gözlemlenebilir yan etki)
  function greet(name) {
    console.log("Merhaba, " + name); // Yan etki: Konsola çıktı veriyor
    return "Selam verildi."; // Dönüş değeri yan etkiden bağımsız olsa da fonksiyon saf değil
  }

  // Saf Olmayan Fonksiyon (Rastgele sayı üretiyor)
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // Aynı girdi (yok) farklı çıktı
  }
}

//! Saf Fonksiyonların Faydaları:

//* Test Edilebilirlik:
//  - Sadece girdi verip çıktıyı kontrol etmek yeterlidir.
//* Öngörülebilirlik:
//  - Kodun davranışı daha kolay anlaşılır.
//* Paralelleştirme:
//  - Yan etkileri olmadığı için güvenle paralel çalıştırılabilirler.
//* Bellekleme (Memoization):
//  - Aynı girdilerle çağrıldığında sonuçları önbelleğe alınıp tekrar hesaplama yapmadan kullanılabilir.
