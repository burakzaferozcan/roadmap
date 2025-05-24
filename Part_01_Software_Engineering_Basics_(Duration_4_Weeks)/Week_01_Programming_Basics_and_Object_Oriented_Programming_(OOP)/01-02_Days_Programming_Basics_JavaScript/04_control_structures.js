//TODO Bölüm 4: Kontrol Yapıları (if-else, switch, döngüler)
/**
 * Programın akışını kontrol etmek için kullanılırlar.
 * Belirli koşullara göre farklı kod bloklarının çalıştırılmasını veya
 * bir kod bloğunun tekrar tekrar çalıştırılmasını sağlarlar.
 * */

//! 4.1. if, else if, else
//  Belirli bir koşulun doğru (true) olup olmadığını kontrol eder.

{
  //* Truthy ve Falsy Değerler:
  //  JavaScript'te if gibi koşul bekleyen yapılar, koşulun boolean olup olmadığına bakmaksızın onu bir boolean değere dönüştürür.
  //? Falsy Değerler:
  //  false, 0, -0, 0n (BigInt), "" (boş string), null, undefined, NaN. Bu değerler koşul içinde false olarak değerlendirilir.
  //? Truthy Değerler:
  //  Falsy olmayan diğer tüm değerler (boş olmayan stringler, sıfır olmayan sayılar, nesneler, diziler vb.) true olarak değerlendirilir.

  let points = 75;

  if (points >= 90) {
    console.log("Not: AA");
  } else if (points >= 80) {
    console.log("Not: BA");
  } else if (points >= 70) {
    console.log("Not: BB"); // Bu çalışır
  } else if (points >= 60) {
    console.log("Not: CB");
  } else {
    console.log("Not: FF - Kaldınız!");
  }

  let userName = "admin";
  if (userName) {
    // kullaniciAdi boş string olmadığı için truthy'dir
    console.log(`Hoşgeldin, ${userName}`);
  }

  let productCount = 0;
  if (productCount) {
    // productCount 0 olduğu için falsy'dir
    console.log("Sepetinizde ürün var.");
  } else {
    console.log("Sepetiniz boş."); // Bu çalışır
  }
}

//! 4.2. switch
/**
  Bir değişkenin alabileceği birden fazla olası değere göre farklı işlemler yapmak için kullanılır.
  Genellikle çok sayıda else if zincirine göre daha okunabilir bir alternatiftir.
*/

{
  //* case:
  //  Kontrol edilecek değeri belirtir.
  //* break:
  //  case bloğunun sonunda kullanılmazsa, bir sonraki case bloğu da çalışır ("fall-through" davranışı).
  //  Bu genellikle istenmeyen bir durumdur, bu yüzden break unutulmamalıdır.
  //* default:
  //  Hiçbir case eşleşmezse çalışacak olan bloktur (isteğe bağlıdır).

  let day = "Pazartesi";
  let message;

  switch (day) {
    case "Pazartesi":
      message = "Haftanın ilk iş günü, sendromlu olabilir!";
      break;
    case "Salı":
    case "Çarşamba":
    case "Perşembe":
      message = "Hafta ortası, çalışmaya devam.";
      break;
    case "Cuma":
      message = "Haftanın son iş günü, yaşasın!";
      break;
    case "Cumartesi":
    case "Pazar":
      message = "Hafta sonu, dinlenme zamanı!";
      break;
    default:
      message = "Geçersiz gün girdiniz.";
      break;
  }
  console.log(message); // "Haftanın ilk iş günü, sendromlu olabilir!"

  // Fall-through örneği (dikkatli kullanılmalı)
  let level = 2;
  switch (level) {
    case 1:
      console.log("Temel erişim");
    // break; // break yok
    case 2:
      console.log("Editör erişimi"); // level 2 ise bu ve sonrası (break'e kadar) çalışır
    // break;
    case 3:
      console.log("Admin erişimi");
      break;
    default:
      console.log("Erişim yok");
  }
  // Çıktı (level=2 için):
  // Editör erişimi
  // Admin erişimi
}

//! 4.3. Döngüler (Loops)
/**
 Bir kod bloğunu belirli bir koşul sağlandığı sürece veya belirli sayıda tekrar çalıştırmak için kullanılır.
*/

{
  //* for Döngüsü:
  //  Genellikle tekrar sayısı bilindiğinde kullanılır.
  //  Sözdizimi: for (başlangıç; koşul; artış/azalış) { // çalışacak kod }
  //? başlangıç:
  //  Döngü başlamadan önce bir kez çalıştırılır (genellikle sayaç değişkeni tanımlanır).
  //? koşul:
  //  Her iterasyon başında kontrol edilir. true olduğu sürece döngü devam eder.
  //? artış/azalış:
  //  Her iterasyon sonunda çalıştırılır (genellikle sayaç güncellenir).

  for (let i = 0; i < 5; i++) {
    // i: 0, 1, 2, 3, 4
    console.log("Sayı:", i);
  }
  // Çıktı:
  // Sayı: 0
  // Sayı: 1
  // Sayı: 2
  // Sayı: 3
  // Sayı: 4

  let total = 0;
  for (let j = 1; j <= 10; j++) {
    // 1'den 10'a kadar sayıları toplama
    total += j;
  }
  console.log("1-10 arası toplam:", total); // 55
}

