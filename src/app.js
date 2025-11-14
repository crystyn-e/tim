 document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
            items: [
                {id:1, name:'Kue Bawang', img:'1.jpeg', price:5000},
                {id:2, name:'Kacang Kribo', img:'1.jpeg', price:5000},
                {id:3, name:'Kuping Gajah', img:'1.jpeg', price:5000},
                {id:4, name:'2 pcs Kue Bawang', img:'1.jpeg', price:9000},
                {id:5, name:'2 pcs Kacang Kribo', img:'1.jpeg', price:9000},
                {id:6, name:'2 pcs Kuping Gajah', img:'1.jpeg', price:9000},
 
            ],
        }));

         Alpine.store('cart', {
            items:[],
            total :0,
            quantity: 0,
            add(newItem){
                // cek barang yang sama
                const cartItem = this.items.find((item) => item.id === newItem.id);

                // jika belum ada / cart kosong

                if(!cartItem){
                    this.items.push({...newItem, quantity: 1, total: newItem.price});
                    this.quantity++;
                    this.total += newItem.price;
                }else{
                    // jika barang sudah ada, cek apakah barang beda atau sama
                    this.items = this.items.map((item) => {
                        // jika barang beda
                        if(item.id !== newItem.id){
                            return item;
                        }else{
                            // jika barang sudah ada, tambah quantity dan sub total
                            item.quantity++;
                            item.total = item.price * item.quantity;
                            this.quantity++;
                            this.total += item.price;
                            return item;
                        }
                    })
                }

            },
         });
    });

   

    //konversi ke Rupiah

    const rupiah = (number) => {
        return new Intl.NumberFormat('id-ID',{
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits:0
        }).format(number);
    };