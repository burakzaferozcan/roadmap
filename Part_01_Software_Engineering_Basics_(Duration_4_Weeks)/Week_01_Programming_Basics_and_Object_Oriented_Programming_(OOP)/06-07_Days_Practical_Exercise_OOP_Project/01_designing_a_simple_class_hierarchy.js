//TODO  Basit bir sınıf hiyerarşisi tasarlama (Kalıtım ve Çok Biçimlilik)

console.log("--- Basit Sınıf Hiyerarşisi Örneği ---");

// 1. Üst Sınıf: Hayvan
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    console.log(`${this.name} adında bir hayvan oluşturuldu.`);
  }

  eat() {
    console.log(`${this.name} yemek yiyor.`);
  }

  makeSound() {
    console.log(`${this.name} genel bir hayvan sesi çıkarıyor.`);
  }

  showInfo() {
    console.log(`Ben ${this.name}, ${this.age} yaşındayım.`);
  }
}

// 2. Alt Sınıf: Kedi (Animal'dan miras alır)
class Cat extends Animal {
  constructor(name, age, furColor) {
    super(name, age); // Üst sınıfın constructor'ını çağır
    this.furColor = furColor;
    console.log(` -> Bu hayvan bir Kedi ve tüy rengi ${this.furColor}.`);
  }

  // Üst sınıftaki metodu override etme (Çok Biçimlilik - Polymorphism)
  makeSound() {
    console.log(`${this.name} miyavlıyor!`);
  }

  // Kedi'ye özel metot
  lookFromWindow() {
    console.log(`${this.name} pencereden dışarıyı izliyor.`);
  }

  // Üst sınıf metodunu genişletme
  showInfo() {
    super.showInfo(); // Önce üst sınıfın metodunu çağır
    console.log(`   Ayrıca ben ${this.furColor} tüylü bir kediyim.`);
  }
}

// 3. Alt Sınıf: Köpek (Animal'dan miras alır)
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
    console.log(` -> Bu hayvan bir Köpek ve cinsi ${this.breed}.`);
  }

  // Üst sınıftaki metodu override etme
  makeSound() {
    console.log(`${this.name} havlıyor! Woof woof!`);
  }

  // Köpek'e özel metot
  wagTail() {
    console.log(`${this.name} heyecanla kuyruk sallıyor.`);
  }

  // Üst sınıf metodunu genişletme
  showInfo() {
    super.showInfo();
    console.log(`   Ayrıca ben bir ${this.breed} cinsi köpeğim.`);
  }
}

// Nesneleri Oluşturma ve Kullanma
console.log("\n--- Nesneler Oluşturuluyor ---");
const generalAnimal = new Animal("Canavar", 5);
const whiteCat = new Cat("Pamuk", 2, "Beyaz");
const blackDog = new Dog("Karabaş", 3, "Kangal");

console.log("\n--- Metotlar Çağrılıyor ---");

console.log("\n* Genel Hayvan:");
generalAnimal.eat();
generalAnimal.makeSound();
generalAnimal.showInfo();

console.log("\n* Pamuk Kedi:");
whiteCat.eat(); // Miras alınan
whiteCat.makeSound(); // Override edilen
whiteCat.lookFromWindow(); // Kedi'ye özel
whiteCat.showInfo(); // Genişletilmiş metot

console.log("\n* Karabaş Köpek:");
blackDog.eat(); // Miras alınan
blackDog.makeSound(); // Override edilen
blackDog.wagTail(); // Köpek'e özel
blackDog.showInfo(); // Genişletilmiş metot

// Çok Biçimlilik (Polymorphism) Gösterimi
console.log("\n--- Çok Biçimlilik Gösterimi ---");
const animalsArray = [
  generalAnimal,
  whiteCat,
  blackDog,
  new Cat("Tekir", 1, "Gri"),
];

animalsArray.forEach((animal) => {
  console.log(`\nHayvan Adı: ${animal.name}`);
  animal.makeSound(); // Her hayvan kendi 'makeSound' metodunu çağırır
  if (animal instanceof Dog) {
    // instanceof ile tip kontrolü
    animal.wagTail();
  }
});
