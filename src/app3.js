var wrongLayer=cc.Layer.extend({
   ctor:function(){
			this._super();
			var size=cc.winSize;
			var wrongStatement=new cc.LabelTTF("Sorry,This is wrong Answer!!","Aerial");
			wrongStatement.setFontSize(50);
        	wrongStatement.setColor(cc.color(255,255,255));
        	wrongStatement.setPosition(cc.p(size.width/2,size.height/2));
        	var play_button=new ccui.Button();
        	play_button.loadTextures(res.next_button,null);
        	play_button.addTouchEventListener(touchEvent,this);
        	play_button.x=size.width/2;
        	play_button.y=size.height/3;
        	this.addChild(wrongStatement);
        	this.addChild(play_button);
        	return true;
       }         
});
touchEvent=function(){
	console.log("screen pop called..")
	cc.director.runScene(new HelloWorldScene());
	if(curr_ques==questions.length)
              cc.director.pushScene(new endScene());
	
}
var wrongScene=cc.Scene.extend({
	onEnter:function()
	{
		this._super();
		var wrongL=new wrongLayer();
		this.addChild(wrongL);
		//answered=false;
		//console.log("answered set false");
		return true;
	}
});