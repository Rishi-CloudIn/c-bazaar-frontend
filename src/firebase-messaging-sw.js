importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyBv7JT-oHYBn1vVxVphQuZHDkUVtzopTXk",
  authDomain: "c-bazaar-22284.firebaseapp.com",
  projectId: "c-bazaar-22284",
  storageBucket: "c-bazaar-22284.appspot.com",
  messagingSenderId: "701512398022",
  appId: "1:701512398022:web:ae2fbc00d7dd46a27293c7",
  measurementId: "G-YYRG0JXKC3",
  vapidKey:
    "BAkUFFILYH5ec-xuW4T0nMKyiffnDC1seb_KBdkIprQbwWFL1_4IQq3GTSvKMG6a_Me2MgNhpwc_siu6mZ_Az08",
});
const messaging = firebase.messaging();
