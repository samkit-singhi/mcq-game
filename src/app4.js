var score_layer=cc.Layer.extend({
	ctor:function()
	{
		this._super();
		var size=cc.winSize;
		cc.audioEngine.playMusic(res.music,false);
		var score_label=new cc.LabelTTF("Your Score is : "+curr_score,"Aerial");
		score_label.setFontSize(55);
		score_label.setPosition(cc.p(size.width/2,size.height/2));
	    score_label.setColor(cc.color(255,255,255));
		var play_button1=new ccui.Button();
        play_button1.loadTextures(res.play_button_png,null);
        play_button1.addTouchEventListener(this.touchEvent2,this);
        play_button1.x=size.width/2;
        play_button1.y=size.height/3;
        this.addChild(score_label);
        this.addChild(play_button1);
        return true;
	},
	touchEvent2:function()
	{
		cc.audioEngine.stopMusic()
		curr_score=0;
		curr_ques=0;
		cc.director.runScene(new welcomeScene());
	}
});
var endScene=cc.Scene.extend({

	onEnter:function()
	{
		this._super();
		var score=new score_layer();
		this.addChild(score);
		answered=false;
		return true;
	}
})