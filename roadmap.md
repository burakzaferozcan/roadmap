# Yazılım Mühendisliği Kapsamlı Eğitim Yol Haritası

Bu yol haritası, Yazılım Mühendisliği müfredatına uygun olarak sıfırdan tam donanımlı bir yazılım mühendisi olma yolculuğunuzda size rehberlik edecektir. Her bir aşama için gereken bilgi, beceri ve kaynakları detaylı olarak açıkladım.

## 📚 BÖLÜM 1: YAZILIM MÜHENDİSLİĞİ TEMELLERİ (Süre: 4 Hafta)

### Hafta 1: Programlama Temelleri ve Nesne Yönelimli Programlama (OOP)

#### Gün 1-2: Programlama Temelleri
- JavaScript temel sözdizimi ve veri tipleri
- Değişkenler, sabitler ve kapsamları (var, let, const)
- Operatörler ve ifadeler
- Kontrol yapıları (if-else, switch, döngüler)
- Fonksiyonlar ve parametreler

#### Gün 3-5: Nesne Yönelimli Programlama (OOP) Temelleri
- OOP kavramları: Sınıflar ve nesneler
- Kapsülleme (Encapsulation) prensibi
- Kalıtım (Inheritance) mekanizmaları
- Çok biçimlilik (Polymorphism) uygulamaları
- JavaScript'te class yapısı ve constructor fonksiyonları
- Prototip tabanlı nesne modeli
- Getter ve setter metodları
- Statik metodlar ve özellikler

#### Gün 6-7: Pratik Uygulama - OOP Projesi
- Basit bir sınıf hiyerarşisi tasarlama
- Gerçek dünya problemi modelleme (örn: Bir kütüphane sistemi)
- OOP prensiplerini uygulama egzersizleri

### Hafta 2: UML ve İleri OOP Teknikleri

#### Gün 1-2: UML Diyagramları
- UML'in amacı ve türleri hakkında genel bilgi
- Sınıf diyagramları oluşturma
- Nesne diyagramları
- Kullanım senaryosu (Use-Case) diyagramları
- Etkinlik diyagramları
- Sıralama (Sequence) diyagramları

#### Gün 3-4: PlantUML ile Diyagramlar
- PlantUML kurulumu ve entegrasyonu
- PlantUML sözdizimi ve temel komutlar
- Farklı diyagram türlerini PlantUML ile oluşturma
  - Sınıf diyagramları
  - Bileşen diyagramları
  - Durum diyagramları
  - Sıralama diyagramları
- Kod ve UML diyagramları arasındaki bağlantıyı kurma

#### Gün 5-7: İleri OOP Teknikleri
- Kompozisyon ve agregasyon (Composition vs. Aggregation)
- Arayüzler (Interfaces) ve soyut sınıflar (Abstract classes)
- Dependency Injection tasarım deseni
- GRASP (General Responsibility Assignment Software Patterns) prensipleri
- JavaScript'te ileri OOP teknikleri
- Pratik uygulama: Mevcut bir projeyi UML ile modelleme

### Hafta 3: Fonksiyonel Programlama ve Olay Odaklı Mimari

#### Gün 1-3: Fonksiyonel Programlama
- Fonksiyonel programlama paradigması
- Saf fonksiyonlar (Pure functions)
- İmmutability (Değişmezlik) prensibi
- Yüksek dereceli fonksiyonlar (Higher-order functions)
- Closure'lar ve kapsamlar
- Map, filter, reduce operasyonları
- Currying ve partial application
- JavaScript'te fonksiyonel programlama teknikleri
- Fonksiyonel ve OOP yaklaşımlarının karşılaştırılması

#### Gün 4-7: Olay Odaklı Mimari (Event-Driven Architecture)
- Olay odaklı programlama temelleri
- Observer tasarım deseni
- Eventbus/EventEmitter tasarım deseni
- Asenkron işlemler ve Promise API
- Async/await kullanımı
- JavaScript'te olayları dinleme ve tetikleme
- Node.js Event Loop'u anlama
- DOM olayları ve tarayıcı olayları
- Pratik: Basit bir olay odaklı sistem tasarlama ve geliştirme

### Hafta 4: Yazılım Tasarım Desenleri ve SOLID Prensipleri

#### Gün 1-3: Tasarım Desenleri (Design Patterns)
- Tasarım desenlerinin amacı ve sınıflandırılması
- Yaratımsal (Creational) desenler:
  - Singleton
  - Factory Method
  - Abstract Factory
  - Builder
  - Prototype
