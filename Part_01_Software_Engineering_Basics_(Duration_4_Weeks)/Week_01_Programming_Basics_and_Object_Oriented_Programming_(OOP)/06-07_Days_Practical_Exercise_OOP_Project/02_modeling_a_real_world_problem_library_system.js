//TODO Gerçek dünya problemi modelleme (Bir kütüphane sistemi)

console.log("--- Kütüphane Sistemi Modelleme Projesi ---");

// 1. Book Class
class Book {
  constructor(title, author, isbn) {
    if (!title || !author || !isbn) {
      throw new Error("Kitap bilgileri eksik olamaz (başlık, yazar, isbn).");
    }
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isBorrowed = false;
    this.borrowedByMember = null; // Hangi üyenin ödünç aldığını tutmak için
  }

  get status() {
    return this.isBorrowed
      ? `Ödünç Alındı (Üye: ${
          this.borrowedByMember ? this.borrowedByMember.name : "Bilinmiyor"
        })`
      : "Mevcut";
  }

  showInfo() {
    console.log(
      `  Başlık: ${this.title}, Yazar: ${this.author}, ISBN: ${this.isbn}, Durum: ${this.status}`
    );
  }

  borrow(member) {
    if (!this.isBorrowed) {
      this.isBorrowed = true;
      this.borrowedByMember = member;
      return true;
    }
    console.warn(
      `UYARI: "${this.title}" kitabı zaten ${this.borrowedByMember.name} tarafından ödünç alınmış.`
    );
    return false;
  }

  returnBook() {
    if (this.isBorrowed) {
      this.isBorrowed = false;
      this.borrowedByMember = null;
      return true;
    }
    console.warn(`UYARI: "${this.title}" kitabı zaten kütüphanede.`);
    return false;
  }
}

// 2. Member Class
class Member {
  static nextMemberId = 1; // Otomatik üye numarası için statik sayaç

  constructor(name) {
    if (!name) {
      throw new Error("Üye adı boş olamaz.");
    }
    this.name = name;
    this.memberId = `U${String(Member.nextMemberId++).padStart(3, "0")}`;
    this.borrowedBooks = []; // Kitap ISBN'lerini tutacak
  }

  borrowBook(book) {
    if (book instanceof Book && !this.borrowedBooks.includes(book.isbn)) {
      this.borrowedBooks.push(book.isbn);
    } else {
      console.warn(
        `UYARI: ${this.name}, "${book.title}" kitabını zaten ödünç almış veya geçersiz kitap.`
      );
    }
  }

  returnBook(book) {
    const index = this.borrowedBooks.indexOf(book.isbn);
    if (index > -1) {
      this.borrowedBooks.splice(index, 1);
    } else {
      console.warn(
        `UYARI: ${this.name}, "${book.title}" kitabını ödünç almamış.`
      );
    }
  }

  showInfo() {
    console.log(`  Üye Adı: ${this.name}, Üye No: ${this.memberId}`);
    console.log(`    Ödünç Aldığı Kitap Sayısı: ${this.borrowedBooks.length}`);
    if (this.borrowedBooks.length > 0) {
      console.log(
        `    Ödünç Kitap ISBN'leri: ${this.borrowedBooks.join(", ")}`
      );
    }
  }
}

// 3. Library Class
class Library {
  constructor(libraryName = "Şehir Kütüphanesi") {
    this.libraryName = libraryName;
    this.books = new Map(); // ISBN -> Book nesnesi
    this.members = new Map(); // memberId -> Member nesnesi
    console.log(`\n--- ${this.libraryName} Hizmete Açıldı! ---`);
  }

  addBook(book) {
    if (!(book instanceof Book)) {
      console.error("HATA: Kütüphaneye sadece Book nesneleri eklenebilir.");
      return;
    }
    if (this.books.has(book.isbn)) {
      console.warn(
        `UYARI: "${book.title}" (ISBN: ${book.isbn}) zaten kütüphanede mevcut.`
      );
    } else {
      this.books.set(book.isbn, book);
      console.log(`"${book.title}" kütüphaneye eklendi.`);
    }
  }

  addMember(member) {
    if (!(member instanceof Member)) {
      console.error("HATA: Kütüphaneye sadece Member nesneleri eklenebilir.");
      return;
    }
    if (this.members.has(member.memberId)) {
      console.warn(`UYARI: ${member.name} (No: ${member.memberId}) zaten üye.`);
    } else {
      this.members.set(member.memberId, member);
      console.log(`${member.name} kütüphaneye üye olarak eklendi.`);
    }
  }

