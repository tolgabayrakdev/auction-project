"use client"
import ProductCard from '@/components/discover/product-card';
import { Grid } from '@mantine/core';
import React from 'react';

// sayfa içerisinde gösterilecek maksimum ürün sayısı
const productsPerPage = 2;

const DiscoverPage = () => {
  // Örnek ürün verilerini burada alacağınızı varsayalım
  // Bu verileri gerçek uygulamanızda uygun şekilde almanız gerekecektir.
  const products = [
    { id: 1, name: 'Ürün 1', price: 19.99 },
    { id: 1, name: 'Ürün 1', price: 19.99 },
    { id: 1, name: 'Ürün 1', price: 19.99 }
  ];

  // Şu anki sayfa numarasını tutacak bir state değişkeni
  const [currentPage, setCurrentPage] = React.useState(1);

  // Toplam sayfa sayısını hesaplamak
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Şu anki sayfadaki ürünleri almak
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Sayfa numarasını değiştirmek için bir fonksiyon
  const changePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Discover Page</h1>
      <div className='overflow-y-auto pt-9 pr-3'>
        <Grid>
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </div>
      <div className='mt-4'>
        {/* Sayfaları döngü içinde oluşturuyoruz */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`mr-2 px-2 py-1 rounded text-xl ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default DiscoverPage;
