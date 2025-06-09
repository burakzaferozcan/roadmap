# Bölüm 9: Fonksiyonel ve OOP Yaklaşımlarının Karşılaştırılması

Her iki paradigma da güçlüdür ve kendi avantajları/dezavantajları vardır. Modern diller (JavaScript, Python, Scala, C#) genellikle her iki paradigmayı da destekler ve geliştiriciler duruma göre en uygun yaklaşımı seçebilir veya birleştirebilir.

## Özellik Karşılaştırması

| Özellik                | Nesne Yönelimli Programlama (OOP)                         | Fonksiyonel Programlama (FP)                           |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| **Temel Birim**        | Nesneler (veri ve davranışı bir arada tutar)              | Fonksiyonlar (girdiyi alıp çıktı üreten dönüşümler)    |
| **Durum (State)**      | Nesnelerin içinde kapsüllenir ve değiştirilebilir         | Genellikle kaçınılır veya değişmez (immutable) tutulur |
| **Veri**               | Nesnelerin özellikleri olarak saklanır, değiştirilebilir  | Genellikle değişmez, fonksiyonlar arasında akar        |
| **Yan Etkiler**        | Metotlar yan etkilere sahip olabilir                      | Saf fonksiyonlarla en aza indirilmeye çalışılır        |
| **Kontrol Akışı**      | Döngüler, koşullar, metot çağrıları                       | Fonksiyon çağrıları, özyineleme (recursion), HOF'lar   |
| **Ana Odak**           | Nesnelerin modellenmesi, sorumlulukların dağıtılması      | Veri dönüşümleri, fonksiyonların birleştirilmesi       |
| **Kalıtım**            | Sınıflar arasında "is-a" ilişkisi ile kod paylaşımı       | Genellikle kompozisyon ve HOF'lar tercih edilir        |
| **Çok Biçimlilik**     | Metot override/overload ile sağlanır                      | HOF'lar ve arayüz benzeri yapılarla sağlanabilir       |
| **Paralellik**         | Durum paylaşımı nedeniyle zor olabilir (kilitler vb.)     | Yan etkisiz olduğu için genellikle daha kolaydır       |
| **Test Edilebilirlik** | Durum ve bağımlılıklara göre değişir. Mocking gerekebilir | Saf fonksiyonlar çok kolay test edilir                 |
| **JavaScript'te**      | class, prototype, this                                    | Fonksiyonlar, closure'lar, HOF'lar, map/filter/reduce  |

## Ne Zaman Hangisi?

### OOP Güçlü Yanları:

- Gerçek dünya varlıklarını ve ilişkilerini modellemek (domain modeling)
- Kapsülleme ile karmaşıklığı yönetmek
- GUI uygulamaları, oyun geliştirme gibi durumun önemli olduğu alanlar

### FP Güçlü Yanları:

- Veri işleme ve dönüşüm pipeline'ları
- Matematiksel ve algoritmik hesaplamalar
- Eş zamanlı ve paralel programlama
- Durum yönetiminin karmaşık olduğu uygulamalar (örn: UI state management - Redux)
- Test edilebilirliğin ve öngörülebilirliğin kritik olduğu sistemler

## Hibrit Yaklaşım

Çoğu zaman en iyi çözüm, her iki paradigmanın güçlü yanlarını birleştirmektir.

- Nesnelerinizi (OOP) tanımlayabilir, ancak bu nesneler içindeki metotları daha fonksiyonel bir tarzda (saf fonksiyonlar, değişmezlik) yazabilirsiniz
- Veri koleksiyonları üzerinde işlemler yaparken FP tekniklerini (map, filter, reduce) kullanabilirsiniz
- Durumu yönetirken FP'nin değişmezlik ilkesinden faydalanabilirsiniz

Fonksiyonel programlama, bir dizi araç ve düşünme biçimi sunar. Mutlaka her şeyi "saf fonksiyonel" yapmak zorunda değilsiniz, ancak bu prensipleri anlamak ve uygun yerlerde kullanmak kod kalitenizi önemli ölçüde artıracaktır.
