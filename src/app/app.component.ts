import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true, // Marking the component as standalone
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  sortBy: string = '';
  filterTerm: string = '';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    fetch('https://fakestoreapi.com/products') // A public API for products
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.filteredProducts = data; // Initially display all products
      });
  }

  onSortChange(event: any) {  //detecting any change in value of input to display new product
    this.sortBy = event.target.value;
    this.sortProducts();
  }

  sortProducts() { // sort the products by price
    if (this.sortBy === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  onFilterChange(event: any) {  // filtering the product by name to display
    this.filterTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.filterTerm)
    );
  }
}