  lendBook(isbn, memberId) {
    const book = this.books.get(isbn);
    const member = this.members.get(memberId);

    if (!book) {
      console.error(`HATA: ${isbn} ISBN'li kitap bulunamadı.`);
      return false;
    }
    if (!member) {
      console.error(`HATA: ${memberId} numaralı üye bulunamadı.`);
      return false;
    }

    if (book.borrow(member)) {
      // Kitap kendi durumunu günceller
      member.borrowBook(book); // Üye kendi listesini günceller
      console.log(
        `BAŞARILI: "${book.title}" kitabı ${member.name} adlı üyeye ödünç verildi.`
      );
      return true;
    }
    return false;
  }

  acceptReturn(isbn, memberId) {
    const book = this.books.get(isbn);
    const member = this.members.get(memberId);

    if (!book) {
      console.error(`HATA: ${isbn} ISBN'li kitap bulunamadı.`);
      return false;
    }
    if (!member) {
      console.error(`HATA: ${memberId} numaralı üye bulunamadı.`);
      return false;
    }
    if (book.borrowedByMember !== member) {
      console.error(
        `HATA: "${book.title}" kitabı ${
          member.name
        } tarafından ödünç alınmamış. Kitabı alan: ${
          book.borrowedByMember ? book.borrowedByMember.name : "Bilinmiyor"
        }`
      );
      return false;
    }

    if (book.returnBook()) {
      // Kitap kendi durumunu günceller
      member.returnBook(book); // Üye kendi listesini günceller
      console.log(
        `BAŞARILI: "${book.title}" kitabı ${member.name} adlı üyeden iade alındı.`
      );
      return true;
    }
    return false;
  }

  showAllBooks() {
    console.log(`\n--- ${this.libraryName} - KİTAP ENVANTERİ ---`);
    if (this.books.size === 0) {
      console.log("Kütüphanede hiç kitap bulunmuyor.");
      return;
    }
    this.books.forEach((book) => book.showInfo());
  }

  showAllMembers() {
    console.log(`\n--- ${this.libraryName} - ÜYE LİSTESİ ---`);
    if (this.members.size === 0) {
      console.log("Kütüphanede hiç üye bulunmuyor.");
      return;
    }
    this.members.forEach((member) => member.showInfo());
  }
}

// --- Sistemi Kullanma ---
const centralLibrary = new Library("Merkez Halk Kütüphanesi");

// Kitapları oluştur ve ekle
const book1 = new Book("Sefiller", "Victor Hugo", "ISBN001");
const book2 = new Book("Suç ve Ceza", "Dostoyevski", "ISBN002");
const book3 = new Book("Yüzyıllık Yalnızlık", "G. G. Marquez", "ISBN003");
centralLibrary.addBook(book1);
centralLibrary.addBook(book2);
centralLibrary.addBook(book3);
centralLibrary.addBook(new Book("Sefiller", "Victor Hugo", "ISBN001")); // Tekrar ekleme denemesi

// Üyeleri oluştur ve ekle
const member1 = new Member("Ali Veli");
const member2 = new Member("Ayşe Yılmaz");
centralLibrary.addMember(member1);
centralLibrary.addMember(member2);

centralLibrary.showAllBooks();
centralLibrary.showAllMembers();

console.log("\n--- Ödünç Verme İşlemleri ---");
centralLibrary.lendBook("ISBN001", member1.memberId); // Sefiller'i Ali'ye ver
centralLibrary.lendBook("ISBN002", member1.memberId); // Suç ve Ceza'yı Ali'ye ver
centralLibrary.lendBook("ISBN001", member2.memberId); // Sefiller'i Ayşe'ye vermeye çalış (zaten Ali'de)
centralLibrary.lendBook("ISBN004", member1.memberId); // Olmayan kitabı vermeye çalış

console.log("\n--- Durum Kontrolü (Ödünç Verme Sonrası) ---");
centralLibrary.showAllBooks();
centralLibrary.showAllMembers();

console.log("\n--- İade Alma İşlemleri ---");
centralLibrary.acceptReturn("ISBN001", member1.memberId); // Ali Sefiller'i iade etsin
centralLibrary.acceptReturn("ISBN002", member2.memberId); // Ayşe Suç ve Ceza'yı iade etmeye çalışsın (Ayşe almamıştı)
centralLibrary.acceptReturn("ISBN003", member1.memberId); // Ali Yüzyıllık Yalnızlık'ı iade etmeye çalışsın (Ali almamıştı)

console.log("\n--- Durum Kontrolü (İade Sonrası) ---");
centralLibrary.showAllBooks();
centralLibrary.showAllMembers();
