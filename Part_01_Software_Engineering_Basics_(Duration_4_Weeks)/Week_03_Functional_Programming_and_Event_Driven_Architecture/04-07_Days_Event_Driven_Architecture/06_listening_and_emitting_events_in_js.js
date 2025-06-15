//TODO Bölüm 6: JavaScript'te Olayları Dinleme ve Tetikleme (Genel Kavramlar)
//  - Olayları dinleme ve tetikleme mekanizmaları, JavaScript'in çalıştığı ortama (tarayıcı veya Node.js) göre farklılık gösterir, ancak temel prensipler benzerdir.

//? Olay Dinleme (Listening / Subscribing):
//  - Belirli bir olay türü için bir olay işleyici (callback fonksiyonu) kaydetmek.
//  - Tarayıcıda: element.addEventListener('eventName', handlerFn)
//  - Node.js'te: emitter.on('eventName', handlerFn) veya emitter.addListener('eventName', handlerFn)

//? Olay Tetikleme (Triggering / Emitting / Firing / Dispatching):
//  - Bir olayın meydana geldiğini sisteme bildirmek ve ilişkili dinleyicilerin çalıştırılmasını sağlamak.
//  - Tarayıcıda: element.dispatchEvent(new Event('eventName')) veya özel olaylar için new CustomEvent(...)
//  - Node.js'te: emitter.emit('eventName', arg1, arg2, ...)

//! Bu konunun detayları "DOM Olayları" ve "Node.js Event Loop" bölümlerinde daha ayrıntılı incelenecektir.
