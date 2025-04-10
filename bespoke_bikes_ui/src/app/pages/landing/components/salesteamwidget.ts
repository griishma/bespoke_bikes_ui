import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalespersonService } from '../../../../services/salesPersonService';
import { FormsModule } from '@angular/forms';
import { SalesPerson } from '../../../../models/salesperson';
import { TableModule } from 'primeng/table';
@Component({
    selector: 'sales-team-widget',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule
    ],
    template: `
      <div class="font-semibold text-xl mb-4">Sales Team</div>
   <p-table
                #dt1
                [value]="salesPersonsList"
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
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Termination Date
                            </div>
                        </th>
                        <th style="min-width: 12rem">
                            <div class="flex justify-between items-center">
                                Manager
                            </div>
                        </th>
                    </tr>
                </ng-template>
                <ng-template #body let-salesperson>
                    <tr>
                        <td>
                            {{ salesperson.firstName }}
                        </td>
                        <td>
                            {{ salesperson.lastName }}
                        </td>
                        <td>
                            {{ salesperson.address }}
                        </td>
                        <td>
                            {{ salesperson.phone }}
                        </td>
                        <td>
                            {{ salesperson.startDate | date: 'MM/dd/yyyy' }}
                        </td>
                        <td>
                            {{ salesperson.terminationDate |  date: 'MM/dd/yyyy' }}
                        </td>
                        <td>
                            {{ salesperson.manager }}
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="8">No sales persons found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="8">Loading sales team data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>`,
})
export class SalesTeamWidget implements OnInit {
    salesPersonsList!: SalesPerson[];

    constructor(private salesPersonService: SalespersonService) {
    }

    ngOnInit(): void {
        this.salesPersonService.getSalespeople().subscribe(
            (data) => {
              this.salesPersonsList = data;
            },
            (error) => {
              console.error('Error fetching customers:', error); // Log any unexpected errors
            }
          );
    }
}
