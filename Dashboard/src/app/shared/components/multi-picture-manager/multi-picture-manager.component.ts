import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-multi-picture-manager',
  templateUrl: './multi-picture-manager.component.html',
  styleUrls: ['./multi-picture-manager.component.scss']
})
export class MultiPictureManagerComponent implements OnInit {

  @Input() Max: number = 5;
  @Output() images: EventEmitter<ImageSnippet[]> = new EventEmitter();

  // Array with 1 null image creates an empty box allowing to select pictures.
  public pictureArray: ImageSnippet[] = [null];

  ngOnInit() {
  }

  constructor() { }

  getName(index: number) {
    return this.pictureArray[index] ? this.pictureArray[index].file.name : "Select image";
  }

  processFile(imageInput: any, index: number) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      if (file.size > environment.maxImageSize) { // 10 mb to bytes 
        alert("Image file is too big. Please chose an image smaller than 10mb.")
        return;
      }

      this.pictureArray[index] = new ImageSnippet(event.target.result, file);
      
      // Add a new picture only if editing the last one in the array
      // and if the max file number isn't reached yet.
      if (index === this.pictureArray.length - 1 && this.pictureArray.length < this.Max)
        this.pictureArray.push(null);
        this.outputImage();
    });

    reader.readAsDataURL(file);
  }

  // Emits all not null images in the picture array
  outputImage() {
    this.images.emit(this.pictureArray.filter((image) => image));
  }

  delete(index: number) {
    this.pictureArray.splice(index, 1);

    // Add empty box if max isnt reached and last box isnt empty
    if (this.pictureArray[this.pictureArray.length - 1] !== null && this.pictureArray.length < this.Max) {
      this.pictureArray.push(null);
    }
  }
}

export class ImageSnippet {
  constructor(public src: string, public file: File) { }
}