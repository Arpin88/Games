

class UIMovieClip extends egret.MovieClip{
    public static LOAD_FIN_EVENT = "load_fin";
    private _source:string;

    private _params:any;
    
    public get source():string{
        return this._source;
    }

    //格式： jsname.mcname
    public set source( val:string ){
        let self = this;
        if( self._source == val ) return;

        self._source = val;
        if( val ){
            let tmps = val.split( "." );
            if( tmps.length<2 ) return;

            MCManager.getInstance().getMCDataAsync( tmps[0], tmps[1], self.onLoadMCDataFin, self );
        }
        else{
            self.movieClipData = null;
        }
    }

    private onLoadMCDataFin( mcData:egret.MovieClipData, jsName:string, mcName:string ):void{
        let self = this;
        let source = jsName + "." + mcName;
        if( self._source == source ){
            let frameRate = self.frameRate;
            self.movieClipData = mcData;
            if( frameRate ) self.frameRate = frameRate;

            let params = self._params;
            if( params ){
                if( params.play ){
                    if( params.frame ){
                        super.gotoAndPlay( params.frame, params.times );
                    }
                    else{
                        super.play( params.times );
                    }
                }
                else{
                    super.gotoAndStop( params.frame );
                }
            }
            self._params = null;

            self.dispatchEventWith( UIMovieClip.LOAD_FIN_EVENT );
        }
    }

    public play(playTimes: number = 0): void {
        let self = this;
        if( self.$movieClipData ){
            super.play( playTimes );
        }
        else{
            self._params = {times:playTimes,play:1};
        }
    }

    public stop(): void {
        let self = this;
        if( self.$movieClipData ){
            super.stop();
        }
        else{
            self._params = null;
        }
    }

    public prevFrame(): void {
        if( this.$movieClipData ){
            super.prevFrame();
        }
    }

    public nextFrame(): void {
        if( this.$movieClipData ){
            super.nextFrame();
        }
    }

    public gotoAndPlay(frame: string | number, playTimes: number = 0): void {
        let self = this;
        if( self.$movieClipData ){
            super.gotoAndPlay( frame, playTimes );
        }
        else{
            self._params = {times:playTimes,frame:frame,play:1};
        }
    }

    public gotoAndStop(frame: string | number): void {
        let self = this;
        if( self.$movieClipData ){
            super.gotoAndStop( frame );
        }
        else{
            self._params = {frame:frame,play:0};
        }
    }       
}