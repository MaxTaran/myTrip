import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { SelectDirectionComponent } from './selectDirection/select-direction/select-direction.component';
import { SearchResultGuard } from './search-result/search-result.guard';
const routes: Routes = [
  { path: '', component: SelectDirectionComponent },
  { path: 'path', component: SearchResultComponent, canActivate: [SearchResultGuard], },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SearchResultGuard]
})
export class AppRoutingModule { }
