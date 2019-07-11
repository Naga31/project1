/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adIsViewable = true,
adPercentage=0,
  viewabilityTime = 0,
  adElement = document.getElementById("ad"),viewElement = document.getElementById("ad_time"),viewablePercentage = document.getElementById("viewablePercentage"),myInterval=false;
viewElement.innerHTML=`${0} s`;
/**
 * Logs the viewability values in the console
 *
 * @override
 */
// window.log = function () {
//   console.log("Ad is viewable: ", adIsViewable, "\nViewability time of the ad in sec:", viewabilityTime);
// };
function isElementInView(element) {
  let elementBoundingBox = element.getBoundingClientRect();
  let elementTopY = elementBoundingBox.top;
  let elementTopX = elementBoundingBox.left;
  let elementRightX = elementBoundingBox.left+elementBoundingBox.width;
  let elementBottomY = elementBoundingBox.top + elementBoundingBox.height;
  adIsViewable =elementBottomY > 0 && elementRightX > 0 && elementBoundingBox.bottom <=(window.innerHeight || document.documentElement.clientHeight) && elementBoundingBox.right <=(window.innerWidth|| document.documentElement.clientWidth);
  if(adIsViewable){
    let visibleHeight = (elementTopY > 0) ? elementBoundingBox.height : elementBottomY;
    let visibleLength = (elementTopX>0) ? elementBoundingBox.width : elementRightX;
    adPercentage = (elementTopY > 0 &&elementTopX >0) ? 100 : (visibleHeight*visibleLength*100)/(elementBoundingBox.height*elementBoundingBox.width);
    if(!myInterval)
      startTimer();
  }
  else {
    adPercentage=0;
    if(myInterval)
      stopTimer();
  }
  viewablePercentage.innerHTML=adPercentage.toFixed(0)+' %';
}
isElementInView(adElement);
window.addEventListener('scroll',function(){
  isElementInView(adElement);
});
window.addEventListener('focus', function(){
    startTimer();
});
window.addEventListener('blur', stopTimer);
function timerHandler() { 
  viewabilityTime+=0.5;
  viewElement.innerHTML= viewabilityTime.toFixed(1)+' s';
}

// Start timer
function startTimer() {
  myInterval = window.setInterval(timerHandler, 500);
}

// Stop timer
function stopTimer() {
  window.clearInterval(myInterval);
  myInterval = false;
}
/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/
