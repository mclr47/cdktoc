
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 
import { ActivatedRoute,Router , NavigationEnd, Scroll} from '@angular/router';
import { Component, OnInit , ChangeDetectionStrategy,ChangeDetectorRef,
  ElementRef, ViewChild, HostListener, AfterViewInit,ViewEncapsulation
 } from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY,VirtualScrollStrategy, 
  ScrollDispatcher, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {  Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Location, LocationStrategy, PathLocationStrategy, PlatformLocation,
 } from '@angular/common';
import { filter, map} from 'rxjs/operators'; 
import {fromEvent} from 'rxjs';

 

export interface HashExist {
  hashVisible?: boolean;
  hashName?: string;
}



@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    // {provide: VIRTUAL_SCROLL_STRATEGY,useClass:ScrollDispatcher},
    Location,
     {provide: LocationStrategy, useClass: PathLocationStrategy}],
    //  ViewEncapsulation.ShadowDom
    //  ViewEncapsulation.Emulated 
    //  ViewEncapsulation.None
     
   
})
export class ScrollComponent implements OnInit , AfterViewInit{
  
  items = Array.from({length: 11}).map((_, i) => `Item #${i}`);
 
  hashIntersectionObserver:Observable<string>;
  scrollToPage = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk'] ;
  activeScrollIndex:Observable<number>;
  activatedRouteFragment = this.activatedRoute.fragment;
  activeFragmentSnapShot;
  // windowLocation;
  indexFocus;
  activeFragment$: BehaviorSubject<string> = new BehaviorSubject(window.location.hash.valueOf());
  spyHash: HashExist= { hashVisible: false};   
  spyHashCurrent: HashExist;
  currentElement: string; 
  idexToc;
  indexOfCurrentHash;
  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport; 
 
  // ************* another way of testing scrolling :
  @HostListener('window:scroll',['$event']) onScrollEvent($event){
    // window.onhashchange = this.locationHashChanged;
    // console.log("Scrolling the window ~~~~~~~~~~~~~~~~~~~~~")
  }
  // @HostListener('window: resize',['event'])
  //   onResize(event){
  //     // console.log(event.details);
  //   }
  constructor(
    private renderer: Renderer2, 
    @Inject(PLATFORM_ID) private platformId: Object,
    public activatedRoute:ActivatedRoute ,
    private router:Router,
    private ref: ChangeDetectorRef,
    private scrollDispatcher:ScrollDispatcher,
    private platformLocation : PlatformLocation,
    private location :Location) { 
     
    }
    

