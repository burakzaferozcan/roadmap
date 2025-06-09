//TODO Bölüm 6: Map, Filter, Reduce Operasyonları
//  - Bu üç fonksiyon, fonksiyonel programlamada diziler üzerinde işlem yapmanın temel taşlarıdır.
//  Hepsi yüksek dereceli fonksiyonlardır ve orijinal diziyi değiştirmezler,
//  bunun yerine yeni bir dizi (veya reduce için tek bir değer) döndürürler.

//! 1- map()

//? Amaç:
//  - Bir dizinin her bir elemanını alıp, verilen bir "dönüştürme" (transformation) fonksiyonundan geçirerek
//  sonuçlardan oluşan yeni bir dizi oluşturur.

//? Sözdizimi: dizi.map(callbackFn(eleman, index, array))
//  - callbackFn: Her eleman için çağrılacak fonksiyon.
//* 1- eleman: Dizideki mevcut eleman.
//* 2- index (isteğe bağlı): Mevcut elemanın indeksi.
//* 3- array (isteğe bağlı): map'in çağrıldığı orijinal dizi.
//  - callbackFn her eleman için bir değer döndürmelidir. Bu değer yeni diziye eklenir.

//? map() Örnekleri:
{
  const numbers = [1, 2, 3, 4, 5];

  // Her sayının karesini al
  const squares = numbers.map(function (number) {
    return number * number;
  });
  console.log(squares); // [1, 4, 9, 16, 25]
  console.log(numbers); // [1, 2, 3, 4, 5] (orijinal değişmedi)

  // Ok fonksiyonu ile daha kısa
  const doubled = numbers.map((number) => number * 2);
  console.log(doubled); // [2, 4, 6, 8, 10]

  const users = [
    { id: 1, name: "Ali", age: 30 },
    { id: 2, name: "Veli", age: 25 },
    { id: 3, name: "Ayşe", age: 35 },
  ];

  // Sadece kullanıcı adlarından oluşan yeni bir dizi oluştur
  const userNames = users.map((user) => user.name);
  console.log(userNames); // ["Ali", "Veli", "Ayşe"]

  // Her kullanıcıya bir "durum" özelliği ekleyerek yeni bir nesne dizisi oluştur
  const activeUsers = users.map((user) => {
    return { ...user, status: "aktif" }; // Değişmezlik!
  });
  console.log(activeUsers);
  // [
  //   { id: 1, name: 'Ali', age: 30, status: 'aktif' },
  //   { id: 2, name: 'Veli', age: 25, status: 'aktif' },
  //   { id: 3, name: 'Ayşe', age: 35, status: 'aktif' }
  // ]
}

//! 2- filter()

//? Amaç:
//  - Bir dizinin elemanları arasından, verilen bir "test" (predicate) fonksiyonunu sağlayan
//  (yani fonksiyon true döndüren) elemanlardan oluşan yeni bir dizi oluşturur.

//? Sözdizimi: dizi.filter(callbackFn(eleman, index, array))
//  - callbackFn: Her eleman için çağrılacak test fonksiyonu.
//* 1- true veya false döndürmelidir.
//* 2- true döndürürse eleman yeni diziye dahil edilir.

//? filter() Örnekleri:
{
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Sadece çift sayıları filtrele
  const evenNumbers = numbers.filter(function (number) {
    return number % 2 === 0;
  });
  console.log(evenNumbers); // [2, 4, 6, 8, 10]
  console.log(numbers); // Orijinal değişmedi

  // Ok fonksiyonu ile
  const largeNumbers = numbers.filter((number) => number > 5);
  console.log(largeNumbers); // [6, 7, 8, 9, 10]

  const products = [
    { name: "Laptop", price: 15000, category: "Elektronik" },
    { name: "Kitap", price: 100, category: "Kitap" },
    { name: "Klavye", price: 500, category: "Elektronik" },
    { name: "Kahve", price: 50, category: "Gıda" },
  ];

  // Sadece "Elektronik" kategorisindeki ürünleri filtrele
  const electronicProducts = products.filter(
    (product) => product.category === "Elektronik"
  );
  console.log(electronicProducts);
  // [
  //   { name: 'Laptop', price: 15000, category: 'Elektronik' },
  //   { name: 'Klavye', price: 500, category: 'Elektronik' }
  // ]

  // Fiyatı 200'den ucuz olan ürünler
  const cheapProducts = products.filter((product) => product.price < 200);
  console.log(cheapProducts);
}

//! 2- reduce()

