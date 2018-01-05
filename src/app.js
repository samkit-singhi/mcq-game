var obj;
var backgroundLayer=cc.Layer.extend({
   ctor:function(){
    this._super();
    var size=cc.winSize;
    obj = this;
    var bgImageView= new ccui.ImageView();
    bgImageView.loadTexture(res.background_jpg);
    bgImageView.x=size.width/2;
    bgImageView.y=size.height/2;
    this.addChild(bgImageView);
    /*var questionBg= new ccui.ImageView();
    questionBg.loadTexture(res.background_jpg);
    //questionBg.x=size.width/2;
    //questionBg.y=size.height/2;
    questionBg.setPosition(cc.p(size.width/2,size.height/1.3));
    this.addChild(questionBg);*/
    }   
});
/*var otherBgLayer=cc.Layer.extend({
    ctor:function(){
        this._super();
        var size=cc.winSize;
        var questionBg= new ccui.ImageView();
        questionBg.loadTexture(res.question_bg_image);
        //questionBg.x=size.width/2;
        //questionBg.y=size.height/2;
        questionBg.setPosition(cc.p(size.width/2,size.height/1.3));
        this.addChild(questionBg);
        return true;
    }
});*/

var QuestionLayer = cc.Layer.extend({
    sprite:null,
    ctor:function (ques) {
        this._super();
        var size=cc.winSize;
        var timer_text=new cc.LabelTTF("Time: ","Aerial");
        timer_text.setFontSize(30);
        timer_text.setColor(cc.color(0,0,0));
        timer_text.setPosition(cc.p(size.width/2-50,size.height/1.1));
        this.addChild(timer_text);  
        var num_text=new cc.LabelTTF("Questions remaining : "+(questions.length-curr_ques-1),"Aerial");
        num_text.setFontSize(30);
        num_text.setColor(cc.color(0,0,0));
        num_text.setPosition(cc.p(size.width/2+325,size.height/1.1));
        this.addChild(num_text);          
        //adding question box
        var score_text=new cc.LabelTTF("Score : "+curr_score,"Aerial");
        score_text.setFontSize(50);
        score_text.setColor(cc.color(0,0,0));
        score_text.setPosition(cc.p(size.width/8,size.height/1.1));            
        var question_text=new cc.LabelTTF(ques,"Aerial");
        question_text.setFontSize(50);
        question_text.setColor(cc.color(0,0,0));
        question_text.setPosition(cc.p(size.width/2,size.height/1.3));
        this.addChild(score_text);
        this.addChild(question_text);
       
    }
});
var OptionsLayer=cc.Layer.extend({
    ctor:function(a,b,c,d,ans,obj1){
        this._super();
        var size=cc.winSize;
        if(ans=='A')
            var opt1=new cc.MenuItemFont("A. "+a,this.correct);
        else
            var opt1=new cc.MenuItemFont("A. "+a,this.wrong);
        if(ans=='B')
            var opt2=new cc.MenuItemFont("B. "+b,this.correct);
        else
            var opt2=new cc.MenuItemFont("B. "+b,this.wrong);
        if(ans=='C')
            var opt3=new cc.MenuItemFont("C. "+c,this.correct);
        else
            var opt3=new cc.MenuItemFont("C. "+c,this.wrong);
        if(ans=='D')
            var opt4=new cc.MenuItemFont("D. "+d,this.correct);
        else
            var opt4=new cc.MenuItemFont("D. "+d,this.wrong);
        opt1.setColor("#0000");
        opt2.setColor("#0000");
        opt3.setColor("#0000");
        opt4.setColor("#0000");
        var optMenu=new cc.Menu(opt1,opt2,opt3,opt4);
        optMenu.alignItemsVertically(15);
        optMenu.setAnchorPoint(0.5,0.5);
        optMenu.setPosition(size.width/2,size.height/2);
        var timerImageView= new ccui.ImageView();
        timerImageView.loadTexture(res.timer);
        timerImageView.x=size.width/1.79;
        timerImageView.y=size.height/1.1;
        this.addChild(timerImageView);
        this.addChild(optMenu);
        this.schedule(this.updateTime,1);
        //this.addChild(sprite);
        return true; 
    },
    updateTime:function(){
    if(answered)
        timer=0,answered=false;    
    var sprite=new cc.Sprite.create(res.timer_sprite);
    var size=cc.winSize;
    cc.audioEngine.playEffect(res.tick_sound);
    sprite.setPosition(cc.p(timer_posX+timer*sprite.width,size.height/1.1));
    cc.log("Position :" + sprite.x);
    this.addChild(sprite);
    timer++;
    console.log("Timer :"+timer);       
    if(timer==6)
    {
         console.log("Time Up !!");
         this.unschedule(this.updateTime);
         cc.audioEngine.playEffect(res.timeup_sound);
         //cc.director.runScene(new timeUpScene());
         var custom_event=new cc.EventCustom("Event From Main Screen");
         custom_event.setUserData("Time Up");
         cc.eventManager.dispatchEvent(custom_event);
    }   
   
    },
    correct:function(){
    //this.unschedule(this.updateTime);
    answered=true;
    //obj.unschedule(this.updateTime);
    //cc.audioEngine.playEffect(res.correct_sound);
    console.log("unscheduled");
    //cc.director.runScene(new correctScene());
    curr_score++;
    console.log("Correct Answer !!");
    var custom_event=new cc.EventCustom("Event From Main Screen");
    custom_event.setUserData("correct");
    cc.eventManager.dispatchEvent(custom_event);
    },
    wrong:function(){
    answered=true;    
    //obj.unschedule(this.updateTime);
    //cc.audioEngine.playEffect(res.wrong_sound);
    console.log("unscheduled");
    cc.director.runScene(new wrongScene());
    var custom_event=new cc.EventCustom("Event From Main Screen");
    custom_event.setUserData("wrong");
    cc.eventManager.dispatchEvent(custom_event);
    console.log("Wrong Answer !!");
        
    }
});
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        console.log("question "+curr_ques);
        if(curr_ques==questions.length)
        {
            var custom_event=new cc.EventCustom("Event From Main Screen");
            custom_event.setUserData("end");
            cc.eventManager.dispatchEvent(custom_event);
            //curr_ques=0;
            //curr_score=0;
            return;
        }
        var obj1 = this;
        //console.log("Current question : "+curr_ques);
        var bgLayer = new backgroundLayer();
        var qLayer= new QuestionLayer(questions[curr_ques]);
        var optLayer=new OptionsLayer(optA[curr_ques],optB[curr_ques],optC[curr_ques],optD[curr_ques],ans[curr_ques],obj1);
        //var otherBgL=new otherBgLayer();
        timer=0;
        console.log("Timer :"+timer);
        var size=cc.winSize;
        timer_posX=size.width/2;
        this.addChild(bgLayer);
        //this.addChild(otherBgL);
        this.addChild(qLayer);
        this.addChild(optLayer);
        curr_ques++;
        
    }
});

