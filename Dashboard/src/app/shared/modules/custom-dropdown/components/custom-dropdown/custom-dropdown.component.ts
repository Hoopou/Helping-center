import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";

@Component({
  selector: 'custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("custom drop" , this);
  }
  @ViewChild("ngSelect") ngSelect;

  @Input() editable: boolean;

  @Input() optiontext: string;
  @Input() placeholder: string = "";
  @Input() bindValue: any;
  @Input() items: any[] = [];

  @Input() searchable: boolean = true;
  @Input() clearable: boolean = true; 
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;
  @Input() model: any;

  @Output() modelChanged: EventEmitter<any> = new EventEmitter<any>();
  updateModel(e: any) {
    if (e) {
      this.modelChanged.emit(e);
    } else {
      this.modelChanged.emit(e);
    }
  }
}
