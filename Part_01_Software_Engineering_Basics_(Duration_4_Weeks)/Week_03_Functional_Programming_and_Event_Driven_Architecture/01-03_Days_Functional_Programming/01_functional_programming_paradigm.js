//TODO Bölüm 1: Fonksiyonel Programlama Paradigması

//! 1.1. Fonksiyonel Programlama Nedir?

//? Tanım:
//  - Fonksiyonel programlama, hesaplamayı matematiksel fonksiyonların değerlendirilmesi olarak ele alan
//  bir programlama paradigmasıdır. Durum (state) ve değiştirilebilir veri (mutable data) yerine,
//  saf fonksiyonlara ve değişmezliğe (immutability) odaklanır.

//? Temel Fikir:
//  - Programları, birbirine bağlanan bir dizi fonksiyon olarak düşünmek.
//  Veri akışı, bir fonksiyondan diğerine geçerken dönüşümlere uğrar.

//? Emperatif (Imperative) Programlamadan Farkı:
//* Emperatif Programlama (OOP dahil):
//  - Programın durumunu adım adım nasıl değiştireceğini belirten komut dizilerine odaklanır
//  ("nasıl yapılacağını" söyler). Döngüler, değişken atamaları, nesne durum değişiklikleri yaygındır.
//* Fonksiyonel Programlama:
//  - "Ne yapılacağını" ifade etmeye odaklanır, yan etkilerden kaçınır.
//  Fonksiyonlar, girdileri alıp çıktı üretirler ve dış dünyayı etkilemezler.

//! 1.2. Fonksiyonel Programlamanın Temel İlkeleri ve Avantajları

//? 1- Saf Fonksiyonlar (Pure Functions): (Detaylı işlenecek)
//  - Aynı girdilerle çağrıldığında her zaman aynı çıktıyı üretirler.
//  - Yan etkileri (side effects) yoktur.

//? 2- Değişmezlik (Immutability): (Detaylı işlenecek)
//  - Oluşturulduktan sonra verilerin durumu değiştirilemez.
//  Bir değişiklik gerektiğinde, orijinal veri değiştirilmek yerine yeni bir veri yapısı oluşturulur.

//? 3- Fonksiyonlar Birinci Sınıf Vatandaştır (First-Class Functions):
//* Fonksiyonlar diğer değerler (sayılar, stringler, nesneler) gibi ele alınabilir:
//  1- Değişkenlere atanabilirler.
//  2- Başka fonksiyonlara argüman olarak geçirilebilirler.
//  3- Başka fonksiyonlardan sonuç olarak döndürülebilirler.
//* Bu, yüksek dereceli fonksiyonların (higher-order functions) temelini oluşturur.

//? 4- Yüksek Dereceli Fonksiyonlar (Higher-Order Functions): (Detaylı işlenecek)
//  - Argüman olarak fonksiyon alan veya sonuç olarak fonksiyon döndüren fonksiyonlardır.

//? 5- Referans Şeffaflığı (Referential Transparency):
//  - Saf fonksiyonların bir sonucudur. Bir fonksiyon çağrısı, her zaman o çağrının dönüş değeriyle değiştirilebilir ve
//  programın davranışı değişmez. Bu, kodun anlaşılmasını ve test edilmesini kolaylaştırır.

//? 6- Yan Etkilerden Kaçınma (Avoiding Side Effects):
// - Yan etki, bir fonksiyonun kapsamı dışındaki bir durumu değiştirmesi veya dış dünyayla etkileşime girmesidir
// (örn: global değişkeni değiştirmek, konsola yazdırmak, dosya okumak/yazmak, API isteği yapmak).
// - FP, yan etkileri en aza indirmeye veya onları programın sınırlarına (I/O işlemleri gibi) izole etmeye çalışır.

//* Fonksiyonel Programlamanın Avantajları:

//? Öngörülebilirlik ve Güvenilirlik:
//  - Saf fonksiyonlar ve değişmezlik sayesinde kodun davranışı daha tahmin edilebilir olur,
//  beklenmedik durum değişikliklerinden kaynaklanan hatalar azalır.
//? Test Edilebilirlik:
//  - Saf fonksiyonların test edilmesi çok kolaydır. Sadece girdileri verip çıktıları kontrol etmek yeterlidir,
//  dış bağımlılıklar veya durumlar yoktur.
//? Paralel Programlama Kolaylığı:
//  - Durum paylaşımı ve yan etkiler olmadığı için, fonksiyonların paralel olarak çalıştırılması daha güvenlidir
//  (race conditions gibi sorunlar azalır).
//? Okunabilirlik ve Bakım Kolaylığı:
//  - Küçük, odaklanmış fonksiyonlar ve açık veri akışı sayesinde kod daha anlaşılır olabilir.
//? Birleştirilebilirlik (Composability):
//  - Basit fonksiyonlar bir araya getirilerek daha karmaşık işlevler oluşturulabilir.
//? Hata Ayıklama (Debugging) Kolaylığı:
//  - Durum değişiklikleri ve yan etkiler azaldığı için hataların kaynağını bulmak genellikle daha basittir.
