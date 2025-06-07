//TODO Bölüm 1: Kompozisyon ve Agregasyon (Composition vs. Aggregation)

/**
 * Bu iki kavram, nesneler arasında "sahiptir" (has-a) veya "bir parçasıdır"
 * (part-of) ilişkilerini ifade etmenin farklı yollarıdır.
 * Her ikisi de kalıtıma bir alternatif olarak kodun yeniden kullanımını ve esnekliğini artırabilir.
 */

//! 1.1. Agregasyon (Aggregation - "Sahiptir" / Zayıf İlişki)
//? Tanım:
/**
 * Bir sınıfın (bütün), başka sınıfların (parçalar) nesnelerini içerdiği ancak
 * parçaların bütünden bağımsız bir yaşam döngüsüne sahip olabildiği bir "bütün-parça" ilişkisidir.
 * Parçalar, bütün silinse bile var olmaya devam edebilir ve başka bütünlerle de ilişkilendirilebilir.
 */
//? Özellikleri:
//  1- Zayıf sahiplik.
//  2- Parçalar, bütünden bağımsız olarak var olabilir.
//  3- Parçalar birden fazla bütün tarafından paylaşılabilir (duruma göre).
//? UML Gösterimi:
//  Bütün tarafında içi boş bir eşkenar dörtgen (diamond) bulunan bir ilişkilendirme çizgisi.
//? Ne Zaman Kullanılır?
//  Bir nesnenin başka nesnelere referans tuttuğu ancak o nesnelerin varlığından doğrudan sorumlu olmadığı durumlar.
{
  //* JavaScript Örneği (Agregasyon):
  class Department {
    constructor(name) {
      this.name = name;
      this.employees = []; // Department, Employee nesnelerine referans tutar
      console.log(`${this.name} departmanı oluşturuldu.`);
    }

    addEmployee(employee) {
      if (employee instanceof Employee && !this.employees.includes(employee)) {
        this.employees.push(employee);
        console.log(`${employee.name} ${this.name} departmanına eklendi.`);
      } else {
        console.warn("Geçersiz çalışan veya zaten ekli.");
      }
    }

    listEmployees() {
      console.log(`\n--- ${this.name} Departmanı Çalışanları ---`);
      this.employees.forEach((c) => console.log(`- ${c.name} (${c.position})`));
    }
  }

  class Employee {
    constructor(name, pozition) {
      this.name = name;
      this.pozition = pozition;
      console.log(`${this.name} (${this.pozition}) çalışanı oluşturuldu.`);
    }
  }

  // Employee'lar bağımsız olarak var olabilir
  const employee1 = new Employee("Ali Yılmaz", "Mühendis");
  const employee2 = new Employee("Ayşe Demir", "Analist");

  const engineeringDepartment = new Department("Mühendislik");
  engineeringDepartment.addEmployee(employee1);
  engineeringDepartment.addEmployee(employee2);

  const humanResources = new Department("İnsan Kaynakları");
  humanResources.addEmployee(employee2); // Ayşe hem Mühendislik hem İK'da olabilir (senaryoya göre)

  engineeringDepartment.listEmployees();
  humanResources.listEmployees();

  // Department silinse bile çalışanlar var olmaya devam edebilir.
  delete engineeringDepartment; // Örneğin
  console.log(engineeringDepartment.listEmployees()); // undefined
  console.log(employee1.name); // "Ali Yılmaz" hala erişilebilir.

  //* UML (PlantUML):
  /**
  @startuml
  class Department {
    name: String
    addEmployee(employee: Employee)
  }
  class Employee {
    name: String
    pozition: String
  }
  Department o-- "*" Employee : employees
  @enduml
   */
}

//! 1.2. Kompozisyon (Composition - "Bir Parçasıdır" / Güçlü İlişki)
//? Tanım:
/**
 * Bir sınıfın (bütün), başka sınıfların (parçalar) nesnelerini içerdiği ve
 * parçaların yaşam döngüsünün bütüne sıkı sıkıya bağlı olduğu bir "bütün-parça" ilişkisidir.
 * Bütün oluşturulduğunda parçalar da genellikle oluşturulur veya yönetilir ve
 * bütün silindiğinde parçalar da onunla birlikte silinir.
 * Parçalar genellikle başka bütünler tarafından paylaşılamaz.
 */
