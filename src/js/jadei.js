/*
 *  Copyright [2017] [Tony CHU]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * 	You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  - - - - - - - - - - - - - - - - - - - - 
 *	Library Name: JadeI (ji)
 *	Vesion: 1.0
 *	- - - - - - - - - - - - - - - - - - - - 
 *	Modify History:
 * 	2017-09-05     First Drift
 *
 */
var ji = {
	    
    helloWorld: function(){
        console.log('Hello World from JadeI');
    },
			
	replaceEmptyNullString: function(str){
		if(str == null || $.trim(str) == ''){
			return "N/A";
		}
		else{
			return str;
		}
	},
	
	replaceEmptyNullNumber: function(num){
		if(num == null || $.trim(num)== ''){
			return 0;
		}
		else{
			return num;
		}
	},
	
	// Suitble for element is position fixed and maintain position while window.resize.
	resizeAndCenterOnceTime: function(ele){
		ele.style.position = 'fixed';		
		var windowWidth = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		var windowHeight = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

		var eleWidth = ele.offsetWidth;
		var customCenterPaddingWidth = (windowWidth - eleWidth) / 2;
		ele.style.left = customCenterPaddingWidth+"px";

		var eleHeight = ele.offsetHeight;
		var customCenterPaddingTop = (windowHeight - eleHeight) / 2;
		ele.style.top = customCenterPaddingTop+"px";	
	},
	
	resizeAndCenterMultiTime: function(ele){		
		ele.style.position = 'fixed';
		window.addEventListener("resize", function(){		
			var windowWidth = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;
			
			var windowHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;

			var eleWidth = ele.offsetWidth;
			var customCenterPaddingWidth = (windowWidth - eleWidth) / 2;
			ele.style.left = customCenterPaddingWidth+"px";

			var eleHeight = ele.offsetHeight;
			var customCenterPaddingTop = (windowHeight - eleHeight) / 2;
			ele.style.top = customCenterPaddingTop+"px"; 
		});
		this.resizeAndCenterOnceTime(ele);	
	},
	
	quickFullScreenLoadingBlocker: function(img){
		var randomID = this.randomComplexStringMaker();
		$("body").append("<div class='ji-fullScreenBlocker' id='ji-fullScreenBlocker-"+randomID+"'><img id='ji-fullScreenBlocker-img-"+randomID+"' src='"+img+"'/></div>");		
		return $('#ji-fullScreenBlocker-'+randomID).get(0);
	},
	

	randomStringMaker: function(str_length){
		if(str_length==null || str_length < 10){ var str_length = 10; }
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < str_length; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;		
	},

	randomComplexStringMaker: function(str_length){
		var d = new Date();
		var n = d.getTime()+"";
		if(str_length==null){ var str_length = 20; }
		var text = "";		
		str_length = str_length - n.length;
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < str_length; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return n+text;		
	},

	imageValidation: function(path){
		var task = {
			result: null,
			img: null
		};	
		$("body").append("<img id='ji-imgValidation' style='display:none;'/>");
		var img = new Image();
		img.onload = function() {
			var tmpImg = {
			    src:  img.src,
			    width: img.width,
			    height: img.height
			};
			$('#ji-imgValidation').remove();
			task.result = true;
			task.img = tmpImg;	 		    
		}
		img.onerror = img.onabort = function() {
			$('#ji-imgValidation').remove();
			task.result = false;
		}		
		img.src = path;
		document.getElementById("ji-imgValidation").src= img.src;
		return task;
	},

	// Compatible for cross browser.
	datetimeToString: function(date,mode){
		var pad = function(number) {
	        var r = String(number);
	        if ( r.length === 1 ) {
	            r = '0' + r;
	        }
	        return r;
		}      
		Date.prototype.toISOString = function() {
		        return this.getFullYear()
		            + '-' + pad( this.getMonth() + 1 )
		            + '-' + pad( this.getDate() )
		            + 'T' + pad( this.getHours() )
		            + ':' + pad( this.getMinutes() )
		            + ':' + pad( this.getSeconds() )
		            + '.' + String( (this.getMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
		            + 'Z';
		}
		if(date==null){ date = new Date(); }	
		var dateStr = date.toISOString();
		dateStr = dateStr.replace(/[T|Z]/g,' ')
		switch (mode) {
		    case 1:
		        dateStr = dateStr.slice(0,10)
		        break;
		    case 2:
		        dateStr = dateStr.slice(11,19)
		        break;
		    case 3:
		        dateStr = dateStr.slice(11,23)
		        break;
		}
		return dateStr;
	},

	quickFormValidation: function(form){
		if(form != null && (form.tagName == 'FORM' || form.method != null) ){
			$('.ji-form-errMsg').remove();
			var numOfEles = form.elements.length;
			var invalidEleGroup = [];
			for(var idx=0; idx<numOfEles; idx++){
				var fieldVal = form.elements[idx].value;
				if(fieldVal == null || $.trim(fieldVal) == ''){					
					if($(form.elements[idx]).hasClass('ji-form-required')){						
						$(form.elements[idx]).after('<span class="ji-form-errMsg">* Cannot be null.</span>');
					}
					invalidEleGroup.push(form.elements[idx]);
				}
			}
			return invalidEleGroup;
		}
	},

}