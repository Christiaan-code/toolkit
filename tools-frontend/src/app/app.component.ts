import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ApiService } from './api.service'
import { tap, firstValueFrom } from 'rxjs'

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
  RSAIDOutput = new FormControl('')
  RSAIDValidAge = new FormControl(true)

  ngOnInit(): void {
    this.oneWayEncryptOutput.disable()
    this.RSAIDOutput.disable()
  }

  async decrypt() {
    const postData = {
      data: this.decryptInput.getRawValue()
    }

    firstValueFrom(this.apiService.post('/decrypt', postData).pipe(
      tap((decryptedValue: string) => this.encryptInput.setValue(decryptedValue))
    ))
  }

  encrypt() {
    const postData = {
      data: this.encryptInput.getRawValue()
    }

    firstValueFrom(this.apiService.post('/encrypt', postData).pipe(
      tap((encryptedValue: string) => this.decryptInput.setValue(encryptedValue))
    ))
  }

  oneWayEncrypt() {
    const postData = {
      data: this.oneWayEncryptInput.getRawValue()
    }

    firstValueFrom(this.apiService.post('/one-way-encrypt', postData).pipe(
      tap((encryptedValue: string) => this.oneWayEncryptOutput.setValue(encryptedValue))
    ))
  }

  generateRSAID() {
    let age: number
    if (this.RSAIDValidAge.getRawValue()){
      age = Math.floor(Math.random() * 63) + 18
    } else {
      age = Math.floor(Math.random() * 100)
    }
    const year: number = new Date().getFullYear() - age
    const month: number = Math.floor(Math.random() * 12) + 1
    const daysInMonth: number = new Date(year, month + 1, 0).getDate()
    const day: number = Math.floor(Math.random() * daysInMonth) + 1
    const birthDate: string = year.toString().slice(-2) + month.toString().padStart(2, '0') + day.toString().padStart(2, '0')

    const ssssNumber: string = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const a: number = Math.floor(Math.random() * 10)
    let idNumber: string = birthDate + ssssNumber + '0' + a

    idNumber = idNumber + this.performLuhnsAlgorithm(idNumber).toString()
    this.RSAIDOutput.setValue(idNumber)
    navigator.clipboard.writeText(idNumber)
  }

  performLuhnsAlgorithm(number: string): number {
    const reversed = number.split('').reverse().map(Number)
    let sum = 0

    for (let i = 0; i < reversed.length; i++) {
      let digit = reversed[i]
      if (i % 2 === 0) {
        digit *= 2

        if (digit > 9) {
          digit -= 9
        }
      }
      sum += digit
    }

    const result = 10 - (sum % 10)
    return result === 10 ? 0 : result
  }
}
