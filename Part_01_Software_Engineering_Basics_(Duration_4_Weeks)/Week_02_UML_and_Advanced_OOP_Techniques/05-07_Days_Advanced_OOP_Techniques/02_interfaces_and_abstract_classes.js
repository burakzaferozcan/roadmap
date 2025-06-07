//TODO Bölüm 1: Kompozisyon ve Agregasyon (Composition vs. Aggregation)

/**
 * Bu iki yapı, OOP'de soyutlama sağlamanın ve sınıflar arasında bir "kontrat" veya "şablon" tanımlamanın yollarıdır.
 */

//! 2.1. Arayüzler (Interfaces)

//? Tanım:
/**
 * Bir sınıfın dış dünyaya hangi metotları sunması gerektiğini tanımlayan bir kontrattır.
 * Sadece metot imzalarını (isim, parametreler, dönüş tipi) içerir,
 * metotların nasıl implemente edileceğini (gövdesini) belirtmez.
 * Bir arayüzü uygulayan (implement eden) sınıf, bu arayüzdeki tüm metotları implemente etmekle yükümlüdür.
 */

//? JavaScript'te Durum:
/**
 * JavaScript'in yerleşik bir interface anahtar kelimesi yoktur (TypeScript'te vardır).
 * Ancak, arayüz kavramı JavaScript'te çeşitli şekillerde simüle edilebilir ve tasarım prensibi olarak önemlidir.
 *  */
//* 1- Duck Typing:
/**
 * "If it walks like a duck and quacks like a duck, then it must be a duck."
 *  Bir nesnenin belirli metotlara veya özelliklere sahip olup olmadığına bakılarak davranılır, tipine değil.
 *  Bu, JavaScript'in dinamik doğası gereği arayüzlerin zımni olarak var olmasına izin verir.
 */
//* 2- Yorumlar ve Dokümantasyon (JSDoc):
//  @interface ve @implements gibi JSDoc etiketleriyle arayüzler belgelenebilir.
//* 3- Sınıf Şablonları veya Soyut Hatalar:
//  Arayüz gibi davranacak bir sınıf oluşturup, implemente edilmesi gereken metotlarda hata fırlatılabilir.
//* Nesne Yapıları:
//  Beklenen metotlara sahip basit nesneler kullanılabilir.

//? Amaçları:
//* 1- Polimorfizm:
//  Farklı sınıfların aynı arayüzü uygulayarak birbirlerinin yerine geçebilmesini sağlar.
//* 2- Bağlantıyı Gevşetme (Loose Coupling):
//  Sınıflar, somut implementasyonlar yerine arayüzlere bağımlı hale gelir. Bu, sistemin daha esnek ve bakımı kolay olmasını sağlar.
//* 3- API Tanımlama:
//   Bir modülün veya servisin dış dünyaya nasıl bir işlevsellik sunduğunu net bir şekilde tanımlar.

//? UML Gösterimi:
//  <<interface>> stereotipi ile veya sadece italik yazılmış bir sınıf adı ile. Uygulayan sınıftan arayüze doğru kesikli bir ok ve içi boş üçgen (..|>) ile gösterilir (realization).

