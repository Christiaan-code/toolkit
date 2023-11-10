import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms';
import { ApiService } from './api.service';
import { tap, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private apiService: ApiService,
  ) {}

  data: string = ''
  title = 'util-project'
  decryptInput = new FormControl('')
  encryptInput = new FormControl('')
  oneWayEncryptInput = new FormControl('')
  oneWayEncryptOutput = new FormControl('')

  ngOnInit(): void {
    this.oneWayEncryptOutput.disable()
  }

  async decrypt() {
    const postData = {
      data: this.decryptInput.getRawValue()
    };

    firstValueFrom(this.apiService.post('/decrypt', postData).pipe(
      tap((decryptedValue: string) => this.encryptInput.setValue(decryptedValue))
    ))
  }

  encrypt() {
    const postData = {
      data: this.encryptInput.getRawValue()
    };

    firstValueFrom(this.apiService.post('/encrypt', postData).pipe(
      tap((encryptedValue: string) => this.decryptInput.setValue(encryptedValue))
    ))
  }

  oneWayEncrypt() {
    const postData = {
      data: this.oneWayEncryptInput.getRawValue()
    };

    firstValueFrom(this.apiService.post('/one-way-encrypt', postData).pipe(
      tap((encryptedValue: string) => this.oneWayEncryptOutput.setValue(encryptedValue))
    ))
  }
}