- Yapısal (Structural) desenler:
  - Adapter
  - Bridge
  - Composite
  - Decorator
  - Facade
  - Proxy
- Davranışsal (Behavioral) desenler:
  - Observer
  - Strategy
  - Command
  - Template Method
  - Iterator
  - State
- JavaScript'te tasarım desenleri uygulama örnekleri

#### Gün 4-6: SOLID Prensipleri
- Single Responsibility Principle (Tek Sorumluluk Prensibi)
- Open/Closed Principle (Açık/Kapalı Prensibi)
- Liskov Substitution Principle (Liskov Yerine Geçme Prensibi)
- Interface Segregation Principle (Arayüz Ayrımı Prensibi)
- Dependency Inversion Principle (Bağımlılığın Tersine Çevrilmesi Prensibi)
- Her prensip için kod örnekleri ve uygulamalar
- Code smell kavramı ve tespit yöntemleri
- Kodun temiz ve bakımı kolay olmasını sağlama teknikleri

#### Gün 7: Pratik Uygulama ve Değerlendirme
- Mevcut bir projeyi SOLID prensiplerine göre refactor etme
- Uygun tasarım desenlerini tanımlama ve uygulama
- Code review pratikleri ve teknikleri
- İlk bölüm sonu değerlendirmesi ve öz değerlendirme

## 📚 BÖLÜM 2: FRONTEND GELİŞTİRME (Süre: 3 Hafta)

### Hafta 5: Modern Web Temelleri ve CSS

#### Gün 1-2: HTML5 Temelleri
- Modern HTML5 etiketleri ve semantik HTML
- Erişilebilirlik (Accessibility) prensipleri
- SEO dostu HTML yapısı
- Formlar ve validation
- HTML5 API'leri (Geolocation, Storage, Canvas vb.)

#### Gün 3-5: CSS3 ve Modern Layout Teknikleri
- CSS seçiciler ve özgüllük (specificity)
- Box model ve pozisyonlama
- Responsive design prensipleri
- CSS değişkenleri (variables)
- Flexbox layout detaylı inceleme:
  - flex container özellikleri
  - flex item özellikleri
  - one-dimensional layout tasarımı
- CSS Grid detaylı inceleme:
  - grid container özellikleri
  - grid item özellikleri
  - two-dimensional layout tasarımı
- Media queries ve breakpoint stratejileri
- CSS preprocessor'lar (SASS/SCSS)
- CSS-in-JS yaklaşımları

#### Gün 6-7: Modern CSS Pratikleri
- CSS mimari metodolojileri (BEM, SMACSS, OOCSS)
- CSS Framework'leri tanıma (Tailwind, Bootstrap)
- CSS animasyonları ve transitions
- Performans odaklı CSS yazımı
- Browser uyumluluk sorunları ve çözümleri
- Pratik: Responsive ve modern bir web sayfası tasarımı

### Hafta 6: JavaScript ve Vue.js Temelleri

#### Gün 1-2: Modern JavaScript (ES6+)
- let, const ve blok kapsamı
- Arrow functions
- Template literals
- Destructuring assignment
- Spread ve Rest operatörleri
- Classes ve enhanced object literals
- Modules (import/export)
- Promises ve async/await
- Map, Set, WeakMap, WeakSet

#### Gün 3-7: Vue.js Temelleri
- Vue.js ekosistemi ve temel konseptleri
- Vue CLI ile proje kurulumu
- Vue bileşen (component) yapısı
- Template syntax ve directives:
  - v-bind, v-model, v-if, v-for, v-on
- Computed properties ve watchers
- Props ve events ile bileşenler arası iletişim
- Component lifecycle hooks
- Vue Router temelleri:
  - Route tanımları ve parametreler
  - Nested routes
  - Navigation guards
- State management kavramı
- Vuex store temelleri:
  - State, mutations, actions, getters
- Form işleme ve validation
- Pratik: Vue.js ile basit bir task yönetim uygulaması

### Hafta 7: İleri Vue.js ve Single Page Applications (SPA)

#### Gün 1-2: Vue.js İleri Konular
- Dinamik ve asenkron bileşenler
- Slots ve scoped slots
- Mixins ve custom directives
- Plugins geliştirme
- Composition API vs Options API
- Vue 3 özellikleri ve farkları
- Teleport ve Suspense bileşenleri
- Performance optimizasyonları

