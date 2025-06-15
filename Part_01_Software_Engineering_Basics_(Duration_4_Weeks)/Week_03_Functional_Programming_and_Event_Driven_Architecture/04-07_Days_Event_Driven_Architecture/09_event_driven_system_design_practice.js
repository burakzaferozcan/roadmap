//TODO Bölüm 9: Pratik: Basit bir Olay Odaklı Sistem Tasarlama ve Geliştirme

//? Senaryo:
//  - Basit bir "Bildirim Sistemi" geliştirelim. Farklı modüller (örn: Kullanıcı Servisi, Sipariş Servisi)
//  olaylar yayınlayacak ve bir Bildirim Modülü bu olayları dinleyerek kullanıcılara e-posta veya SMS ile bildirim gönderecek.

//? Adımlar:

//* 1- EventEmitter Sınıfı Oluşturma (veya Node.js'in events modülünü kullanma):
//  - on(eventName, listener)
//  - off(eventName, listener)
//  - emit(eventName, ...data)

//* 2- Olay Türlerini Tanımlama:
//  - 'user:registered' (veri: { userId, email, name })
//  - 'order:placed' (veri: { orderId, userId, amount })
//  - 'password:reset_request' (veri: { userId, email, token })

//* 3- Olay Yayınlayan Modüller (Producers):
//  - UserService: Kullanıcı kaydı tamamlandığında 'user:registered' olayını yayınlar. Şifre sıfırlama isteği geldiğinde 'password:reset_request' olayını yayınlar.
//  - OrderService: Sipariş oluşturulduğunda 'order:placed' olayını yayınlar.

//* 4- Olay Dinleyen Modül (Consumer - NotificationService):
//! NotificationService:
//  - 'user:registered' olayını dinler ve kullanıcıya hoş geldin e-postası gönderir (simülasyon).
//  - 'order:placed' olayını dinler ve kullanıcıya sipariş onayı e-postası/SMS'i gönderir (simülasyon).
//  - 'password:reset_request' olayını dinler ve şifre sıfırlama linki içeren e-posta gönderir (simülasyon).

//* 5- Sistemin Çalıştırılması:
//  - Gerekli servisleri ve EventEmitter'ı başlatın.
//  - UserService ve OrderService üzerinden örnek olaylar tetikleyin.
//  - NotificationService'in doğru tepkileri verdiğini gözlemleyin.

//? JavaScript Kodu (Node.js Ortamında Örnek):
{
  // eventEmitter.js (Simple EventEmitter or can use Node.js built-in)
  // We can use our previous EventEmitter or Node.js's built-in module:
  const EventEmitter = require("events"); // Node.js built-in EventEmitter
  const eventBus = new EventEmitter();

  // userService.js
  class UserService {
    constructor(bus) {
      this.eventBus = bus;
    }

    registerUser(name, email) {
      console.log(`USER SERVICE: Registering user ${name}...`);
      const userData = { userId: Date.now(), name, email };
      // ... simulate saving to database ...
      console.log(`USER SERVICE: ${name} registered successfully.`);
      this.eventBus.emit("user:registered", userData); // Publish event
      return userData;
    }

    requestPasswordReset(email) {
      console.log(`USER SERVICE: Password reset requested for ${email}...`);
      // ... simulate token generation ...
      const resetData = { userId: "user123", email, token: "randomtoken" };
      this.eventBus.emit("password:reset_request", resetData);
      return resetData;
    }
  }

  // orderService.js
  class OrderService {
    constructor(bus) {
      this.eventBus = bus;
    }

    placeOrder(userId, items, amount) {
      console.log(`ORDER SERVICE: Creating order for user ${userId}...`);
      const orderData = { orderId: `ORD-${Date.now()}`, userId, items, amount };
      // ... simulate order processing ...
      console.log(`ORDER SERVICE: Order ${orderData.orderId} created.`);
      this.eventBus.emit("order:placed", orderData); // Publish event
      return orderData;
    }
  }

  // notificationService.js
  class NotificationService {
    constructor(bus) {
      this.eventBus = bus;
      this.setupListeners();
      console.log("NOTIFICATION SERVICE: Started and listening for events.");
    }

    setupListeners() {
      this.eventBus.on("user:registered", (userData) => {
        this.sendWelcomeEmail(userData.email, userData.name);
      });

      this.eventBus.on("order:placed", (orderData) => {
        this.sendOrderConfirmation(
          orderData.userId,
          orderData.orderId,
          orderData.amount
        );
        // Could also send SMS
      });

      this.eventBus.on("password:reset_request", (resetData) => {
        this.sendPasswordResetEmail(resetData.email, resetData.token);
      });
    }

    sendWelcomeEmail(email, name) {
      console.log(
        `NOTIFICATION (Email): Welcome email sent to ${email}. Hello ${name}!`
      );
    }

    sendOrderConfirmation(userId, orderId, amount) {
      console.log(
        `NOTIFICATION (Email): Order confirmation for ${orderId} (${amount} TL) sent to user ${userId}.`
      );
    }

    sendPasswordResetEmail(email, token) {
      console.log(
        `NOTIFICATION (Email): Password reset link (token: ${token}) sent to ${email}.`
      );
    }
  }

  // main.js (System Startup)
  const userService = new UserService(eventBus);
  const orderService = new OrderService(eventBus);
  const notificationService = new NotificationService(eventBus); // Initializes listeners

  console.log("\n--- System Running ---");
  const newUser = userService.registerUser("Ayşe Can", "ayse@example.com");
  orderService.placeOrder(
    newUser.userId,
    [{ productId: "P1", quantity: 2 }],
    350
  );
  userService.requestPasswordReset("ayse@example.com");

  console.log("\n--- Another Order ---");
  orderService.placeOrder("user456", [{ productId: "P2", quantity: 1 }], 120);
}
//! Bu pratik uygulama, olayların nasıl yayınlandığını, merkezi bir eventBus üzerinden nasıl iletildiğini ve
//! farklı servislerin bu olaylara nasıl abone olup tepki verdiğini gösterir. Bu, gevşek bağlılığın ve modülerliğin güzel bir örneğidir.
