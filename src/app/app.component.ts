import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { mockData } from './mock-data';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'filter-demo';

	form = this.fb.group({
		location: [''],
		practiceArea: [''],
		researchStatus: ['']
	})

	data$: Observable<any> = of(mockData);

	filteredData$ = this.form.valueChanges
		.pipe(
			startWith(this.form.value),
			switchMap(values => this.data$
				.pipe(
					map(data => data.filter((item: any) =>
					 (!values.location || item.location === values.location) &&
					 (!values.practiceArea || item.practiceArea === values.practiceArea) &&
					 (!values.researchStatus || item.researchStatus === values.researchStatus)
					))
				)
			)
		)

	locations$ = this.filteredData$
		.pipe(
			map((filteredData: any[]) => filteredData.map((item: any) => item.location)),
		 	map((locations: string[]) => [...new Set(locations)]),
			map((locations: string[]) => locations.sort())
		)

	practiceAreas$ = this.filteredData$
		.pipe(
			map((filteredData: any[]) => filteredData.map((item: any) => item.practiceArea)),
			map((practiceAreas: string[]) => [...new Set(practiceAreas)]),
			map((practiceAreas: string[]) => practiceAreas.sort())
		)

	researchStatuses$ = this.filteredData$
	.pipe(
		map((filteredData: any[]) => filteredData.map((item: any) => item.researchStatus)),
		map((researchStatuses: string[]) => [...new Set(researchStatuses)]),
		map((researchStatuses: string[]) => researchStatuses.sort())
	)

	constructor(private fb: FormBuilder) {}
}