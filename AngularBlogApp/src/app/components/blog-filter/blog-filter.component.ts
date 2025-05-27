import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';
import { TreeSelectModule } from 'primeng/treeselect';
import { setBothInputs, setOrderInput, setSearchInput } from 'src/app/store/blog-filter/blogFilter.actions';

@Component({
  selector: 'app-blog-filter',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, TreeSelectModule],
  templateUrl: './blog-filter.component.html',
  styleUrl: './blog-filter.component.scss'
})
export class BlogFilterComponent {
  constructor(private store: Store<{ blogFilter: { search: string, order: string } }>) { }

  nodes: any = [{
    key: 'asc',
    label: 'A - Z',
    icon: 'pi pi-sort-alpha-down',
  }, {
    key: 'desc',
    label: 'Z - A',
    icon: 'pi pi-sort-alpha-down-alt',
  }];

  filterForm = new FormGroup({
    searchInput: new FormControl(''),
    orderInput: new FormControl('')
  })
  onSubmit() {
    this.store.dispatch(setBothInputs({ search: this.filterForm.get('searchInput')?.value, order: this.filterForm.value.orderInput['key'] }))
  }
  clearFilters() {
    this.store.dispatch(setBothInputs({ search: '', order: '' }))
    this.filterForm.reset({
      searchInput: '',
      orderInput: ''
    })
  }
}
