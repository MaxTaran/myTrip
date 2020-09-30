import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { SelectDirectionComponent } from './selectDirection/select-direction/select-direction.component';

const routes: Routes = [
  { path: '', component: SelectDirectionComponent },
  { path: 'path', component: SearchResultComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