//? Özellikleri:
//  1- Güçlü sahiplik.
//  2- Parçaların yaşam döngüsü bütüne bağlıdır.
//  3- Parçalar genellikle tek bir bütüne aittir.
//? UML Gösterimi:
//  Bütün tarafında içi dolu bir eşkenar dörtgen (diamond) bulunan bir ilişkilendirme çizgisi.
//? Ne Zaman Kullanılır?
//  Bir nesnenin, varlığı için kritik olan ve başka bir yerde anlamı olmayan iç parçalardan oluştuğu durumlar.
{
  //* JavaScript Örneği (Kompozisyon):
  class Car {
    constructor(brand, model) {
      this.brand = brand;
      this.model = model;
      // Engine, arabanın ayrılmaz bir parçasıdır ve araba ile birlikte oluşturulur.
      this.engine = new Engine("V6", 300); // Kompozisyon: Engine nesnesi Car içinde oluşturuluyor
      this.wheels = [
        // Wheels de arabanın parçası
        new Wheels("Ön Sol"),
        new Wheels("Ön Sağ"),
        new Wheels("Arka Sol"),
        new Wheels("Arka Sağ"),
      ];
      console.log(`${this.brand} ${this.model} araba oluşturuldu.`);
    }

    run() {
      this.engine.start();
      console.log(`${this.brand} ${this.model} çalıştırıldı.`);
    }

    stop() {
      this.engine.stop();
      console.log(`${this.brand} ${this.model} durduruldu.`);
    }
  }

  class Engine {
    constructor(type, horsePower) {
      this.type = type;
      this.horsePower = horsePower;
      this.working = false;
      // console.log(`${this.type} engine (${this.horsePower} HP) oluşturuldu.`); // İsteğe bağlı
    }

    start() {
      this.working = true;
      console.log(`Engine (${this.type}) çalıştırıldı.`);
    }

    stop() {
      this.working = false;
      console.log(`Engine (${this.type}) durduruldu.`);
    }
  }

  class Wheels {
    constructor(pozition) {
      this.pozition = pozition;
      // console.log(`${this.pozition} tekerleği oluşturuldu.`); // İsteğe bağlı
    }
  }

  const myCar = new Car("Tesla", "Model S");
  myCar.run();

  // myCar silindiğinde, engine ve wheels de mantıksal olarak onunla birlikte yok olur.
  // Başka bir araba myCar.engine'u doğrudan kullanamaz (normalde).
  // const anotherEngine = myCar.engine; // Bu genellikle yapılmaz

  //* UML (PlantUML):
  /**
  @startuml
  class Car {
    brand: String
    model: String
    run()
  }
  class Engine {
    type: String
    horsePower: int
    start()
  }
  class Wheels {
    pozition: String
  }
  
  Car *-- "1" Engine : engine
  Car *-- "4" Wheels : wheels
  @enduml
   */
}

//! 1.3. Agregasyon vs. Kompozisyon: Ne Zaman Hangisi?

//? Yaşam Döngüsü:
//  En önemli farktır. Parça, bütünden bağımsız yaşayabiliyorsa Agregasyon. Parçanın yaşamı bütüne bağlıysa Kompozisyon.
//? Paylaşılabilirlik:
//  Parçalar birden fazla bütün tarafından paylaşılabiliyorsa Agregasyon. Genellikle tek bir bütüne aitse Kompozisyon.
//? "Kalıtıma Karşı Kompozisyon/Agregasyon" Prensibi (Composition over Inheritance):
//  1- OOP'de sıkça duyulan bir prensiptir. "is-a" (bir ...dır) ilişkisi yerine
//  "has-a" (bir ...sahiptir) ilişkisi kurmak genellikle daha fazla esneklik sağlar.
//  2- Kalıtım, sınıflar arasında sıkı bir bağ oluşturur.
//  Üst sınıftaki değişiklikler alt sınıfları doğrudan etkileyebilir (kırılgan temel sınıf problemi).
//  3- Kompozisyon/Agregasyon, nesnelerin davranışlarını farklı nesneleri bir araya getirerek
//  oluşturmayı sağlar. Bu, çalışma zamanında bileşenleri değiştirmeyi veya farklı davranışlar eklemeyi kolaylaştırır.
//  4- Kullanım Alanı: Bir sınıfın davranışını dinamik olarak değiştirmek veya
//  farklı kaynaklardan gelen işlevselliği birleştirmek istediğinizde kompozisyon tercih edilebilir.