#### Gün 3-4: SPA (Single Page Applications)
- SPA mimarisi ve çalışma prensibi
- Client-side routing detayları
- SPA'ların avantajları ve dezavantajları
- Lazy loading ve code splitting
- SPA güvenlik konuları
- SEO ve SPA'lar
- Vue.js ile SPA geliştirme best practices

#### Gün 5-6: Server-Side Rendering (SSR)
- SSR nedir ve neden kullanılır?
- Client-side vs Server-side rendering
- Vue.js ile SSR (Nuxt.js giriş)
- Hydration kavramı
- SSR ile SEO optimizasyonu
- SSR performans konuları
- Static Site Generation (SSG) kavramı

#### Gün 7: İleri Frontend Konuları
- Web Components ve Vue.js entegrasyonu
- Progressive Web Apps (PWA) temelleri
- Service workers ve offline capabilities
- Internationalization (i18n) ve localization
- Frontend test stratejileri (Unit, E2E)
- Frontend proje yapısı ve organizasyonu

## 📚 BÖLÜM 3: BACKEND GELİŞTİRME (Süre: 3 Hafta)

### Hafta 8: Node.js ve Express.js Temelleri

#### Gün 1-2: Node.js Temelleri
- Node.js mimarisi ve özellikleri
- Node.js modül sistemi (CommonJS vs ES Modules)
- npm ekosistemi ve package.json
- Node.js global nesneler (process, Buffer, etc)
- File system API
- Streams ve pipe fonksiyonalitesi
- Events ve EventEmitter
- Error handling stratejileri

#### Gün 3-5: Express.js Framework
- Express.js kurulumu ve temel yapısı
- Middleware kavramı ve kullanımı
- Routing ve HTTP metodları
- Request ve response nesneleri
- URL parametreleri ve query strings
- Static dosya servis etme
- Template engines (ejs, pug vb.)
- Error handling middleware
- Express.js best practices

#### Gün 6-7: REST API Temelleri
- REST mimarisi ve prensipleri
- RESTful API tasarım kuralları
- HTTP durum kodları ve uygun kullanımları
- API versiyonlama stratejileri
- API dokümantasyonu (Swagger/OpenAPI)
- CORS ve güvenlik konuları
- Rate limiting ve API throttling
- Pratik: Express.js ile basit bir REST API geliştirme

### Hafta 9: Katmanlı Mimari ve API Geliştirme

#### Gün 1-3: Backend Katmanlı Mimari
- Katmanlı mimarinin avantajları
- Controller katmanı
- Service katmanı
- Repository/Data Access katmanı
- Domain/Model katmanı
- DTO (Data Transfer Object) pattern
- Dependency Injection uygulama
- Clean Code prensiplerinin backend'de uygulanması
- Loosely coupled mimari tasarımı

#### Gün 4-5: İleri REST API Geliştirme
- HATEOAS prensibi
- API filtreleme, sıralama ve pagination
- Bulk operations
- Asenkron işlem tasarımı
- Long-running işlemler
- İdempotent API endpoints tasarımı
- Conditional requests (ETag, If-Modified-Since)
- API caching stratejileri

#### Gün 6-7: Kimlik Doğrulama ve Yetkilendirme
- Authentication vs Authorization
- JWT (JSON Web Tokens) yapısı ve kullanımı
- OAuth 2.0 ve OpenID Connect temelleri
- Role-based access control (RBAC)
- API keys ve API security
- Password hashing ve güvenli saklama
- Session-based auth vs Token-based auth
- Two-factor authentication (2FA) implementasyonu
- Güvenlik best practices

### Hafta 10: Harici API Entegrasyonları ve İleri Backend Konuları

#### Gün 1-3: Harici API Entegrasyonları
- HTTP client kullanımı (Axios, node-fetch)
- API entegrasyon stratejileri
- Error handling ve retry mekanizmaları
- Rate limiting ile başa çıkma
- API responses caching
- Circuit breaker pattern
- Webhook implementasyonu
- Polling vs WebSockets
- API gateway pattern

#### Gün 4-5: İleri Backend Konuları
- Microservices mimarisi giriş
- Event-driven architecture implementasyonu
- Message queues ve pub/sub sistemleri
- Background jobs ve scheduling
- Cron jobs implementasyonu
- Logging ve monitoring stratejileri
- Server-sent events (SSE)
- WebSockets ile real-time uygulamalar
- GraphQL temel prensipleri

