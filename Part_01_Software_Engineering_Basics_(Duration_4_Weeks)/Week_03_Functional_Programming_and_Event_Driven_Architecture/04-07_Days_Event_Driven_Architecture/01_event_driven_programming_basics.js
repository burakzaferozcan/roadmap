//TODO Bölüm 1: Olay Odaklı Programlama Temelleri

//! 1.1. Olay Odaklı Programlama (Event-Driven Programming - EDP) Nedir?

//? Tanım:
//  - Olay odaklı programlama, programın akışının olaylar (events) tarafından belirlendiği bir programlama paradigmasıdır.
//  Olaylar, kullanıcı etkileşimleri (fare tıklaması, klavye girişi), sensör girdileri, mesajların alınması veya
//  programın kendi içindeki durum değişiklikleri gibi çeşitli kaynaklardan gelebilir.

//? Temel Fikir:
//  - Program, belirli olaylar meydana geldiğinde çalıştırılacak olan olay işleyicilerini
//  (event handlers / listeners) tanımlar. Bir olay gerçekleştiğinde, sistem bu olayı tespit eder ve
//  ilişkili olay işleyicisini çağırır.

//? Geleneksel (Prosedürel/Emperatif) Akıştan Farkı:
//* 1- Geleneksel Akış:
//  - Program genellikle önceden tanımlanmış bir sıra izler, komutlar yukarıdan aşağıya doğru çalışır.
//* 2- Olay Odaklı Akış:
//  - Program pasif bir şekilde olayların gerçekleşmesini bekler. Akış, hangi olayın ne zaman ve hangi sırada gerçekleşeceğine
//  bağlı olarak dinamik olarak değişir. "Bana şunu yap, sonra bunu yap" demek yerine, "Şu olay olursa, bunu yap" denir.

//! 1.2. Olay Odaklı Mimarinin (EDA) Temel Bileşenleri
//  Bir olay odaklı sistem genellikle şu bileşenlerden oluşur:

//? 1- Olay (Event):
//  - Sistemde meydana gelen ve ilgi çekici bir durumu veya değişikliği temsil eden bir bildirimdir.
//  - Genellikle olay hakkında bilgi içeren veriler (payload) taşır (örn: tıklanan düğmenin ID'si, alınan mesajın içeriği).
//  - Örnekler: mouseClick, keyPress, userLoggedIn, orderPlaced, fileUploaded, timerExpired.

//? 2- Olay Kaynağı (Event Source / Producer / Emitter):
//  - Olayları üreten veya tespit eden bileşendir.
//  - Örnekler: Kullanıcı arayüzü elemanları (butonlar, metin kutuları), zamanlayıcılar, ağ soketleri, mesaj kuyrukları, sensörler.

//? 3- Olay İşleyicisi (Event Handler / Listener / Consumer / Subscriber):
//  - Belirli bir olay türü gerçekleştiğinde çalıştırılmak üzere kaydedilmiş (registered) bir fonksiyon veya metottur.
//  - Olayla ilgili mantığı içerir ve olaya tepki verir.
//  - Bir olay türü için birden fazla işleyici olabilir.

//? 4- Olay Döngüsü / Yönlendirici (Event Loop / Router / Dispatcher / Broker - İsteğe Bağlı Ama Genellikle Var):
//  - Olayları olay kaynaklarından alır ve uygun olay işleyicilerine yönlendirir.
//  - Olayların sırasını yönetebilir, filtreleyebilir veya dönüştürebilir.
//  - JavaScript çalışma zamanı ortamları (tarayıcılar, Node.js) yerleşik bir olay döngüsüne sahiptir.
//  Daha karmaşık EDA sistemlerinde (örn: mikroservisler) Apache Kafka, RabbitMQ gibi mesaj broker'ları bu rolü üstlenir.

//! 1.3. Olay Odaklı Mimarinin Avantajları

//? 1- Gevşek Bağlılık (Loose Coupling):
//  - Olay kaynakları ve olay işleyicileri birbirlerinden haberdar olmak zorunda değildir.
//  Sadece olayların formatı (kontratı) üzerinde anlaşmaları yeterlidir.
//  Bu, bileşenlerin bağımsız olarak geliştirilmesini, test edilmesini ve değiştirilmesini kolaylaştırır.

//? 2- Esneklik ve Genişletilebilirlik:
//  - Yeni olay işleyicileri eklemek veya mevcutları değiştirmek, sistemin diğer kısımlarını etkilemeden kolayca yapılabilir.

//? 3- Duyarlılık (Responsiveness):
//  - Özellikle kullanıcı arayüzlerinde, olaylar hemen işlendiği için sistem daha duyarlı hissedilir.
//  Uzun süren işlemler arka planda çalışırken arayüz donmaz (asenkron yapı sayesinde).

//? 4- Ölçeklenebilirlik:
//  - Olaylar, farklı servisler veya bileşenler arasında dağıtılabilir, bu da sistemin yükünü dağıtarak ölçeklenmesini kolaylaştırır.

//? 5- Asenkron Çalışma:
//  - Olaylar doğal olarak asenkron bir yapıya uygundur. Bir olay tetiklendiğinde, işleyici hemen çalışmak zorunda değildir;
//  olay döngüsü tarafından uygun bir zamanda çalıştırılabilir.

//! 1.4. Olay Odaklı Mimarinin Zorlukları

//? 1- Takip Edilebilirlik ve Hata Ayıklama:
//  - Olayların akışı dolaylı olduğu için, bir işlemin baştan sona nasıl gerçekleştiğini takip etmek ve
//  hataları ayıklamak bazen zor olabilir. "Callback cehennemi" gibi durumlar ortaya çıkabilir.

//? 2- Test Edilebilirlik:
//  - Bağımsız bileşenlerin test edilmesi kolay olsa da, entegre bir sistemdeki olay akışını test etmek karmaşık olabilir.

//? 3- Sıralama ve Garanti:
//  - Olayların işlenme sırası veya bir olayın kesinlikle işleneceği garantisi her zaman olmayabilir (özellikle dağıtık sistemlerde).

//? 4- Durum Yönetimi:
//  - Olaylar durumsuz (stateless) olabilir, bu da genel sistem durumunu yönetmeyi karmaşıklaştırabilir.
