import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { LookupFieldDto } from "../../../../../core/models/lookupFieldDto";
import { IList } from '../../../../../core/models/Settings/IList.model';

@Component({
  selector: "lookup-field",
  templateUrl: "./lookup-field.component.html",
  styleUrls: ["./lookup-field.component.scss"]
})
export class LookupFieldComponent implements OnInit {
  @ViewChild("ngSelect") ngSelect;

  @Input() source: Function;
  @Input() items: any[] = [];
  @Input() model: IList;
  @Input() label: string = ""; //used when nothing is shown ex: choose a <label>
  @Input() searchOnOpen: boolean = false;

  @Output() modelChanged: EventEmitter<IList> = new EventEmitter<IList>();

  onCooldown: boolean = false;
  term: string = "";

  constructor() {}

  ngOnInit() {}

  open() {
    if (this.searchOnOpen) {
      this.search('');
    }
  }

  // check if is on cooldown, if not then set on cooldown and set timeout to remove cooldown
  // when timeout execute check if the value has changed between the start of the timout and
  // the execution if it has, trigger another search
  checkTerm(e: any) {
    this.term = e.term;
    if (!this.onCooldown && e.term.length >= 2) {
      this.onCooldown = true;
      this.search(e.term);

      setTimeout(() => {
        this.onCooldown = false;
        if (this.term !== e.term)  {
          this.checkTerm(e);
        }
      }, 1000);
    }
  }

  search(term: string) {
    // since this function is recieved as an input, the return type is unknown so we must
    // use the [] notation to access properties;
    this.source(term).subscribe(data => {
      this.items = [data];
    });
  }

  updateModel(e: any) {
    if (e) {
      this.modelChanged.emit(e);
    } else {
      this.modelChanged.emit(e);
    }
  }
}
