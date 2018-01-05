var feedbackLayer=cc.Layer.extend({
	ctor:function(text,sound)
	{
		this._super();
		var size=cc.winSize;
		cc.audioEngine.playMusic(sound,false);
		var label=new cc.LabelTTF(text,"Aerial");
		label.setFontSize(55);
		label.setPosition(cc.p(size.width/2,size.height/2));
	    label.setColor(cc.color(255,255,255));
		var playSprite= new cc.Sprite.create(res.play_button_png,null)
		//play.x=100;
		eventL=cc.EventListener.create({
			event: cc.EventListener.MOUSE,
			onMouseDown: this.touch
		});
        //playSprite.setOnTouchListener('click',this.touch);
        //debugger;
        //playSprite.addTouchEventListener(this.touch);
        playSprite.x=size.width/2;
        playSprite.y=size.height/3;
        //play.setPosition(cc.p(size.width/2,size.height/3));
        cc.eventManager.addListener(eventL,1);
        this.addChild(label);
        // debugger;
        this.addChild(playSprite);
        //play.x=100;
        return true;
	},
	touch:function()
	{
		cc.audioEngine.stopMusic()
		cc.eventManager.removeListener(eventL);
        console.log("Event Dispacted !!");
		var custom_event=new cc.EventCustom("Event From FeedBack Screen");
		custom_event.setUserData("return to main screen");
		cc.eventManager.dispatchEvent(custom_event);
		//cc.director.runScene(new HelloWorldScene());
	}
});
 
var feedbackScene=cc.Scene.extend({

	data: "",
	text: "",
	ctor:function(data)
	{
		this._super();
		this.data=data;
		return true;
	},
	onEnter:function()
	{
		var text="",sound="";
		switch(this.data){
			case 1: text="Well Done,Correct Answer!!";
					sound=res.correct_sound;
					break;
			case 2: text="Sorry,wrong Answer !!";
					sound=res.wrong_sound;
					break;
			case 3: text="Your Score is : "+curr_score,curr_score=0,curr_ques=0;
					sound=res.music;
					break;
			case 4: text="Sorry,Time Up !!";
					sound=res.timeup_sound;
					break;
		}
		var feedback=new feedbackLayer(text,sound);
		this.addChild(feedback);
		//answered=false;
		return true;
	}
});