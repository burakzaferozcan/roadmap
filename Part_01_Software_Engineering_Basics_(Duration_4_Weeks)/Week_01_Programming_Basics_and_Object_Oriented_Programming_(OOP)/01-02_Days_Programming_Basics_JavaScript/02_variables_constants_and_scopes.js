//TODO Bölüm 2: Değişkenler, Sabitler ve Kapsamları (var, let, const)
/**
 * Değişkenler, verileri saklamak için kullanılan isimlendirilmiş bellek alanlarıdır.
 * */

//! 2.1. Değişken Tanımlama

{
  //* var (Eski Yöntem - Kaçınılmalı):
  //  Fonksiyon kapsamlıdır (function-scoped) veya global kapsamlıdır.
  //  Blok ({}) kapsamı yoktur.
  //  Hoisting: var ile tanımlanan değişkenler, tanımlandıkları kapsamın en üstüne "taşınır" (hoisted) ancak değerleri atanana kadar undefined olur.
  //  Aynı kapsamda yeniden deklare edilebilir.

  console.log(oldVariable); // undefined (hoisting nedeniyle hata vermez)
  var oldVariable = "Eski";
  var oldVariable = "Yeniden tanımlandı"; // Sorun yok

  if (true) {
    var testVariable = "Test";
  }
  console.log(testVariable); // "Test" (blok dışından erişilebilir)

  //? Neden Kaçınılmalı? Hoisting ve blok kapsamının olmaması kafa karışıklığına ve hatalara yol açabilir.
}

{
  //* let (Modern Yöntem - Tercih Edilir):
  //  Blok kapsamlıdır (block-scoped). Sadece tanımlandığı {} blok içinde geçerlidir.
  //  Hoisting: let ile tanımlanan değişkenler de hoist edilir, ancak "Temporal Dead Zone (TDZ)" adı verilen bir bölgede olduklarından, deklare edildikleri satıra gelinmeden erişilemezler (ReferenceError).
  //  Aynı kapsamda yeniden deklare edilemez.
  //  Değeri sonradan değiştirilebilir.

  // console.log(newVariable); // ReferenceError: Cannot access 'newVariable' before initialization (TDZ)
  let newVariable = "Yeni";
  newVariable = "Değeri değişti"; // Sorun yok
  // let newVariable = "Hata"; // SyntaxError: Identifier 'newVariable' has already been declared

  if (true) {
    let blockVariable = "Blokta";
    console.log(blockVariable); // "Blokta"
  }
  // console.log(blockVariable); // ReferenceError: blockVariable is not defined (blok dışından erişilemez)
}

{
  //* const (Modern Yöntem - Sabitler İçin Tercih Edilir):
  //  Blok kapsamlıdır (block-scoped). Sadece tanımlandığı {} blok içinde geçerlidir.
  //  Hoisting: let ile tanımlanan değişkenler de hoist edilir, ancak "Temporal Dead Zone (TDZ)" adı verilen bir bölgede olduklarından, deklare edildikleri satıra gelinmeden erişilemezler (ReferenceError).
  //  Aynı kapsamda yeniden deklare edilemez.
  //  Değeri sonradan değiştirilemez (yeniden atanamaz). Tanımlandığı anda bir değer atanmalıdır.

  const PI = 3.14;
  // PI = 3.14159; // TypeError: Assignment to constant variable.
  // const PI = 1; // SyntaxError

  const USER_SETTINGS = { tema: "karanlık" };
  USER_SETTINGS.tema = "açık"; // Bu geçerlidir! Nesnenin içeriği değişebilir, referansı değil.
  console.log(USER_SETTINGS.tema); // "açık"

  // USER_SETTINGS = { baskaAyar: true }; // TypeError: Assignment to constant variable. (referans değişemez)

  const NUMBERS = [1, 2, 3];
  NUMBERS.push(4); // Bu da geçerlidir! Dizinin içeriği değişebilir.
  console.log(NUMBERS); // [1, 2, 3, 4]

  // SAYILAR = [5, 6]; // TypeError: Assignment to constant variable.

  //? Önemli Not: const ile tanımlanan ilkel (primitive) veri tipleri tamamen sabittir.
  //? Ancak const ile tanımlanan nesne (object) ve dizilerin (array) kendileri (yani bellek adresleri) değiştirilemezken,
  //? içerikleri (özellikleri veya elemanları) değiştirilebilir.
}

//! 2.2. Değişken İsimlendirme Kuralları ve Tavsiyeleri

{
  // Harf, rakam, alt çizgi (_) veya dolar işareti ($) içerebilir.
  // Rakamla başlayamaz.
  // JavaScript anahtar kelimeleri (reserved words: if, for, function vb.) kullanılamaz.
  // Büyük/küçük harf duyarlıdır.
  // Tavsiyeler:
  // Anlamlı ve açıklayıcı isimler kullanın (a, b, x yerine userName, productPrice).
  // camelCase notasyonunu kullanın: userName, productPrice.
  // Sabitler için UPPER_SNAKE_CASE notasyonunu kullanın: MAX_NUMBER_OF_USERS.
}

//! 2.3. Kapsam (Scope)
//  Bir değişkenin programın hangi bölümlerinden erişilebilir olduğunu belirler.

{
  //* Global Kapsam (Global Scope):
  //  Herhangi bir fonksiyon veya blok dışında tanımlanan değişkenler global kapsama sahiptir ve
  //  programın her yerinden erişilebilir. (Genellikle kaçınılması gereken bir durumdur, isim çakışmalarına yol açabilir.)

  let globalVariable = "Ben globalim";
  function testScope() {
    console.log(globalVariable); // "Ben globalim"
  }
  testKapsam();
}

{
  //* Fonksiyon Kapsamı (Function Scope):
  //  var ile tanımlanan değişkenler fonksiyon kapsamlıdır. Sadece tanımlandıkları fonksiyon içinden erişilebilirler.

  function testScope() {
    var variableInFunction = "Fonksiyon içindeyim (var)";
    console.log(variableInFunction);
  }
  testScope();
  // console.log(variableInFunction); // ReferenceError: variableInFunction is not defined
}

{
  //* Blok Kapsamı (Block Scope):
  //  let ve const ile tanımlanan değişkenler blok kapsamlıdır.
  //  Sadece tanımlandıkları {...} blok (örn: if, for, while blokları veya sadece {}) içinden erişilebilirler.

  if (true) {
    let blockInLet = "Blok içindeyim (let)";
    const blockInConst = "Blok içindeyim (const)";
    console.log(blockInLet);
    console.log(blockInConst);
  }
  // console.log(blockInLet); // ReferenceError
  // console.log(blockInConst); // ReferenceError
}

{
  //* Lexical (Static) Scope:
  //  JavaScript lexical scope kullanır. Bu, bir fonksiyonun kapsamının,
  //  fonksiyonun tanımlandığı yerde belirlendiği anlamına gelir, çağrıldığı yerde değil.
  //  İç içe fonksiyonlar, dıştaki fonksiyonların değişkenlerine erişebilir (closure kavramının temelidir).

  let x = 1;

  function parent() {
    let x = 2;

    function child() {
      console.log(x);
    }

    return child;
  }

  const myFunc = parent();
  myFunc(); // 2
}
