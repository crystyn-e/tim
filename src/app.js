document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Kue Bawang", img: "1.jpeg", price: 5000 },
      { id: 2, name: "Kacang Kribo", img: "1.jpeg", price: 5000 },
      { id: 3, name: "Kuping Gajah", img: "1.jpeg", price: 5000 },
      { id: 4, name: "2 pcs Kue Bawang", img: "1.jpeg", price: 9000 },
      { id: 5, name: "2 pcs Kacang Kribo", img: "1.jpeg", price: 9000 },
      { id: 6, name: "2 pcs Kuping Gajah", img: "1.jpeg", price: 9000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart kosong

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan sub total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang ingin di remove
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open(
    "https://wa.me/6285765151778?text=" + encodeURIComponent(message)
  );
});

// format pesan wa
const formatMessage = (obj) => {
  return `Data Customer
        Nama : ${obj.name}
        Email : ${obj.email}
        No HP : ${obj.phone}

        Data Pesanan 
        ${JSON.parse(obj.items).map(
          (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
        )}
       
       TOTAL: ${rupiah(obj.total)}
       Terima Kasih.`;
};

//konversi ke Rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// nyoba