//? Amaç:
//  - Bir dizinin elemanlarını (soldan sağa doğru) işleyerek tek bir sonuç değerine (akümülatör) indirger.
//  Çok yönlü bir fonksiyondur; toplama, çarpma, nesne oluşturma, dizi düzleştirme gibi birçok işlem için kullanılabilir.

//? Sözdizimi: dizi.reduce(callbackFn(akümülatör, mevcutEleman, mevcutIndeks, kaynakDizi), baslangicDegeri)
//  - callbackFn: Her eleman için çağrılacak fonksiyon.
//* 1- akümülatör (accumulator): Önceki iterasyondan dönen sonuç veya baslangicDegeri. Bir sonraki iterasyonda bu değer kullanılır.
//* 2- mevcutEleman (currentValue): Dizideki o an işlenen eleman.
//* 3- mevcutIndeks (currentIndex) (isteğe bağlı): O an işlenen elemanın indeksi.
//* 4- kaynakDizi (array) (isteğe bağlı): reduce'un çağrıldığı orijinal dizi.
//  - callbackFn her çağrıda akümülatörün yeni değerini döndürmelidir.
//  - baslangicDegeri (initialValue) (isteğe bağlı): Akümülatörün ilk değeridir.
//  Eğer verilmezse, dizinin ilk elemanı başlangıç değeri olarak kullanılır ve
//  callbackFn ikinci elemandan itibaren çalışmaya başlar.
//  Boş bir dizi üzerinde baslangicDegeri olmadan reduce çalıştırmak hata verir.

console.log(
  "****************************************************************************************************"
);

//? reduce() Örnekleri:
{
  const numbers = [1, 2, 3, 4, 5];

  // Tüm sayıların toplamını bul
  const sum = numbers.reduce(function (accumulator, number) {
    console.log(`Akümülatör: ${accumulator}, Sayı: ${number}`);
    return accumulator + number;
  }, 0); // Başlangıç değeri 0
  console.log("Toplam:", sum); // 15

  // Başlangıç değeri olmadan (dizinin ilk elemanı akümülatör olur)
  const product = numbers.reduce((acc, curr) => acc * curr); // 1*2*3*4*5
  console.log("Çarpım:", product); // 120

  const shoppingCart = [
    { name: "Elma", price: 5, quantity: 3 },
    { name: "Ekmek", price: 10, quantity: 1 },
    { name: "Süt", price: 20, quantity: 2 },
  ];

  // Sepetin toplam tutarını hesapla
  const totalAmount = shoppingCart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  console.log("Sepet Toplam Tutar:", totalAmount); // (5*3) + (10*1) + (20*2) = 15 + 10 + 40 = 65

  // Diziyi bir nesneye dönüştürme (ürün adına göre gruplama)
  const products = ["Elma", "Armut", "Elma", "Karpuz", "Armut", "Elma"];
  const productCounts = products.reduce((counter, productName) => {
    counter[productName] = (counter[productName] || 0) + 1; // Eğer ürün adı yoksa 0 ata, sonra 1 ekle
    return counter;
  }, {}); // Başlangıç değeri boş bir nesne
  console.log(productCounts); // { Elma: 3, Armut: 2, Karpuz: 1 }

  // `map` ve `filter`'ın `reduce` ile implementasyonu (anlamak için)
  const digits = [1, 2, 3, 4];
  // map ile: digits.map(x => x * 2)
  const mapped = digits.reduce((acc, curr) => {
    acc.push(curr * 2);
    return acc;
  }, []);
  console.log("Reduce ile map:", mapped); // [2, 4, 6, 8]

  // filter ile: digits.filter(x => x % 2 === 0)
  const filtered = digits.reduce((acc, curr) => {
    if (curr % 2 === 0) {
      acc.push(curr);
    }
    return acc;
  }, []);
  console.log("Reduce ile filter:", filtered); // [2, 4]
}

//! map, filter, reduce Kullanım İpuçları:

//* Zincirleme (Chaining):
//  Bu metotlar yeni diziler döndürdüğü için birbirine zincirlenebilir.
{
  const numbers = [1, 2, 3, 4, 5, 6];
  const result = numbers
    .filter((number) => number % 2 === 0) // [2, 4, 6]
    .map((number) => number * 10) // [20, 40, 60]
    .reduce((sum, number) => sum + number, 0); // 120
  console.log("Zincirleme Sonucu:", result);
}

//* Okunabilirlik:
//  Karmaşık işlemler için reduce yerine map ve filter kombinasyonları daha okunabilir olabilir.
//  reduce çok güçlüdür ama aşırı kullanımı kodu karmaşıklaştırabilir.
