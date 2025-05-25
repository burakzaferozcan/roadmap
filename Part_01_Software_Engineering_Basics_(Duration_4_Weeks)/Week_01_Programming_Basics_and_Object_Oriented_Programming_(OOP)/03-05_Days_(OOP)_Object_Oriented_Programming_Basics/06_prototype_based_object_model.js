//TODO BÖLÜM 6: Prototip Tabanlı Nesne Modeli (JavaScript'in Kalbi)

/**
 * JavaScript, diğer popüler OOP dilleri gibi sınıf tabanlı (class-based) değil, prototip tabanlıdır (prototype-based).
 * ES6 class sözdizimi bu temel yapıyı gizlese de, altta yatan mekanizma hala prototiplerdir.
 * Bu konuyu anlamak, JavaScript'in nasıl çalıştığını ve
 * OOP'yi nasıl uyguladığını derinlemesine kavramak için kritik öneme sahiptir.
 */

//! Her Nesnenin Bir Prototipi Vardır:
/**
 * JavaScript'te neredeyse her nesne, başka bir nesneye bağlıdır; bu bağlı olduğu nesneye "prototip" denir.
 * Bir nesne, kendi üzerinde bulunmayan bir özelliği veya metodu aradığında,
 * JavaScript motoru bu özelliği/metodu nesnenin prototipinde arar.
 */

//! prototype Özelliği (Fonksiyonlarda/Sınıflarda):
//  1- JavaScript'te fonksiyonlar (ve dolayısıyla ES6 class'ları, çünkü onlar da özel fonksiyonlardır) oluşturulduğunda,
//  otomatik olarak prototype adında bir özelliğe sahip olurlar.
//  2- Bu prototype özelliği kendisi bir nesnedir.
//  3- Bu prototype nesnesi, o fonksiyon bir constructor olarak (new ile) kullanıldığında oluşturulacak olan
//  tüm örneklerin (instance) ortak prototipi olacaktır.
//  4- Yani, new FonksiyonAdi() ile oluşturulan nesnelerin __proto__ (veya [[Prototype]]) özelliği, FonksiyonAdi.prototype nesnesini işaret eder.

//! __proto__ (veya [[Prototype]]) Gizli Bağlantısı (Nesnelerde):
//  1- Her nesne (instance), kendi prototipine işaret eden gizli bir bağlantıya sahiptir.
//  Bu bağlantıya genellikle __proto__ (iki alt çizgi, proto, iki alt çizgi) özelliği üzerinden erişilebilir
//  (standart olmayan bir yöntemdir ama çoğu tarayıcı destekler).
//  2- Standart ve önerilen yol, Object.getPrototypeOf(nesne) metodunu kullanmaktır.
//  3- nesne.__proto__ === nesne.constructor.prototype (genellikle)

//! Prototip Zinciri (Prototype Chain):
//* Bir nesnede bir özellik veya metot arandığında:
//  1- Önce nesnenin kendisine bakılır.
//  2- Bulunamazsa, nesnenin prototipine (__proto__ veya Object.getPrototypeOf()) bakılır.
//  3- Orada da bulunamazsa, prototipin prototipine bakılır.
//  4- Bu işlem, zincirin sonuna (genellikle Object.prototype) ulaşılana veya özellik/metot bulunana kadar devam eder.
//  Eğer zincirin sonunda da bulunamazsa undefined döner (özellik için) veya hata verir (metot çağrısı için).
//* Object.prototype
//  JavaScript'teki çoğu nesnenin prototip zincirinin en tepesinde yer alır ve toString(), hasOwnProperty() gibi temel metotları içerir.
//  Object.prototype'ın prototipi null'dur.

//! Kalıtım ve Prototip Zinciri:
//* class Cat extends Animal dediğimizde, aslında olan şudur:
//  1- Cat.prototype nesnesinin prototipi (Cat.prototype.__proto__) olarak Animal.prototype ayarlanır.
//  2- Bu sayede Cat örnekleri, önce kendi üzerinde,
//  sonra Cat.prototype'ta, sonra Animal.prototype'ta ve en son Object.prototype'ta metot ve özellikleri arar.

