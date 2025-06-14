//TODO Bölüm 3: EventBus / EventEmitter Tasarım Deseni

//? Amaç:
//  - Sistemdeki farklı bileşenlerin birbirleriyle doğrudan iletişim kurmak yerine,
//  merkezi bir "olay veri yolu" (event bus) veya "olay yayıcı" (event emitter) üzerinden dolaylı olarak
//  iletişim kurmasını sağlamaktır. Bu, Observer deseninin daha genel ve merkezi bir uygulamasıdır.

//? Temel Fikir:
//  - Bileşenler, ilgilendikleri olay türleri için EventBus'a "kayıt olurlar" (subscribe/on).
//  - Bir olay meydana geldiğinde, olayı üreten bileşen bu olayı EventBus'a "yayınlar" (publish/emit).
//  - EventBus, bu olayı dinleyen tüm kayıtlı bileşenlere olayı iletir.

//? Bileşenleri:
//* 1- EventEmitter/EventBus:
//  - Olay dinleyicilerini kaydetmek (on, addListener, subscribe).
//  - Olay dinleyicilerinin kaydını silmek (off, removeListener, unsubscribe).
//  - Olayları yayınlamak/tetiklemek (emit, publish, trigger).
//* 2- Event Listener (Callback Fonksiyonu):
//  - Belirli bir olay türü için EventBus'a kaydedilen ve olay yayınlandığında çalıştırılan fonksiyon.
//* 3- Event Producer:
//  - Olayları üreten ve EventBus üzerinden yayınlayan bileşen.
//* 4- Event Consumer:
//  - EventBus üzerinden belirli olayları dinleyen ve tepki veren bileşen.

//! Avantajları (Observer'a Ek Olarak):

//* 1- Daha da Gevşek Bağlılık:
//  - Yayıncılar ve dinleyiciler EventBus dışında birbirlerinden tamamen habersizdir.
//  Sadece olay adları ve veri formatları üzerinde anlaşırlar.
//* 1- Merkezi Olay Yönetimi:
//  - Tüm olay akışı merkezi bir noktadan geçer, bu da loglama veya izleme için faydalı olabilir.
//* 1- Farklı Modüller Arası İletişim:
//  - Özellikle büyük uygulamalarda veya mikroservis mimarilerinde farklı modüllerin veya
//  servislerin birbirleriyle etkileşimini kolaylaştırır.

//! JavaScript Örneği (Basit EventEmitter Sınıfı):
{
  class EventEmitter {
    constructor() {
      this.listeners = {}; // eventName -> [listenerFn1, listenerFn2, ...]
      console.log("EventEmitter oluşturuldu.");
    }

    // Bir olayı dinlemek için listener ekle
    on(eventName, listenerFn) {
      if (typeof listenerFn !== "function") {
        throw new Error("Listener bir fonksiyon olmalıdır.");
      }
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listenerFn);
      console.log(
        `'${eventName}' olayı için listener eklendi: ${
          listenerFn.name || "anonim"
        }`
      );
    }

    // Bir olayı sadece bir kez dinlemek için listener ekle
    once(eventName, listenerFn) {
      const onceWrapper = (...args) => {
        listenerFn.apply(this, args);
        this.off(eventName, onceWrapper); // Dinledikten sonra kendini kaldır
      };
      // Orijinal fonksiyonu saklamak için (off ile kaldırırken gerekebilir)
      onceWrapper.originalListener = listenerFn;
      this.on(eventName, onceWrapper);
    }

    // Bir olay için listener'ı kaldır
    off(eventName, listenerFnToRemove) {
      if (!this.listeners[eventName]) {
        return; // Bu olay için hiç listener yok
      }
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) =>
          listener !== listenerFnToRemove &&
          listener.originalListener !== listenerFnToRemove
      );
      console.log(
        `'${eventName}' olayı için listener kaldırıldı: ${
          listenerFnToRemove.name || "anonim"
        }`
      );
    }

    // Bir olayı tetikle/yayınla
    emit(eventName, ...args) {
      if (
        !this.listeners[eventName] ||
        this.listeners[eventName].length === 0
      ) {
        console.log(`'${eventName}' olayı için kayıtlı listener bulunmuyor.`);
        return;
      }
      console.log(`'${eventName}' olayı tetiklendi, argümanlar:`, args);
      [...this.listeners[eventName]].forEach((listener) => {
        try {
          listener.apply(this, args);
        } catch (error) {
          console.error(
            `'${eventName}' listener'ı çalıştırılırken hata:`,
            error.message
          );
        }
      });
    }
  }

  // Kullanım
  const eventBus = new EventEmitter();

  // Olay Dinleyicileri
  function userRegisteredHandler(userData) {
    console.log(
      `HANDLER 1: Yeni kullanıcı kaydoldu! Hoş geldin e-postası gönderiliyor: ${userData.email}`
    );
  }

  const orderCreatedHandler = (orderDetails) => {
    console.log(
      `HANDLER 2: Yeni sipariş alındı! Sipariş No: ${orderDetails.id}, Tutar: ${orderDetails.amount} TL. Stok güncelleniyor...`
    );
  };

  function generalLogHandler(eventName, data) {
    console.log(
      `LOG HANDLER: Olay='${eventName}', Veri=${JSON.stringify(data)}`
    );
  }

  // Dinleyicileri kaydet
  eventBus.on("user:created", userRegisteredHandler);
  eventBus.on("order:placed", orderCreatedHandler);
  eventBus.on("user:created", (data) =>
    generalLogHandler("user:created", data)
  );
  eventBus.on("order:placed", (data) =>
    generalLogHandler("order:placed", data)
  );

  // 'once' örneği
  eventBus.once("app:started", function appStarted() {
    console.log("HANDLER ONCE: Uygulama ilk kez başlatıldı!");
  });

  // Olayları Tetikleme
  console.log("\n--- Olaylar Tetikleniyor ---");
  eventBus.emit("app:started", { time: new Date() });
  eventBus.emit("app:started", { time: new Date() });

  eventBus.emit("user:created", {
    id: 1,
    email: "ali@example.com",
    name: "Ali",
  });
  eventBus.emit("order:placed", { id: "S101", userId: 1, amount: 250 });
  eventBus.emit("payment:successful", {
    orderId: "S101",
    paymentMethod: "Kredi Kartı",
  });

  // Listener kaldırma
  console.log("\n--- Listener Kaldırma ---");
  eventBus.off("user:created", userRegisteredHandler);
  eventBus.emit("user:created", {
    id: 2,
    email: "veli@example.com",
    name: "Veli",
  });
}
//? - Node.js'in yerleşik events modülü, güçlü bir EventEmitter sınıfı sunar ve
//? Node.js uygulamalarında olay odaklı programlamanın temelini oluşturur.
