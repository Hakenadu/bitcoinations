import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'btc-privacy',
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent implements OnInit {
  optedIn = new FormControl(null);

  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.updateOptOut();
    this.optedIn.valueChanges.subscribe(value => {
      // @ts-ignore
      if (value) {
        // @ts-ignore
        _paq.push(['forgetUserOptOut']);
      } else {
        // @ts-ignore
        _paq.push(['optUserOut']);
      }
    });
  }

  private updateOptOut(): void {
    const formControl = this.optedIn;
    const cdr = this.changeDetectorRef;
    // @ts-ignore
    _paq.push([function () {
      // @ts-ignore
      const userOptOut = !this.isUserOptedOut();
      formControl.setValue(userOptOut);
      cdr.detectChanges();
    }]);
  }

  get optOutCheckboxText(): string {
    if (!this.optedIn.value) {
      return 'You are currently opted out. Check this box to opt-in.';
    }
    return 'You are not opted out. Uncheck this box to opt-out.';
  }
}

