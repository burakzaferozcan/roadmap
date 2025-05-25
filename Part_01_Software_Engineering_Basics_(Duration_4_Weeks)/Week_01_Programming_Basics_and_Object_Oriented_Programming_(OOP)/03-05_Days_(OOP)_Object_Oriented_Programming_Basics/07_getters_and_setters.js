//TODO BÖLÜM 7: Getter ve Setter Metodları

/**
 * Getter ve setter metotları, bir nesnenin özelliklerine erişimi kontrol etmek ve
 * bu erişim sırasında ek mantık çalıştırmak için kullanılan özel metotlardır. Kapsülleme prensibini desteklerler.
 */

{
  //* Getter (get):
  //  Bir özelliğin değerini okumak için kullanılır.
  //  Metot gibi tanımlanır ama özellik gibi erişilir (parantez () kullanılmaz).
  //* Setter (set):
  //  Bir özelliğe değer atamak için kullanılır. Tek bir parametre alır (atanacak değer).
  //  Metot gibi tanımlanır ama özellik gibi değer atanır.
}

//! Neden Kullanılır?

{
  //* Veri Doğrulama (Validation):
  //  Setter içinde, atanan değerin belirli kurallara uyup uymadığı kontrol edilebilir.
  //* Hesaplanmış Özellikler (Computed Properties):
  //  Getter, başka özelliklere dayalı olarak bir değer hesaplayıp döndürebilir.
  //* Yan Etkiler (Side Effects):
  //  Bir özellik okunduğunda veya değiştirildiğinde loglama, arayüz güncelleme gibi ek işlemler yapılabilir.
  //* Dahili Temsili Gizleme:
  //  Özelliğin nesne içinde nasıl saklandığı dış dünyadan gizlenebilir. Getter/setter, bu dahili temsile bir arayüz sağlar.
}

//! Sözdizimi:

{
  class Person {
    constructor(name, birthYear) {
      this.name = name; // Doğrudan erişilebilen public özellik
      this._birthYear = birthYear; // Genellikle getter/setter ile yönetilecek "backing property" için _ öneki kullanılır
      this._log = [];
    }

    // Yaş için Getter
    get age() {
      this._log.push(`${this.name} için yaş hesaplandı.`);
      return new Date().getFullYear() - this._birthYear;
    }

    // Doğum yılı için Setter (örneğin, sadece geçerli bir yıl atanmasını sağlamak için)
    set birthYear(age) {
      if (age > 1900 && age <= new Date().getFullYear()) {
        this._log.push(`${this.name} için doğum yılı ${age} olarak ayarlandı.`);
        this._birthYear = age;
      } else {
        this._log.push(`Geçersiz doğum yılı denemesi: ${age}`);
        console.error("Geçersiz doğum yılı!");
      }
    }

    // Dogum yili icin Getter (backing property'ye erişim)
    get birthYear() {
      this._log.push(`${this.name} için doğum yılı okundu.`);
      return this._birthYear;
    }

    get showLog() {
      return this._log;
    }
  }

  const person1 = new Person("Ayşe", 1990);

  // Getter kullanımı (metot gibi değil, özellik gibi çağrılır)
  console.log(`${person1.name}'in yaşı: ${person1.age}`); // Ayşe'in yaşı: (güncel yıl - 1990)

  // Setter kullanımı (özellik gibi değer atanır)
  person1.birthYear = 1985; // Setter çağrılır, _birthYear güncellenir
  console.log(`${person1.name}'in yeni yaşı: ${person1.age}`); // Ayşe'in yeni yaşı: (güncel yıl - 1985)

  person1.birthYear = 1800; // Setter çağrılır, hata mesajı basılır
  console.log(
    `${person1.name}'in doğum yılı (getter ile): ${person1.birthYear}`
  ); // 1985 (değişmedi)

  console.log("\nİşlem Logları:");
  person1.showLog.forEach((log) => console.log(log));
  /*
      Çıktı:
      Ayşe'in yaşı: 35
      Ayşe'in yeni yaşı: 40
      Geçersiz doğum yılı!
      Ayşe'in doğum yılı (getter ile): 1985
      
      İşlem Logları:
      Ayşe için yaş hesaplandı.
      Ayşe için doğum yılı 1985 olarak ayarlandı.
      Ayşe için yaş hesaplandı.
      Geçersiz doğum yılı denemesi: 1800
      Ayşe için doğum yılı okundu.
      */
}

//! Önemli Noktalar:

/**
 * 1- Getter'ın parametresi olmaz.
 * 2- Setter'ın tam olarak bir parametresi olmalıdır.
 * 3- Getter ve setter genellikle aynı isimli bir "backing property" (örneğin _dogumYili) ile birlikte kullanılır.
 * Eğer getter/setter ismi ile backing property ismi aynı olursa sonsuz döngüye girilir (örn: get yas() { return this.yas; }).
 * 4- Object.defineProperty() metodu ile de nesnelere sonradan getter ve setter eklenebilir (daha esnek ama daha karmaşık).
 */
