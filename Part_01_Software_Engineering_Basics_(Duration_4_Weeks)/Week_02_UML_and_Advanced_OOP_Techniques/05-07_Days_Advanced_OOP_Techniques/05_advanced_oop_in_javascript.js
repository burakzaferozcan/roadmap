//TODO Bölüm 5: JavaScript'te İleri OOP Teknikleri (Özet ve Ekstra Noktalar)

/**
 * JavaScript'in dinamik ve prototip tabanlı doğası, bazı OOP kavramlarının uygulanışını diğer dillere göre farklılaştırır.
 *  */

//! 1- Mixins (Davranış Ekleme):
// 1- JavaScript'te doğrudan çoklu kalıtım yoktur. Mixin'ler, bir sınıfa başka nesnelerden veya sınıflardan metot ve
// özellikler "karıştırmanın" bir yoludur. Bu, kod tekrarını azaltır ve farklı kaynaklardan gelen işlevselliği birleştirmeyi sağlar.
// 2- Genellikle Object.assign() veya özel yardımcı fonksiyonlarla implemente edilir.

{
  const canFly = {
    fly() {
      console.log(`${this.name || "Bu nesne"} uçuyor!`);
    },
  };

  const canSwim = {
    swim() {
      console.log(`${this.name || "Bu nesne"} yüzüyor!`);
    },
  };

  class Bird {
    constructor(name) {
      this.name = name;
    }
  }
  Object.assign(Bird.prototype, canFly); // Bird prototipine canFly özelliklerini ekle

  class Fish {
    constructor(name) {
      this.name = name;
    }
  }
  Object.assign(Fish.prototype, canSwim);

  class Duck extends Bird {
    // Duck zaten canFly'ı Bird'den miras alır
    constructor(name) {
      super(name);
    }
  }
  Object.assign(Duck.prototype, canSwim); // Duck'a ayrıca canSwim ekle

  const sparrow = new Bird("Serçe");
  sparrow.fly();

  const salmon = new Fish("Somon");
  salmon.swim();

  const mallard = new Duck("Yeşilbaş Ördek");
  mallard.fly();
  mallard.swim();
}

//! 2- Fonksiyonel Programlama ile OOP'nin Birleşimi:
//  1- JavaScript hem OOP hem de fonksiyonel programlama paradigmalarını destekler.
//  2- Saf fonksiyonlar, değişmezlik (immutability),
//  yüksek dereceli fonksiyonlar (map, filter, reduce) gibi fonksiyonel kavramlar,
//  OOP tasarımlarını daha öngörülebilir ve test edilebilir hale getirebilir.
//  3- Örneğin, bir nesnenin durumunu doğrudan değiştirmek yerine,
//  yeni bir durumla yeni bir nesne döndüren metotlar yazmak (immutability).

//! 3- Prototip Zincirinin Derinlemesine Anlaşılması:
//  - ES6 class sözdizimi prototipleri gizlese de, kalıtımın ve metot paylaşımının nasıl çalıştığını
//  anlamak için __proto__, prototype, Object.getPrototypeOf(), Object.create() gibi kavramları bilmek önemlidir.
//  Bu, beklenmedik davranışları anlamanıza ve daha esnek tasarımlar yapmanıza yardımcı olur.

//! 4- Metaprogramlama (Proxy ve Reflect API - ES6):
//* Proxy:
//  - Bir nesneye yapılan işlemleri (özellik okuma/yazma, metot çağırma vb.)
//  araya girerek özelleştirmenizi sağlayan bir nesnedir.
//  Veri bağlama, loglama, validasyon gibi senaryolarda kullanılabilir.
//* Reflect:
//  - Proxy'ler için varsayılan davranışları sağlayan ve nesneler üzerinde
//  düşük seviyeli işlemler yapmak için metotlar sunan yerleşik bir nesnedir.
//  - Bu konular oldukça ileri düzeydir ancak OOP tasarımlarına farklı bir boyut katabilir.

//! 5- this Bağlamının Yönetimi:
//  JavaScript'te this'in değeri, fonksiyonun nasıl çağrıldığına bağlı olarak değişir.
//  Ok fonksiyonları (=>), this'i leksikal olarak (tanımlandığı kapsamdan) alır,
//  bu da özellikle callback'lerde ve metotlarda this ile ilgili kafa karışıklıklarını azaltır.
//  bind(), call(), apply() metotları da this bağlamını manuel olarak ayarlamak için kullanılır.
//  İyi OOP tasarımı, this'in doğru şekilde yönetilmesini gerektirir.