#### Gün 6-7: Backend Performance ve Ölçeklendirme
- Backend performans optimizasyon teknikleri
- Caching stratejileri (Memory, Redis)
- Load balancing temelleri
- Horizontal vs Vertical scaling
- Database connection pooling
- Database query optimizasyonu
- N+1 sorunu ve çözüm yöntemleri
- Backend için deployment stratejileri
- Backend test yazımı (unit, integration, e2e)

## 📚 BÖLÜM 4: VERİTABANLARI (Süre: 2 Hafta)

### Hafta 11: MongoDB ve NoSQL Veritabanları

#### Gün 1-2: NoSQL Kavramları ve MongoDB Temelleri
- SQL vs NoSQL veritabanları
- NoSQL veritabanı türleri (Document, Key-Value, Column, Graph)
- MongoDB mimarisi ve özellikleri
- MongoDB kurulumu ve yapılandırma
- MongoDB Shell kullanımı
- CRUD operasyonları:
  - insertOne, insertMany
  - find, findOne
  - updateOne, updateMany
  - deleteOne, deleteMany
- Query operatörleri ($eq, $gt, $lt, $in vb.)
- MongoDB Data Types

#### Gün 3-4: MongoDB Şema Tasarımı
- MongoDB'de şema tasarım prensipleri
- Normalization vs Denormalization
- Embedding vs Referencing stratejileri
- One-to-one, one-to-many, many-to-many ilişkiler
- MongoDB indexing ve performans optimizasyonu
- Şema validation
- MongoDB best practices
- Anti-patterns ve yaygın hatalar

#### Gün 5-7: Mongoose ODM
- Mongoose kurulumu ve yapılandırma
- Schema ve model tanımlamaları
- Validation ve middleware
- Instance ve static metodlar
- Virtuals ve getters/setters
- Populate ve referansların çözümlenmesi
- Mongoose hooks (pre/post)
- Veri ilişkilendirme teknikleri
- Mongoose ile transaction yönetimi
- Pratik: Mongoose ile kapsamlı bir veri modeli geliştirme

### Hafta 12: İleri MongoDB ve Aggregation Framework

#### Gün 1-3: MongoDB Aggregation Framework
- Aggregation pipeline kavramı
- Pipeline stages:
  - $match, $group, $sort
  - $project, $unwind
  - $lookup (join operasyonları)
  - $addFields, $replaceRoot
  - $facet ve multi-pipeline
- Aggregation operatörleri
- Array operatörleri
- Matematiksel operatörler
- Date operatörleri
- Aggregation performans optimizasyonu
- Complex querying örnekleri

#### Gün 4-5: İleri MongoDB Konuları
- MongoDB change streams
- TTL indexes
- Geospatial indexing ve queries
- Text search ve text indexes
- Collations
- MongoDB Atlas kullanımı
- Sharding ve replication temelleri
- MongoDB security best practices
- Backup ve recovery stratejileri

#### Gün 6-7: Pratik Uygulamalar ve Performans
- Kompleks veritabanı tasarımı projeleri
- Performans analizi ve optimizasyon
- Slow query analizi
- MongoDB Compass kullanımı
- Index strategy optimization
- Veri yönetimi best practices
- Real-world senaryoların modellenmesi
- Backend ve veritabanı entegrasyonu
- Veritabanı migration stratejileri

## 📚 BÖLÜM 5: CI/CD VE BULUT TEKNOLOJİLERİ (Süre: 2 Hafta)

### Hafta 13: Docker ve Konteyner Teknolojileri

#### Gün 1-2: Docker Temelleri
- Docker mimarisi ve temel kavramlar
- Konteyner vs sanal makine
- Docker kurulumu ve yapılandırma
- Docker CLI kullanımı
- Docker images ve containers
- Docker Hub ve container registries
- Dockerfile yazımı:
  - FROM, RUN, COPY, ADD
  - WORKDIR, ENV, ARG
  - EXPOSE, VOLUME, ENTRYPOINT, CMD
- Multi-stage builds
- Image optimization teknikleri

#### Gün 3-4: Docker Compose ve Çoklu Konteyner Uygulamaları
- Docker Compose temel kavramları
- docker-compose.yml dosyası yazımı
- Service tanımlamaları
- Network ve volume konfigürasyonu
- Environment variables yönetimi
- Development vs production compose files
- Çoklu konteyner uygulamaları tasarlama
- Compose commands ve lifecycle
- Health checks implementasyonu