{
  //* JavaScript'te Arayüz Simülasyonu Örneği:
  // Yöntem 1: Yorumlar ve Beklenti (Duck Typing)
  /**
   * @interface Printable
   * @method print - Öğeyi yazdırır.
   * @returns {void}
   */

  class Report {
    // Printable arayüzünü zımni olarak uygular
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }

    print() {
      // Beklenen metot
      console.log("--- Rapor Yazdırılıyor ---");
      console.log("Başlık:", this.title);
      console.log("İçerik:", this.content);
      console.log("-------------------------");
    }
  }

  class Invoice {
    // Printable arayüzünü zımni olarak uygular
    constructor(invoiceNumber, amount) {
      this.invoiceNumber = invoiceNumber;
      this.amount = amount;
    }

    print() {
      // Beklenen metot
      console.log(`=== Fatura No: ${this.invoiceNumber} ===`);
      console.log(`Tutar: ${this.amount} TL`);
      console.log("=========================");
    }
  }

  function printDocument(document) {
    // Duck typing: document'nin 'print' metodu var mı diye bakarız.
    if (typeof document.print === "function") {
      document.print();
    } else {
      console.error("Bu nesne yazdırılamaz, 'print' metodu eksik.");
    }
  }

  const report1 = new Report("Aylık Satışlar", "Satışlar %10 arttı.");
  const invoice1 = new Invoice("INV-001", 150.75);
  const plainObject = { name: "Test" };

  printDocument(report1);
  printDocument(invoice1);
  printDocument(plainObject); // Hata mesajı verir

  // Yöntem 2: Soyut Hata Fırlatan Temel Sınıf (TypeScript'e daha yakın bir yaklaşım)
  class IFlyable {
    // 'I' öneki interface olduğunu belirtmek için bir gelenek
    fly() {
      throw new Error("fly() metodu implemente edilmelidir!");
    }
    land() {
      throw new Error("land() metodu implemente edilmelidir!");
    }
  }

  class Bird extends IFlyable {
    // Zımni olarak IFlyable'ı implemente etmeye çalışır
    constructor(name) {
      super();
      this.name = name;
    }

    fly() {
      console.log(`${this.name} kanat çırparak uçuyor.`);
    }

    land() {
      console.log(`${this.name} bir dala kondu.`);
    }
  }

  class Airplane extends IFlyable {
    constructor(model) {
      super();
      this.model = model;
    }
    fly() {
      console.log(`${this.model} motorlarını çalıştırarak havalanıyor.`);
    }
    // land() metodunu implemente etmezse, çağrıldığında hata fırlatır.
    // land() { console.log(`${this.model} piste indi.`); }
  }

  const sparrow = new Bird("Serçe");
  sparrow.fly();
  sparrow.land();

  const boeing = new Airplane("Boeing 747");
  boeing.fly();
  // boeing.land(); // Hata: land() metodu implemente edilmelidir! (Eğer Airplane'ta implement edilmemişse)
}

//! 2.2. Soyut Sınıflar (Abstract Classes)

//? Tanım:
/**
 * Hem somut (implemente edilmiş) metotları hem de soyut (implemente edilmemiş, sadece imzası olan) metotları
 * içerebilen sınıflardır. Doğrudan örneği oluşturulamazlar (new ile çağrılamazlar).
 * Alt sınıflar için ortak bir temel ve bir şablon görevi görürler.
 * Alt sınıflar, soyut metotları implemente etmek zorundadır.
 */

//? JavaScript'te Durum:
/**
 * JavaScript'in yerleşik bir abstract anahtar kelimesi yoktur. Ancak, arayüzlerde olduğu gibi simüle edilebilir:
 */
// 1- Constructor içinde new.target kontrolü ile doğrudan örneklenmeyi engelleme.
// 2- Soyut olması beklenen metotlarda throw new Error("Bu metot alt sınıfta implemente edilmelidir."); fırlatma.

//? Amaçları:
//* 1- Kod Yeniden Kullanımı:
//  Ortak özellikleri ve metotları tek bir yerde toplar.
//* 2- Şablon Tanımlama:
//  Alt sınıfların uyması gereken bir yapı ve zorunlu metotlar tanımlar.
//* 3- Kalıtım Hiyerarşisi:
//  Arayüzlerden farklı olarak, durum (özellikler) ve somut implementasyonlar da içerebilirler.

//? UML Gösterimi:
//  Sınıf adı italik yazılır veya {abstract} etiketi sınıfın altına eklenir.
//  Soyut metotlar da italik yazılır veya {abstract} etiketi alır.

