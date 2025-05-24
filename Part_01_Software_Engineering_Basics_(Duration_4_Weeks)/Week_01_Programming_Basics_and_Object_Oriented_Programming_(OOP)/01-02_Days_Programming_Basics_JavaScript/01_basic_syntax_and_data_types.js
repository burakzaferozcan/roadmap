//TODO Bölüm 1: JavaScript Temel Sözdizimi ve Veri Tipleri

//! 1.1. JavaScript'e Giriş ve Temel Sözdizimi
/*
 JavaScript, web tarayıcılarında çalışmak üzere tasarlanmış, dinamik, yorumlanan (interpreted) bir programlama dilidir.
 Node.js sayesinde sunucu tarafında da çalışabilir.
*/

{
  //* Kod Nereye Yazılır?
  /**
   *? Tarayıcı Konsolu: Hızlı denemeler için idealdir.
   *  (Tarayıcıda F12 > Console).
   *
   *? HTML İçinde <script> Etiketi:
   *  <script>
   *    console.log("Merhaba Dünya!");
   *  </script>
   *
   *? Harici .js Dosyası: Daha büyük projeler için tercih edilir.
   *  <!-- index.html -->
   *  <script src="app.js"></script>
   *  app.js:
   *  console.log("Harici dosyadan Merhaba Dünya!");
   */
}

{
  //* Temel Kurallar:
  /**
   *? Büyük/Küçük Harf Duyarlılığı (Case Sensitivity):
   *  degisken ile Degisken farklıdır.
   *
   *? Yorum Satırları:
   *  Tek Satırlık Yorum:
   *  // Bu bir yorumdur
   *
   * Çok Satırlık Yorum:
   * /**
   *  Bu
   *  çok satırlı
   *  bir yorumdur.
   */
  /**
   *? Noktalı Virgül (;):
   *  JavaScript'te çoğu ifadenin sonuna noktalı virgül konulması iyi bir pratiktir,
   *  ancak "Automatic Semicolon Insertion (ASI)" özelliği sayesinde bazı durumlarda zorunlu değildir.
   *  Yine de alışkanlık edinmek hataları azaltır.
   *
   *? İfadeler (Statements):
   *  Bir eylemi gerçekleştiren kod parçalarıdır. Örn: let x = 10;
   *
   *? Bloklar ({}):
   *  Birden fazla ifadeyi gruplamak için kullanılır (örn: if blokları, fonksiyon blokları).
   *
   */
}

//! 1.2. Veri Tipleri (Data Types)
/*
 JavaScript'te veriler farklı tiplerde olabilir.
 Dinamik tipli bir dildir, yani değişkenin tipi çalışma zamanında belirlenir.
*/

{
  //* A. İlkel (Primitive) Veri Tipleri:
  //  Değiştirilemez (immutable) değerlerdir.

  //? String (Metin): Karakter dizileridir. Tek tırnak ('...'), çift tırnak ("...") veya backtick (`...`) ile tanımlanır.
  let name = "Ahmet";
  let message = "Merhaba!";
  let description = `Bu bir "template literal" örneğidir. Değişkenler: ${isim}`; // Template Literals (ES6)
  console.log(typeof name); // "string"

  //? Number (Sayı): Tamsayılar ve ondalıklı sayıları temsil eder. Özel sayısal değerler de vardır:
  //  Infinity: Sonsuzluk
  //  -Infinity: Eksi sonsuzluk
  //  NaN: Not a Number (Sayı Değil). Geçersiz bir matematiksel işlem sonucu oluşur.
  let age = 30;
  let pi = 3.14;
  let result = 0 / 0; // NaN
  console.log(typeof age); // "number"
  console.log(typeof NaN); // "number" (dikkat!)

  //? Boolean (Mantıksal): Sadece iki değeri olabilir: true (doğru) veya false (yanlış). Genellikle koşullu ifadelerde kullanılır.
  let isActive = true;
  let isCompleted = false;
  console.log(typeof isActive); // "boolean"

  //? Undefined (Tanımsız): Bir değişkene değer atanmadığında varsayılan olarak bu tipe sahiptir.
  let address;
  console.log(address); // undefined
  console.log(typeof address); // "undefined"

  //? Null (Boş): Bir değişkenin kasıtlı olarak "değerinin olmadığını" belirtmek için kullanılır. undefined'dan farklıdır.
  let user = null; // Kullanıcının henüz tanımlanmadığını veya olmadığını belirtir.
  console.log(user); // null
  console.log(typeof user); // "object" (Bu, JavaScript'in eski bir hatasıdır, null aslında ilkel bir tiptir)

  //? Symbol (ES6): Eşsiz ve değiştirilemez (immutable) değerler oluşturmak için kullanılır. Genellikle nesne özelliklerinin çakışmasını önlemek için kullanılır.
  const id1 = Symbol("id");
  const id2 = Symbol("id");
  console.log(id1 === id2); // false (her Symbol eşsizdir)
  console.log(typeof id1); // "symbol"

  //? BigInt (ES2020): Number tipinin güvenli tamsayı sınırından (Number.MAX_SAFE_INTEGER) daha büyük tamsayıları temsil etmek için kullanılır. Sayının sonuna n eklenerek tanımlanır.
  const bigNumber = 1234567890123456789012345678901234567890n;
  console.log(typeof bigNumber); // "bigint"
}

{
  //* B. Referans (Object) Veri Tipi:
  //  Değiştirilebilir (mutable) değerlerdir. Bellekteki bir konumu işaret ederler.

  //? Object (Nesne): Anahtar-değer (key-value) çiftlerinden oluşan koleksiyonlardır.
  let car = {
    brand: "BMW",
    model: "X5",
    year: 2022,
    run: function () {
      console.log("Motor çalıştı!");
    },
  };
  console.log(car.brand); // "BMW"
  car.calistir(); // "Motor çalıştı!"
  console.log(typeof car); // "object"

  //? Array (Dizi): Sıralı bir değerler listesidir. Farklı veri tiplerini içerebilir.
  let colors = ["kırmızı", "yeşil", "mavi", 100, true];
  console.log(colors[0]); // "kırmızı"
  console.log(typeof colors); // "object" (Diziler de özel bir nesne türüdür)

  //? Function (Fonksiyon): (Bir sonraki bölümde detaylı işlenecek) Çalıştırılabilir kod bloklarıdır.
  //  JavaScript'te fonksiyonlar da nesnedir ve "first-class citizens" olarak kabul edilirler.
  function sayHello() {
    console.log("Selam!");
  }
  console.log(typeof sayHello); // "function" (özel bir nesne türü)
}