#### Gün 5-7: Docker Ekosistemi ve Best Practices
- Docker volumes ve persistent data
- Docker networking temelleri
- Docker Swarm mode giriş
- Docker security best practices
- Docker logging ve monitoring
- Container orchestration kavramı
- Kubernetes'e giriş
- Docker ile CI/CD entegrasyonu
- Dockerized uygulamaların debugging'i
- Pratik: Full-stack uygulamanın dockerize edilmesi

### Hafta 14: CI/CD ve Cloud Deployment

#### Gün 1-3: Sürekli Entegrasyon ve Sürekli Dağıtım (CI/CD)
- CI/CD kavramları ve prensipleri
- Git workflow stratejileri
  - Gitflow
  - GitHub flow
  - Trunk-based development
- CI/CD pipeline tasarımı
- GitHub Actions temelleri
- GitLab CI/CD temelleri
- Jenkins giriş
- Test automation ve CI/CD
  - Unit tests
  - Integration tests
  - E2E tests
- Code quality ve static code analysis
- Automated deployment strategies
  - Blue-green deployment
  - Canary releases
  - Rolling updates

#### Gün 4-7: Google Cloud Platform ve Cloud Run
- Cloud computing temel kavramları
- Google Cloud Platform (GCP) giriş
- GCP servislerine genel bakış
- Google Cloud Console kullanımı
- Google Cloud CLI (gcloud) kullanımı
- Google Cloud Run:
  - Container deployment
  - Scaling ve resource yönetimi
  - Domain ve SSL konfigürasyonu
  - Environment variables
  - Secrets yönetimi
- Cloud SQL ve Firestore kullanımı
- Cloud Storage
- Cloud Monitoring ve Logging
- CI/CD ve GCP entegrasyonu
- Infrastructure as Code (IaC) kavramı
- Terraform giriş
- Cloud cost management
- Pratik: Full-stack uygulamanın Google Cloud Run'a deploy edilmesi

## 📚 BÖLÜM 6: PROJE YÖNETİMİ VE TAKIM ÇALIŞMASI (Süre: 1 Hafta)

### Hafta 15: Agile ve Lean Metodolojileri, Proje Yönetimi

#### Gün 1-2: Agile Prensipleri ve Scrum
- Agile Manifesto ve 12 prensip
- Waterfall vs Agile karşılaştırması
- Scrum framework:
  - Roller (Product Owner, Scrum Master, Development Team)
  - Ceremonies (Sprint Planning, Daily Scrum, Sprint Review, Retrospective)
  - Artifacts (Product Backlog, Sprint Backlog, Increment)
- User Stories ve acceptance criteria
- Story points ve velocity
- Sprint planning ve execution
- Definition of Done (DoD) ve Definition of Ready (DoR)

#### Gün 3-4: Kanban ve Lean Prensipleri
- Kanban temel prensipleri
- Kanban board tasarımı ve yönetimi
- WIP (Work In Progress) limitleri
- Kanban metrics ve flow efficiency
- Cumulative Flow Diagrams
- Lean software development prensipleri:
  - Eliminate waste
  - Amplify learning
  - Decide as late as possible
  - Deliver as fast as possible
  - Empower the team
  - Build integrity in
  - See the whole
- Value Stream Mapping
- Continuous improvement (Kaizen)

#### Gün 5-6: Prototipleme ve Design Thinking
- Design Thinking metodolojisi
- Empathize, Define, Ideate, Prototype, Test
- Kullanıcı araştırma teknikleri
- Personas oluşturma
- User journey mapping
- Balsamiq ile wireframing
- Figma ile prototip oluşturma
- Usability testing
- Kullanıcı geri bildirimlerini değerlendirme
- Iterative design prensipleri

#### Gün 7: Kendi Projenizi Yönetin
- Proje vizyon ve scope tanımlama
- Product roadmap oluşturma
- MVP (Minimum Viable Product) tanımlama
- Backlog prioritization teknikleri
  - MoSCoW method
  - RICE scoring
- Risk yönetimi
- Zaman ve kaynak planlaması
- İlerleme takibi ve raporlama
- Remote çalışma ve asenkron iletişim
- Technical debt yönetimi
- Pratik: Kendi yazılım projeniz için plan oluşturma

## 📚 BÖLÜM 7: CAPSTONE PROJE VE KARİYER HAZIRLIĞI (Süre: 3 Hafta)

### Hafta 16-18: Capstone Proje Geliştirme

#### Hafta 16: Proje Tanımlama ve Başlangıç
- Proje fikri geliştirme ve değerlendirme
- Problem statement tanımlama
- Çözüm önerisi ve değer teklifi
- Kullanıcı personaları ve senaryoları oluşturma
- Teknik gereksinimler ve kısıtlamalar
- Mimari tasarım
- Veri modeli tasarımı
- UML diyagramları hazırlama
- GitHub repository setup
- CI/CD pipeline kurulumu

