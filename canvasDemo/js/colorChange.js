//转成rgb值
function colorConversion(code){
    var len=code.length;
    var f= new Array();
    f['0']=0;
    f['1']=1;
    f['2']=2;
    f['3']=3;
    f['4']=4;
    f['5']=5;
    f['6']=6;
    f['7']=7;
    f['8']=8;
    f['9']=9;
    f['A']=10;
    f['B']=11;
    f['C']=12;
    f['D']=13;
    f['E']=14;
    f['F']=15;
    code=code.toUpperCase();
    var s=code.substr(0,1);
    if(s=='#'){
        code=code.substr(1,6);
    }
    var r=f[code[0]]*16+f[code[1]];
    var g=f[code[2]]*16+f[code[3]];
    var b=f[code[4]]*16+f[code[5]];
    return [r,g,b];
}

function colorGradient(obj,thisRGB,step,speed,callback){
    var _thisRGBArr = [],textArr = [];
    for(var i = 0 ; i < thisRGB.length ; i++){
        _thisRGBArr.push(colorConversion(thisRGB[i].startColor));
        textArr.push(thisRGB[i].pic)
    }

    var step=step?step:3;
    var _step=step;
    var _speed=speed?parseInt(speed/step):30; 

    var _R_step = [];
    var _G_step = [];
    var _B_step = [];

    for(var i = 0 ; i < _thisRGBArr.length-1 ; i++){
        _R_step.push(parseInt(Math.abs(_thisRGBArr[i][0]-_thisRGBArr[i+1][0])/_step))
        _G_step.push(parseInt(Math.abs(_thisRGBArr[i][1]-_thisRGBArr[i+1][1])/_step))
        _B_step.push(parseInt(Math.abs(_thisRGBArr[i][2]-_thisRGBArr[i+1][2])/_step))
    }

    var j = 0;
    var timer=setInterval(function(){

        if(_step>0){
            var s=(step-_step)+1;
            var r=(_thisRGBArr[j][0]>_thisRGBArr[j+1][0]?_thisRGBArr[j][0]-_R_step[j]*s:_thisRGBArr[j][0]+_R_step[j]*s);
            var g=(_thisRGBArr[j][1]>_thisRGBArr[j+1][1]?_thisRGBArr[j][1]-_G_step[j]*s:_thisRGBArr[j][1]+_G_step[j]*s);
            var b=(_thisRGBArr[j][2]>_thisRGBArr[j+1][2]?_thisRGBArr[j][2]-_B_step[j]*s:_thisRGBArr[j][2]+_B_step[j]*s);
            obj.css({'background-color':'rgb('+r+','+g+','+b+')'});
            _step--;

        }else{
            if(j >= 2 ) {
                clearInterval(timer);
                callback(textArr[j+1]);
                return;
            }
            _step = step;
            j++;
        }
    },_speed);
}