  ngOnInit(): void {
    // this.viewPort.scrollTo({bottom:0});
    //  this.renderer.listen()
    //  this.renderer.listen(window,'scroll', (event) => {
       
    //       document.querySelectorAll('*').forEach( elem =>{
    //         if (elem.id== 'ddd'){elem.scrollBy
    //           console.log('ddd  hash on focus ');
    //         }
    //       else {
    //         console.log('ddd is not on focus');
    //       }}
          
    //      );});

        // ***********~https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver 
        // var intersectionObserver = new IntersectionObserver(function(entries) {
          // If intersectionRatio is 0, the target is out of view
          // and we do not need to do anything.
          // if (entries[0].intersectionRatio <= 0) return;
        
          // loadItems(10);
        //   console.log('Loaded new items  .....from intersection observer');
        // });
        // start observing
        // intersectionObserver.observe(document.querySelector('#ddd'));
        // ***************~https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
      
console.log(decodeURIComponent(this.platformLocation.hash.replace(/^#\/scroll#/, '')))
this.router.events.pipe(filter(element => element instanceof ScrollDispatcher)).subscribe((element: any) => {
  // console.log(element.anchor);
//   this.router.events.pipe(
//     filter(event => event instanceof NavigationEnd)
// ).subscribe((ev)=>{console.log(ev.)})
});
console.log(document.documentElement.clientHeight );
// console.log( window.innerHeight);
// this.viewPort.scrollToIndex(10);
  }

  ngAfterViewInit(){
    // ****** stuff trying  ******
    this.viewPort.scrollToIndex(10);
    // this.scrollDispatcher.scrollContainers.entries(entry=>{
    //   console.log(entry)
    // })
  //  ***********

    this.activeScrollIndex = this.viewPort.scrolledIndexChange;
    this.viewPort.scrolledIndexChange.subscribe((index)=>
    {
      // console.log(index);
      // console.log(this.viewPort.getViewportSize());
      // console.log(this.viewPort.getElementRef());
      this.indexFocus = index;

      this.router.navigate(['./scroll'],{fragment:this.scrollToPage[index]});
    
          
        });
       
    // this.ref.detectChanges();
    // this.scrollDispatcher.register(window)
    this.scrollDispatcher.scrolled()
    .subscribe(event => {
       console.log('scrolled........');
      //  console.log(window.devicePixelRatio * 100);
  
    });
    // this.scrollDispatcher.ancestorScrolled().subscribe()
   
 fromEvent(window, 'resize').subscribe(()=>{
   this.viewPort.checkViewportSize();
  //  console.log(window.devicePixelRatio );
  //  console.log (window.visualViewport.scale);
   
 })

  }
// *******************

  // locationHashChanged(){
  // }
  
  // funcOnHashChange(){
  //   console.log('###### changing the hash ##########');
  // }
   updateVerticalScroll(event): void {
  }
// fishing for the active fragment with bellow function has been tried unsuccesfully
 getCurrentHash() {
    return decodeURIComponent(this.platformLocation.hash.replace(/^#\/scroll#/, ''));

  }
  routerLinkActiveScroll(index){
    // console.log(index)
  }

 locationChangeListener(){
  //  console.log(this.activatedRoute.fragment)
 }

 emitHash(hash: string){
  //  this.hashIntersectionObserver.
  //   = hash;
  // this.hashIntersectionObserver.subscribe({
  //   next(hash) { console.log(hash); },
  //   complete() { console.log('Finished sequence'); },
  //   error(msg) {console.log('error in Observing hash ', msg);}
     
  // });
  // *****below content commented out for testing hash limits 
  // console.log(hash);
  this.scroll(this.scrollToPage.indexOf(hash));
  this.indexOfCurrentHash =  this.scrollToPage.indexOf(hash)   
  // **********above to be uncommented after testing is over
 };
 

//  ***************** !!!!! IMPORTANT  !!!!!!! ***********************
//  syncWindowToCdk(eventHash:HashExist) ******* has two versions that behave and work differently.
//   Please comment/uncomment both alternatively  to observe functionality;
//  syncWindowToCdk(eventHash:HashExist)
//   {  

//     this.renderer.listen(window, 'scroll', (event) => {
      
//       if (eventHash.hashVisible == true){
//         this.activeFragment$.next(eventHash.hashName);
//             // comment or uncomment the next line to observe the changes***************
//              this.router.navigate(['./scroll'],{fragment:eventHash.hashName });       
//              this.scroll(this.scrollToPage.indexOf(eventHash.hashName));
//     }
//   });
// }
 
 

 /*  I am no longer using this function but I could have used this to highlight the <<non-central hash 
 fragments in the cdk-scroll-viewport navigation     */
syncWindowToCdk(eventHash:HashExist)
  {   
    // console.log(eventHash);
    
   if (eventHash.hashVisible == true){
     this.scroll(this.scrollToPage.indexOf(eventHash.hashName));
     this.router.navigate(['./scroll'],{fragment: eventHash.hashName});
   }
 }

//  routerLinkActiveScroll(index){
//    this.scroll(index);
//  }
  scroll(position) {
   
    // this.viewPort.scrollToIndex(position, 'auto');
    this.viewPort.scrollToIndex(position,'smooth');
    // 
}
}












