//TODO Bölüm 5: Fonksiyonlar ve Parametreler
/**
 * Fonksiyonlar, belirli bir görevi yerine getiren, tekrar tekrar kullanılabilen kod bloklarıdır.
 * Kodun modüler, organize ve okunabilir olmasını sağlarlar.
 * JavaScript'te fonksiyonlar "first-class citizens"dır, yani diğer değerler gibi (sayılar, stringler gibi) değişkenlere atanabilir,
 * başka fonksiyonlara argüman olarak geçirilebilir ve başka fonksiyonlardan sonuç olarak döndürülebilirler.
 */

//! 5.1. Fonksiyon Tanımlama Yolları

{
  //* A. Fonksiyon Bildirimi (Function Declaration / Statement):
  //  function anahtar kelimesiyle başlar.
  //  Hoisting: Fonksiyon bildirimleri, tanımlandıkları kapsamın en üstüne "taşınır" (hoisted). Bu, fonksiyonu tanımlamadan önce çağırabileceğiniz anlamına gelir.
  selamVer(); // Hoisting sayesinde çalışır

  function selamVer() {
    console.log("Merhaba!");
  }

  //* B. Fonksiyon İfadesi (Function Expression):
  //  Bir fonksiyon oluşturulur ve bir değişkene atanır.
  //  Fonksiyon anonim (isimsiz) olabilir veya hata ayıklama için bir ismi olabilir (Named Function Expression - NFE).
  //  Hoisting: Değişken (topla gibi) hoist edilir ancak fonksiyonun kendisi (değeri) hoist edilmez.
  //  Bu nedenle, tanımlamadan önce çağrılamaz (TDZ veya undefined hatası).

  // multiply(3, 4);
  //? TypeError: carp is not a function (eğer var ile tanımlandıysa)
  //? ReferenceError (eğer let/const ile tanımlandıysa TDZ)

  const multiply = function (number1, number2) {
    // Anonim fonksiyon ifadesi
    return number1 * number2;
  };
  console.log("Çarpım:", multiply(3, 4)); // 12

  const factorial = function calculateFactorial(n) {
    // İsimli fonksiyon ifadesi (NFE)
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * calculateFactorial(n - 1); //? İçeride kendi ismini kullanabilir (recursion)
  };
  console.log("5! =", factorial(5)); // 120
  // console.log(calculateFactorial(5)); //? ReferenceError: calculateFactorial is not defined (dışarıdan NFE ismiyle erişilemez)

  //* C. Ok Fonksiyonları (Arrow Functions - ES6):
  //  Daha kısa bir sözdizimi sunar.
  //  Kendi this, arguments, super veya new.target bağlamları yoktur. Bu değerleri çevreleyen (lexical) kapsamdan alırlar. (Bu konu OOP ve this bağlamı işlenirken daha önemli olacak.)
  //  new anahtar kelimesiyle constructor olarak kullanılamazlar.
  //  prototype özellikleri yoktur.
  // Tek parametre ve tek satırlık return
  const square = (number) => number * number;
  console.log("5'in karesi:", square(5)); // 25

  // Birden fazla parametre
  const divide = (a, b) => a / b;
  console.log("10 / 2 =", divide(10, 2)); // 5

  // Parametresiz
  const showMessage = () => console.log("Bu bir ok fonksiyonu!");
  showMessage();

  // Çok satırlı gövde (süslü parantez `{}` ve `return` gerekir)
  const takeAction = (x, y) => {
    const result = x + y;
    return result * 2;
  };
  console.log("İşlem sonucu:", takeAction(2, 3)); // 10

  // Ok fonksiyonları ve `this` (ileriki konular için ön bilgi):
  // Geleneksel fonksiyonda `this` çağrılma şekline göre değişir.
  // Ok fonksiyonlarında `this` her zaman tanımlandığı (lexical) kapsamdaki `this` değerini alır.
  // Bu, özellikle callback fonksiyonlarında ve metotlarda `this`'in beklenmedik şekilde değişmesini önler.
}

//! 5.2. Fonksiyon Çağırma (Invoking / Calling a Function)

/**
 * Bir fonksiyonu çalıştırmak için ismi ve ardından parantez () kullanılır. Varsa argümanlar parantez içine yazılır.
 */

{
  function writeFullName(ad, soyad) {
    console.log(`Ad: ${ad}, Soyad: ${soyad}`);
  }
  writeFullName("Ali", "Veli"); // Fonksiyonu "Ali" ve "Veli" argümanlarıyla çağır
}

//! 5.3. Parametreler ve Argümanlar

