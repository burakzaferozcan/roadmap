# Bölüm 2: PlantUML Sözdizimi ve Temel Komutlar

Her PlantUML diyagramı `@startuml` ile başlar ve `@enduml` ile biter. Aradaki satırlar diyagramı tanımlar.

## 2.1. Genel Kurallar

- **Yorumlar:** Tek satırlık yorumlar için satır başına `'` (tek tırnak) veya `/'` konulur. Çok satırlık yorumlar için `/' ... '/` kullanılır.
- **Boşluklar ve Satır Sonları:** Genellikle anlamı değiştirmez, okunabilirlik için kullanılır.
- **Büyük/Küçük Harf Duyarlılığı:** Eleman adları (sınıf, aktör vb.) genellikle büyük/küçük harfe duyarlıdır. Komutlar ve anahtar kelimeler genellikle değildir ama tutarlı olmak iyidir.
- **Eleman Adları:** Boşluk içeriyorsa çift tırnak (`" "`) içine alınmalıdır. Özel karakterlerden kaçının veya çift tırnak kullanın.
  ```plantuml
  Alice -> "Bob The Great"
  ```
- **Alias (Takma Ad):** Uzun eleman adları için `as` anahtar kelimesiyle kısa takma adlar kullanılabilir.
  ```plantuml
  actor "Long Actor Name" as LAN
  LAN --> System
  ```

## 2.2. Temel Diyagram Elemanları (Genel Bakış)

Farklı diyagram türleri kendi özel elemanlarına sahip olsa da, bazı genel kavramlar vardır:

### Katılımcılar/Elemanlar Tanımlama:

- Sıralama: `participant Alice`, `actor Bob`
- Sınıf: `class User`, `interface Printable`
- Kullanım Senaryosu: `actor User`, `usecase "Login System" as UC1`
- Bileşen: `component Frontend`
- Durum: `state "Idle State"`

### İlişkiler/Oklar:

- `->` : Düz ok (genellikle mesaj veya yönlü ilişki)
- `-->`: Kesikli ok (genellikle yanıt mesajı veya bağımlılık)
- `--` : Düz çizgi (genellikle ilişkilendirme)
- `..>`: Kısa kesikli ok (genellikle not veya include/extend)
- `<|-` veya `--|>` : Kalıtım/Genelleştirme (ok ucu üst sınıfa)
- `<|..` veya `..|>` : Gerçekleştirme (ok ucu arayüze)
- `*--` : Birleşim (composition - içi dolu diamond)
- `o--` : Toplama (aggregation - içi boş diamond)

### Notlar:

```plantuml
note left: Bu bir nottur.
note right of Alice: Alice için önemli bilgi.
note over Alice, Bob: İkisi için ortak not.
```

### Başlık, Altbilgi, Açıklama:

```plantuml
title Benim Harika Diyagramım
header Sayfa %page% / %numलता%
footer Oluşturulma Tarihi: %date%
caption Bu diyagram sistemin genel akışını gösterir.
```

### Renkler ve Stiller:

```plantuml
Alice -> Bob #blue: Mesaj (Ok rengi mavi)
class User #YellowGreen (Sınıfın arka plan rengi)
```

Stiller için skinparam komutları kullanılır (daha ileri seviye):

```plantuml
skinparam backgroundColor #EEEBDC
skinparam shadowing false
```

### Yönlendirme:

```plantuml
left to right direction
top to bottom direction (varsayılan)
```
