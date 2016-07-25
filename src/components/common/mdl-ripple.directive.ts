import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChange,
  Renderer,
  OnInit
} from '@angular/core';
import { MaterialRipple } from './ripple.vendor';

// TODO change to @Component with a template to create the dom structure for ripple effects

export class MdlRippleDirective implements OnChanges {

  private RIPPLE = 'mdl-ripple';

  private rippleContainer: HTMLElement;
  protected el: HTMLElement;
  private ripple: any;

  @Input('mdl-ripple') private rippleActive: boolean | string = true;

  constructor(private elementRef: ElementRef, protected renderer: Renderer, private cssContainerClasses: [string]) {
    this.el = elementRef.nativeElement;
  }


  public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

      // remove any existing ripple container
      if (this.rippleContainer) {
        this.el.removeChild(this.rippleContainer);
        delete this.rippleContainer;
        delete this.ripple;
      }

      // FIXME is MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events' needed on thi.el?

      // if used as mdl-ripple without property binding it is an empty string
      // otherwise (e.g. [mdl-ripple] it is a boolean - may be with the default value true.
      if (this.rippleActive === '' || this.rippleActive) {
        this.rippleContainer = this.renderer.createElement(this.el, 'span');
        this.cssContainerClasses.forEach( ( cssClass ) => {
          this.renderer.setElementClass(this.rippleContainer, cssClass, true);
        });
        var rippleElement = this.renderer.createElement(this.rippleContainer, 'span');
        this.renderer.setElementClass(rippleElement, this.RIPPLE, true);
        // ?? rippleElement.addEventListener('mouseup', ()=>rippleElement.blur());
        this.ripple = new MaterialRipple(this.rippleContainer);

      }
  }

}

@Directive({
  selector: 'mdl-button[mdl-ripple]'
})
export class MdlButtonRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-button__ripple-container']);
  }

}

@Directive({
  selector: 'mdl-checkbox[mdl-ripple]'
})
export class MdlCheckboxRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-checkbox__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-radio[mdl-ripple]'
})
export class MdlRadioRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-radio__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-icon-toggle[mdl-ripple]'
})
export class MdlIconToggleRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-icon-toggle__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-switch[mdl-ripple]'
})
export class MdlSwitchRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-switch__ripple-container', 'mdl-ripple--center']);
  }

}

@Directive({
  selector: 'mdl-menu-item[mdl-ripple]'
})
export class MdlMenuItemRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-menu__item--ripple-container']);
  }

}

@Directive({
  selector: 'a[mdl-ripple]'
})
export class MdlAnchorRippleDirective extends MdlRippleDirective {

  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer, ['mdl-tabs__ripple-container', 'mdl-layout__tab-ripple-container']);
  }

}

@Directive({
  selector: 'mdl-list-item[mdl-ripple]',
})
export class MdlListItemRippleDirective extends MdlRippleDirective implements OnInit {

  constructor(elementRef: ElementRef, renderer: Renderer) {;
    // mdl-button__ripple-container
    super(elementRef, renderer, ['mdl-button__ripple-container']);
  }

  public ngOnInit() {
    // mdl-list-items has no position style - but position relative
    // is needed to restrict the ripplecontainer to the bounds of the item
    this.renderer.setElementStyle(this.el, 'position', 'relative');
  }

}

export const MDL_COMMON_DIRECTIVES = [
  MdlCheckboxRippleDirective,
  MdlButtonRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective,
  MdlAnchorRippleDirective,
  MdlListItemRippleDirective
];
