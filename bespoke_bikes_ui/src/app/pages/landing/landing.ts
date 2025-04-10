import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { BikeWidget } from './components/bikewidget';
import { ProductsWidget } from './components/productswidget';
import { SalesWidget } from './components/saleswidget';
import { SalesTeamWidget } from './components/salesteamwidget';
import { CustomerWidget } from "./components/customerwidget";

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, ProductsWidget, BikeWidget, SalesWidget, SalesTeamWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule, CustomerWidget],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
             <div id="home" class="landing-wrapper overflow-hidden">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
                <bike-widget />
                <products-widget/>
                <sales-team-widget/>
                <customer-widget/>
                <sales-widget />
            </div> 
        </div>
    `
})
export class Landing {}
