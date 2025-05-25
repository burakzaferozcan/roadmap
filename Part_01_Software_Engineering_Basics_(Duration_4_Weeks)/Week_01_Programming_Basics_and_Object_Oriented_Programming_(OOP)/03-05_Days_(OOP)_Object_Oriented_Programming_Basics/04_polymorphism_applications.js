//TODO Bölüm 4: Çok Biçimlilik (Polymorphism) Uygulamaları

/**
 *? Tanım:
 *  Kelime anlamı "birçok biçim" demektir.
 *  OOP'de, farklı sınıflara ait nesnelerin, aynı arayüze (metot imzasına) farklı şekillerde yanıt vermesi yeteneğidir.
 *  Genellikle kalıtımla birlikte kullanılır.
 *? Temel Fikir:
 *  Bir üst sınıf referansı, farklı alt sınıf nesnelerini işaret edebilir ve
 *  bu nesneler aynı metot çağrısına kendi özel implementasyonlarıyla cevap verirler.
 *? Amaçları:
 ** 1 - Esneklik:
 *  Farklı nesne türlerini tek bir arayüz üzerinden yönetebilmeyi sağlar.
 ** 2 - Genişletilebilirlik:
 *  Sisteme yeni alt sınıflar eklendiğinde, mevcut kodu değiştirmeden bu yeni sınıfların da aynı arayüzle çalışabilmesini sağlar.
 ** 3 - Kodun Basitleştirilmesi:
 *  Farklı nesne türleri için ayrı ayrı if-else veya switch blokları yazmak yerine, tek bir metot çağrısıyla işlem yapılır.
 */

//! JavaScript'te Çok Biçimlilik Örneği (Metot Override ile):
//  Kalıtım örneğimizdeki AnimalES6, CatES6 ve bir de DogES6 sınıfı ekleyerek çok biçimliliği görelim.

{
  class AnimalES6 {
    constructor(name) {
      this.name = name;
    }
    makeSound() {
      console.log(`${this.name} bilinmeyen bir ses çıkarıyor.`);
    }
  }

  class CatES6 extends AnimalES6 {
    constructor(name) {
      super(name);
    }
    makeSound() {
      // Override
      console.log(`${this.name} miyavlıyor!`);
    }
  }

  class DogES6 extends AnimalES6 {
    constructor(name) {
      super(name);
    }
    makeSound() {
      // Override
      console.log(`${this.name} havlıyor!`);
    }
  }

  class BirdES6 extends AnimalES6 {
    constructor(name) {
      super(name);
    }
    // Bird makeSound metodunu override etmiyor, üst sınıftakini kullanacak
  }

  const animals = [
    new CatES6("Tekir"),
    new DogES6("Kont"),
    new AnimalES6("Gizemli Yaratık"), // Temel sınıf nesnesi
    new BirdES6("Civciv"),
  ];

  // Her bir animal nesnesi için makeSound metodu çağrılıyor
  // Hepsi AnimalES6 türünden (veya ondan türemiş) olduğu için aynı metot çağrılabilir
  // Ancak her biri kendi override ettiği şekilde davranır.
  for (const animal of animals) {
    animal.makeSound();
  }
  /*
      Çıktı:
      Tekir miyavlıyor!
      Kont havlıyor!
      Gizemli Yaratık bilinmeyen bir ses çıkarıyor.
      Civciv bilinmeyen bir ses çıkarıyor. (Bird, makeSound'ı override etmediği için AnimalES6'daki çalışır)
      */

  function makeAnimalSpeak(animalObject) {
    // animalObject CatES6, DogES6 veya AnimalES6 olabilir
    animalObject.makeSound();
  }

  console.log("\nFonksiyon ile çok biçimlilik:");
  makeAnimalSpeak(new CatES6("Boncuk")); // Boncuk miyavlıyor!
  makeAnimalSpeak(new DogES6("Dost")); // Dost havlıyor!
}

/**
 *  Bu örnekte animals dizisindeki her bir eleman farklı bir sınıfa ait olsa da,
 *  hepsi AnimalES6 sınıfından türediği için makeSound() metoduna sahiptir.
 *  Döngü içinde bu metot çağrıldığında,
 *  JavaScript çalışma zamanında nesnenin gerçek tipine bakarak hangi makeSound() implementasyonunun çalıştırılacağına karar verir.
 *   Bu, çok biçimliliğin temelidir.
 */
