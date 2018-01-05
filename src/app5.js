var timeUpLayer=cc.Layer.extend({
   ctor:function(){
			this._super();
			var size=cc.winSize;
			var timeUpStatement=new cc.LabelTTF("Sorry,Time Up !!","Aerial");
			timeUpStatement.setFontSize(50);
        	timeUpStatement.setColor(cc.color(255,255,255));
        	timeUpStatement.setPosition(cc.p(size.width/2,size.height/2));
        	var play_button=new ccui.Button();
        	play_button.loadTextures(res.next_button,null);
        	play_button.addClickEventListener(touchEvent1,this);
        	play_button.x=size.width/2;
        	play_button.y=size.height/3;
        	this.addChild(timeUpStatement);
        	this.addChild(play_button);
        	return true;
       }         
});
touchEvent1=function(){
	console.log("screen pop called..11")
	cc.director.runScene(new HelloWorldScene());
	if(curr_ques==questions.length)
              cc.director.pushScene(new endScene());
	
}
var timeUpScene=cc.Scene.extend({
	onEnter:function()
	{
		this._super();
		var timeUpL=new timeUpLayer();
		this.addChild(timeUpL);
		return true;
	}
});