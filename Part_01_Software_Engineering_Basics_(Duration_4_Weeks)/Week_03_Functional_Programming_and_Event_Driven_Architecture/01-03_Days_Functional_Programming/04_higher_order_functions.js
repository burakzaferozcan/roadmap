//TODO Bölüm 4: Yüksek Dereceli Fonksiyonlar (Higher-Order Functions - HOF)

//? Tanım:
//  Aşağıdaki koşullardan en az birini sağlayan fonksiyonlardır:
//  1- Argüman olarak bir veya daha fazla fonksiyon alır.
//  2- Sonuç olarak bir fonksiyon döndürür.
//  - JavaScript'te fonksiyonların birinci sınıf vatandaş olması sayesinde HOF'lar doğal olarak desteklenir.

//? Neden Kullanılır?
//* Soyutlama:
//  - Genel amaçlı operasyonları (döngü, koşul vb.) soyutlayarak daha özel işlevler oluşturmayı sağlar.
//* Yeniden Kullanılabilirlik:
//  - Genel HOF'lar, farklı veri kümeleri ve farklı operasyonlarla tekrar tekrar kullanılabilir.
//* Birleştirilebilirlik (Composability):
//  - Fonksiyonları birbirine bağlayarak (piping, composing) karmaşık veri dönüşüm akışları oluşturmayı kolaylaştırır.
//* Daha Az Kod:
//  - Döngü gibi tekrarlayan yapıları azaltır.

//! Yaygın Yüksek Dereceli Fonksiyon Örnekleri (JavaScript Dizi Metotları):
//* Array.prototype.map(): (Detaylı işlenecek)
//  - Bir dizinin her bir elemanı üzerinde verilen bir fonksiyonu çalıştırır ve bu fonksiyonun döndürdüğü
//  sonuçlardan oluşan yeni bir dizi oluşturur. Orijinal diziyi değiştirmez.
//* Array.prototype.filter(): (Detaylı işlenecek)
//  - Bir dizinin her bir elemanı için verilen bir test fonksiyonunu çalıştırır.
//  Test fonksiyonunun true döndürdüğü elemanlardan oluşan yeni bir dizi oluşturur. Orijinal diziyi değiştirmez.
//* Array.prototype.reduce(): (Detaylı işlenecek)
//  - Bir dizinin elemanlarını (soldan sağa veya sağdan sola) tek bir değere (akümülatör) indirgemek için bir fonksiyon çalıştırır.
//* Array.prototype.forEach():
//  - Dizinin her elemanı için bir fonksiyon çalıştırır. map'ten farklı olarak bir şey döndürmez
//  (genellikle yan etkiler için kullanılır, FP'de dikkatli kullanılmalı).
//* Array.prototype.sort():
//  - Bir karşılaştırma fonksiyonu alabilir.
//  (Dikkat: sort() orijinal diziyi değiştirir, bu yüzden FP'de kullanırken kopyası üzerinde çalışmak gerekebilir.)
//* Array.prototype.find():
//  - Test fonksiyonunu sağlayan ilk elemanı bulur.
//* Array.prototype.some():
//  - Dizideki en az bir eleman test fonksiyonunu sağlıyorsa true döner.
//* Array.prototype.every():
//  - Dizideki tüm elemanlar test fonksiyonunu sağlıyorsa true döner.

//! Kendi Yüksek Dereceli Fonksiyonlarımızı Yazmak:
{
  // Argüman olarak fonksiyon alan bir HOF
  function executeForEach(array, operationFunction) {
    for (let i = 0; i < array.length; i++) {
      operationFunction(array[i], i, array); // eleman, index, dizi
    }
  }
  const names = ["Ali", "Veli", "Ayşe"];
  executeForEach(names, (name, index) => {
    console.log(`${index + 1}. isim: ${name}`);
  });

  // Sonuç olarak fonksiyon döndüren bir HOF
  function createMultiplier(multiplier) {
    return function (number) {
      // Bu içteki fonksiyon bir closure'dır
      return number * multiplier;
    };
  }

  const multiplyByTwo = createMultiplier(2);
  const multiplyByThree = createMultiplier(3);

  console.log(multiplyByTwo(5)); // 10
  console.log(multiplyByThree(5)); // 15
  console.log(createMultiplier(10)(7)); // 70 (Doğrudan çağrı)
}
