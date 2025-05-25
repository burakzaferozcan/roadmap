//TODO B. Kapsülleme (Encapsulation) Prensibi

/**
 *? Tanım:
 *  Bir nesnenin verilerini (özelliklerini) ve bu veriler üzerinde işlem yapan metotlarını bir arada tutarak,
 *  verilerin dışarıdan doğrudan ve kontrolsüz erişimini kısıtlama prensibidir.
 *  Yani, nesnenin iç işleyiş detaylarını gizleyerek sadece gerekli arayüzleri dış dünyaya sunmaktır.
 *
 *? Temel Fikir:
 *  "Veriyi koru, erişimi kontrol et."
 *
 *? Amaçları:
 ** 1 - Veri Gizliliği (Data Hiding):
 *  Nesnenin iç durumu (internal state) dışarıdan gelen istenmeyen müdahalelere karşı korunur.
 *  Özelliklere doğrudan erişim yerine, kontrollü metotlar (genellikle getter/setter) aracılığıyla erişim sağlanır.
 ** 2 - Modülerlik:
 *  Nesnenin iç yapısı değişse bile, dış dünyaya sunduğu arayüz (public metotlar) aynı kaldığı sürece,
 *  bu nesneyi kullanan diğer kodlar etkilenmez.
 ** 3 - Basitlik:
 *  Kullanıcılar nesnenin karmaşık iç detaylarıyla uğraşmak zorunda kalmaz,
 *  sadece public metotları kullanarak nesneyle etkileşime girer.
 */

//! JavaScript'te Kapsülleme Uygulamaları:

{
  //* Convention (Geleneksel Yöntem - _ öneki):
  //  Özelliklerin başına alt çizgi (_) koymak,
  //  bu özelliğin "dahili" (internal) veya "korumalı" (protected) olduğunu ve
  //  doğrudan erişilmemesi gerektiğini belirten bir programcı geleneğidir.
  //  JavaScript motoru bunu zorlamaz, sadece bir işarettir.

  class BankAccount {
    constructor(owner, balance = 0) {
      this.owner = owner;
      this._balance = balance; // Kapsüllenmesi istenen özellik
    }

    depositMoney(quantity) {
      if (quantity > 0) {
        this._balance += quantity;
        console.log(
          `${quantity} TL yatırıldı. Yeni bakiye: ${this._balance} TL`
        );
      } else {
        console.log("Geçersiz miktar.");
      }
    }

    withdrawMoney(quantity) {
      if (quantity > 0 && quantity <= this._balance) {
        this._balance -= quantity;
        console.log(`${quantity} TL çekildi. Yeni bakiye: ${this._balance} TL`);
      } else {
        console.log("Yetersiz bakiye veya geçersiz miktar.");
      }
    }

    showBalance() {
      console.log(`Hesap Sahibi: ${this.owner}, Bakiye: ${this._balance} TL`);
      return this._balance;
    }
  }

  const account1 = new BankAccount("Ali Veli", 1000);
  account1.depositMoney(500);
  account1.withdrawMoney(200);
  account1.showBalance();

  //? Geleneksel yöntemde _balance'ye doğrudan erişilebilir, ancak bu kaçınılması gereken bir durumdur:
  // account1._balance = -500; //! Bu, kapsülleme prensibini ihlal eder!
  // console.log(account1._balance);
}

{
  //* Closure'lar ile Gerçek Kapsülleme (Eski Yöntem, Constructor Fonksiyonlarında):
  //  Constructor fonksiyonları ve closure'lar kullanılarak "gerçek" private değişkenler oluşturulabilir.
  //  Bu değişkenlere sınıf dışından erişilemez.

  function PrivateCounter() {
    let _counter = 0; // Bu değişken dışarıdan erişilemez (private)

    this.increase = function () {
      _counter++;
    };

    this.value = function () {
      return _counter;
    };
  }

  const myCounter = new PrivateCounter();
  myCounter.increase();
  myCounter.increase();
  console.log(myCounter.value()); // 2
  //? console.log(myCounter._counter); // undefined, erişilemez
}

{
  //* ES2022 Private Class Fields (# öneki):
  //  Modern JavaScript (ES2022 ve sonrası), sınıflar içinde gerçek private alanlar ve metotlar tanımlamak için # önekini sunar.
  //  Bu, JavaScript motoru tarafından zorlanan bir gizliliktir.

  class Car {
    #speed = 0; // Private field
    #maxSpeed = 200;

    constructor(brand) {
      this.brand = brand;
    }

    #startEngine() {
      // Private method
      console.log(`${this.brand} motoru çalıştı.`);
    }

    speedUp(increase) {
      this.#startEngine(); // İçeriden private metoda erişim
      if (this.#speed + increase <= this.#maxSpeed) {
        this.#speed += increase;
      } else {
        this.#speed = this.#maxSpeed;
      }
      console.log(`${this.brand} hızı: ${this.#speed} km/s`);
    }

    slowly(decrease) {
      if (this.#speed - decrease >= 0) {
        this.#speed -= decrease;
      } else {
        this.#speed = 0;
      }
      console.log(`${this.brand} hızı: ${this.#speed} km/s`);
    }

    get CurrentSpeed() {
      // Getter ile private alana kontrollü erişim
      return this.#speed;
    }
  }

  const myCar = new Car("Mercedes");
  myCar.speedUp(50);
  myCar.speedUp(180);
  // console.log(myCar.#speed); //* SyntaxError: Private field '#speed' must be declared in an enclosing class
  // myCar.#startEngine(); //* SyntaxError
  console.log("Aracın güncel hızı (getter ile):", myCar.CurrentSpeed);

  //? Not: Private class fields (#) tarayıcı ve Node.js desteği açısından kontrol edilmelidir,
  //? ancak modern ortamlarda genellikle desteklenir.

  //! Kapsülleme, getter ve setter metotlarıyla yakından ilişkilidir (bir sonraki başlıkta detaylı işlenecek).
}
