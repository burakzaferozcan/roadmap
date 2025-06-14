//TODO Bölüm 2: Observer (Gözlemci) Tasarım Deseni

//? Amaç:
//  - Bir nesnede (Subject/Observable - Gözlemlenen) bir durum değişikliği olduğunda,
//  ona bağımlı olan bir dizi başka nesnenin (Observers - Gözlemciler) otomatik olarak bilgilendirilmesini ve
//  güncellenmesini sağlayan bir davranışsal tasarım desenidir.

//? Temel Fikir:
//  - Gözlemlenen nesne, gözlemcilerin bir listesini tutar. Durumu değiştiğinde, listedeki tüm gözlemcileri "bildirir" (notify).

//? Bileşenleri:
//* 1- Subject (Gözlemlenen):
//  - Gözlemcileri kaydetmek (attach/subscribe) ve kaydını silmek (detach/unsubscribe) için metotlar sunar.
//  - Durumu değiştiğinde tüm kayıtlı gözlemcileri bilgilendirmek (notify) için bir metot sunar.
//  - Kendi durumunu (state) tutar.

//* 2- Observer (Gözlemci):
//  - Gözlemlenen tarafından çağrılacak bir güncelleme metodu (update) tanımlayan bir arayüze (veya soyut sınıfa) sahiptir.
//  - Subject'teki değişikliklere tepki verir.

//* 3- ConcreteSubject (Somut Gözlemlenen):
//  - Subject arayüzünü uygular.
//  - Durumunu saklar ve bu durum değiştiğinde gözlemcileri bilgilendirir.

//* 4- ConcreteObserver (Somut Gözlemci):
//  - Observer arayüzünü uygular.
//  - Subject'ten gelen bildirim üzerine kendi durumunu günceller. Subject'in durumunu sorgulayabilir.

//? JavaScript Örneği (Observer Deseni):
{
  // Gözlemci Arayüzü (Simülasyon)
  class IObserver {
    update(data) {
      throw new Error("update() metodu implemente edilmelidir.");
    }
  }

  // Gözlemlenen (Subject) Sınıfı
  class Subject {
    constructor() {
      this.observers = []; // Gözlemcilerin listesi
      console.log("Subject oluşturuldu.");
    }

    subscribe(observer) {
      if (observer instanceof IObserver && !this.observers.includes(observer)) {
        this.observers.push(observer);
        console.log(`${observer.constructor.name} abone oldu.`);
      }
    }

    unsubscribe(observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
      console.log(`${observer.constructor.name} abonelikten çıktı.`);
    }

    notify(data) {
      if (this.observers.length === 0) {
        console.log("Bildirilecek abone yok.");
        return;
      }
      console.log(
        `Tüm abonelere bildirim gönderiliyor: ${JSON.stringify(data)}`
      );
      this.observers.forEach((observer) => {
        try {
          observer.update(data);
        } catch (error) {
          console.error(
            `${observer.constructor.name} güncellenirken hata:`,
            error.message
          );
        }
      });
    }
  }

  // Somut Gözlemlenen (Concrete Subject)
  class WeatherStation extends Subject {
    #temperature;
    #humidity;

    constructor() {
      super();
      this.#temperature = 0;
      this.#humidity = 0;
      console.log("WeatherStation oluşturuldu.");
    }

    setStatus(temperature, humidity) {
      this.#temperature = temperature;
      this.#humidity = humidity;
      console.log(
        `Hava durumu güncellendi: Sıcaklık=${this.#temperature}°C, Nem=%${
          this.#humidity
        }`
      );
      // Durum değiştiğinde aboneleri bilgilendir
      this.notify({ temperature: this.#temperature, humidity: this.#humidity });
    }
  }

  // Somut Gözlemciler (Concrete Observers)
  class PhoneDisplay extends IObserver {
    constructor(id) {
      super();
      this.id = id;
    }
    update(data) {
      console.log(
        `Telefon Ekranı (${this.id}): Yeni hava durumu - Sıcaklık: ${data.temperature}°C, Nem: %${data.humidity}`
      );
    }
  }

  class WebPanel extends IObserver {
    update(data) {
      console.log(
        `Web Paneli: Anlık Durum - Sıcaklık: ${data.temperature}°C, Nem: %${data.humidity}. Grafik güncelleniyor...`
      );
    }
  }

  // Kullanım
  const station = new WeatherStation();

  const phone1 = new PhoneDisplay("A");
  const phone2 = new PhoneDisplay("B");
  const webPanel = new WebPanel();

  station.subscribe(phone1);
  station.subscribe(webPanel);

  station.setStatus(25, 60);
  // Çıktı:
  // Telefon Ekranı (A): Yeni hava durumu - Sıcaklık: 25°C, Nem: %60
  // Web Paneli: Anlık Durum - Sıcaklık: 25°C, Nem: %60. Grafik güncelleniyor...

  console.log("\n--- Telefon B de abone oluyor ---");
  station.subscribe(phone2);
  station.setStatus(22, 65);

  console.log("\n--- Telefon A abonelikten çıkıyor ---");
  station.unsubscribe(phone1);
  station.setStatus(28, 55);
}

//! - Observer deseni, bir nesnedeki değişikliğin birçok başka nesneyi etkilediği ve
//! bu nesnelerin önceden bilinmediği veya dinamik olarak değişebildiği durumlarda çok kullanışlıdır.
