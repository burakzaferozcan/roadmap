//TODO Bölüm 3: Operatörler ve İfadeler
/**
 * Operatörler, değerler (operands) üzerinde işlemler gerçekleştirmek için kullanılan özel sembollerdir.
 * Bir operatör ve operandlarından oluşan yapıya ifade (expression) denir ve bu ifadeler bir değer üretir.
 * */

//! 3.1. Aritmetik Operatörler
//  Sayısal değerlerle matematiksel işlemler yapar.

{
  /**
    + (Toplama): 5 + 3 -> 8
    - (Çıkarma): 5 - 3 -> 2
    * (Çarpma): 5 * 3 -> 15
    / (Bölme): 10 / 2 -> 5
    % (Modülüs - Kalan): 10 % 3 -> 1 (10'un 3'e bölümünden kalan)
    ** (Üs Alma - ES7): 2 ** 3 -> 8 (2 üzeri 3)
    ++ (Artırma):
    Ön Ek: ++sayi (önce artırır, sonra değeri kullanır)
    Son Ek: sayi++ (önce değeri kullanır, sonra artırır)
    -- (Azaltma):
    Ön Ek: --sayi
    Son Ek: sayi--
    */
  let a = 10;
  let b = 4;
  console.log("a + b =", a + b); // 14
  console.log("a % b =", a % b); // 2
  console.log("a ** 2 =", a ** 2); // 100

  let c = 5;
  console.log("++c =", ++c); // 6 (c şimdi 6)
  console.log("c++ =", c++); // 6 (c şimdi 7)
  console.log("c =", c); // 7
}

//! 3.2. Atama Operatörleri
//  Bir değişkene değer atamak için kullanılır.

{
  /**
    = (Atama): x = 5
    += (Toplayarak Atama): x += 3 (aynı x = x + 3)
    -= (Çıkararak Atama): x -= 2 (aynı x = x - 2)
    *= (Çarparak Atama): x *= 4
    /= (Bölerek Atama): x /= 2
    %= (Modülüs Alarak Atama): x %= 3
    **= (Üs Alarak Atama): x **= 2
    */

  let x = 10;
  x += 5; // x = 15
  x *= 2; // x = 30
  console.log("x =", x); // 30
}

//! 3.3. Karşılaştırma Operatörleri
//  İki değeri karşılaştırır ve true veya false (boolean) bir sonuç döndürür.

{
  /**
    == (Gevşek Eşitlik): Değerleri karşılaştırırken tip dönüşümü yapar. Genellikle kaçınılmalıdır.
    === (Katı Eşitlik): Değerleri ve tiplerini karşılaştırır. Tip dönüşümü yapmaz. Genellikle tercih edilmelidir.
    != (Gevşek Eşitsizlik): == operatörünün tersi.
    !== (Katı Eşitsizlik): === operatörünün tersi.
    > (Büyüktür)
    < (Küçüktür)
    >= (Büyük Eşittir)
    <= (Küçük Eşittir)
    */

  console.log("5 == '5':", 5 == "5"); // true (tip dönüşümü var)
  console.log("5 === '5':", 5 === "5"); // false (tip farklı)
  console.log("5 === 5:", 5 === 5); // true

  console.log("10 > 5:", 10 > 5); // true
  console.log("10 <= 10:", 10 <= 10); // true
}

//! 3.4. Mantıksal Operatörler
//  Boolean değerler üzerinde çalışır ve boolean bir sonuç döndürür.

