//TODO Bölüm 8: JavaScript'te Fonksiyonel Programlama Teknikleri (Özet ve Uygulama)
// - Bu bölümde, şimdiye kadar öğrendiğimiz kavramları JavaScript'te nasıl daha bütünleşik bir şekilde kullanabileceğimizi göreceğiz.

//! 1- Saf Fonksiyonlar Yazmaya Odaklanın:
//  - Mümkün olduğunca fonksiyonlarınızı girdilerine bağımlı ve yan etkisiz yapın.
//  - Global durumu değiştirmekten veya argüman olarak gelen nesneleri doğrudan modifiye etmekten kaçının.

//! 2- Değişmezliği Benimseyin:
//  - Nesne ve dizilerle çalışırken, orijinal veriyi değiştirmek yerine spread operatörü (...),
//  Object.assign(), veya map, filter, reduce gibi metotlarla yeni kopyalar oluşturun.
//  - Karmaşık durum yönetimi için Immer veya Immutable.js gibi kütüphaneleri değerlendirin.

//! 3- Yüksek Dereceli Fonksiyonları Etkin Kullanın:
//  - Diziler üzerinde döngüler yazmak yerine map, filter, reduce gibi metotları tercih edin.
//   Bu, kodu daha kısa, okunabilir ve daha az hataya açık hale getirir.
//  - Kendi HOF'larınızı yazarak tekrarlayan mantığı soyutlayın.

//! 4- Closure'lardan Faydalanın:
//  - Veri gizleme, kısmi uygulama ve durumun korunması gibi senaryolarda closure'ların gücünü kullanın.

//! 5- Fonksiyon Birleştirme (Function Composition):
//  - Birden fazla fonksiyonu birbirine bağlayarak (bir fonksiyonun çıktısını diğerinin girdisi yaparak) karmaşık işlemler oluşturma tekniğidir.
{
  const pipe =
    (...functions) =>
    (initialValue) =>
      functions.reduce((value, func) => func(value), initialValue);

  const compose =
    (...functions) =>
    (initialValue) =>
      functions.reduceRight((value, func) => func(value), initialValue);

  const multiplyByTwo = (x) => x * 2;
  const addOne = (x) => x + 1;
  const square = (x) => x * x;

  // Pipe: Soldan sağa uygular: ((5 * 2) + 1)^2
  const operationPipe = pipe(
    multiplyByTwo, // 5 * 2 = 10
    addOne, // 10 + 1 = 11
    square // 11 * 11 = 121
  );
  console.log("Pipe sonucu:", operationPipe(5)); // 121

  // Compose: Sağdan sola (matematiksel kompozisyona daha yakın) uygular: ( (5+1)^2 ) * 2
  const operationCompose = compose(
    multiplyByTwo, // 36 * 2 = 72
    square, // 6 * 6 = 36
    addOne // 5 + 1 = 6
  );
  console.log("Compose sonucu:", operationCompose(5)); // 72
}

//! 6- Yan Etkileri İzole Edin:
//  - Kaçınılmaz olan yan etkileri (API çağrıları, DOM manipülasyonu, dosya işlemleri) programınızın sınırlarına itin.
//  Saf iş mantığı fonksiyonlarınızı bu yan etkilerden ayrı tutun.

//* Fonksiyonel Düşünme Örneği: Bir Kullanıcı Listesini İşleme
{
  const users = [
    { id: 1, name: "Alice", age: 30, active: true, city: "İstanbul" },
    { id: 2, name: "Bob", age: 24, active: false, city: "Ankara" },
    { id: 3, name: "Charlie", age: 35, active: true, city: "İstanbul" },
    { id: 4, name: "Diana", age: 28, active: true, city: "İzmir" },
  ];

  // İstenen: İstanbul'da yaşayan aktif kullanıcıların adlarını yaşlarına göre sıralı olarak al.

  // Emperatif Yaklaşım (Döngülerle)
  function getActiveIstanbulUsersSortedImperative(userList) {
    const results = [];
    // Aktif ve İstanbul'da olanları filtrele
    const filtered = [];
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].active && userList[i].city === "İstanbul") {
        filtered.push(userList[i]);
      }
    }
    // Yaşa göre sırala (orijinal diziyi etkilememek için kopya üzerinde)
    const sorted = [...filtered].sort((a, b) => a.age - b.age);
    // Adlarını al
    for (let i = 0; i < sorted.length; i++) {
      results.push(sorted[i].name);
    }
    return results;
  }
  console.log(
    "Emperatif Sonuç:",
    getActiveIstanbulUsersSortedImperative(users)
  );

  // Fonksiyonel Yaklaşım (Zincirleme ile)
  const getActiveIstanbulUsersSortedFunctional = (userList) =>
    userList
      .filter((user) => user.active && user.city === "İstanbul") // Aktif ve İstanbul'da olanları al
      .sort((a, b) => a.age - b.age) // Yaşa göre sırala (filter yeni dizi döndürdüğü için kopya üzerinde çalışır)
      .map((user) => user.name); // Adlarını al

  console.log(
    "Fonksiyonel Sonuç:",
    getActiveIstanbulUsersSortedFunctional(users)
  );
  // Her iki sonuç da: ["Alice", "Charlie"] olmalı (eğer yaşa göre sıralama adları etkilemiyorsa,
  // eğer yaş sıralaması isimleri de etkileyecekse ve yaşlar farklıysa sıralama değişebilir.)
  // Düzeltme: Örnekte Alice (30) Charlie'den (35) küçük olduğu için doğru sıralama.
}
