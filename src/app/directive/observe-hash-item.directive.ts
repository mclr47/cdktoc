import { Directive, OnInit, OnDestroy  } from '@angular/core';
import { ElementRef } from "@angular/core";
import {ObserveHashListDirective } from './observe-hash-list.directive';

@Directive({
  selector: '[appObserveHashItem]',
   exportAs: "intersection"
})
export class ObserveHashItemDirective implements OnInit, OnDestroy{

  // constructor() { }
  public isIntersecting: boolean;
	// These are just some human-friendly constants to make the HTML template a bit more
	// readable when being consumed as part of SWTCH/CASE statements.
	public IS_INTERSECTING: boolean = true;
	public IS_NOT_INTERSECTING: boolean = false;

	// private elementRef: ElementRef;
	// private parent: ObserveHashListDirective;

	// I initialize the intersection observer directive.
	constructor(
	private	parent: ObserveHashListDirective,
	private	elementRef: ElementRef,
//   private mapping: Map<Element, Function>,
//   private observer: IntersectionObserver
		) {

		this.parent = parent;
		this.elementRef = elementRef;
        // console.log(this.elementRef.nativeElement.id) 
		// By default, we're going to assume that the host element is NOT intersecting.
		// Then, we'll use the IntersectionObserver to asynchronously check for changes
		// in viewport visibility.
		this.isIntersecting = false;
        // console.log(this.elementRef.nativeElement.id);
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the host element is being destroyed.
	public ngOnDestroy() : void {

		this.parent.remove( this.elementRef.nativeElement );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// In this demo, instead of using an IntersectionObserver per Element, we're
		// going to use a shared observer in the parent element. However, we're still
		// going to use a CALLBACK style approach so that we're only reducing the number
		// of IntersectionObserver instances, not the number of Function calls.
		this.parent.add(
			this.elementRef.nativeElement,
			( isIntersecting: boolean ) => {

				this.isIntersecting = isIntersecting;

			}
		);

	}

// ***************************************************************************************
// PUBLIC METHODS.
	// ---

	// I add the given Element for intersection observation. When the intersection status
	// changes, the given callback is invoked with the new status.

	// public add( element: HTMLElement, callback: Function ) : void {

	// 	this.mapping.set( element, callback );
	// 	this.observer.observe( element );

	// }


	// I get called once when the host element is being destroyed.
	// public ngOnDestroy() : void {

	// 	this.mapping.clear();
	// 	this.observer.disconnect();

	// }


	// I remove the given Element from intersection observation.
	// public remove( element: HTMLElement ) : void {

	// 	this.mapping.delete( element );
	// 	this.observer.unobserve( element );

	// }


}