{
  //* while Döngüsü:
  //  Koşul true olduğu sürece çalışır. Koşul döngü başında kontrol edilir. Tekrar sayısı önceden bilinmediğinde kullanışlıdır.
  //  Sözdizimi: while (koşul) { // çalışacak kod }

  let counter = 0;
  while (counter < 3) {
    console.log("while sayacı:", counter);
    counter++;
  }
  // Çıktı:
  // while sayacı: 0
  // while sayacı: 1
  // while sayacı: 2

  // Sonsuz döngü riski: Koşul her zaman true kalırsa veya sayaç güncellenmezse.
  // while (true) { console.log("Sonsuz döngü!"); } // Tarayıcıyı kilitleyebilir!
}

{
  //* do...while Döngüsü:
  //  while döngüsüne benzer, ancak koşul döngü sonunda kontrol edilir. Bu nedenle döngü bloğu en az bir kez çalışır.
  //  Sözdizimi: do { // çalışacak kod } while (koşul);

  let k = 5;
  do {
    console.log("do...while k:", k); // Bu en az bir kere çalışır
    k++;
  } while (k < 5);
  // Çıktı:
  // do...while k: 5
}

{
  //* for...in Döngüsü:
  //  Bir nesnenin sayılabilir (enumerable) özelliklerinin (property) anahtarları (key) üzerinde gezinmek için kullanılır.
  //   Diziler için genellikle for...of veya standart for döngüsü tercih edilir.

  const car = {
    brand: "Tesla",
    model: "Model S",
    age: 2023,
  };
  for (let key in car) {
    console.log(`${key}: ${car[key]}`);
  }
  // Çıktı:
  // brand: Tesla
  // model: Model S
  // age: 2023

  // Dizilerde kullanımı (önerilmez, prototip zincirindeki özellikleri de getirebilir):
  const fruits = ["elma", "armut"];
  fruits.extraFeature = "tatlı"; // Bu normalde yapılmaz
  for (let index in fruits) {
    console.log(index, fruits[index]);
  }
  console.log(fruits); // [ 'elma', 'armut', extraFeature: 'tatlı' ]
  // Çıktı:
  // 0 elma
  // 1 armut
  // extraFeature tatlı  (bu beklenmedik olabilir)
}

{
  //* for...of Döngüsü (ES6):
  //  Yinelenebilir (iterable) nesnelerin (Diziler, String'ler, Map'ler, Set'ler vb.)
  //  değerleri üzerinde gezinmek için kullanılır. Diziler için modern ve tercih edilen yöntemdir.

  const colors = ["kırmızı", "yeşil", "mavi"];
  for (let color of colors) {
    console.log(color);
  }
  // Çıktı:
  // kırmızı
  // yeşil
  // mavi

  const text = "Merhaba";
  for (let character of text) {
    console.log(character);
  }
  // Çıktı:
  // M
  // e
  // r
  // h
  // a
  // b
  // a
}

//! 4.4. Döngü Kontrol İfadeleri: break ve continue

{
  //* break:
  //  İçinde bulunduğu en yakın döngüyü (veya switch yapısını) anında sonlandırır.
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      console.log("Döngü 5'te sonlandırıldı.");
      break; // Döngüden çıkar
    }
    console.log("i:", i);
  }
  // Çıktı:
  // i: 0
  // i: 1
  // i: 2
  // i: 3
  // i: 4
  // Döngü 5'te sonlandırıldı.
}

{
  //* continue:
  //  İçinde bulunduğu döngünün mevcut iterasyonunu atlar ve bir sonraki iterasyona geçer.
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      console.log("i=2 atlandı.");
      continue; // Bu iterasyonun kalanını atla, sonraki i'ye geç
    }
    console.log("i:", i);
  }
  // Çıktı:
  // i: 0
  // i: 1
  // i=2 atlandı.
  // i: 3
  // i: 4
}

{
  //* Etiketli (Labeled) break ve continue:
  //  İç içe döngülerde, dıştaki bir döngüyü kırmak veya devam ettirmek için kullanılır. Nadiren ihtiyaç duyulur.
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");

  outerLoop: for (let i = 0; i < 3; i++) {
    innerLoop: for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
        console.log(`i=${i}, j=${j}. Dış döngüye atlanıyor.`);
        continue outerLoop; // Dış döngünün bir sonraki iterasyonuna geçer
      }
      if (i === 2 && j === 0) {
        console.log(`i=${i}, j=${j}. Dış döngü kırılıyor.`);
        break outerLoop; // Dış döngüyü tamamen sonlandırır
      }
      console.log(`i=${i}, j=${j}`);
    }
  }
}
