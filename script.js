/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adIsViewable = true,
    adPercentage=0,
    viewabilityTime = 0,
    adElement = document.getElementById("ad"),
    viewElement = document.getElementById("ad_time"),
    viewablePerElement = document.getElementById("viewablePercentage"),
    countId = document.getElementById("count"),
    myInterval=false,
    clicks=0,clickInterval=false;
    viewElement.innerHTML=`${0} s`;
/**
 * Logs the viewability values in the console
 *
 * @override
 */
/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/
// window.log = function () {
//   console.log("Ad is viewable: ", adIsViewable, "\nViewability time of the ad in sec:", viewabilityTime);
// };


/**
 * 
 * @param element of advertisement
 * checks whether if element is visible in the viewport 
 * calculates the percentage of the AD visible in the viewport
 * Triggers the timer if AD is viewable
 */
let isElementInView = (element) => {
  let elementBoundingBox = element.getBoundingClientRect();
  let elementTopY = elementBoundingBox.top;
  let elementTopX = elementBoundingBox.left;
  let elementRightX = elementBoundingBox.left+elementBoundingBox.width;
  let elementBottomY = elementBoundingBox.top + elementBoundingBox.height;
  adIsViewable =elementBottomY > 0 && elementRightX > 0 && elementBoundingBox.bottom <=(window.innerHeight || document.documentElement.clientHeight) && elementBoundingBox.right <=(window.innerWidth|| document.documentElement.clientWidth);
  
/**
 * Calculating the percentage of viewability and trigger timer if AD is viewable
 */
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

  //Styling the display % of viewable portion of Ad 
  if(adPercentage < 25){
      viewablePerElement.classList.remove('pink','green');
      viewablePerElement.classList.add('red');
  }
  else if(adPercentage > 25 &&  adPercentage < 75){
      viewablePerElement.classList.remove('red','green');
      viewablePerElement.classList.add('pink');
  }else {
      viewablePerElement.classList.remove('pink','red');
      viewablePerElement.classList.add('green');
  }
  viewablePerElement.innerHTML=adPercentage.toFixed(0)+' %';
}




isElementInView(adElement);

//Event listener of scroll
this.addEventListener('scroll',function(){
  //Fire the isElementView function to check whether element is viewable or not and percentage of viewability
  isElementInView(adElement);
});

//Event Listener of Focus
this.addEventListener('focus', ()=>{
  if(adIsViewable)
    startTimer();
});

//Event listener of blur
this.addEventListener('blur', stopTimer);


function timerHandler  ()  { 
  viewabilityTime+=0.5;
  viewElement.innerHTML= viewabilityTime.toFixed(1)+' s';
}

// Start timer
function startTimer ()  {
  myInterval = window.setInterval(timerHandler, 500);
  viewElement.classList.remove('red');
  viewElement.classList.add('green');
}

// Stop timer
function stopTimer(){
  viewElement.classList.remove('green');
  viewElement.classList.add('red');
  window.clearInterval(myInterval);
  myInterval = false;
}

//OnClick display the count of number of clicks in the middle of the AD Div
 let onClick = () => {
    clearTimeout(clickInterval);
    clicks++;
    countId.innerHTML=clicks;
    clickInterval = setTimeout(() =>{
        countId.innerHTML='';
    }, 1000);
}

