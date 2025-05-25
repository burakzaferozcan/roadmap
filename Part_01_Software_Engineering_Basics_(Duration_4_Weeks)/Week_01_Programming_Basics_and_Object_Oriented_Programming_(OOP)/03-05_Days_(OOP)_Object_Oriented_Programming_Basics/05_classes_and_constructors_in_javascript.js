//TODO BÖLÜM 5: JavaScript'te class Yapısı ve constructor Fonksiyonları (ES6 Detayları)

/**
 * ES6 ile gelen class sözdizimi, JavaScript'te nesne yönelimli programlamayı daha anlaşılır ve
 * diğer dillerdeki OOP yapılarına benzer hale getirmiştir. Ancak unutulmamalıdır ki,
 * bu sözdizimi aslında JavaScript'in prototip tabanlı kalıtım mekanizması üzerine kurulmuş bir "sentaktik şeker"dir. (syntactic sugar)
 */

//! class Anahtar Kelimesi:

{
  //  Bir sınıf tanımlamak için kullanılır. Sınıf isimleri genellikle büyük harfle başlar (PascalCase).
  class User {
    // Sınıf içeriği buraya gelecek
  }
}

//! constructor Metodu:

{
  // Bir sınıfta constructor adı verilen özel bir metottur.
  // new anahtar kelimesiyle bir sınıftan yeni bir nesne (instance) oluşturulduğunda otomatik olarak çağrılır.
  // Temel amacı, yeni oluşturulan nesnenin başlangıç durumunu (özelliklerini) ayarlamaktır.
  // Bir sınıfta en fazla bir tane constructor metodu bulunabilir. Eğer tanımlanmazsa, JavaScript boş bir constructor varsayılan olarak ekler.
  // constructor içinde this anahtar kelimesi, yeni oluşturulan nesneyi ifade eder.

  class Student {
    constructor(name, surName, number) {
      console.log("Student constructor'ı çalıştı!");
      this.name = name; // 'this' yeni oluşturulan Ogrenci nesnesini işaret eder
      this.surName = surName;
      this.number = number;
      this.isActive = true; // Varsayılan bir özellik de atanabilir
    }

    showInfo() {
      console.log(
        `Ad: ${this.name}, Soyad: ${this.surName}, No: ${this.number}, Aktif: ${this.isActive}`
      );
    }
  }

  // 'new' ile nesne oluşturma ve constructor'ın otomatik çağrılması
  const std1 = new Student("Ayşe", "Yılmaz", 101);
  const std2 = new Student("Mehmet", "Öztürk", 102);

  std1.showInfo(); // Ad: Ayşe, Soyad: Yılmaz, No: 101, Aktif: true
  std2.showInfo(); // Ad: Mehmet, Soyad: Öztürk, No: 102, Aktif: true
}

//! Instance (Örnek) Metotları:

/**
 * Sınıf içinde tanımlanan ve o sınıftan türetilen nesneler aracılığıyla çağrılabilen fonksiyonlardır.
 * Yukarıdaki showInfo() bir instance metodudur. Bu metotlar, sınıfın prototype'ına eklenir (bir sonraki başlıkta detaylı).
 */

//! new Anahtar Kelimesinin Yaptıkları (Arka Planda):

{
  //* new Student(...) ifadesi çalıştırıldığında arka planda şunlar olur:
  //  1- Boş bir JavaScript nesnesi {} oluşturulur.
  //  2- Bu yeni boş nesnenin prototipi (__proto__ veya [[Prototype]]), Student.prototype olarak ayarlanır. (Prototip zinciri kurulur.)
  //  3- Ogrenci sınıfının constructor metodu, bu yeni oluşturulan nesne this bağlamı olacak şekilde çağrılır.
  //  (Student(name, surName, number) içindeki this bu yeni nesneyi işaret eder.)
  //  4- Eğer constructor açıkça bir nesne (object) döndürmezse,
  //  new ifadesi otomatik olarak adım 1'de oluşturulan ve adım 3'te güncellenen nesneyi döndürür.
}

//! Sınıf İfadeleri (Class Expressions):
//  Fonksiyon ifadeleri gibi, sınıflar da ifadelere atanabilir. İsimli veya isimsiz olabilirler.
{
  // İsimsiz sınıf ifadesi
  const Rectangle = class {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    calculateArea() {
      return this.width * this.height;
    }
  };
  const rectangle1 = new Rectangle(10, 5);
  console.log("Dikdörtgen Alanı:", rectangle1.calculateArea()); // 50

  // İsimli sınıf ifadesi (sınıf ismi sadece sınıfın içinde geçerlidir)
  const Square = class ShapeSquare {
    constructor(edge) {
      this.edge = edge;
      // console.log(ShapeSquare.name); //? Sınıf içinden erişilebilir: "ShapeSquare"
    }
    area() {
      return this.edge * this.edge;
    }
  };
  const square1 = new Square(4);
  console.log("Kare Alanı:", square1.area()); // 16
  // console.log(ShapeSquare); //! ReferenceError: ShapeSquare is not defined (dışarıdan erişilemez)
}
