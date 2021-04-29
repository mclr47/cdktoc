import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollComponent } from './comp/scroll/scroll.component';

const routes: Routes = [
  {path:'scroll',component:ScrollComponent},
  // {path:'bis', component:BisScrollComponent},
{path:'',redirectTo:'scroll', pathMatch:'prefix'},
{path:'**',redirectTo:'scroll', pathMatch:'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload",
      enableTracing: true,
      scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// 










