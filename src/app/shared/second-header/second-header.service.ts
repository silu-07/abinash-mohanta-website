import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HeaderData {
  customTitle: string | null;
  description: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SecondHeaderService {
  private headerData = new BehaviorSubject<HeaderData>({
    customTitle: null,
    description: null
  });

  headerData$ = this.headerData.asObservable();

  setHeaderData(title: string | null, description: string | null = null): void {
    this.headerData.next({ customTitle: title, description });
  }

  clearHeaderData(): void {
    this.headerData.next({ customTitle: null, description: null });
  }
}