//! Örneklerle Prototip Mekanizması:

{
  //* Constructor Fonksiyonu ile:
  function Human(name) {
    this.name = name;
    // this.sayHello = function() { console.log("Merhaba ben " + this.name); } // Kötü pratik: Her instance için kopyalanır
  }

  // Metotları constructor'ın prototype nesnesine eklemek iyi pratiktir.
  // Bu sayede metotlar bellekte tek bir yerde tutulur ve tüm instance'lar tarafından paylaşılır.
  Human.prototype.sayHello = function () {
    console.log("Merhaba, ben " + this.name);
  };
  Human.prototype.age = 25; // Tüm instance'lar için varsayılan bir özellik (genelde metotlar eklenir)

  const human1 = new Human("Ali");
  const human2 = new Human("Veli");

  human1.sayHello(); // Merhaba, ben Ali
  human2.sayHello(); // Merhaba, ben Veli

  console.log(human1.age); // 25
  human1.age = 30; // Bu, human1 nesnesine 'age' adlı kendi özelliğini ekler, prototipteki değişmez.
  console.log(human1.age); // 30 (önce kendi üzerinde arar)
  console.log(human2.age); // 25 (kendi üzerinde yok, prototipten alır)

  // Prototip zincirini inceleyelim:
  console.log(Object.getPrototypeOf(human1) === Human.prototype); // true
  console.log(Human.prototype.isPrototypeOf(human2)); // true
  console.log(Object.getPrototypeOf(Human.prototype) === Object.prototype); // true

  // Bir metot hem instance'ta hem prototipte varsa, instance'taki önceliklidir (shadowing).
  human1.sayHello = function () {
    console.log("Özel selam, ben " + this.name);
  };
  human1.sayHello(); // Özel selam, ben Ali
  human2.sayHello(); // Merhaba, ben Veli (prototipten gelen orijinal metot)
}

{
  //* ES6 class ile (arka planda aynı mantık):
  class CarES6 {
    constructor(brand) {
      this.brand = brand;
    }

    // Bu metot aslında CarES6.prototype'a eklenir.
    giveInfo() {
      console.log(`Bu bir ${this.brand} arabasıdır.`);
    }
  }

  const araba1 = new CarES6("BMW");
  araba1.giveInfo(); // Bu bir BMW arabasıdır.

  console.log(Object.getPrototypeOf(araba1) === CarES6.prototype); // true
  // CarES6.prototype üzerine eklenen metotlar tüm örnekler tarafından paylaşılır.
  CarES6.prototype.honkHorn = function () {
    console.log(`${this.brand} kornaya basıyor: Düt düt!`);
  };
  araba1.honkHorn(); // BMW kornaya basıyor: Düt düt!

  const araba2 = new CarES6("Audi");
  araba2.honkHorn(); // Audi kornaya basıyor: Düt düt! (aynı prototip metodunu kullanır)
}

{
  //* Object.create() ile Prototip Belirleme:
  //  Belirli bir nesneyi prototip olarak kullanarak yeni bir nesne oluşturmanın doğrudan bir yoludur.
  const baseObject = {
    greet: function () {
      console.log("Selam, adım " + this.name);
    },
  };

  const ahmet = Object.create(baseObject); // ahmet'in prototipi baseObject olur
  ahmet.name = "Ahmet";
  ahmet.greet(); // Selam, adım Ahmet

  const can = Object.create(baseObject);
  can.name = "Can";
  can.profession = "Mühendis";
  can.greet(); // Selam, adım Can
  console.log(can.profession); // Mühendis

  console.log(Object.getPrototypeOf(ahmet) === baseObject); // true

  //? Bu yöntem, class sözdizimi olmadan daha esnek prototip zincirleri kurmak için kullanılabilir.
}

/**
 * Prototip tabanlı modeli anlamak, JavaScript'te OOP'nin nasıl çalıştığını,
 * metotların nasıl paylaşıldığını ve kalıtımın nasıl gerçekleştiğini kavramak için hayati önem taşır.
 * class sözdizimi işleri kolaylaştırsa da, altta yatan bu prensipler değişmemiştir.
 */
