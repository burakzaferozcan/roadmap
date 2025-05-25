//TODO Bölüm 3: Kalıtım (Inheritance) Mekanizmaları

/**
 *? Tanım:
 *  Bir sınıfın (alt sınıf, türetilmiş sınıf, child class) başka bir sınıfın
 *  (üst sınıf, temel sınıf, parent class) özelliklerini ve metotlarını miras almasıdır.
 *  Bu, "bir ...dır" (is-a) ilişkisi kurar (örneğin, "Köpek bir Hayvandır").
 *
 *? Amaçları:
 ** 1 - Kod Yeniden Kullanımı:
 *  Üst sınıfta tanımlanan ortak özellikler ve metotlar, alt sınıflar tarafından tekrar yazılmadan kullanılabilir.
 ** 2 - Hiyerarşi Oluşturma:
 *  Sınıflar arasında mantıksal bir hiyerarşi kurarak kodu daha organize hale getirir.
 ** 3 - Özelleştirme (Specialization):
 *  Alt sınıflar, miras aldıkları özelliklere ve metotlara ek olarak kendi özel özelliklerini ve
 *  metotlarını tanımlayabilir veya miras aldıkları metotları geçersiz kılabilir (override).
 */

//! JavaScript'te Kalıtım Uygulamaları:

{
  //* Prototip Tabanlı Kalıtım (ES6 Öncesi):
  //  JavaScript'in temel kalıtım mekanizması prototiplere dayanır.
  //  Object.create() ve constructor fonksiyonlarının prototype özelliği kullanılarak kalıtım sağlanırdı. Bu yöntem daha karmaşıktır.

  // Üst Sınıf (Constructor Fonksiyonu)
  function Animal(name) {
    this.name = name;
  }
  Animal.prototype.makeASound = function () {
    console.log("Bilinmeyen bir ses...");
  };
  Animal.prototype.eat = function () {
    console.log(this.name + " yemek yiyor.");
  };

  // Alt Sınıf (Constructor Fonksiyonu)
  function Dog(name, breed) {
    Animal.call(this, name); // Üst sınıfın constructor'ını çağır (isim özelliğini miras almak için)
    this.breed = breed;
  }

  // Prototip Zincirini Kurma
  Dog.prototype = Object.create(Animal.prototype); // Dog.prototype, Animal.prototype'tan miras alır
  Dog.prototype.constructor = Dog; // Dog.prototype.constructor'ı düzelt

  // Alt sınıfa özel metot veya override
  Dog.prototype.makeASound = function () {
    // Metot override
    console.log("Hav hav!");
  };
  Dog.prototype.tailWagging = function () {
    console.log(this.name + " kuyruk sallıyor.");
  };

  const animal1 = new Animal("Canavar");
  animal1.makeASound(); // Bilinmeyen bir ses...
  animal1.eat(); // Canavar yemek yiyor.

  const dog1 = new Dog("Karabaş", "Kangal");
  dog1.makeASound(); // Hav hav! (Override edilmiş metot)
  dog1.eat(); // Karabaş yemek yiyor. (Miras alınmış metot)
  dog1.tailWagging(); // Karabaş kuyruk sallıyor. (Alt sınıfa özel metot)
  console.log(dog1.name); // Karabaş
  console.log(dog1.breed); // Kangal

  //? Bu yöntem, ES6 class sözdizimine göre daha karmaşıktır ve class geldiğinden beri daha az tercih edilir.
  //? Ancak JavaScript'in temelini anlamak için önemlidir.
}

{
  //* ES6 class Sözdizimi ile Kalıtım (extends ve super):
  //  ES6 class sözdizimi, kalıtımı çok daha basit ve okunabilir hale getirir.
  //? extends:
  //  Bir sınıfın başka bir sınıftan miras alacağını belirtir.
  //? super():
  //  1- Alt sınıfın constructor'ı içinde çağrıldığında, üst sınıfın constructor'ını çağırır.
  //  Bu, alt sınıfın this anahtar kelimesini kullanabilmesi için önce yapılmalıdır.
  //  2- Alt sınıfın metotları içinde super.metotAdi() şeklinde çağrıldığında, üst sınıfın aynı isimdeki metodunu çağırır.

  class AnimalES6 {
    constructor(name) {
      this.name = name;
      console.log("AnimalES6 constructor çağrıldı.");
    }

    makeASound() {
      console.log(`${this.name} bilinmeyen bir ses çıkarıyor.`);
    }

    eat() {
      console.log(`${this.name} yemek yiyor.`);
    }
  }

  class CatES6 extends AnimalES6 {
    // AnimalES6'dan miras al
    constructor(name, featherColor) {
      super(name); // Üst sınıfın constructor'ını çağır (MUTLAKA İLK SATIRDA OLMALI)
      this.featherColor = featherColor;
      console.log("CatES6 constructor çağrıldı.");
    }

    // Metot Override (Üst sınıftaki metodu geçersiz kılma)
    makeASound() {
      console.log(`${this.name} miyavlıyor!`);
    }

    // Üst sınıf metodunu çağırıp üzerine ekleme
    playGame() {
      super.eat(); // Üst sınıftaki yemekYe metodunu çağır
      console.log(`${this.name} oyun oynamaya başladı.`);
    }

    // Alt sınıfa özel metot
    lookOutWindow() {
      console.log(
        `${this.name} (${this.featherColor} tüylü) pencereden dışarıyı izliyor.`
      );
    }
  }

  const pamuk = new CatES6("Pamuk", "Beyaz");
  pamuk.makeASound(); // Pamuk miyavlıyor! (Override edilmiş)
  pamuk.eat(); // Pamuk yemek yiyor. (Miras alınmış)
  pamuk.lookOutWindow(); // Pamuk (Beyaz tüylü) pencereden dışarıyı izliyor. (Özel metot)
  pamuk.playGame(); // Pamuk yemek yiyor. \n Pamuk oyun oynamaya başladı.
  console.log(pamuk.name); // Pamuk
}
