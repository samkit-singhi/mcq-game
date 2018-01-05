
var controlLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
	var mainScreenEventListener=cc.EventListener.create({
			event: cc.EventListener.CUSTOM,
			eventName: "Event From Main Screen",
			callback: function(event){
				console.log("Load FeedBack Screen !!"+event.getUserData());
				if(event.getUserData()=="correct")
					cc.director.runScene(new feedbackScene(1));
				if(event.getUserData()=="wrong")
					cc.director.runScene(new feedbackScene(2));
				if(event.getUserData()=="end")
					cc.director.runScene(new feedbackScene(3));
				if(event.getUserData()=="Time Up")
					cc.director.runScene(new feedbackScene(4));
			}
		});
		cc.eventManager.addListener(mainScreenEventListener,2);
		//-------------------------------------------------------------------------
		var feedbackScreenEventListener=cc.EventListener.create({
			event:cc.EventListener.CUSTOM,
			eventName: "Event From FeedBack Screen",
			callback: function(event){
				console.log("Load Main Screen !!"+event.getUserData());
					cc.director.runScene(new HelloWorldScene());
			}
		 });
		 cc.eventManager.addListener(feedbackScreenEventListener,2);

		 cc.director.runScene(new HelloWorldScene());
	}	
});
var controlScene=cc.Scene.extend({
	onEnter:function()
	{
		this._super();
		var controlL=new controlLayer();
		this.addChild(controlL);
	}
});