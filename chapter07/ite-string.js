'use strict';

var message = "A 𠮷 B";

for (let i=0; i < message.length; i++) {
    console.log(message[i]);
}

// A

// �
// �

// B


var message2 = "A 𠮷 B";

for (let c of message2) {
    console.log(c);
}

// A

// 𠮷

// B
