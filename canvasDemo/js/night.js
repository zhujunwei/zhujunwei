;(function($){
	var windowWidth = window.innerWidth,
		windowHeight = window.innerHeight,
		mycanvas = document.getElementById("mycanvas"),
		count = 0,stars = [],meteors  = [];
	var context = mycanvas.getContext('2d');
	function createMeterArr(){
		var x = Math.random() * windowWidth + 800
    	meteors.push(new createMeter(context,x,windowHeight))
    	setTimeout(createMeterArr,Math.random()* 4000)
	}
	createMeterArr();
	//创建一个夜晚
	function createNight(){
		count++;
		if(count % 15 == 0){
			stars.forEach(function(element){
				var sign = Math.random() > 0.5 ? 1 : -1
	            element.r += sign * 0.2
	            if (element.r < 0) {
	                element.r = -element.r
	            } else if (element.r > 1) {
	                element.r -= 0.2
	            }
			})
		}
		createMoon(context,windowWidth,windowHeight)
		createStars(context,windowWidth,windowHeight,100);
		meteors.forEach(function(element,index,arr){
			if (element.flow()) {
	            element.draw()
	        } else {
	            arr.splice(index, 1)
	        }
		})
		window.requestAnimationFrame(createNight)
	}
	createNight();
	//渐变创建圆
	function createMoon(ctx,width,height){
        var gradient = ctx.createRadialGradient(
        200, 200, 100, 200, 200,800);
        //径向渐变
        gradient.addColorStop(0, 'rgb(255,255,255)');
        gradient.addColorStop(0.01, 'rgb(70,70,80)');
        gradient.addColorStop(0.1, 'rgb(40,40,50)');
        gradient.addColorStop(0.5, 'rgb(20,20,30)');
        gradient.addColorStop(1, 'rgb(0,0,10)');
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
	}
	function createStars(ctx,width,height,amount){
		if(stars.length <=0){ 
	        while (amount--) {
	            stars.push({
	                x: Math.random() * width,
	                y: Math.random() * height,
	                r: Math.random() + 0.2
	            })
	        }
		}
        ctx.save();
        ctx.fillStyle = 'white';
        stars.forEach(function(star){
        	ctx.beginPath()
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
            ctx.fill();
        })
        ctx.restore();
	}
	function createMeter(ctx, x, height){
		this.ctx = ctx
        this.x = x / 2
        this.y = 200
        this.h = height
        this.vx = -(4 + Math.random() * 4)
        this.vy = -this.vx
        this.len = Math.random() * 300 + 500;
        this.draw = function(){
        	var ctx = this.ctx,
        
            //径向渐变，从流星头尾圆心，半径越大，透明度越高
            gra = ctx.createRadialGradient(
                this.x, this.y, 0, this.x, this.y, this.len)
	        var PI = Math.PI;
	        gra.addColorStop(0, 'rgba(255,255,255,1)');
	        gra.addColorStop(1, 'rgba(0,0,0,0)');
	        ctx.save();
	        ctx.fillStyle = gra;
	        ctx.beginPath();
	        //流星头，二分之一圆
	        ctx.arc(this.x, this.y, 1, PI / 4, 5 * PI / 4);
	        //绘制流星尾，三角形
	        ctx.lineTo(this.x + this.len, this.y - this.len);
	        ctx.closePath();
	        ctx.fill();
	        ctx.restore();
        };
        this.flow = function(){
        	//判定流星出界
	        if (this.x < -this.len || this.y > this.h + this.len) {
	            return false
	        }
	        this.x += this.vx
	        this.y += this.vy
	        return true
        }
	};

})(window.jQuery)