{
  /**
    && (Mantıksal VE - AND): Her iki koşul da true ise true döner.
    || (Mantıksal VEYA - OR): Koşullardan en az biri true ise true döner.
    ! (Mantıksal DEĞİL - NOT): Bir boolean değerin tersini alır (true ise false, false ise true).
    */
  let age = 25;
  let driverLicense = true;

  if (age >= 18 && driverLicense) {
    console.log("Araç kullanabilir."); // Bu çalışır
  }

  let weatherIsGood = false;
  let weekend = true;
  if (weatherIsGood || weekend) {
    console.log("Dışarı çıkılabilir."); // Bu çalışır
  }

  console.log("!driverLicense:", !driverLicense); // false

  //* Kısa Devre (Short-circuiting):
  /**
    &&: Soldaki ifade false ise sağdaki ifadeye bakılmaz, sonuç false olur.
    ||: Soldaki ifade true ise sağdaki ifadeye bakılmaz, sonuç true olur.
    Bu özellik, varsayılan değer atamalarında veya koşullu fonksiyon çağrılarında kullanılabilir.
     */

  let userName = null;
  let defaultName = "Misafir";
  let nameToDisplay = userName || defaultName; // kullaniciAdi null (falsy) olduğu için varsayilanAd atanır.
  console.log(nameToDisplay); // "Misafir"

  function expensiveProcess() {
    console.log("Pahalı işlem çalıştı!");
    return true;
  }
  true || expensiveProcess(); // pahaliIslem çağrılmaz
  false && expensiveProcess(); // pahaliIslem çağrılmaz
}

//! 3.5. Koşul (Ternary) Operatörü
//  if-else yapısının kısa bir alternatifidir.

{
  // Sözdizimi: koşul ? ifadeEgerDogruysa : ifadeEgerYanlissa
  let temperature = 22;
  let status = temperature > 20 ? "Sıcak" : "Soğuk";
  console.log(status); // "Sıcak"
}

//! 3.6. Diğer Önemli Operatörler

{
  //* typeof Operatörü: Bir değişkenin veri tipini string olarak döndürür.
  console.log(typeof 42); // "number"
  console.log(typeof "merhaba"); // "string"
  console.log(typeof true); // "boolean"
  console.log(typeof undefined); // "undefined"
  console.log(typeof null); // "object" (eski bir bug)
  console.log(typeof { a: 1 }); // "object"
  console.log(typeof [1, 2]); // "object" (array'ler de object'tir)
  console.log(typeof function () {}); // "function"
}

{
  //* instanceof Operatörü: Bir nesnenin belirli bir sınıfın (veya constructor fonksiyonunun) örneği olup olmadığını kontrol eder.
  let today = new Date();
  console.log(today instanceof Date); // true
  let colors = ["kırmızı", "mavi"];
  console.log(colors instanceof Array); // true
  console.log(colors instanceof Object); // true (çünkü Array'ler Object'ten türemiştir)
}

{
  //* Bitsel (Bitwise) Operatörler:
  /**
    Sayıların ikili (binary) temsilleri üzerinde işlem yaparlar.
    Genellikle düşük seviye programlamada veya özel algoritmalarda kullanılırlar.
    (&, |, ^, ~, <<, >>, >>>). (Şu an için detaylarına girmeye gerek yok, sadece varlıklarından haberdar ol.)
    */
}

{
  //* Virgül (Comma) Operatörü(,):
  // Birden fazla ifadeyi soldan sağa doğru değerlendirir ve en sağdaki ifadenin sonucunu döndürür. Nadiren kullanılır.
  let x = (1, 2, 3); // x'in değeri 3 olur
  console.log(x);
}

{
  //* delete Operatörü:
  // Bir nesnenin özelliğini siler.
  let user = { name: "Ali", age: 30 };
  delete user.age;
  console.log(user); // { name: "Ali" }
}

{
  //* in Operatörü:
  // Belirtilen bir özelliğin bir nesnede (veya prototip zincirinde) olup olmadığını kontrol eder.
  let car = { brand: "Ford", model: "Mustang" };
  console.log("brand" in car); // true
  console.log("age" in car); // false
  console.log("toString" in car); // true (prototip zincirinden gelir)
}

//! 3.7. Operatör Önceliği (Operator Precedence)
{
  /**
    * Farklı operatörler farklı önceliklere sahiptir. Hangi işlemin önce yapılacağını belirler.
    Örneğin * ve / operatörleri, + ve - operatörlerinden daha yüksek önceliğe sahiptir.
    2 + 3 * 4 ifadesi 2 + (3 * 4) yani 14 olarak hesaplanır, (2 + 3) * 4 yani 20 olarak değil.
    Karışıklığı önlemek ve okunabilirliği artırmak için parantez () kullanmak iyi bir pratiktir.
    MDN gibi kaynaklarda tam operatör önceliği tablosu bulunabilir.
    */
}
