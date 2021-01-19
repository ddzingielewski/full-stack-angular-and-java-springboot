import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map, tap } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8080/api/products';
  private categoryURL = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryURL).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchURL);
  }
  getProductListPaginate(thePage: number, thePageSize:number, theCategoryId: number): Observable<GetResponseProducts> {
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`
    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchURL);
  }
  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchURL);
  }

  searchProductsPaginate(thePage: number, thePageSize:number, theKeyword: string): Observable<GetResponseProducts> {
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyword}`
    + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchURL);
  }

  getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }
  getProduct(theProductId: number): Observable<Product> {
    const productURL = `${this.baseURL}/${theProductId}`;
    return this.httpClient.get<Product>(productURL);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

