import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: any;

  searchForm = new FormGroup({
    filmName: new FormControl(''),
  });
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchResult$.subscribe((result) => {
      this.searchResult = result;
    });
  }

  search() {
    const formData = this.searchForm.value;

    this.searchService.getSearchFilm(formData).subscribe((result) => {
      this.searchService.updateSearchResult(result);
    });
  }
}
