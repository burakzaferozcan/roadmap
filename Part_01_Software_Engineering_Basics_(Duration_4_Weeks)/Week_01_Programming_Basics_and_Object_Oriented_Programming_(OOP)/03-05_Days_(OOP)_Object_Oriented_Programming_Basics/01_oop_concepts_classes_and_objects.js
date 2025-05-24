//TODO OOP Kavramları: Sınıflar ve Nesneler (Temel Bakış)

/**
 * Nesne Yönelimli Programlama (OOP), programları "nesneler" etrafında organize eden bir programlama paradigmasıdır.
 * Bu nesneler, hem veri (özellikler) hem de bu veriler üzerinde işlem yapan fonksiyonları (metotlar) bir arada tutar.
 */

//! Neden OOP?

//* Modülerlik:
//  Kodu bağımsız nesnelere bölerek yönetimi kolaylaştırır.

//* Yeniden Kullanılabilirlik:
//  Oluşturulan sınıflar ve nesneler farklı projelerde veya projenin farklı yerlerinde tekrar kullanılabilir.

//* Bakım Kolaylığı:
//  Bir nesnedeki değişiklik diğerlerini minimum etkiler. Hata ayıklama ve güncelleme kolaylaşır.

//* Gerçek Dünya Modellemesi:
//  Gerçek dünyadaki varlıkları (araba, insan, hesap vb.) ve ilişkilerini kodda daha doğal bir şekilde temsil etmeyi sağlar.

//* Soyutlama:
//  Karmaşık sistemleri daha basit ve anlaşılır parçalara ayırır.

//! Sınıf (Class):
//* Tanım:
//  Bir nesne için bir taslak veya şablondur.
//  Hangi özelliklere (properties/attributes) ve hangi davranışlara (methods/functions) sahip olacağını tanımlar.
//* Örnek Analoji:
//  Bir "Araba" sınıfı düşünün. Bu sınıf, tüm arabaların ortak özelliklerini (renk, model, hız) ve
//  davranışlarını (çalıştır, durdur, hızlan) tanımlar.
//  Bir sınıf, kendi başına bir nesne değildir; nesnelerin nasıl oluşturulacağını belirten bir tariftir.

//! Nesne (Object / Instance):

//* Tanım:
//  Bir sınıfın somut bir örneğidir. Sınıfın tanımladığı özelliklere ve metotlara sahip,
//  bellekte yer kaplayan gerçek bir varlıktır.
//* Örnek Analoji:
//  "Araba" sınıfından oluşturulan "Kırmızı bir BMW X5" veya "Mavi bir Tesla Model 3" birer nesnedir.
//  Her biri "Araba" sınıfının bir örneğidir ama kendi özel değerlerine (kırmızı renk, BMW markası vb.) sahiptir.
//  Bir sınıftan birden fazla nesne (instance) türetilebilir.

//? JavaScript Bağlamında:
/**
 * JavaScript, geleneksel olarak prototip tabanlı bir dildir.
 * Ancak ES6 (ECMAScript 2015) ile birlikte class anahtar kelimesi getirilerek,
 * diğer OOP dillerine (Java, C# gibi) benzer bir sözdizimiyle sınıf ve nesne tanımlamak çok daha kolay hale gelmiştir.
 * Bu class sözdizimi, aslında JavaScript'in prototip tabanlı doğası üzerine kurulmuş bir "sentetik şeker"dir (syntactic sugar),
 * yani altta yatan mekanizmaları daha okunabilir hale getirir.
 * Bu konuya "Prototip Tabanlı Nesne Modeli" başlığında daha detaylı değineceğiz.
 */
