/**
 * Leaves v0.2
 * By mufeng, http://mufeng.me, http://weibo.com/meapo, 2012/12/15
 */
    
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

var FallingLeaves = function(themeUrl, num, id) {
		this.body = document.body;
		this.support = false;
		this.container = id ? document.getElementById('id') : this.body;
		this.num = num ? num : 5;
		this.themeUrl = themeUrl;
		this.init()
	};
FallingLeaves.prototype = {
	init: function() {
		this.supportNot();
		if (this.support != false) {
			for (var i = 0; i < this.num; i++) {
				this.container.appendChild(this.createLeaf())
			}
		}
	},
	supportNot: function() {
		var domPrefixes = 'Webkit Moz O ms a'.split(' ');
		for (var i = 0; i < domPrefixes.length; i++) {
			if (this.container.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
				this.support = domPrefixes[i];
				break
			}
			if (domPrefixes[i] == "a") {
				if (this.container.style.animationName !== undefined) {
					this.support = domPrefixes[i];
					break
				}
			}
		}
	},
	randomInteger: function(low, high) {
		return low + Math.floor(Math.random() * (high - low))
	},
	randomFloat: function(low, high) {
		return low + Math.random() * (high - low)
	},
	pixelValue: function(value) {
		return value + 'px'
	},
	durationValue: function(value) {
		return value + 's'
	},
	createLeaf: function() {
		var self = this,
			leafDiv = document.createElement('div'),
			image = document.createElement('img'),
			spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip',
			fadeAndDropDuration = self.durationValue(self.randomFloat(5, 11)),
			spinDuration = self.durationValue(self.randomFloat(4, 8)),
			leafDelay = self.durationValue(self.randomFloat(0, 5));
		leafDiv.className = "leave";
		image.src = self.themeUrl + "/" + self.randomInteger(1, self.num) + '.png';
		leafDiv.style.top = self.pixelValue(30);
		leafDiv.style.right = self.pixelValue(self.randomInteger(0, 50));
		if (self.container.style[self.support + 'AnimationName'] !== undefined) {
			image.style[self.support + 'AnimationName'] = spinAnimationName;
			image.style[self.support + 'AnimationDuration'] = spinDuration;
			leafDiv.style[self.support + 'AnimationName'] = 'fade, drop';
			leafDiv.style[self.support + 'AnimationDelay'] = leafDelay + ', ' + leafDelay;
			leafDiv.style[self.support + 'AnimationDuration'] = fadeAndDropDuration + ', ' + fadeAndDropDuration
		}
		if (this.support == "a") {
			image.style.animationName = spinAnimationName;
			image.style.animationDuration = spinDuration;
			leafDiv.style.animationName = 'fade, drop';
			leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
			leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration
		}
		leafDiv.appendChild(image);
		return leafDiv
	}
};
var BGMusic = function(themeUrl) {
    this.themeUrl = themeUrl;
    var audioElementHovertree = document.createElement('audio');
    audioElementHovertree.setAttribute('src', themeUrl + '/meihua.mp3');
    audioElementHovertree.setAttribute('autoplay', 'autoplay');
    audioElementHovertree.setAttribute('loop', 'loop');
    
    audioElementHovertree.addEventListener("load", function () {
        audioElementHovertree.play();
    }, true);
    
    
    var playHovertree = document.getElementById('playHovertree');
    var pauseHovertree = document.getElementById('pauseHovertree');
    playHovertree.addEventListener("click", function () {
        audioElementHovertree.play();
        playHovertree.style.display = 'none';
        pauseHovertree.style.display = 'inline-block';
    });
    
    pauseHovertree.addEventListener("click", function () {
        audioElementHovertree.pause();
        pauseHovertree.style.display = 'none';
        playHovertree.style.display = 'inline-block';
    });
    audioElementHovertree.play();
}

if( isMobile.any() ) 
{
    document.getElementById('meihua').style.display = 'none';
    document.getElementById('fangzi').style.display = 'none';
    //document.getElementById('hewenqi').style.display = 'none';
}