{
  //* JavaScript'te Soyut Sınıf Simülasyonu Örneği:
  class Shape {
    // Soyut Sınıf Simülasyonu
    constructor(color) {
      if (new.target === Shape) {
        // Doğrudan 'new Shape()' çağrısını engelle
        throw new TypeError(
          "Soyut olan 'Shape' sınıfından doğrudan nesne oluşturulamaz."
        );
      }
      this.color = color;
      console.log(`Bir şekil (${this.color}) türetiliyor...`);
    }

    // Somut metot (alt sınıflar miras alır ve kullanabilir)
    showColor() {
      console.log(`Bu şeklin rengi: ${this.color}`);
    }

    // Soyut metotlar (alt sınıflar implemente etmeli)
    calculateArea() {
      throw new Error(
        "calculateArea() metodu alt sınıfta implemente edilmelidir."
      );
    }

    calculatePerimeter() {
      throw new Error(
        "calculatePerimeter() metodu alt sınıfta implemente edilmelidir."
      );
    }

    // Şablon Metot Deseni (Template Method Pattern) örneği
    // Bazı adımları soyut bırakarak genel bir algoritma iskeleti sunar.
    draw() {
      console.log(`\n--- ${this.constructor.name} Çiziliyor ---`);
      this.showColor();
      console.log(`  Alan: ${this.calculateArea().toFixed(2)}`);
      console.log(`  Çevre: ${this.calculatePerimeter().toFixed(2)}`);
      this.additionalDrawInfo(); // Alt sınıfların isteğe bağlı olarak override edebileceği bir "hook" metodu
      console.log("--------------------------");
    }

    additionalDrawInfo() {
      // Varsayılan olarak bir şey yapmaz, alt sınıflar override edebilir.
    }
  }

  class Circle extends Shape {
    constructor(color, radius) {
      super(color); // Üst sınıfın constructor'ını çağır
      this.radius = radius;
    }

    // Soyut metotların implementasyonu
    calculateArea() {
      return Math.PI * this.radius * this.radius;
    }

    calculatePerimeter() {
      return 2 * Math.PI * this.radius;
    }

    additionalDrawInfo() {
      console.log(`  Yarıçap: ${this.radius}`);
    }
  }

  class Square extends Shape {
    constructor(color, side) {
      super(color);
      this.side = side;
    }

    calculateArea() {
      return this.side * this.side;
    }

    calculatePerimeter() {
      return 4 * this.side;
    }
  }

  // const abstractShape = new Shape("Mavi"); // TypeError: Soyut olan 'Shape' sınıfından doğrudan nesne oluşturulamaz.

  const circle1 = new Circle("Kırmızı", 5);
  circle1.draw();

  const square1 = new Square("Yeşil", 4);
  square1.draw();
  // square1.showColor();
  // console.log(square1.calculateArea());
}

//! 2.3. Arayüz mü, Soyut Sınıf mı?

//* Arayüz Kullan:
//  1- Bir sınıfın ne yapması gerektiğini (kontratını) tanımlamak istediğinizde, nasıl yapacağıyla ilgilenmiyorsanız.
//  2- Tamamen farklı kalıtım hiyerarşilerindeki sınıfların ortak bir davranışı paylaşmasını istediğinizde (JavaScript'te bu daha çok duck typing ile olur).
//  3- Çoklu kalıtım benzeri bir yapıya ihtiyaç duyduğunuzda (bir sınıf birden fazla arayüzü implemente edebilir, ancak JavaScript'te bu da simülasyonla olur).

//* Soyut Sınıf Kullan:
//  1- Yakından ilişkili sınıflar arasında ortak kod (özellikler ve somut metotlar) paylaşmak istediğinizde.
//  2- Alt sınıfların uyması gereken temel bir yapı (şablon) ve bazı zorunlu (soyut) metotlar tanımlamak istediğinizde.
//  3- Alt sınıfların erişebileceği protected üyeler tanımlamak istediğinizde (JavaScript'te # ile private veya geleneksel _ ile).

//? Genel bir kural: "has-a" ilişkisi için kompozisyonu,
//? "is-a" ilişkisi için kalıtımı (ve soyut sınıfları),
//? "can-do" (yapabilir) ilişkisi için arayüzleri tercih edin.
