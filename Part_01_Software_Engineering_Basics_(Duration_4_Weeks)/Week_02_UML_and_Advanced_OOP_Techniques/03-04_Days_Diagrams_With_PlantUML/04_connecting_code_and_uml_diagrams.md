# Bölüm 4: Kod ve UML Diyagramları Arasındaki Bağlantıyı Kurma

PlantUML gibi metin tabanlı araçların en büyük avantajlarından biri, UML diyagramlarını kodla birlikte yönetebilme ve hatta bazen koddan otomatik olarak üretebilme veya kod iskeleti oluşturabilme yeteneğidir.

## 4.1. Neden Bağlantı Kurmalı?

- **Tutarlılık:** Kod değiştikçe diyagramların da güncel kalmasını sağlamak.
- **Doğruluk:** Diyagramların gerçek implementasyonu yansıtması.
- **Verimlilik:** Manuel diyagram güncelleme çabasını azaltmak.
- **Canlı Dokümantasyon:** Kodun kendisiyle senkronize olan bir dokümantasyon oluşturmak.

## 4.2. Bağlantı Kurma Yöntemleri

### 1. Manuel Senkronizasyon (En Yaygın):

- Geliştiriciler, kodu yazarken veya değiştirdikçe ilgili PlantUML (`.puml`) dosyalarını manuel olarak güncellerler.
- **Avantajı:** Tam kontrol, diyagramların istenen soyutlama seviyesinde tutulabilmesi.
- **Dezavantajı:** Disiplin gerektirir, unutulabilir, zamanla tutarsızlıklar oluşabilir.
- **İpucu:** Kod review süreçlerine diyagram güncellemelerini dahil edin.

### 2. Kod Yorumlarına Gömme:

Bazı IDE eklentileri veya araçlar, kod içindeki özel yorum bloklarından PlantUML diyagramları üretebilir.

**Örnek (JavaDoc benzeri bir yorumda):**

```java
/**
 * Represents a user in the system.
 * {@plantUML
 *   class User {
 *     -String username
 *     -String password
 *     +login()
 *   }
 * }
 */
public class User {
    // ...
}
```

Bu, diyagramın kodla daha yakın olmasını sağlar.

### 3. Tersine Mühendislik (Reverse Engineering) Araçları:

- Bazı araçlar (özellikle daha kapsamlı UML modelleme araçları veya özel eklentiler), mevcut kodu analiz ederek (örn: Java, C#) sınıf diyagramları veya diğer diyagramları otomatik olarak oluşturabilir.
- PlantUML'in kendisi doğrudan kapsamlı bir tersine mühendislik aracı değildir, ancak bazı yardımcı script'ler veya entegrasyonlar bu yönde kullanılabilir.
- **Avantajı:** Mevcut büyük bir kod tabanının hızlıca görselleştirilmesi.
- **Dezavantajı:** Oluşturulan diyagramlar çok detaylı ve karmaşık olabilir, soyutlama seviyesini ayarlamak gerekebilir.

### 4. İleriye Yönelik Mühendislik (Forward Engineering / Code Generation):

- Bazı UML araçları, oluşturulan UML diyagramlarından (özellikle sınıf diyagramlarından) kod iskeleti (class definitions, method signatures) üretebilir.
- PlantUML doğrudan bu özelliği sunmaz, ancak UML modelinizi başka bir araca aktarıp oradan kod üretebilirsiniz veya kendi script'lerinizi yazabilirsiniz.
- **Avantajı:** Tasarımdan koda geçişi hızlandırabilir.
- **Dezavantajı:** Üretilen kod genellikle sadece bir başlangıç noktasıdır, detaylı implementasyon gerektirir.

### 5. Dokümantasyon Oluşturucularla Entegrasyon (Önceki Bölümde Bahsedildi):

Sphinx, MkDocs, Asciidoctor gibi araçlar, `.puml` dosyalarınızı projenizin dokümantasyon yapısına dahil etmenizi ve git commit ile birlikte versiyonlamanızı sağlar. Doküman build edildiğinde, en güncel diyagramlar otomatik olarak render edilir. Bu, "canlı dokümantasyon" için çok etkilidir.

**Örnek (MkDocs ile mkdocs-plantuml-plugin kullanarak):**

- `docs/diagrams/my_class_diagram.puml` dosyasını oluşturun.
- Markdown dosyanızda:
  ```markdown
  Bu bizim sınıf diyagramımızdır:
  ![Sınıf Diyagramı](diagrams/my_class_diagram.puml)
  ```
- `mkdocs build` komutu çalıştırıldığında, plugin `.puml` dosyasını bir resme dönüştürür ve HTML'e ekler.

## En İyi Pratik:

- **Sistem Tasarımı Aşamasında:** Karmaşık modüller veya etkileşimler için PlantUML diyagramları oluşturun. Bunları tasarım belgelerinin bir parçası yapın.
- **Kod Geliştirme Sırasında:** Büyük yapısal değişiklikler veya önemli yeni özellikler eklenirken ilgili diyagramları güncelleyin veya yeni diyagramlar oluşturun.
- **Versiyon Kontrolü:** `.puml` dosyalarınızı kodunuzla birlikte Git gibi bir versiyon kontrol sisteminde saklayın. Bu, değişiklikleri takip etmenizi ve önceki versiyonlara dönmenizi sağlar.
- **Otomatikleştirilmiş Dokümantasyon:** Mümkünse, dokümantasyon oluşturma sürecinize PlantUML entegrasyonu ekleyerek diyagramların dokümanlarla birlikte güncel kalmasını sağlayın.

## İleri Seviye PlantUML Özellikleri (Kısa Bakış):

- **Skinparam:** Diyagramların görünümünü (renkler, fontlar, çizgiler vb.) detaylı olarak özelleştirmek için kullanılır.
- **Preprocessing:** `@!include`, `@!define` gibi direktiflerle büyük diyagramları modülerleştirmek ve yeniden kullanılabilir parçalar oluşturmak.
- **JSON/YAML Verilerinden Diyagram Oluşturma:** Bazı senaryolarda, yapılandırılmış verilerden dinamik olarak diyagramlar üretmek mümkündür.
- **Daha Fazla Diyagram Türü:** PlantUML, Gantt, Zihin Haritası, Ağ Diyagramı gibi UML dışı diyagramları da destekler.

Bu iki gün boyunca PlantUML'in temellerini ve en yaygın UML diyagramlarını nasıl oluşturacağınızı öğrendiniz. Bol pratik yaparak ve farklı senaryolar için diyagramlar çizerek bu becerilerinizi pekiştirebilirsiniz. Unutmayın, PlantUML güçlü bir araçtır ve zamanla daha karmaşık özelliklerini keşfedeceksiniz.
