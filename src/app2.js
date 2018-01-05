
var correctLayer=cc.Layer.extend({
   ctor:function(){
			this._super();
			cc.audioEngine.playMusic(res.correct_sound,false);
			var size=cc.winSize;
			var correctStatement=new cc.LabelTTF("Well Done Correct Answer !!","Aerial");
			correctStatement.setFontSize(50);
        	correctStatement.setColor(cc.color(255,255,255));
        	correctStatement.setPosition(cc.p(size.width/2,size.height/2));
        	var play_button=new ccui.Button();
        	play_button.loadTextures(res.next_button,null);
        	play_button.addClickEventListener(touchEvent,this);
        	play_button.x=size.width/2;
        	play_button.y=size.height/3;
        	this.addChild(correctStatement);
        	this.addChild(play_button);
        	//answered=false;
			//console.log("answered set false");
			return true;
       }         
});

touchEvent=function(){
	console.log("screen pop called..");
	cc.director.runScene(new HelloWorldScene());
	if(curr_ques==questions.length)
              cc.director.pushScene(new endScene());
	}
var correctScene=cc.Scene.extend({
	onEnter:function()
	{
		this._super();
		var correctL=new correctLayer();
		this.addChild(correctL);
		return true;
	}
});