//TODO Bölüm 3: Dependency Injection (DI - Bağımlılık Enjeksiyonu) Tasarım Deseni

//? Tanım:
/**
 * Bir nesnenin (istemci - client) ihtiyaç duyduğu diğer nesneleri (bağımlılıklar - dependencies)
 * kendisinin oluşturması veya bulması yerine, bu bağımlılıkların dışarıdan (bir enjektör veya DI konteyneri tarafından)
 * o nesneye sağlanması prensibidir. Inversion of Control (IoC - Kontrolün Tersine Çevrilmesi) prensibinin bir uygulamasıdır.
 */

//? Problem:
/**
 * Bir sınıf, başka bir sınıfın örneğine ihtiyaç duyduğunda, genellikle new anahtar kelimesiyle o örneği kendi içinde oluşturur:
 */

{
  class OrderService {
    constructor() {
      this.notificationService = new EmailNotificationService(); // Sıkı Bağlılık!
      // this.notificationService = new SMSNotificationService(); // Değişiklik yapmak için kodu değiştirmek gerekir.
    }

    createOrder(order) {
      // ... sipariş işlemleri ...
      this.notificationService.sendNotification(
        order.userEmail,
        "Siparişiniz alındı."
      );
    }
  }

  //* Bu yaklaşım sıkı bağlılığa (tight coupling) yol açar.
  //* OrderService, EmailNotificationService'nin somut implementasyonuna doğrudan bağımlıdır.
  //* Eğer farklı bir bildirim servisi (SMS, Push) kullanmak istersek,
  //* OrderService'nin kodunu değiştirmemiz gerekir.
  //* Bu, Open/Closed Prensibine (SOLID) aykırıdır ve test edilebilirliği zorlaştırır.
}

//? Çözüm (Dependency Injection): Bağımlılığı dışarıdan enjekte et.

//! DI Türleri:
//* 1- Constructor Injection (Yapıcı Metot Enjeksiyonu):
//  - Bağımlılıklar, sınıfın constructor'ı aracılığıyla parametre olarak verilir. En yaygın ve tercih edilen yöntemdir.
//* 2- Setter Injection (Setter Metot Enjeksiyonu):
//  - Bağımlılıklar, public bir setter metodu aracılığıyla enjekte edilir.
//  Bağımlılığın isteğe bağlı olduğu veya sonradan değiştirilebildiği durumlar için uygundur.
//* 3- Interface Injection (Arayüz Enjeksiyonu):
//  -  İstemci sınıf, bir arayüzü implemente eder ve bu arayüz,
//  enjektörün bağımlılığı enjekte etmek için kullanacağı bir metot tanımlar. Daha az yaygındır.

//? Avantajları:

//* 1- Gevşek Bağlılık (Loose Coupling):
//  - Sınıflar, somut implementasyonlar yerine soyutlamalara (arayüzler veya temel sınıflar) bağımlı hale gelir.
//* 2- Artan Esneklik ve Yeniden Kullanılabilirlik:
//  - Bağımlılıklar kolayca değiştirilebilir veya farklı konfigürasyonlarda yeniden kullanılabilir.
//* 3- Gelişmiş Test Edilebilirlik:
//  - Bağımlılıklar, test sırasında sahte (mock) nesnelerle kolayca değiştirilebilir, bu da birim testlerini kolaylaştırır.
//* 4- Daha İyi Kod Organizasyonu:
//  - Sorumluluklar daha net ayrılır.

