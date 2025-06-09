//TODO Bölüm 5: Closure'lar (Kapanışlar) ve Kapsamlar (Scopes)

//? Kapsam (Scope) Tekrarı:
//  - JavaScript'te değişkenlerin erişilebilir olduğu alanlardır (Global Scope, Function Scope, Block Scope - let/const ile).

//? Leksikal Kapsam (Lexical Scoping / Static Scoping):
//  Bir fonksiyonun kapsamının, fonksiyonun tanımlandığı yerde belirlenmesi anlamına gelir, çağrıldığı yerde değil.
//  İç içe fonksiyonlar, dıştaki fonksiyonların değişkenlerine ve parametrelerine erişebilir.

//? Closure (Kapanış):
//*  Tanım:
//  - Bir fonksiyonun, kendi leksikal kapsamı dışındaki (genellikle onu çevreleyen dış fonksiyonun kapsamındaki)
//  değişkenlere erişebilmesi ve bu değişkenleri "hatırlaması" durumudur, dış fonksiyon çalışmasını bitirmiş olsa bile.
//  - Daha basit bir ifadeyle: Bir fonksiyon, tanımlandığı andaki "çevresiyle" (scope chain) birlikte paketlenir.
//* Nasıl Oluşur?
//  - Bir fonksiyon içinde başka bir fonksiyon tanımlanıp, bu içteki fonksiyon dıştaki fonksiyonun değişkenlerini veya
//  parametrelerini kullanıyorsa ve içteki fonksiyon dışarıya
//  (örneğin bir return ile veya bir değişkene atanarak) aktarılıyorsa bir closure oluşur.

//! Closure Örneği:

{
  function outerFunction(outerVariable) {
    const hiddenMessage = "Bu bir gizli mesajdır."; // Bu değişken closure ile korunacak

    return function innerFunction(innerVariable) {
      // innerFunction, outerFunction'un kapsamındaki outerVariable'e ve hiddenMessage'a erişebilir.
      console.log(`Dış Değişken: ${outerVariable}`);
      console.log(`İç Değişken: ${innerVariable}`);
      console.log(`Gizli Mesaj: ${hiddenMessage}`);
      return outerVariable + innerVariable;
    };
  }

  // outerFunction çağrıldığında, bir innerFunction örneği oluşturulur ve döndürülür.
  // Bu innerFunction, outerFunction'un o anki kapsamını (outerVariable='Merhaba' ve hiddenMessage) hatırlar.
  const myClosure = outerFunction("Merhaba");

  // outerFunction çalışmasını bitirdi, ancak myClosure hala onun kapsamındaki değişkenlere erişebilir.
  let result1 = myClosure(" Dünya"); // Dış Değişken: Merhaba, İç Değişken:  Dünya, Gizli Mesaj: ...
  console.log("Sonuç 1:", result1); // Merhaba Dünya

  let result2 = myClosure(" JavaScript"); // Dış Değişken: Merhaba, İç Değişken:  JavaScript, Gizli Mesaj: ...
  console.log("Sonuç 2:", result2); // Merhaba JavaScript

  const anotherClosure = outerFunction("Nasılsın");
  let result3 = anotherClosure("?");
  console.log("Sonuç 3:", result3); // Nasılsın?
  // myClosure ve anotherClosure farklı "çevrelere" (environment) sahiptir.
}

//! Closure'ların Kullanım Alanları:

//* 1- Veri Gizleme ve Kapsülleme (Data Hiding and Encapsulation):
//  - Modül deseninin (Module Pattern) temelini oluşturur. Dış fonksiyonun değişkenleri,
//  döndürülen iç fonksiyonlar aracılığıyla erişilebilen "private" üyeler gibi davranır.
{
  function createCounter() {
    let count = 0; // Bu değişken dışarıdan doğrudan erişilemez (private)
    return {
      increment: function () {
        count++;
      },
      decrement: function () {
        count--;
      },
      getValue: function () {
        return count;
      },
    };
  }
  const counter1 = createCounter();
  counter1.increment();
  counter1.increment();
  console.log(counter1.getValue()); // 2
  // console.log(counter1.count); // undefined
}

//* 2- Yüksek Dereceli Fonksiyonlar ve Callback'ler:
// - Callback fonksiyonları genellikle tanımlandıkları dış kapsamdaki değişkenlere erişir. Örneğin, setTimeout içindeki bir callback.

//* 3- Kısmi Uygulama (Partial Application) ve Currying: (Detaylı işlenecek)
//  - Bir fonksiyonun bazı argümanlarını önceden sabitleyerek yeni bir fonksiyon oluşturmak için kullanılır.

//* 4- Durumun Korunması (State Preservation):
//  Döngülerde veya asenkron işlemlerde belirli bir andaki değişken değerini korumak için kullanılabilir
//  (özellikle var ile döngü değişkeni kullanıldığında dikkat edilmeli, let bu sorunu çözer).

//! Kapsam Zinciri (Scope Chain):
//  - Bir fonksiyon çalıştığında, JavaScript motoru önce fonksiyonun kendi yerel kapsamına bakar.
//  Aranan değişken bulunamazsa, onu çevreleyen dış fonksiyonun kapsamına,
//  sonra onun da dışına ve en son global kapsama kadar bakar. Closure, bu zincirin bir parçasını "canlı" tutar.
