import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/productService';
import { SalespersonService } from '../../../../services/salesPersonService';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { SalesPerson } from '../../../../models/salesperson';
import { Customer } from '../../../../models/customer';
import { Sale } from '../../../../models/sale';

@Component({
  selector: 'products-widget',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    FluidModule,
    TextareaModule,
    FormsModule,
  ],
  template: ` <div id="products">
    <div class="grid grid-cols-12 gap-4 justify-center">
      <div class="col-span-12 text-center mt-20 mb-6">
        <div
          class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl"
        >
          Bespoke Bike Models
        </div>
        <span class="text-muted-color text-2xl"
          >Click on a model to place order..</span
        >
      </div>
      <div
        *ngFor="let product of allProducts"
        class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0"
      >
        <div
          class="col-span-2"
          (click)="openEditForm(product)"
          style="cursor: pointer; height: 100px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))"
        >
          <div
            class="p-4 bg-surface-0 dark:bg-surface-900 h-full"
            style="border-radius: 8px"
          >
            <h5 class="mb-2 text-surface-900 dark:text-surface-0">
              {{ product.name }}
            </h5>
            <span class="text-surface-600 dark:text-surface-200"
              >Manufactured by {{ product.manufacturer }}</span
            >
            <span class="text-surface-600 dark:text-surface-200"
              >Price {{ product.salePrice }}</span
            >
          </div>
        </div>
      </div>
      <!-- <div width="400px" >
                <h3>Fill the form and submit to Buy!</h3>
                <form (ngSubmit)="createSale()">
                    <label>Bike Model:{{selectedProduct?.name}} - {{selectedProduct?.id}}</label>
                    <label>Manufactured by - {{selectedProduct?.manufacturer}}</label><br>
                    <label>Price: {{selectedProduct?.salePrice}}</label>
                    <label>Choose sales person information</label>
                    <select [(ngModel)]="salesPersonsList" name="select">
                        <option *ngFor="let option of salesPersonsList" [value]="option">
                            {{ option.firstName }} - {{option.lastName}}
                        </option>
                    </select>
                    <input type="text" ngModel="customerInfo.firstName" name="Buyer first name" required /><br>
                    <input type="text" ngModel="customerInfo.lastName" name="Buyer last name" required /><br>
                    <input type="text" ngModel="customerInfo.address" name="Buyer Address" required /><br>
                    <input type="text" ngModel="customerInfo.phone" name="Buyer phone number" required /><br>

                    <button type="submit">Save</button>
                    <button type="button" (click)="closeDialog()">Cancel</button>
                </form>
            </div>          -->
    </div>

    <p-fluid>
      <div class="font-semibold text-xl">Purchase a Bike</div>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-l">Select Bike from above list</div>
            <div class="flex flex-col gap-2">
              <label
                >Bike Model selected: {{ selectedProduct?.name }} -
                {{ selectedProduct?.id }}</label
              >
            </div>
            <div class="flex flex-col gap-2">
              <label
                >Manufactured by : {{ selectedProduct?.manufacturer }}</label
              >
            </div>
            <div class="flex flex-col gap-2">
              <label>Price : {{ selectedProduct?.salePrice }}</label>
            </div>
          </div>

          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-l">Buyer</div>
            <div class="flex flex-wrap gap-6">
              <div class="flex flex-col grow basis-0 gap-2">
                <label for="custFName">Enter buyer first name</label>
                <input id="custFName" type="text" />
              </div>
              <div class="flex flex-col grow basis-0 gap-2">
                <label for="custLName">Enter buyer last name</label>
                <input
                  pInputText
                  id="custLName"
                  type="text"
                  class="custom-input"
                />
                <input
                  pInputText
                  id="custLName"
                  type="text"
                  class="border-2 border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <div class="card flex flex-col gap-4">
            <div class="font-semibold text-l">Sales Person</div>
            <div class="grid grid-cols-12 gap-4 grid-cols-12 gap-2">
              <div class="col-span-12 md:col-span-10">
                <p-select
                  id="state"
                  [(ngModel)]="salesPersonsList"
                  optionLabel="firstName"
                  placeholder="Select Sales Person Name"
                  class="w-full"
                ></p-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </p-fluid>
  </div>`,
})
export class ProductsWidget implements OnInit {
  allProducts: Product[] = [];
  selectedProduct!: Product | null;
  displaySaleCreationDialog: boolean = true;
  salesPersonsList!: SalesPerson[];
  selectedSalesPerson!: SalesPerson | null;
  customerInfo!: Customer | null;

  constructor(
    private productService: ProductService, private salesPersonService: SalespersonService
  ) {
    
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.allProducts = data; 
      },
      (error) => {
        console.error('Error fetching customers:', error); // Log any unexpected errors
      }
    );

    this.salesPersonService.getSalespeople().subscribe(
      (data) => {
        this.salesPersonsList = data;
      },
      (error) => {
        console.error('Error fetching customers:', error); // Log any unexpected errors
      }
    );
  }

  openEditForm(product: Product) {
    this.selectedProduct = { ...product };
    this.displaySaleCreationDialog = true;
  }

  // create a sale record
  createSale() {
    if (
      this.selectedProduct &&
      this.selectedSalesPerson &&
      this.customerInfo?.firstName &&
      this.customerInfo?.lastName
    ) {
      let sale: Sale = {
        product: { ...this.selectedProduct },
        customer: { ...this.customerInfo },
        salesperson: { ...this.selectedSalesPerson },
        saleDate: new Date(),
      };
      //make api call
      this.closeDialog();
    }
  }

  // Close the dialog without saving
  closeDialog() {
    this.displaySaleCreationDialog = false;
    this.selectedProduct = null;
    this.selectedSalesPerson = null;
    this.customerInfo = null;
  }
}