#### Hafta 17: Frontend ve Backend Geliştirme
- Vue.js ile frontend scaffolding
- Bileşen mimarisi ve tasarımı
- State management implementasyonu
- Express.js ile backend API geliştirme
- MongoDB veritabanı entegrasyonu
- Kimlik doğrulama ve yetkilendirme sistemi
- RESTful API tasarımı
- Error handling ve logging
- Unit ve integration testler yazımı
- Docker container'larının hazırlanması

#### Hafta 18: Tamamlama, Deploy ve Sunum
- Frontend ve backend entegrasyonu
- End-to-end testler
- Performans optimizasyonu
- Güvenlik kontrolleri ve hardening
- Google Cloud Run'a deployment
- CI/CD pipeline'ının tamamlanması
- Dokümantasyon:
  - README.md
  - API dokümantasyonu
  - Deployment guide
  - User manual
- Proje demo sunumu hazırlığı
- Sunum becerileri ve teknikleri
- Projenin deploy edilmiş sürümünün sunumu

### Ekstra: Kariyer Hazırlığı ve Sürekli Öğrenme

#### Kariyer Hazırlığı
- Yazılım mühendisliği profesyonel portfolyosu oluşturma
- LinkedIn profili optimizasyonu
- GitHub profilinizi işverenlere hazırlama
- Teknik CV hazırlama teknikleri
- Cover letter yazma
- Technical interview hazırlık
  - Algoritma soruları
  - Sistem tasarımı soruları
  - Behavioral questions
- Coding challenge stratejileri
- Mülakat simülasyonları
- Freelancing ve remote çalışma stratejileri

#### Sürekli Öğrenme Planı
- Öğrenme yol haritası oluşturma
- Online kaynakları etkin kullanma
- Açık kaynak projelere katkıda bulunma
- Tech konferans ve meetup'lara katılma
- Blog yazma ve bilgi paylaşımı
- Side projects geliştirme
- Mentorluk alma ve verme
- Teknoloji trendlerini takip etme

## 📚 EK KAYNAKLAR VE ARAÇLAR

### Önerilen Okumalar
- "Clean Code" - Robert C. Martin
- "Design Patterns: Elements of Reusable Object-Oriented Software" - Gang of Four
- "Refactoring" - Martin Fowler
- "Domain-Driven Design" - Eric Evans
- "The Pragmatic Programmer" - Andrew Hunt & David Thomas
- "JavaScript: The Good Parts" - Douglas Crockford
- "You Don't Know JS" serisi - Kyle Simpson
- "Eloquent JavaScript" - Marijn Haverbeke
- "Node.js Design Patterns" - Mario Casciaro

### Online Kaynaklar
- MDN Web Docs (JavaScript, HTML, CSS)
- Vue.js resmi dokümantasyonu
- Node.js resmi dokümantasyonu
- Express.js rehberi
- MongoDB University (ücretsiz kurslar)
- freeCodeCamp
- Egghead.io
- Frontend Masters
- LeetCode (algoritma soruları)
- GitHub Learning Lab

### Araçlar
- VSCode ve eklentileri
- Postman (API testing)
- MongoDB Compass
- Chrome DevTools
- Git ve GitHub
- Docker Desktop
- PlantUML
- Balsamiq/Figma
- Jira/Trello (proje yönetimi)
- Slack/Discord (iletişim)

## 📊 İLERLEME TAKİBİ

Her hafta için kendinize şu soruları sorun:
1. Bu haftanın öğrenme hedeflerinin ne kadarını gerçekleştirdim?
2. Hangi konularda güçlüyüm, hangi konularda daha fazla çalışmalıyım?
3. Öğrendiklerimi gerçek bir projede uygulayabilir miyim?
4. Kod kalitemi ve üretkenliğimi nasıl artırabilirim?

Düzenli kod pratikleri yapmak, küçük projeler geliştirmek ve öğrendiklerinizi pekiştirmek için her hafta en az 2-3 saat ayırmanız önerilir.

---

Bu yol haritası, Yazılım Mühendisliği müfredatını temel alarak hazırlanmıştır. Modern yazılım geliştirme becerileri kazandırmayı ve sizi tam donanımlı bir yazılım mühendisi olarak hazırlamayı amaçlamaktadır. Başarılar dilerim! 🚀