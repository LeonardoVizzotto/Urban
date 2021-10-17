import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';

let nextUniqueId = 0;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @ViewChild('inputRef', { static: true }) private elementRef: ElementRef;
  private uid = `app-input-${nextUniqueId++}`;
  private element: HTMLInputElement;
  public onChange: (() => void) | ((_: any) => void) = this.noopOnChange;
  public onTouched: () => void = this.noopOnChange;

  @Input() label: string;
  @Input() errorMessage: string;
  @Input() name: string = this.uid;
  @Input() type: string;

  get value(): string {
    return this._value || (this.element && this.element.value);
  }
  set value(value: string) {
    this._value = value;

    if (this.element) {
      this.element.value = value;
    }
  }
  private _value = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean | string) {
    this._required = Boolean(value);
  }
  private _required = false;

  @Input()
  get invalid(): boolean {
    return this.errorState || this._invalid;
  }
  set invalid(value: boolean) {
    this._invalid = Boolean(value);
  }
  private _invalid = false;

  get errorState() {
    return this.ngControl
      ? this.ngControl.touched && this.ngControl.invalid
      : false;
  }

  constructor(@Self() @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLInputElement;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  noopOnChange(): void {}
}
