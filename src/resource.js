var res = {
    HelloWorld_png : "res/HelloWorld.png",
    background_jpg : "res/quiz_bg.jpg",
    qbox_jpg : "res/qbox.jpg",
    play_button_png : "res/play_button.png",
    correct_sound: "res/correct_sound.mp3",
    next_button: "res/next_button.jpg",
    timer_sprite: "res/timerBlock.png",
    timer: "res/timer.png",
    question_bg_image: "res/question_bg_image.jpg",
    tick_sound: "res/tick_sound.wav",
    timeup_sound: "res/timeup_sound.wav",
    correct_sound: "res/correct_sound.wav",
    wrong_sound: "res/wrong_sound.wav",
    music: "res/music.mp3"
};
var questions=["question1","question2","question3","question4"];
var optA=["A","A","A","A"];
var optB=["B","B","B","B"];
var optC=["C","C","C","C"];
var optD=["D","D","D","D"];
var ans=["A","B","C","D"];
var curr_ques=0;
var curr_score=0;
var timer_posX=0;
var answered=false;
var timer=0;
var eventL;
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
