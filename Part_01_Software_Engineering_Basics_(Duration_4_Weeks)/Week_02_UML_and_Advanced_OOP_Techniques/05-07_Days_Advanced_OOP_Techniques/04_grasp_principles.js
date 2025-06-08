//TODO Bölüm 4: GRASP Prensipleri (General Responsibility Assignment Software Patterns)

//? Tanım:
/**
 * - GRASP, nesne yönelimli tasarımda sorumlulukların (responsibilities) nesnelere nasıl atanacağına dair
 * rehberlik eden bir dizi temel prensip veya örüntüdür.
 * SOLID prensipleri gibi "ne yapmalı"dan ziyade, "nasıl düşünmeli" ve "sorumlulukları nasıl dağıtmalı" konusunda yol gösterir.
 * Craig Larman tarafından "Applying UML and Patterns" kitabında popülerleştirilmiştir.
 */

//? Temel Fikir:
/**
 * İyi bir nesne yönelimli tasarım, sorumlulukların uygun nesnelere mantıklı bir şekilde dağıtılmasıyla elde edilir.
 * Bu, düşük bağlılık (low coupling) ve yüksek uyum (high cohesion) gibi arzu edilen tasarım özelliklerine yol açar.
 */

//! 9 Temel GRASP Prensibi:

//* 1- Information Expert (Bilgi Uzmanı):
//? Problem:
//  - Bir sorumluluğu hangi nesneye atamalıyız?
//? Çözüm:
//  - Sorumluluğu, o sorumluluğu yerine getirmek için gerekli bilgiye sahip olan (veya sahip olabilecek) sınıfa atayın.
//? Örnek:
//  - Bir Siparis nesnesinin toplam tutarını hesaplama sorumluluğu,
//  sipariş kalemlerini (ürün, miktar, fiyat) bilen Siparis sınıfına ait olmalıdır.
//  SiparisKalemi de kendi alt toplamını hesaplamaktan sorumlu olabilir.

//* 2- Creator (Yaratıcı):
//? Problem:
//  - Bir A nesnesinin örneklerini kim oluşturmalıdır?
//? Çözüm: B sınıfı, aşağıdaki durumlardan biri veya daha fazlası geçerliyse A nesnelerini oluşturma sorumluluğuna sahip olmalıdır:
//  1- B, A nesnelerini içeriyorsa veya bir araya getiriyorsa (composition/aggregation).
//  2- B, A nesnelerini kaydediyorsa veya yakınen kullanıyorsa.
//  3- B, A nesnelerini başlatmak için gerekli bilgilere sahipse.

//? Örnek:
//  - Bir Siparis nesnesi oluşturulurken, SiparisKalemi nesneleri Siparis tarafından veya
//  Siparis'i oluşturan bir SiparisYoneticisi tarafından oluşturulabilir.
//  Eğer Siparis SiparisKalemi'ni "içeriyorsa" (composition), Siparis'in SiparisKalemi yaratması mantıklıdır.

//* 3- Low Coupling (Düşük Bağlılık):
//? Problem:
//  - Sınıflar arasındaki bağımlılıkları nasıl azaltırız? Bir sınıftaki değişikliğin diğerlerini etkileme olasılığını nasıl düşürürüz?
//? Çözüm:
//  - Sorumlulukları, sınıflar arasındaki bağlılığı düşük tutacak şekilde atayın.
//  Bir sınıf, diğer sınıflar hakkında mümkün olduğunca az şey bilmelidir.
//  Arayüzlere bağımlı olmak, somut sınıflara bağımlı olmaktan daha iyidir.
//? Faydaları:
//  Daha az etki, artan yeniden kullanılabilirlik, daha kolay bakım.
//? İlgili Prensip:
//  Dependency Injection, Protected Variations.

//* 4- High Cohesion (Yüksek Uyum):
//? Problem:
//  - Bir sınıfın sorumluluklarını nasıl odaklı ve yönetilebilir tutarız?
//? Çözüm:
//  - Bir sınıfa, birbirleriyle yakından ilişkili ve odaklanmış sorumluluklar atayın. Bir sınıf tek bir ana amaca hizmet etmelidir.
//? Faydaları:
//  - Anlaşılırlık, yeniden kullanılabilirlik, bakım kolaylığı.
//  Sınıflar çok fazla alakasız iş yapmamalıdır ("God Class" anti-pattern'ından kaçının).
//? İlgili Prensip:
//  Single Responsibility Principle (SOLID).

