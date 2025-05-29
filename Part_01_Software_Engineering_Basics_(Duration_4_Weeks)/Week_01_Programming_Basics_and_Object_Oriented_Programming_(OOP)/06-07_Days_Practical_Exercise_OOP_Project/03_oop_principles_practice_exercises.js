//TODO OOP prensiplerini uygulama egzersizleri

console.log("--- OOP Prensipleri Uygulama Egzersizleri ---");

// --- Exercise 1: Encapsulation (Private Fields, Getter/Setter) ---
console.log("\n--- Egzersiz 1: Kapsülleme ---");
class BankAccount {
  #accountHolder; // Private field
  #balance; // Private field
  #transactionHistory; // Private field

  constructor(accountHolder, initialBalance = 0) {
    if (!accountHolder) throw new Error("Hesap sahibi belirtilmelidir.");
    if (typeof initialBalance !== "number" || initialBalance < 0) {
      throw new Error(
        "Başlangıç bakiye geçerli bir sayı olmalı ve negatif olmamalıdır."
      );
    }
    this.#accountHolder = accountHolder;
    this.#balance = initialBalance;
    this.#transactionHistory = [
      `Hesap oluşturuldu. Bakiye: ${this.#balance} TL`,
    ];
    console.log(
      `${this.#accountHolder} adına hesap açıldı. Bakiye: ${this.#balance} TL`
    );
  }

  // Balance Getter
  get balance() {
    this.#log("Bakiye sorgulandı.");
    return this.#balance;
  }

  // Account holder Getter
  get accountHolder() {
    return this.#accountHolder;
  }

  // Transaction history Getter (returns copy to prevent external modification)
  get transactionHistory() {
    this.#log("İşlem geçmişi sorgulandı.");
    return [...this.#transactionHistory];
  }

  // Private logging method
  #log(message) {
    const timestamp = new Date().toLocaleTimeString();
    this.#transactionHistory.push(`[${timestamp}] ${message}`);
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      console.error("HATA: Yatırılacak miktar pozitif bir sayı olmalıdır.");
      this.#log(`Başarısız para yatırma denemesi: ${amount} TL`);
      return false;
    }
    this.#balance += amount;
    this.#log(`${amount} TL yatırıldı. Yeni bakiye: ${this.#balance} TL`);
    console.log(`${amount} TL yatırıldı. Yeni bakiye: ${this.#balance} TL`);
    return true;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      console.error("HATA: Çekilecek miktar pozitif bir sayı olmalıdır.");
      this.#log(
        `Başarısız para çekme denemesi (geçersiz miktar): ${amount} TL`
      );
      return false;
    }
    if (amount > this.#balance) {
      console.error("HATA: Yetersiz bakiye.");
      this.#log(
        `Başarısız para çekme denemesi (yetersiz bakiye): ${amount} TL. Mevcut: ${
          this.#balance
        } TL`
      );
      return false;
    }
    this.#balance -= amount;
    this.#log(`${amount} TL çekildi. Kalan bakiye: ${this.#balance} TL`);
    console.log(`${amount} TL çekildi. Kalan bakiye: ${this.#balance} TL`);
    return true;
  }

  showAccountStatement() {
    console.log(`\n--- Hesap Özeti: ${this.#accountHolder} ---`);
    console.log(`Güncel Bakiye: ${this.balance} TL`); // Uses getter
    console.log("--- Son İşlemler ---");
    // Show last 5 transactions (or all)
    const lastTransactions = this.transactionHistory.slice(-5);
    lastTransactions.forEach((transaction) => console.log(transaction));
    console.log("----------------------");
  }
}

const customerAccount = new BankAccount("Canan Doğan", 500);
customerAccount.deposit(200);
customerAccount.withdraw(100);
customerAccount.withdraw(700); // Yetersiz bakiye denemesi
customerAccount.deposit(-50); // Geçersiz miktar denemesi

console.log(
  `\n${customerAccount.accountHolder} adlı müşterinin güncel bakiyesi: ${customerAccount.balance} TL`
);
// console.log(customerAccount.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
// customerAccount.#balance = 10000; // Bu da SyntaxError verir.

customerAccount.showAccountStatement();

// --- Exercise 2: Static Methods and Properties ---
console.log("\n\n--- Egzersiz 2: Statik Üyeler ---");
class PerimeterCalculator {
  static PI = 3.14159; // Static property

  static circlePerimeter(radius) {
    // Static method
    if (typeof radius !== "number" || radius < 0) {
      return "HATA: Yarıçap pozitif bir sayı olmalıdır.";
    }
    return 2 * PerimeterCalculator.PI * radius;
  }

  static squarePerimeter(sideLength) {
    // Static method
    if (typeof sideLength !== "number" || sideLength < 0) {
      return "HATA: Kenar uzunluğu pozitif bir sayı olmalıdır.";
    }
    return 4 * sideLength;
  }

  // Non-static method example (not typically used but possible)
  constructor(unit = "cm") {
    this.unit = unit; // Instance property
    console.log(
      `Çevre Hesaplayıcı örneği oluşturuldu (Birim: ${this.unit}). Bu genellikle statik sınıflar için yapılmaz.`
    );
  }

  instanceMethod() {
    // Non-static methods can access static members via ClassName.MemberName
    console.log(`PI değeri (örnek metodundan): ${PerimeterCalculator.PI}`);
    console.log(`Bu örnek ${this.unit} birimini kullanıyor.`);
  }
}

// Access static members via class name (without creating an instance)
console.log("PI Değeri:", PerimeterCalculator.PI);
console.log(
  "Yarıçapı 5 olan dairenin çevresi:",
  PerimeterCalculator.circlePerimeter(5)
);
console.log(
  "Kenarı 4 olan karenin çevresi:",
  PerimeterCalculator.squarePerimeter(4)
);
console.log(
  "Geçersiz yarıçap denemesi:",
  PerimeterCalculator.circlePerimeter(-2)
);

// Static members don't belong to instances:
// const calculatorInstance = new PerimeterCalculator("metre");
// console.log(calculatorInstance.PI); // undefined
// console.log(calculatorInstance.circlePerimeter(3)); // TypeError

// calculatorInstance.instanceMethod();

// Example: A class that automatically generates product IDs
class Product {
  static nextId = 1; // Static counter shared by all Product instances
  id;
  name;

  constructor(name) {
    this.id = Product.nextId++; // Assign ID using static property and increment
    this.name = name;
    console.log(`Ürün Oluşturuldu: ID=${this.id}, Ad=${this.name}`);
  }

  static getTotalProductCount() {
    // nextId is the next ID to be assigned, so total count is (nextId - 1)
    return Product.nextId - 1;
  }
}

console.log("\n--- Otomatik ID Üreten Ürün Sınıfı ---");
const product1 = new Product("Laptop");
const product2 = new Product("Klavye");
const product3 = new Product("Mouse");

console.log("Ürün 1 ID:", product1.id); // 1
console.log("Ürün 2 ID:", product2.id); // 2
console.log("Ürün 3 ID:", product3.id); // 3

console.log(
  "Toplam Üretilen Ürün Sayısı (Statik Metot ile):",
  Product.getTotalProductCount()
); // 3
