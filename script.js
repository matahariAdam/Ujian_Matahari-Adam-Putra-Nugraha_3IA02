document.addEventListener('DOMContentLoaded', function () {
    // Mendapatkan tabel dan form
    const storeTable = document.getElementById('storeList');
    const storeForm = document.querySelector('form');

    // Mendengarkan acara pengiriman formulir
    storeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mendapatkan nilai input dari formulir
        const productCode = document.getElementById('productCode').value;
        const product = document.getElementById('product').value;
        const qty = document.getElementById('qty').value;
        const perPrice = document.getElementById('perPrice').value;

        // Memeriksa apakah produk sudah ada di local storage
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

        const existingProductIndex = existingProducts.findIndex(p => p.productCode === productCode);

        if (existingProductIndex !== -1) {
            // Jika produk sudah ada, perbarui data
            existingProducts[existingProductIndex] = {
                productCode,
                product,
                qty,
                perPrice
            };
        } else {
            // Jika produk belum ada, tambahkan produk baru
            existingProducts.push({
                productCode,
                product,
                qty,
                perPrice
            });
        }

        // Simpan data ke local storage
        localStorage.setItem('products', JSON.stringify(existingProducts));

        // Reset formulir
        storeForm.reset();

        // Tampilkan data di tabel
        displayProducts();
    });

    // Menampilkan data di tabel saat halaman dimuat
    displayProducts();

    // Fungsi untuk menampilkan data di tabel
    function displayProducts() {
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

        // Mengosongkan tabel
        storeTable.querySelector('tbody').innerHTML = '';

        // Menambahkan data ke tabel
        existingProducts.forEach(product => {
            const row = storeTable.querySelector('tbody').insertRow();
            row.innerHTML = `
                <td>${product.productCode}</td>
                <td>${product.product}</td>
                <td>${product.qty}</td>
                <td>${product.perPrice}</td>
            `;

            // Tambahkan tombol untuk mengedit dan menghapus
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function () {
                editProduct(product.productCode);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                deleteProduct(product.productCode);
            });

            const cell = row.insertCell();
            cell.appendChild(editButton);
            cell.appendChild(deleteButton);
        });
    }

    // Fungsi untuk mengedit produk
    function editProduct(productCode) {
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        const productToEdit = existingProducts.find(p => p.productCode === productCode);

        if (productToEdit) {
            // Isi formulir dengan data produk yang akan diedit
            document.getElementById('productCode').value = productToEdit.productCode;
            document.getElementById('product').value = productToEdit.product;
            document.getElementById('qty').value = productToEdit.qty;
            document.getElementById('perPrice').value = productToEdit.perPrice;

            // Hapus produk dari local storage
            existingProducts.splice(existingProducts.indexOf(productToEdit), 1);
            localStorage.setItem('products', JSON.stringify(existingProducts));

            // Tampilkan data di tabel setelah mengedit
            displayProducts();
        }
    }

    // Fungsi untuk menghapus produk
    function deleteProduct(productCode) {
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        const productToDelete = existingProducts.find(p => p.productCode === productCode);

        if (productToDelete) {
            // Hapus produk dari local storage
            existingProducts.splice(existingProducts.indexOf(productToDelete), 1);
            localStorage.setItem('products', JSON.stringify(existingProducts));

            // Tampilkan data di tabel setelah menghapus
            displayProducts();
        }
    }
});