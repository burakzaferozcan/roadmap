//TODO BÖLÜM 8: Statik Metodlar ve Özellikler
/**
 * Statik metotlar ve özellikler, bir sınıfın kendisine aittir,
 * o sınıftan oluşturulan örneklere (instance) değil.
 * Yani, bir nesne oluşturmadan doğrudan sınıf adı üzerinden erişilirler.
 */

//? static Anahtar Kelimesi: Statik bir metot veya özellik tanımlamak için kullanılır.

//! Neden Statik Üyeler Kullanılır?

//* 1- Yardımcı Fonksiyonlar (Utility Functions):
//  Belirli bir sınıfla ilgili olan ancak belirli bir örnek verisine ihtiyaç duymayan genel yardımcı fonksiyonlar için kullanılır.
//  (Örn: Math.random(), Date.now()).
//* 2- Fabrika Metotları (Factory Methods):
//  Sınıf örneklerini oluşturmak için alternatif yollar sunan metotlar.
//* 3- Sabitler (Constants):
//  Sınıfla ilgili, tüm örnekler için aynı olan sabit değerler.
//* 4- Instance Sayacı:
//  Bir sınıftan kaç tane örnek oluşturulduğunu takip etmek gibi sınıf düzeyinde bilgi tutmak için.

//! Sözdizimi ve Kullanım:

{
  class Mathematics {
    static PI = 3.1415926535; // Statik özellik (sabit)

    static sum(a, b) {
      // Statik metot
      return a + b;
    }

    static circleArea(radius) {
      // Statik metot, statik özelliği kullanabilir
      // 'this' burada Matematik sınıfını işaret eder, bir örneği değil.
      // return this.PI * radius * radius;
      return Mathematics.PI * radius * radius; // Sınıf adıyla erişmek daha nettir
    }

    // Statik olmayan metotlar statik üyelere SınıfAdı.UyeAdi ile erişebilir
    normalMethod() {
      console.log("PI değeri (normal metottan):", Mathematics.PI);
    }
  }

  // Statik üyelere sınıf adı üzerinden erişim (nesne oluşturmadan)
  console.log("PI Değeri:", Mathematics.PI); // 3.1415926535
  console.log("Toplam (5, 3):", Mathematics.sum(5, 3)); // 8
  console.log("Yarıçapı 2 olan dairenin alanı:", Mathematics.circleArea(2)); // 12.566370614

  // Statik üyeler örneklere ait değildir:
  const mathObject = new Mathematics();
  // console.log(mathObject.PI); // undefined
  // console.log(mathObject.topla(1, 2)); // TypeError: mathObject.topla is not a function

  mathObject.normalMethod(); // PI değeri (normal metottan): 3.1415926535

  // Statik bloklar (ES2022) - Sınıf tanımlandığında bir kez çalışır, karmaşık statik başlatmalar için
  class DataManager {
    static settings = {};
    static userData = null;

    static {
      console.log("VeriYoneticisi statik blok çalışıyor...");
      // Karmaşık başlatma işlemleri
      this.settings.defaultTheme = "karanlık";
      this.settings.language = "tr";
      try {
        // Örneğin bir API'den veri çekme simülasyonu
        // this.userData = api.fetchKullanici();
        this.userData = { name: "Admin", id: 1 };
        console.log("Kullanıcı verisi yüklendi.");
      } catch (e) {
        console.error("Kullanıcı verisi yüklenemedi:", e);
        this.userData = null;
      }
    }

    static getSetting(key) {
      return this.settings[key];
    }
  }

  console.log("\nVeriYoneticisi Sınıfı:");
  console.log("Varsayılan Tema:", DataManager.getSetting("defaultTheme")); // karanlık
  console.log("Yüklü Kullanıcı:", DataManager.userData.name); // Admin
  /*
      Çıktı (statik blok için):
      DataManager statik blok çalışıyor...
      Kullanıcı verisi yüklendi.
      */
}

//! Önemli Noktalar:
/**
 ** Statik metotlar içinde this anahtar kelimesi, sınıfın kendisini (constructor fonksiyonunu) işaret eder,
 ** o sınıftan türetilmiş bir örneği değil. Bu nedenle statik metotlar,
 ** örnek özelliklerine (this.ornekOzelligi) doğrudan erişemezler.
 */

/**
 ** Statik metotlar, diğer statik metotları ve statik özellikleri this.statikUye veya
 ** SınıfAdi.statikUye şeklinde çağırabilir/erişebilir.
 */

/**
 ** Kalıtım durumunda, statik metotlar da miras alınır ve super ile üst sınıfın statik metoduna erişilebilir.
 */
