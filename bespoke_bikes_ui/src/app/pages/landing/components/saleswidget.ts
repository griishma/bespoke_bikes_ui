import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../services/mockdataService';
import { FormsModule } from '@angular/forms';
import { SalesPerson } from '../../../../models/salesperson';
import { TableModule } from 'primeng/table';
import { Customer } from '../../../../models/customer';
import { Sale } from '../../../../models/sale';
import { Observable } from 'rxjs';

@Component({
    selector: 'sales-widget',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule
    ],
    template: `
      <div class="font-semibold text-xl mb-4">Sales History List</div>
   <p-table
                #dt1
                [value]="(allSaleList | async)?? []"
                dataKey="id"
                [rows]="10"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
                responsiveLayout="scroll"
            >
                <ng-template #header>
                    <tr>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Product Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Sales Person First Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Sales Person Last Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Customer First Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Customer Last Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Sale Date
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-sale>
                    <tr>
                        <td>
                            {{ sale.product.name }}
                        </td>
                        <td>
                            {{ sale.salesperson.firstName }}
                        </td>
                        <td>
                            {{ sale.salesperson.lastName }}
                        </td>
                        <td>
                            {{ sale.customer.firstName }}
                        </td>
                        <td>
                            {{ sale.customer.lastName }}
                        </td>
                        <td>
                            {{ sale.saleDate | date: 'MM/dd/yyyy' }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No sales found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Loading sales data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>`,
})
export class SalesWidget implements OnInit {
    allSaleList!: Observable<Sale[]>;

    constructor(private mockService: MockDataService) {
        this.allSaleList = mockService.getMockObservableSalesList();
    }

    ngOnInit(): void {
    }
}
