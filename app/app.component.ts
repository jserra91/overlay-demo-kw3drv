import {Overlay, OverlayOrigin, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {
  ComponentPortal,
  // This import is only used to define a generic type. The current TypeScript version incorrectly
  // considers such imports as unused (https://github.com/Microsoft/TypeScript/issues/14953)
  // tslint:disable-next-line:no-unused-variable
  Portal,
  TemplatePortalDirective
} from '@angular/cdk/portal';
import {
  Component,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class AppComponent { 
  nextPosition: number = 0;
  isMenuOpen: boolean = false;
  tortelliniFillings = ['cheese and spinach', 'mushroom and broccoli'];

  fusilliOverlayRef: OverlayRef;

  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;
  @ViewChild(OverlayOrigin) _overlayOrigin: OverlayOrigin;

  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef) { }

  openRotiniPanel() {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
        .global()
        .left(`${this.nextPosition}px`)
        .top(`${this.nextPosition}px`);

    this.nextPosition += 400;

    config.hasBackdrop = true;

    let overlayRef = this.overlay.create(config);

    // Remove overlay
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  
    // Attach overlay
    overlayRef.attach(new ComponentPortal(RotiniPanel, this.viewContainerRef));
  }

  closeFusilliPanel() {
    this.fusilliOverlayRef.dispose();
  }
}

/** Simple component to load into an overlay */
@Component({
  selector: 'rotini-panel',
  template: '<p class="demo-rotini">Loading....</p>'
})
export class RotiniPanel {}