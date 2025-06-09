//TODO Bölüm 7: Currying ve Partial Application (Kısmi Uygulama)
//  -Bu iki kavram, fonksiyonlarla daha esnek ve yeniden kullanılabilir şekillerde
//  çalışmayı sağlayan ileri fonksiyonel tekniklerdir. Closure'larla yakından ilişkilidirler.

//! 1- Currying (Körilemek)

//? Tanım:
//  - Birden fazla argüman alan bir fonksiyonu, her biri tek bir argüman alan bir dizi fonksiyona dönüştürme tekniğidir.
//  Yani, f(a, b, c) fonksiyonunu f(a)(b)(c) şeklinde çağrılabilir hale getirmektir.
//  Her bir ara fonksiyon çağrısı, bir sonraki fonksiyonu döndürür ve en son fonksiyon çağrıldığında asıl işlem yapılır.

//? Amaç:
//* Fonksiyon Yeniden Kullanımı:
//  Argümanları adım adım sağlayarak daha özel fonksiyonlar oluşturmayı sağlar.
//* Birleştirilebilirlik (Composability):
//  Tek argümanlı fonksiyonlar, fonksiyon birleştirme (function composition) teknikleriyle daha kolay bir araya getirilebilir.
//* Kısmi Uygulama İçin Temel:
//  Currying, kısmi uygulamanın bir yoludur.

//? Currying Örneği (JavaScript):
{
  // Normal fonksiyon
  function sum(a, b, c) {
    return a + b + c;
  }
  console.log(sum(1, 2, 3)); // 6

  // Curried versiyonu (manuel)
  function curriedSum(a) {
    return function (b) {
      return function (c) {
        return a + b + c;
      };
    };
  }
  console.log(curriedSum(1)(2)(3)); // 6

  const addOne = curriedSum(1); // a = 1 sabitlendi, (b) => (c) => 1 + b + c döndü
  const addOneAndTwo = addOne(2); // b = 2 sabitlendi, (c) => 1 + 2 + c döndü
  const result = addOneAndTwo(3); // c = 3 verildi, 1 + 2 + 3 hesaplandı
  console.log(result); // 6

  // Genel bir currying yardımcısı (lodash gibi kütüphanelerde bulunur veya yazılabilir)
  function curry(fn) {
    return function curried(...args) {
      // Eğer fonksiyona beklenen sayıda argüman verilmişse, fonksiyonu çalıştır.
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        // Değilse, verilen argümanlarla birlikte yeni bir fonksiyon döndür (kalan argümanları bekleyen).
        return function (...args2) {
          return curried.apply(this, args.concat(args2));
        };
      }
    };
  }

  const generalSum = (x, y, z) => x + y + z;
  const curriedGeneralSum = curry(generalSum);

  console.log(curriedGeneralSum(10)(20)(30)); // 60
  const addTen = curriedGeneralSum(10);
  const addTenAndTwenty = addTen(20);
  console.log(addTenAndTwenty(5)); // 35
}

//! 2- Partial Application (Kısmi Uygulama)

//? Tanım:
//  - Bir fonksiyonun bazı argümanlarını önceden sabitleyerek (değerlerini belirleyerek) daha az argüman alan yeni bir fonksiyon oluşturma tekniğidir. Currying'den farklı olarak, kısmi uygulama sonucunda dönen fonksiyon illa tek argümanlı olmak zorunda değildir ve tüm argümanlar tek seferde verilmeyebilir.

//? Amaç:
//* Fonksiyon Özelleştirme:
//  - Genel bir fonksiyonu, belirli parametreler için özelleştirilmiş versiyonlarını oluşturmak.
//* Kod Tekrarını Azaltma:
//  - Sık kullanılan argümanları sabitlemek.
//* -JavaScript'te Function.prototype.bind() metodu, kısmi uygulama için kullanılabilir
//* (ilk argümanı this bağlamı, sonraki argümanlar sabitlenecek olanlardır).

//? Partial Application Örneği (JavaScript):
{
  function logMessage(level, time, message) {
    console.log(`[${level.toUpperCase()}] [${time.toISOString()}] ${message}`);
  }

  // bind ile kısmi uygulama
  // this bağlamını null yapıyoruz, ilk argüman 'BILGI' seviyesi olacak
  const infoLog = logMessage.bind(null, "BILGI", new Date()); // zaman da sabitlendi
  infoLog("Sistem başlatıldı."); // Sadece mesaj argümanı kaldı
  setTimeout(() => infoLog("Bir işlem tamamlandı."), 1000);

  // Sadece seviyeyi sabitleyelim
  const errorLog = logMessage.bind(null, "HATA");
  errorLog(new Date(), "Beklenmedik bir sorun oluştu!"); // zaman ve mesaj argümanları kaldı
  errorLog(new Date(), "Veritabanı bağlantısı koptu.");

  // Kendi kısmi uygulama yardımcımız (currying'e benzer ama daha esnek)
  function partial(fn, ...fixedArgs) {
    return function (...remainingArgs) {
      return fn.apply(this, fixedArgs.concat(remainingArgs));
    };
  }

  function multiply(a, b, c) {
    return a * b * c;
  }

  const multiplyByTwoPartial = partial(multiply, 2); // a = 2 sabitlendi
  console.log(multiplyByTwoPartial(3, 4)); // 2 * 3 * 4 = 24

  const multiplyByTwoAndThreePartial = partial(multiply, 2, 3); // a = 2, b = 3 sabitlendi
  console.log(multiplyByTwoAndThreePartial(5)); // 2 * 3 * 5 = 30
}

//! Currying vs. Partial Application:

//* Currying:
//  - Her zaman tek argüman alan bir dizi fonksiyon üretir. f(a,b,c) -> g(a)(b)(c).

//* Partial Application:
//  - Bir veya daha fazla argümanı sabitler ve daha az argüman alan yeni bir fonksiyon üretir.
//  Sonuçtaki fonksiyon birden fazla argüman alabilir. f(a,b,c) -> h(c) (eğer a ve b sabitlenmişse).

//* Currying, kısmi uygulamanın özel bir türü olarak düşünülebilir. Her curried fonksiyon kısmi olarak uygulanabilir.
