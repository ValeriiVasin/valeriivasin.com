var loveTimer = function(){
  /** функция определяет текущую дату и время и записывает по цифрам в переменные */
  this.getTime = function(){
    var date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds(); 
    
    this.hoursSecond = this.hours % 10;
    this.hoursFirst = this.hours - this.hoursSecond;
    this.hoursFirst = (this.hoursFirst == 0) ? 0 : this.hoursFirst / 10;
    
    this.minutesSecond = this.minutes % 10;
    this.minutesFirst = this.minutes - this.minutesSecond;
    this.minutesFirst = (this.minutesFirst == 0) ? 0 : this.minutesFirst / 10;
    
    this.secondsSecond = this.seconds % 10;
    this.secondsFirst = this.seconds - this.secondsSecond;
    this.secondsFirst = (this.secondsFirst == 0) ? 0 : this.secondsFirst / 10;
  }
  
  this.cssSprite = function($element, topPosition){
    $element.css({backgroundPosition : "0px "+topPosition+"px"});
  }
  
  this.draw = function(){
    this.getTime();
    this.cssSprite($(".digit:eq(0)"),-this.hoursFirst*75);
    this.cssSprite($(".digit:eq(1)"),-this.hoursSecond*75);
    this.cssSprite($(".digit:eq(2)"),-this.minutesFirst*75);
    this.cssSprite($(".digit:eq(3)"),-this.minutesSecond*75);
    this.cssSprite($(".digit:eq(4)"),-this.secondsFirst*75);
    this.cssSprite($(".digit:eq(5)"),-this.secondsSecond*75);
  }
}

var blinkText = function($element){
  this.startAnimation = 10000;
  this.period = 4000;
    
  this.showEl = function(){
    $element.animate({opacity : 1},this.period);
  }
  
  this.init = function(){
    $(document).oneTime(this.startAnimation,this.showEl);
  };
  
  // запускаем инициализирующий метод (прям как конструктор в php)
  this.init();
}

$(function(){
  var timer = new loveTimer();
  timer.draw();
	$(document).everyTime(1000,function(){
	  timer.draw();
	});
	
	var text = new blinkText($(".love-you"));
	//text.init();
});