//! JavaScript Örneği (Constructor Injection):
{
  // Adım 1: Bağımlılık için bir soyutlama (arayüz simülasyonu) tanımla
  /**
   * @interface INotificationService
   * @method sendNotification - Mesaj gönderir.
   * @param {string} target
   * @param {string} message
   */
  class INotificationService {
    sendNotification(target, message) {
      throw new Error("sendNotification() metodu implemente edilmelidir.");
    }
  }

  // Adım 2: Soyutlamanın somut implementasyonlarını oluştur
  class EmailNotificationService extends INotificationService {
    sendNotification(email, message) {
      console.log(`E-posta gönderiliyor: ${email} - Mesaj: "${message}"`);
      // Gerçek e-posta gönderme kodu buraya gelir
    }
  }

  class SMSNotificationService extends INotificationService {
    sendNotification(phoneNumber, message) {
      console.log(`SMS gönderiliyor: ${phoneNumber} - Mesaj: "${message}"`);
      // Gerçek SMS gönderme kodu buraya gelir
    }
  }

  class PushNotificationService extends INotificationService {
    sendNotification(deviceId, message) {
      console.log(
        `Push bildirimi gönderiliyor: ${deviceId} - Mesaj: "${message}"`
      );
    }
  }

  // Adım 3: İstemci sınıf, soyutlamaya (arayüze) bağımlı olsun ve constructor ile enjekte edilsin
  class OrderService {
    #notificationService; // INotificationService tipinde olmalı

    constructor(notificationServiceInjector) {
      // Constructor Injection
      if (!(notificationServiceInjector instanceof INotificationService)) {
        throw new Error(
          "Geçersiz bildirim servisi sağlandı. INotificationService implementasyonu bekleniyor."
        );
      }
      this.#notificationService = notificationServiceInjector;
      console.log(
        `OrderService, ${notificationServiceInjector.constructor.name} ile başlatıldı.`
      );
    }

    createOrder(order) {
      console.log(`Sipariş (${order.id}) oluşturuluyor...`);
      // ... sipariş işlemleri ...
      // Bağımlılığı kullan
      this.#notificationService.sendNotification(
        order.userInfo,
        `Siparişiniz #${order.id} başarıyla alındı.`
      );
      console.log(
        `Sipariş (${order.id}) başarıyla oluşturuldu ve bildirim gönderildi.`
      );
    }
  }

  // Adım 4: Bağımlılıkları oluştur ve istemciye enjekte et (Uygulamanın başlangıç noktası veya bir DI konteyneri yapar)
  const emailService = new EmailNotificationService();
  const smsService = new SMSNotificationService();
  const pushService = new PushNotificationService();

  const order1 = { id: "S001", userInfo: "test@example.com" };
  const order2 = { id: "S002", userInfo: "+905551234567" };
  const order3 = { id: "S003", userInfo: "deviceToken123" };

  // Bildirim Email ile
  const orderHandlerEmail = new OrderService(emailService);
  orderHandlerEmail.createOrder(order1);

  console.log("\n--- Farklı Bildirim Servisi ile ---");
  // Bildirim SMS ile
  const orderHandlerSMS = new OrderService(smsService);
  orderHandlerSMS.createOrder(order2);

  console.log("\n--- Push Bildirim Servisi ile ---");
  // Bildirim Push ile
  const orderHandlerPush = new OrderService(pushService);
  orderHandlerPush.createOrder(order3);

  // Test Edilebilirlik Örneği:
  class FakeNotificationService extends INotificationService {
    sentMessages = [];
    sendNotification(target, message) {
      console.log(`SAHTE bildirim: ${target} - "${message}"`);
      this.sentMessages.push({ target, message });
    }
  }

  console.log("\n--- Test Ortamında ---");
  const fakeService = new FakeNotificationService();
  const testOrderHandler = new OrderService(fakeService);
  testOrderHandler.createOrder({ id: "Test01", userInfo: "test_user" });

  if (
    fakeService.sentMessages.length === 1 &&
    fakeService.sentMessages[0].target === "test_user"
  ) {
    console.log(
      "Birim testi BAŞARILI: Bildirim doğru şekilde gönderildi (sahte servis ile)."
    );
  }

  //? - Dependency Injection, özellikle büyük ve karmaşık uygulamalarda SOLID prensiplerine uygun,
  //? test edilebilir ve bakımı kolay kod yazmak için temel bir tekniktir.
}