//* 5- Controller (Denetleyici):
//? Problem:
//  - Kullanıcı arayüzünden gelen sistem olaylarını (input events) kim almalı ve işlemelidir?
//? Çözüm:
//  - Kullanıcı arayüzünün kendisi yerine, bu olayları almak ve koordine etmek için ayrı bir "denetleyici" nesnesi kullanın.
//  Denetleyici, gelen isteği ilgili iş mantığı nesnelerine (domain objects) delege eder.
//? Türleri:
//  1- Facade Controller: Tüm sistem için tek bir denetleyici (küçük sistemlerde).
//  2- Use Case Controller: Her bir kullanım senaryosu için ayrı bir denetleyici (daha yaygın ve esnek).
//? Örnek:
//  - Bir web uygulamasında, HTTP isteğini alan bir SiparisController, isteği doğrular ve
//  SiparisServisi'ne yönlendirir. UI, iş mantığından ayrılmış olur.

//* 6- Polymorphism (Çok Biçimlilik):
//? Problem:
//  - Türüne göre değişen davranışları nasıl ele alırız? if/else veya switch bloklarından nasıl kaçınırız?
//? Çözüm:
//  - Davranışın değiştiği noktalarda, bir arayüz kullanarak ve bu arayüzü implemente eden farklı sınıfların metotlarını çağırarak çok biçimlilik kullanın.
//? Örnek:
//  - Farklı ödeme türleri (KrediKartiOdeme, HavaleOdeme) için bir IOdemeYontemi arayüzü tanımlayıp,
//  odemeYap() metodunu her sınıfta farklı implemente etmek. OdemeIsleyici sadece IOdemeYontemi.odemeYap()'ı çağırır.

//* 7- Pure Fabrication (Saf İmalat / Yapay Sınıf):
//? Problem:
//  - Information Expert, Low Coupling veya High Cohesion prensiplerini ihlal etmeden
//  bir sorumluluğu atayacak uygun bir sınıf (genellikle domain modelinden) bulamadığımızda ne yaparız?
//? Çözüm:
//  - Problemi çözmek için, domain modelinde doğal bir karşılığı olmayan,
//  yapay bir hizmet sınıfı ("pure fabrication") oluşturun. Bu sınıflar genellikle iş mantığı içermez,
//  daha çok yardımcı veya altyapısal görevler üstlenirler.
//? Örnek:
//  - Bir VeritabaniBaglayicisi sınıfı, farklı veritabanlarına erişim için ortak metotlar sunabilir.
//  Ya da bir JSONParser sınıfı. Bu sınıflar, domain nesnelerinin (Müşteri, Sipariş vb.) sorumluluklarını temiz tutar.

//* 8- Indirection (Dolaylı Yönlendirme):
//? Problem:
//  - İki veya daha fazla eleman arasında doğrudan bağlılığı nasıl önler veya azaltırız?
//? Çözüm:
//  - Sorumluluğu, iki eleman arasında aracı görevi görecek bir ara nesneye atayın.
//  Böylece elemanlar birbirlerine doğrudan bağlanmak yerine bu aracı üzerinden iletişim kurarlar.
//? Örnekler:
//  - Controller (UI ve domain arasında), Adapter (uyumsuz arayüzleri bağlar),
//  Facade (karmaşık bir alt sistemi basitleştirir). Dependency Injection da bir tür Indirection'dır.

//* 9- Protected Variations (Korumalı Değişimler / Değişime Karşı Koruma):
//? Problem:
//  - Bir sistemdeki kararsız, değişime açık noktaların etkisini nasıl sınırlarız?
//? Çözüm:
//  - Değişmesi muhtemel olan elemanların (implementasyon detayları, harici sistemler, iş kuralları)
//  etrafına kararlı bir arayüz tanımlayın. Diğer sınıflar bu arayüze bağımlı olsun,
//  böylece altta yatan değişikliklerden etkilenmezler.
//? Örnekler:
//  - Arayüzler (Interfaces), Data Encapsulation, Polymorphism, Indirection.
//  Bir veritabanı erişim katmanı (DAO - Data Access Object) tanımlamak;
//  eğer veritabanı teknolojisi değişirse sadece DAO implementasyonu değişir, iş mantığı etkilenmez.

/**
 *!  GRASP prensipleri, daha iyi OOP tasarımları yapmak için bir düşünce biçimi sunar.
 *!  Genellikle birbirleriyle ilişkilidirler ve birlikte kullanılırlar.
 */
