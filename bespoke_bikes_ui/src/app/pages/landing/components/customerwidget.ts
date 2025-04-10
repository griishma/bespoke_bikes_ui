import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../services/mockdataService';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../../services/customerService';
import { TableModule } from 'primeng/table';
import { Customer } from '../../../../models/customer';
@Component({
    selector: 'customer-widget',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule
    ],
    template: `
      <div class="font-semibold text-xl mb-4">Customers List</div>
   <p-table
                #dt1
                [value]="customersList"
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
                                First Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Last Name
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Address
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Phone
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Start Date
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-cust>
                    <tr>
                        <td>
                            {{ cust.firstName }}
                        </td>
                        <td>
                            {{ cust.lastName }}
                        </td>
                        <td>
                            {{ cust.address }}
                        </td>
                        <td>
                            {{ cust.phone }}
                        </td>
                        <td>
                            {{ cust.startDate | date: 'MM/dd/yyyy' }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No customers found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Loading customers data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>`,
})
export class CustomerWidget implements OnInit {
    customersList!: Customer[];

    constructor(private customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.customerService.getCustomers().subscribe(
            (data) => {
              this.customersList = data;
            },
            (error) => {
              console.error('Error fetching customers:', error); // Log any unexpected errors
            }
          );
    }
}
