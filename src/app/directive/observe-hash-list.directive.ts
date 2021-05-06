import { element } from 'protractor';
import { Directive , OnDestroy, Output, EventEmitter} from '@angular/core';
import { ElementRef } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import {Router,ActivatedRoute} from '@angular/router';


@Directive({
  selector: '[appObserveHashList]'
})
export class ObserveHashListDirective implements OnDestroy {
//************************************************************
 numSteps = 20.0;

// @Output() currentHash = new EventEmitter<string>(); 
@Output() currentHash = new EventEmitter(); 

prevRatio = 0.0;
increasingColor = "rgba(40, 40, 190, ratio)";
decreasingColor = "rgba(190, 40, 40, ratio)";
//************************************************************

  // private htmlElement :HTMLElement; 
  private mapping: Map<Element, Function>;
	private observer: IntersectionObserver;
  constructor(
    // private mapping: Map<Element, Function>,
    // private observer: IntersectionObserver
    // private router:Router,
    // private activatedRoute:ActivatedRoute
    
  ) { 
  // this.htmlElement = new HTMLElement;
  
  this.mapping = new Map();

  this.observer = new IntersectionObserver(
    ( entries: IntersectionObserverEntry[] ) => {

      // for ( var entry of entries ) {
       entries.forEach(entry =>{
        // var callback = this.mapping.get( entry.target );

        // ( callback && callback( entry.isIntersecting ) );
          

          // ***************************************
    

      //     // 
      // console.log(entry.target.id +" " +"y value " +entry.boundingClientRect.y.valueOf())
      // console.log(entry.intersectionRatio)
      // console.log(entry.intersectionRect)
      // console.log(entry.rootBounds)
      // console.log(entry.time);
          //******************************** */ 
        
    //************************* */ 
    // https://github.com/w3c/IntersectionObserver/issues/124
    // pxwee5 commented on Mar 24, 2019 •
   
    // if (entry.isIntersecting) {
    //   if (
    //     entry.rootBounds.height < entry.boundingClientRect.height ||
    //     entry.intersectionRatio == 1
    //   ) {
    //     this.renderImage();
    //   }
    // }
   
    // *********************** 
  //  console.log(entry.rootBounds)
   console.log(window.innerHeight);
    if(entry.isIntersecting )
     {      console.log(entry.target.id + "**Client"+entry.boundingClientRect.y
     +"**y*"+entry.intersectionRect.y+"**top*"+entry.boundingClientRect.top
     +"**bottom*"+entry.boundingClientRect.bottom+ "%%%%%"+ entry.intersectionRatio);
      //  (
        //  (entry.boundingClientRect.top < window.innerHeight/2 &&
        //   entry.boundingClientRect.bottom >= window.innerHeight/2 ) 
         if (entry.boundingClientRect.top <= entry.rootBounds.height / 2 &&
            entry.boundingClientRect.bottom >=  entry.rootBounds.height /2) 
        
      {
       
  (entry.target as HTMLElement)
    .style.backgroundColor = 
     this.increasingColor.replace("ratio", entry.intersectionRatio.toString());
   
    // const currentHash  = entry.target.id.toString();
    // console.log(this.router.getCurrentNavigation().extras.fragment)
    // this.activatedRoute.fragment.subscribe({
    //   next(currentHash) {
    //     console.log('Current Position: ', entry.target.id.toString());
        
    //   },
    //   error(msg) {
    //     console.log('Error Getting Location Hash: ', msg);
    //   },
    //   complete()
    //             { console.log('Finished hash submission '); }
    // });
    // this.router.navigate(['./scroll'],{fragment: entry.target.id.toString()});
    this.currentHash.emit((entry.target as HTMLElement).id)
    }
    else if (entry.boundingClientRect.top >entry.rootBounds.height / 2 ||
      entry.boundingClientRect.bottom < entry.rootBounds.height /2 )
     {
      (entry.target as HTMLElement)
      .style.backgroundColor = "orange";
      console.log(entry.target.id + "**Client"+entry.boundingClientRect.y
        +"**y*"+entry.intersectionRect.y+"**top*"+entry.boundingClientRect.top
        +"**bottom*"+entry.boundingClientRect.bottom +"%%%%%"+ entry.intersectionRatio);

    }
    
            }

    //************************** */  
          this.prevRatio = entry.intersectionRatio;
      });

    },
    {
      // This classifies the "intersection" as being a bit outside the
      // viewport. The intent here is give the elements a little time to react
      // to the change before the element is actually visible to the user.
      // margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left) **The values can be percentages. 
      //  rootMargin: "300px 0px 300px 0px",....Defaults to all zeros.
      rootMargin:"0%",
      // root: document.querySelector('#scrollArea'),
      // threshold: 1.0,
      // threshold:[0, 0.25, 0.5, 0.75, 1]
      // threshold:[ 1]
      //  threshold:[0.3, 0.6]
      // threshold:1
      // threshold: 0.0
       threshold: this.buildThresholdList()
    }
  );

}
// *** above ****https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// ---
// PUBLIC METHODS.
// ---

// I add the given Element for intersection observation. When the intersection status
// changes, the given callback is invoked with the new status.
public add( element: HTMLElement, callback: Function ) : void {

  this.mapping.set( element, callback );
  this.observer.observe( element );
  // this.htmlElement.setAttribute

}
// ************************************
// ************************************
// 
 buildThresholdList() {
  let thresholds = [];
  let numSteps = 100;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}
// 
 handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio >this.prevRatio) {
      entry.target.style.backgroundColor = this.increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = this.decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    this.prevRatio = entry.intersectionRatio;
  });
}
// 
isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// &&&&
// if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) {
//  if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight))
// &&&&
// 
// ************************************
// ************************************
// I get called once when the host element is being destroyed.
public ngOnDestroy() : void {

  this.mapping.clear();
  this.observer.disconnect();
  // this.observer.unobserve(entry);

}


// I remove the given Element from intersection observation.
public remove( element: HTMLElement ) : void {

  this.mapping.delete( element );
  this.observer.unobserve( element );

}



}




