// TypeScript file
class SoundManager {
    private static _instance: SoundManager;
    public static getInstance(): SoundManager {
        if( !SoundManager._instance ){
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    }

    private _bgmName:string;
    private _bgmSound:egret.Sound;
    private _bgmChannel: egret.SoundChannel;

    private _bgmVolume:number=1;

    private time_stop_bgm: number = 3000;

    public yinxiao:boolean;
    public yinyue:boolean;

    public canPlayCombatBGM:boolean = false;

    constructor(){
        let self = this;
        var soundSet = localStorage.getItem("soundSet");
        self.yinxiao = soundSet==null?true:soundSet=="on";
        var musicSet = localStorage.getItem("musicSet");
        self.yinyue = musicSet==null?true:musicSet=="on";

        //GameConfig.gameScene().addDebugLog( "yinxiao=" + self.yinxiao + "  yinyue=" + self.yinyue + "  fangyan=" + self.fangyan );
    }

    public PlaySound(sound_name: string, playcnt: number = 1):void {
        
        let self = this;
        if( !self.yinxiao ) return;

        // Sound 允许您在应用程序中使用声音。
        // 使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
        // 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。

        // egret.log("播放" + sound_name + "，共" + loops + "次");
        let sound = RES.getRes( sound_name );
        if( sound ){
            self.playSoundImpl( sound, sound_name, playcnt );
        }
        else{
            RES.getResAsync( sound_name, function(sound:egret.Sound, source:string){self.playSoundImpl(sound,source,playcnt)}, self );
        }    
    }

    public PlayClickSound():void{
        let self = this;
        self.PlaySound("click_mp3");
    }

    private pchannel:egret.SoundChannel;
    private lastSource:string;
    private playSoundImpl( sound:egret.Sound, source:string, playcnt:number ):void{
        let self = this;
        //GameConfig.gameScene().addDebugLog( "sound=" + (!!sound) + "  yinxiao=" + self.yinxiao );
        if( !sound || !self.yinxiao ) return;

        //BY 小放 选牌间隔很短，所以这限制没用处，注释
        // if(this.lastSource == source && this.pchannel.position != 0 && this.pchannel.position < 0.5) {  //BY小放 前面同一个音效没有放完，间隔小于0.5秒，防止重复播放
        //     return;
        // }
        this.lastSource = source;
        this.pchannel = sound.play(0, playcnt);
        this.pchannel.volume = 1;
        (<any>this.pchannel).time = Date.now;

        //GameConfig.gameScene().addDebugLog( "sound play" );
    }

    public PlaySound_WaitDuration(sound_name: string, playcnt: number = 1, duration: number = 100): void{
        let self = this;
        if( !self.yinxiao ) return;

        // Sound 允许您在应用程序中使用声音。
        // 使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
        // 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
        if( duration<=0 ){
            self.PlaySound( sound_name, playcnt );    
        }
        else{
            egret.setTimeout( function(){
                self.PlaySound( sound_name, playcnt ); 
            }, self, duration );
        }
    }

    public PlayBgm( bgm_name: string ): void{
        let self = this;
        if( !self.yinyue ) return;

        self._bgmName = bgm_name;
        if( self._bgmChannel ){
            self.CloseBgm();
        }
        
        let sound = RES.getRes( bgm_name );
        if( sound ){
            self.playBgmImpl( sound, bgm_name );
        }
        else{
            RES.getResAsync( bgm_name, self.playBgmImpl, self );
        }    
    }

    private playBgmImpl( sound:egret.Sound, source:string ):void{
        let self = this;
        if( !sound || !self.yinyue || source != self._bgmName  ) return;

        self._bgmSound = sound;
        self._bgmChannel = sound.play( 0, 0 );
        self._bgmChannel.volume = self._bgmVolume;
    }

    public setBGMVolume(volume:number):void{
        var self = this;
        self._bgmVolume = volume;
        if(self._bgmChannel==null)
            return;
        self._bgmChannel.volume = volume;
    }

    public PlayBgmExist(): void{
        let self = this;
        if( !self.yinyue ) return;

        if( !self._bgmChannel && self._bgmSound ){
            self._bgmChannel = self._bgmSound.play( 0, 0 );
        }
    }

    public CloseBgm(): void{
        var bgmChannel = this._bgmChannel;
        if( bgmChannel ){
            bgmChannel.stop();
            this._bgmChannel = null;
        }
    }
}