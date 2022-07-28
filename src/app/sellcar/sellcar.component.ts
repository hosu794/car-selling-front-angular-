import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarOfferRequest } from '../car-offer.model';
import { CarOfferService } from '../car-offer.service';

@Component({
  selector: 'myPrefix-sellcar',
  templateUrl: './sellcar.component.html',
  styleUrls: ['./sellcar.component.css']
})
export class SellcarComponent implements OnInit {

  offerCreateForm: FormGroup;
  loading: boolean = false;
  submitted = false;
  // returnUrl: string;
  error: string | null = null;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private carService: CarOfferService) {

    this.offerCreateForm = this.formBuilder.group({
      type: ['', Validators.required],
      from: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      generation: [0, Validators.required],
      mileage: [0, Validators.required],
      capacity: ['', Validators.required],
      fuel: ['', Validators.required],
      power: ['', Validators.required],
      transmission: [0, Validators.required],
      drive: [0, Validators.required],
      vin: ['', Validators.required],
      bodyType: ['', Validators.required],
      doorCount: [0, Validators.required],
      color: ['', Validators.required],
      colorType: ['', Validators.required],
      country: ['', Validators.required],
      vat: ['', Validators.required],
      firstRegistration: ['', Validators.required],
      notCrashed: [0, Validators.required],
      conditionalCar: [0, Validators.required],
      leasing: [0, Validators.required],
      // images: [null, Validators.required]
    })



  }

  get f() { return this.offerCreateForm.controls; }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      console.log(file);
      // this.uploadService.upload(file).subscribe(
      //   (event: any) => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
      //     } else if (event instanceof HttpResponse) {
      //       const msg = 'Uploaded the file successfully: ' + file.name;
      //       this.message.push(msg);
      //       this.imageInfos = this.uploadService.getFiles();
      //     }
      //   },
      //   (err: any) => {
      //     this.progressInfos[idx].value = 0;
      //     const msg = 'Could not upload the file: ' + file.name;
      //     this.message.push(msg);
      //   });
    }
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }

  }

  onSubmit() {
    this.submitted = true;

    if (this.offerCreateForm.invalid) return;

    this.loading = true;

    const newOffer: CarOfferRequest = {
      from: this.offerCreateForm.value.from,
      type: this.offerCreateForm.value.type,
      bodytype: this.offerCreateForm.value.bodyType,
      brand: this.offerCreateForm.value.brand,
      model: this.offerCreateForm.value.model,
      generation: this.offerCreateForm.value.generation,
      mileage: this.offerCreateForm.value.mileage,
      capacity: this.offerCreateForm.value.capacity,
      fuel: this.offerCreateForm.value.fuel,
      power: this.offerCreateForm.value.power,
      transmission: this.offerCreateForm.value.transmission,
      drive: this.offerCreateForm.value.drive,
      vin: this.offerCreateForm.value.vin,
      doorcount: this.offerCreateForm.value.doorCount,
      color: this.offerCreateForm.value.color,
      colortype: this.offerCreateForm.value.colorType,
      country: this.offerCreateForm.value.country,
      vat: this.offerCreateForm.value.vat,
      firstRegistration: this.offerCreateForm.value.firstRegistration,
      notcrashed: parseInt(this.offerCreateForm.value.notCrashed),
      conditioncar: parseInt(this.offerCreateForm.value.conditionalCar),
      leasing: parseInt(this.offerCreateForm.value.leasing)
    }

    this.carService.createOffer(newOffer).subscribe(response => {
      console.log(response);
    })

  }


  ngOnInit(): void {
  }

}