{
  //* Parametreler:
  //  Fonksiyon tanımında belirtilen değişkenlerdir. Fonksiyonun alacağı girdileri temsil eder.
  //* Argümanlar:
  //  Fonksiyon çağrılırken parametrelere gönderilen gerçek değerlerdir
  //* Varsayılan Parametre Değerleri (Default Parameters - ES6):
  //  Bir parametreye argüman gönderilmezse veya undefined gönderilirse, varsayılan bir değer almasını sağlar.

  function greet(isim = "Misafir", mesaj = "Hoşgeldiniz!") {
    console.log(`${mesaj}, ${isim}!`);
  }
  greet("Ayşe", "Merhaba"); // Merhaba, Ayşe!
  greet("Mehmet"); // Hoşgeldiniz!, Mehmet!
  greet(); // Hoşgeldiniz!, Misafir!
  greet(undefined, "Nasılsınız?"); // Nasılsınız?, Misafir!

  //* Kalan Parametreler (Rest Parameters - ES6):
  //  Belirsiz sayıda argümanı bir dizi olarak toplamak için kullanılır.
  //  Fonksiyon tanımında son parametre olarak ...parametreAdi şeklinde belirtilir.

  function sumNumbers(...numbers) {
    // numbers bir dizi olur
    let total = 0;
    for (let number of numbers) {
      total += number;
    }
    return total;
  }
  console.log(sumNumbers(1, 2, 3)); // 6
  console.log(sumNumbers(10, 20, 30, 40)); // 100
  console.log(sumNumbers()); // 0

  function showInfo(name, surName, ...hobbies) {
    console.log(`Ad: ${name}, Soyad: ${surName}`);
    console.log("Hobiler:", hobbies.join(", "));
  }
  showInfo("Zeynep", "Yılmaz", "Kitap Okumak", "Yüzme", "Seyahat");
  // Ad: Zeynep, Soyad: Yılmaz
  // Hobiler: Kitap Okumak, Yüzme, Seyahat

  //* arguments Nesnesi (Eski Yöntem - Ok Fonksiyonlarında Yok):
  //  Fonksiyona geçirilen tüm argümanları içeren, dizi benzeri (ama tam bir dizi olmayan) bir nesnedir.
  //  Ok fonksiyonları dışında tüm fonksiyonlarda erişilebilirdir.
  //  ES6 ile gelen rest parameters daha modern ve esnek bir alternatiftir.
  function oldSum() {
    console.log(arguments); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  }
  console.log("Eski toplama:", oldSum(1, 2, 3)); // 6
}

//! 5.4. return İfadesi

{
  /**
   * Bir fonksiyondan bir değer döndürmek için kullanılır.
   * return ifadesine ulaşıldığında fonksiyonun çalışması durur ve belirtilen değer çağrıldığı yere geri gönderilir.
   * Eğer return ifadesi kullanılmazsa veya return; şeklinde değersiz kullanılırsa, fonksiyon varsayılan olarak undefined döner.
   */
  function calculateArea(length, width) {
    if (length <= 0 || width <= 0) {
      console.error("Uzunluk ve genişlik pozitif olmalıdır.");
      return; // undefined döner (veya return null; gibi bir değer de döndürülebilir)
    }
    return length * width; // Hesaplanan alanı döndür
  }

  let area1 = calculateArea(5, 10);
  console.log("Alan 1:", area1); // 50

  let area2 = calculateArea(-2, 5); // Hata mesajı basılır
  console.log("Alan 2:", area2); // undefined
}

//! 5.5. Fonksiyon Kapsamı (Function Scope)

{
  // Fonksiyon içinde (var ile) tanımlanan değişkenler sadece o fonksiyon içinden erişilebilirdir.
  // let ve const ile tanımlananlar ise blok kapsamlıdır, yani fonksiyon içindeki bloklarda tanımlanırsa sadece o blokta geçerlidir.
}

//! 5.6. İleri Düzey Fonksiyon Kavramlarına Giriş (Detayları Sonraki Konularda)

{
  //* Closure (Kapanış):
  //  Bir fonksiyonun, kendi kapsamı dışındaki (genellikle üst fonksiyonunun kapsamındaki)
  //  değişkenlere erişebilmesi ve bu değişkenleri "hatırlaması" durumudur, üst fonksiyon çalışmasını bitirmiş olsa bile.
  function outerFunction() {
    let counter = 0;
    return function innerFunction() {
      counter++;
      console.log("Sayaç:", counter);
    };
  }
  const increaseCounter = outerFunction(); // outerFunction çalıştı, sayac=0 tanımlandı, innerFunction döndü
  increaseCounter(); // Sayaç: 1 (innerFunction, outerFunction'daki sayac'ı hatırlıyor)
  increaseCounter(); // Sayaç: 2

  //* Saf Fonksiyonlar (Pure Functions):
  //  Aynı girdilerle çağrıldığında her zaman aynı çıktıyı üretir.
  //  Yan etkileri (side effects) yoktur (global değişkenleri değiştirmez, konsola bir şey yazdırmaz, dosya okuma/yazma yapmaz vb.).
  //  Test edilmesi ve anlaşılması daha kolaydır.

  // Saf fonksiyon
  function sum(a, b) {
    return a + b;
  }

  // Saf olmayan fonksiyon (yan etkisi var: global değişkeni değiştiriyor)
  let globalSum = 0;
  function sumAndSave(a, b) {
    globalSum = a + b;
    return globalSum;
  }

  //* Yüksek Dereceli Fonksiyonlar (Higher-Order Functions):
  //  Parametre olarak fonksiyon alabilen veya sonuç olarak fonksiyon döndürebilen fonksiyonlardır.
  //  map, filter, reduce gibi dizi metotları buna örnektir.
  function takeProcess(number, processFunction) {
    return processFunction(number);
  }
  function multiplyByTwo(x) {
    return x * 2;
  }
  function square(x) {
    return x * x;
  }
  console.log(takeProcess(5, multiplyByTwo)); // 10
  console.log(takeProcess(5, square)); // 25

  //* IIFE (Immediately Invoked Function Expression - Anında Çağrılan Fonksiyon İfadesi):
  //  Tanımlandığı anda hemen çalışan fonksiyonlardır.
  //  Genellikle global kapsamı kirletmemek ve özel bir kapsam oluşturmak için kullanılır.

  (function () {
    let message = "Bu IIFE içinden.";
    console.log(message);
  })();
  // console.log(message); // ReferenceError: message is not defined (dışarıdan erişilemez)

  let result = (function (a, b) {
    return a + b;
  })(10, 20);
  console.log("IIFE sonucu:", result); // 30
}
