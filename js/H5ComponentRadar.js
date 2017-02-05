/* 雷达图组件对象 */

var H5ComponentRadar = function(name, cfg) {
	var component = new H5ComponentBase(name, cfg);

	//绘制背景
	var w = cfg.width;
	var h = cfg.height;

	//加入一个画布（雷达图背景）
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	ctx.width = cns.width = w;
	ctx.height = cns.height = h;
    component.append(cns);
    
    var r = w/2;
    var step = cfg.data.length;
    

    //绘制网格背景，分为十份
    var isBlue = false;
    
    for (var s = 10; s > 0; s--) {
    	ctx.beginPath();
	    for (var i = 0; i < step; i++) {
	    	var rad = (2 * Math.PI / 360) * 360 / step * i;
	    	x = r + Math.sin(rad) * r * (s/10);
	    	y = r + Math.cos(rad) * r * (s/10);
	    
	        ctx.lineTo(x,y);
	        
	    }
	    ctx.closePath();
	    ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
	    ctx.fill();
    }
    
    //雷达图伞骨
    for (var i = 0; i < step; i++) {
	    	var rad = (2 * Math.PI / 360) * 360 / step * i;
	    	x = r + Math.sin(rad) * r;
	    	y = r + Math.cos(rad) * r;
	    	
	        ctx.moveTo(r,r);
	        ctx.lineTo(x,y); 

	        //输出项目文字
	        var text = $('<div class="text">');
	        text.css('transition', 'all .5s ' + i*.1 + 's');
	        text.text(cfg.data[i][0]); 
	        if (x > w/2) {
	        	text.css('left', x/2+5);
	        } else {
	        	text.css('right', (w-x)/2+5);
	        }
	         if (y > h/2) {
	        	text.css('top', y/2+5);
	        } else {
	        	text.css('bottom', (h-y)/2+5);
	        }

	        if (cfg.data[i][2]) {
	        	text.css('color', cfg.data[i][2]);
	        }
	        text.css('opacity', 0);

	        component.append(text);

	    }
	 ctx.strokeStyle = '#e0e0e0';
	 ctx.stroke();


    // 数据层
    // 加一个新画布
    var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	ctx.width = cns.width = w;
	ctx.height = cns.height = h;
    component.append(cns);
    /**
     * @param  {floot} per 0到1之间的数据，会根据值来变化   
     */
    var draw = function(per){
    	if (per >= 1) {
    		component.find('.text').css('opacity', 1);
    	}
    	if (per <= 1) {
    		component.find('.text').css('opacity', 0);
    	}
        ctx.clearRect(0, 0, w, h);
    	// 输出折线
    	ctx.beginPath();
    	for (var i = 0; i < step; i++) {

    		var rate = cfg.data[i][1];

	    	var rad = (2 * Math.PI / 360) * 360 / step * i;
	    	x = r + Math.sin(rad) * r * rate * per;
	    	y = r + Math.cos(rad) * r* rate * per;
	    	
	        ctx.lineTo(x,y); 
	           
	    }
	    ctx.closePath();
	    ctx.strokeStyle = '#f00';
	    ctx.stroke();

	    // 画点
    	
    	for (var i = 0; i < step; i++) {

    		var rate = cfg.data[i][1];

	    	var rad = (2 * Math.PI / 360) * 360 / step * i;
	    	x = r + Math.sin(rad) * r * rate * per;
	    	y = r + Math.cos(rad) * r* rate * per;
	    	
	        ctx.beginPath();
	        ctx.arc(x, y, 5, 0, 2*Math.PI);
	        ctx.fillStyle = '#ff7676';
	        ctx.fill();
	    }
	    
	   
    }
   
    
    
    
	component.on('onLoad', function() {
		//伸展动画
        var s = 0;
        for (var i=0; i<100; i++) {
        	setTimeout(function() {
        		s+=0.01;
                draw(s);
        	},i*10+500)
        }
	});
	component.on('onLeave', function() {
		//退场动画
        var s = 1;
        for (var i=0; i<100; i++) {
        	setTimeout(function() {
        		s-=0.01;
                draw(s);
        	},i*10)
        }
	});
	return component;
}