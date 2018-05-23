


/*获取模块路径*/
angular.module('nav.topbar', []).factory('topbars',function ($location) {
    var array={};
    var path = $location.path().split('/');
    array['module']=path[2];
    array['tree']=path[3];
    return array;
});
angular.module('ui.sortable', []).factory('sortable',function () {
    var array=null;
    array=function(tableth,tablist){
    	var listName=[];
		$(tableth).children().each(function(i,n){
			var name=$(n).attr('attr-name');
			var isedit=$(n).attr('attr-edit');
			var id=$(n).attr('attr-id');
			var obj={
					name:name,
					isedit:isedit,
					id:id
			}
			if(obj){
				listName.push(obj);
			}			
		});
         for(var i=0;i<tablist.length;i++){
        	 tablist[i]['newlist']=[];
        	 for(var j=0;j<listName.length;j++){
        		 var name=listName[j].name;
        		 var isedit=listName[j].isedit;
        		 var idd=listName[j].id;
        		 var id=tablist[i][idd];
        		 var names=tablist[i][name];
        		 if(names===null){
        			 names='-';
        		 }
        		 var obj={
        				 name:names,
        				 isedit:isedit,
        				 id:id
        		 }
        		 tablist[i]['newlist'].push(obj);
        	 }
         }
         return tablist;
    }
    return array;
});

/*请求post*/
angular.module('ui.newhttp', []).factory('newhttp',function ($http) {
    var newhttp=function(url,postdata){
    	var getdata;
    	if(postdata){
    		getdata=$http.post(project_name+url,postdata);
    	}else{
    		getdata=$http.get(project_name+url)
    	}
    	return getdata;
    }   
    return newhttp;
});
/*根据code找value*/
angular.module('ui.getselectvalue', []).factory('getselectvalue',function ($http) {
    var newhttp=function(data,code){
    	var value;
		for(var i=0;i<data.length;i++){
			if(data[i].code==code){
				value=data[i].value;
				break;
			}
		}
    	return value;
    }   
    return newhttp;
});

/*序列化数据*/
angular.module('ui.serialize', []).factory('serialize',function () {
    var serialize=function(form){
    	var obj=[];
    	var formobj=angular.element(form);
    	var list=formobj.find('[name]');
    	for(var i=0;i<list.length;i++){
    		var data={};
    		var name=list[i].name;
    		var value=list[i].value;
    		if(value){
    			if(!isNaN(value)){
        			value=value*1;
        		}
    		}else{
    			value=null;
    		}
    		
    		data[name]=value;
    		obj.push(data);
    	}
    	
    	return obj;
    }   
    return serialize;
});
/*序列化数据*/
angular.module('ui.searchMaxWidth', []).factory('searchMaxWidth',function () {
    var searchMaxWidth=function(thh,tdd){
    	var th=angular.element(thh).children();
    	var td=angular.element(tdd).children();
    	for(var i=0;i<th.length;i++){
    		var width=angular.element(td[i]).find('div.titles').css('width');
    		angular.element(th[i]).find('div.title').css('width',width);
    	}
    };
    
    return searchMaxWidth;
});



/*序列化数据*/
angular.module('ui.formreset', []).factory('formreset',function () {
    var serialize=function(form){
    	var formobj=angular.element(form);
    	var list=formobj.find('[name]');
    	for(var i=0;i<list.length;i++){
    		list[i].value=null;
    	}

    }   
    return serialize;
});
/*获取初始标签名字*/
angular.module('ui.getlabelmain', []).factory('getlabelmain',function () {
	
	var main_label=function(treeNodes){
		var main_label=[{
    		id:null,
    		active:true,
    		menuName:null,
    		href:null
    	}];
		main_label[0].id=treeNodes[0].id;
		main_label[0].menuName=treeNodes[0].menuName;
		main_label[0].isOpen=true;
		main_label[0].menuPath=treeNodes[0].menuPath;
        if(treeNodes[0].childrenNodes.length>0){
        	main_label[0].id=treeNodes[0].childrenNodes[0].id;
        	main_label[0].menuName=treeNodes[0].childrenNodes[0].menuName;
        	main_label[0].menuPath=treeNodes[0].childrenNodes[0].menuPath;
            treeNodes[0].childrenNodes[0].isOpen=true; 
            if(treeNodes[0].childrenNodes[0].childrenNodes.length>0){
            	main_label[0].id=$scope.treeNodes[0].childrenNodes[0].childrenNodes[0].id;
            	main_label[0].menuName=treeNodes[0].childrenNodes[0].childrenNodes[0].menuName;
            	main_label[0].menuPath=treeNodes[0].childrenNodes[0].childrenNodes[0].menuPath;
                treeNodes[0].childrenNodes[0].childrenNodes[0].isOpen=true; 
                if(treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes.length>0){
                	main_label[0].id=$scope.treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes[0].id;
                	main_label[0].menuName=$scope.treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes[0].menuName;
                	main_label[0].menuPath=$scope.treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes[0].menuPath;
                    treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes[0].isOpen=true;
                }
                
            }

        }
		
		return main_label;
		
	}
	var main_name=function(treeNodes){
		
		var list=[];
		var main_name=[{
    		id:null,
    		list:list,
    		active:true
    	}];
		main_name[0].id=treeNodes[0].id;
		main_name[0].list[0]=treeNodes[0].menuName;
        if(treeNodes[0].childrenNodes.length>0){
        	main_name[0].id=treeNodes[0].childrenNodes[0].id;
            main_name[0].list[1]=treeNodes[0].childrenNodes[0].menuName;
            if(treeNodes[0].childrenNodes[0].childrenNodes.length>0){
            	main_name[0].id=treeNodes[0].childrenNodes[0].childrenNodes[0].id;
                main_name[0].list[2]=treeNodes[0].childrenNodes[0].childrenNodes[0].menuName;
                if(treeNodes[0].childrenNodes[0].childrenNodes.childrenNodes[0].childrenNodes.length>0){
                    main_name[0].id=treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes[0].id;
                    main_name[0].list[3]=treeNodes[0].childrenNodes[0].childrenNodes[0].childrenNodes[0].menuName;
                }
            }
        }
		
		return main_name;
	}
	var data={
		'main_name':main_name,
		'main_label':main_label
	}
	
	return data;
	
	
});

//分页
angular.module('paginationS', ['ui.serialize']).factory('paginationS', function(serialize,$http) {

	
    var getPage=function(src){
    	var dst={
    			target:null,
    			type:null,
    			thisp:null,
    			activeP:null,
    			totalPage:null	
    	}
    	
    	var data=angular.extend(dst,src);
        /*p为当前点击的页码 page 为现在显示的页面*/
        if(data.type == "page"){/*点击当前页数执行的请求*/
            if(data.activeP==data.thisp) return;
            data.activeP=data.thisp;

        }else if(data.type=="prev"){/*点击上一页数执行的请求*/  
            if((data.activeP-1)==0) return;
            data.activeP--;
        }else if(data.type=="next"){/*点击下一页数执行的请求*/
            if(data.activeP==data.totalPage) return;
            data.activeP++;
             
         }else if(data.type == "gogo" || ($(data.target.target).attr("data-type") == "enter" && data.target.keyCode == 13)){/*到指定页数执行的请求*/
            var pageNum=angular.element(".page_angular dl dd span.gogo input.number").val();
            if(pageNum>data.totalPage || pageNum<1 ) return;
            data.activeP = pageNum;
        }else if(data.type == "search"){
        	data.activeP=1;
        }
        return data.activeP;
    };
    var pageChange=function(src){
    	var dst={
    			total:null,
    			rowsPage:null,
    			page:null,
    			pagelength:null,
    			totalPage:null
    	}
    	
    	var data=angular.extend(dst,src);
        var d=data.page-6;      
        var showpage=[];
        var startChange=Math.ceil(data.pagelength/2);
        if(1<=data.page<=data.totalPage){
            if(data.totalPage<=data.pagelength){
                for(var i=1;i<=data.totalPage;i++){
                    showpage.push(i);
                }
            }else if(data.totalPage>data.pagelength){
                if(data.page<=startChange){
                    for(var i=1;i<=data.pagelength;i++){
                        showpage.push(i);
                    }
                }else if(data.page>startChange && data.page<=data.totalPage-startChange){
                    d++;
                    for(var i=d;i<d+data.pagelength;i++){
                        showpage.push(i);
                    }
                }else if(data.page>startChange && data.page>totalPage-startChange){
                    for(var i=data.totalPage-data.pagelength;i<=data.totalPage;i++){
                        showpage.push(i);
                    }
                }                       
            }
            
            return showpage;
        }
    };
    var paginat={
    		'pageChange':pageChange,
    		'getPage':getPage
    };
    return paginat;

});

/*基于angularjs 导航树 默认*/
angular.module('navTreeS', []).factory('navTree', function () {
	/* 一级导航切换 开关*/
    first_title=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'html':null,
    			'id':null,
    			'isLeaf':null,
    			'treeNodes':null,
    			'limitList':null
    	}
    	var data=angular.extend(dst,src);
        var status=data.treeNodes[data.i].isOpen;
        
        for(var a=0;a<data.treeNodes.length;a++){
        	data.treeNodes[a].isOpen=false;
            if(data.treeNodes[a].isLeaf) continue;
            for(var b=0;b<data.treeNodes[a].childrenNodes.length;b++){
            	data.treeNodes[a].childrenNodes[b].isOpen=false;
                if(data.treeNodes[a].childrenNodes[b].isLeaf) continue;
                for(var c=0;c<data.treeNodes[a].childrenNodes[b].childrenNodes.length;c++){
                	data.treeNodes[a].childrenNodes[b].childrenNodes[c].isOpen=false;
                    if(data.treeNodes[a].childrenNodes[b].childrenNodes[c].isLeaf) continue;
                    for(var d=0;d<data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
                    	data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].isOpen=false;

                    }
                }
            }

        }
 
        data.treeNodes[data.i].isOpen=!status;
        return data;
        
    }
	        
    /*一级导航复选框操作事件*/
    first_check=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'id':null,
    			'treeNodes':null
    	}
    	var data=angular.extend(dst,src);   	
        var status_a=!!data.treeNodes[data.i].checked;
        /*当前的取反*/
        data.treeNodes[data.i].checked=!status_a;
        for(var b=0;b<data.treeNodes[data.i].childrenNodes.length;b++){
        	data.treeNodes[data.i].childrenNodes[b].checked=!status_a; 
            if(data.treeNodes[data.i].childrenNodes[b].isLeaf) continue;
            for(var c=0;c<data.treeNodes[data.i].childrenNodes[b].childrenNodes.length;c++){
            	data.treeNodes[data.i].childrenNodes[b].childrenNodes[c].checked=!status_a;
                if(data.treeNodes[data.i].childrenNodes[b].childrenNodes[c].isLeaf) continue;
                for(var d=0;d<data.treeNodes[data.i].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
                	data.treeNodes[data.i].childrenNodes[b].childrenNodes[c].childrenNodes[d].checked=!status_a;
                }
            }
        }
        return data;
    }
            
    /* 点击二级导航开关*/
    second_title=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'html':null,
    			'id':null,
    			'isLeaf':null,
    			'treeNodes':null
    	}
    	var data=angular.extend(dst,src);
        var t=$(data.t);//去当前元素
        var tt=t.closest('ul');
        var a=tt.attr('attr-index')//找到索引
        var status=data.treeNodes[a].childrenNodes[data.i].isOpen;
        
        for(var b=0;b<data.treeNodes[a].childrenNodes.length;b++){
        	data.treeNodes[a].childrenNodes[b].isOpen=false;
            if(!data.treeNodes[a].childrenNodes[b].isLeaf) continue;
            for(var c=0;c<data.treeNodes[a].childrenNodes[b].childrenNodes.length;c++){
            	data.treeNodes[a].childrenNodes[b].childrenNodes[c].isOpen=false;
                if(!data.treeNodes[a].childrenNodes[b].childrenNodes[c].isLeaf) continue;
                for(var d=0;d<data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
                	data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].isOpen=false;

                }
            }
        } 
        for(var b=0;b<data.treeNodes[a].childrenNodes.length;b++){
        	data.treeNodes[a].childrenNodes[b].isOpen=false;

        }
        data.treeNodes[a].childrenNodes[data.i].isOpen=!status;
        
        return data;
    }

    second_check=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'id':null,
    			'treeNodes':null
    	}
    	var data=angular.extend(dst,src);
        var t=$(data.t);
        var a=t.closest('ul').attr('attr-index');    
        var status_a=data.treeNodes[a].childrenNodes[data.i].checked;                
        data.treeNodes[a].childrenNodes[data.i].checked=!status_a;
        for(var c=0;c<data.treeNodes[a].childrenNodes[data.i].childrenNodes.length;c++){   
        	data.treeNodes[a].childrenNodes[data.i].childrenNodes[c].checked=!status_a;
            if(data.treeNodes[a].childrenNodes[data.i].childrenNodes[c].isLeaf) continue;
            for(var d=0;d<data.treeNodes[a].childrenNodes[data.i].childrenNodes[c].childrenNodes.length;d++){
            	data.treeNodes[a].childrenNodes[data.i].childrenNodes[c].childrenNodes[d].checked=!status_a;
            }
        }
        /*操作上级元素  将上级父元素选中*/
        for(var b=0;b<data.treeNodes[a].childrenNodes.length;b++){
            /*如果当前元素被选中  执行操作将上级父元素选中*/
            if(data.treeNodes[a].childrenNodes[b].checked==true){
            	data.treeNodes[a].checked=true;
                    break ;
            }else{
            	data.treeNodes[a].checked=false;
               
            } 
        }
        return data;
     
    }

    third_title=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'html':null,
    			'id':null,
    			'isLeaf':null,
    			'treeNodes':null
    	}
    	var data=angular.extend(dst,src);
        var t=$(data.t);//去当前元素
        var tf=t.closest('ul');
        var tff=tf.parent().parent();
        var b=tf.attr('attr-index');//找到索引
        var a=tff.attr('attr-index');
        var idb=tf.attr('attr-id');//找到索引
        var ida=tff.attr('attr-id');
 
        var status=data.treeNodes[a].childrenNodes[b].childrenNodes[data.i].isOpen;
        for(var c=0;c<data.treeNodes[a].childrenNodes[b].childrenNodes.length;c++){
        	data.treeNodes[a].childrenNodes[b].childrenNodes[c].isOpen=false;
            if(!data.treeNodes[a].childrenNodes[b].childrenNodes[c].isLeaf) continue;
            for(var d=0;d<data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
            	data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].isOpen=false;

            }
        }
        data.treeNodes[a].childrenNodes[b].childrenNodes[data.i].isOpen=!status;
           
        return data;

    }
    third_check=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'id':null,
    			'treeNodes':null
    	}
    	var data=angular.extend(dst,src);
        var t=$(data.t);
        var tt=t.closest('ul');
        var b=tt.attr('attr-index');
        var ttt=tt.parent().parent();
        var a=ttt.attr('attr-index');
        var status_a=data.treeNodes[a].childrenNodes[b].childrenNodes[data.i].checked;
        data.treeNodes[a].childrenNodes[b].childrenNodes[data.i].checked=!status_a;
        /*操作下级元素 */
        for(var d=0;d<data.treeNodes[a].childrenNodes[b].childrenNodes[data.i].childrenNodes.length;d++){
        	data.treeNodes[a].childrenNodes[b].childrenNodes[i].childrenNodes[d].checked=!status_a;
        }
        /*操作上级元素  将上级父元素选中*/
        for(var c=0;c<data.treeNodes[a].childrenNodes[b].childrenNodes.length;c++){
        	/*如果当前元素被选中  执行操作将上级父元素选中*/
            if(data.treeNodes[a].childrenNodes[b].childrenNodes[c].checked){
            	data.treeNodes[a].checked=true;
            	data.treeNodes[a].childrenNodes[b].checked=true;
                break;
            }else{
            	data.treeNodes[a].checked=false;
            	data.treeNodes[a].childrenNodes[b].checked=false;
            	
            } 
        }
        return data;
    }

    /*导航四级标题点击事件*/
    fourth_title=function(src){
    	var dst={
    			't':null,
    			'i':null,
    			'html':null,
    			'id':null,
    			'isLeaf':null,
    			'treeNodes':null
    	}
    	var data=angular.extend(dst,src);
        var t=$(data.t);/*当前元素*/
        var tt=t.closest('ul');/*当前元素上一级 ul*/
        var ttt=tt.parent().parent();/*当前元素上一级 ul*/
        var tttt=ttt.parent().parent();/*当前元素上一级 ul*/
        var c=tt.attr('attr-index');
        var b=ttt.attr('attr-index');
        var a=tttt.attr('attr-index');

        var status=data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[data.i].isOpen;

        /*选择当前节点选中*/

        for(var d=0;d<data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
        	data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].isOpen=false;
        }   
        data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[data.i].isOpen=!status;

        return data;
    }
   fourth_check=function(src){
	   var dst={
   			't':null,
   			'i':null,
   			'id':null,
   			'treeNodes':null
   	}
   	var data=angular.extend(dst,src);
        var t=$(data.t);
        var tt=t.closest('ul');
        var c=tt.attr('attr-index');
        var ttt=tt.parent().parent();
        var b=ttt.attr('attr-index');
        var tttt=ttt.parent().parent();
        var a=tttt.attr('attr-index');
        var status_a=data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[data.i].checked;
        /*当前元素*/               
        data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[i].checked=!status_a;
        /*操作上级元素 */
        for(var d=0;d<data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
            /*当前元素上一级*/
            if(data.treeNodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].checked==true){
            	data.treeNodes[a].checked=true;
            	data.treeNodes[a].childrenNodes[b].checked=true;
            	data.treeNodes[a].childrenNodes[b].childrenNodes[c].checked=true;
                    break ;
            }else{
            	data.treeNodes[a].checked=false;
            	data.treeNodes[a].childrenNodes[b].checked=false;
            	data.treeNodes[a].childrenNodes[b].childrenNodes[c].checked=false;
                
            } 
        }
        return data;
    }
     var beforetree=function(nodes){
    	 
    	 for(var i=0;i<nodes.length;i++){/*1*/
    		 if(nodes[i].isLeaf){
    			 continue;
    		 };
    		 for(var j=0;j<nodes[i].childrenNodes.length;j++){/*2*/
    			 if(nodes[i].childrenNodes[j].isLeaf){
    				 if(nodes[i].childrenNodes[j].checked){
    					 nodes[i].checked=true;
    				 }
    				 continue;
        		 };
    			 for(var k=0;k<nodes[i].childrenNodes[j].childrenNodes.length;k++){/*3*/
    				 if(nodes[i].childrenNodes[j].childrenNodes[k].isLeaf){
    					 if(nodes[i].childrenNodes[j].childrenNodes[k].checked){
    						 nodes[i].checked=true;
    						 nodes[i].childrenNodes[j].checked=true;
        				 }
    					 continue;
            		 };
    				 for(var l=0;l<nodes[i].childrenNodes[j].childrenNodes[k].childrenNodes.length;l++){/*4*/
    					 if(nodes[i].childrenNodes[j].childrenNodes[k].childrenNodes[l].isLeaf){
    						 if(nodes[i].childrenNodes[j].childrenNodes[k].childrenNodes[l].checked){
    							 nodes[i].checked=true;
    							 nodes[i].childrenNodes[j].checked=true;
    							 nodes[i].childrenNodes[j].childrenNodes[k].checked=true;
            				 }
    						 continue;
                		 };
                		 
            		 }
        		 }
    		 }
    	 }
    	 return nodes;
    	 
     } 
     var getLimitId=function(nodes){
    	 var list=[];
    	 for(var a=0;a<nodes.length;a++){
    		 if(nodes[a].isLeaf){
    			 if(nodes[a].checked){
                	 list.push(nodes[a].id);
                	 continue;
                 }
    		 }
    		 for(var b=0;b<nodes[a].childrenNodes.length;b++){
    			 if(nodes[a].childrenNodes[b].isLeaf){
        			 if(nodes[a].childrenNodes[b].checked){
                    	 list.push(nodes[a].childrenNodes[b].id);
                    	 continue;
                     }
        		 }
    			 for(var c=0;c<nodes[a].childrenNodes[b].childrenNodes.length;c++){
        			 if(nodes[a].childrenNodes[b].childrenNodes[c].isLeaf){
            			 if(nodes[a].childrenNodes[b].childrenNodes[c].checked){
                        	 list.push(nodes[a].childrenNodes[b].childrenNodes[c].id);
                        	 continue;
                         }
            		 }
        			 for(var d=0;d<nodes[a].childrenNodes[b].childrenNodes[c].childrenNodes.length;d++){
            			 if(nodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].isLeaf){
                			 if(nodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].checked){
                            	 list.push(nodes[a].childrenNodes[b].childrenNodes[c].childrenNodes[d].id);
                            	 continue;
                             }
                		 }
            		 }
        		 }
    		 }
             
    		 
    	 }
    	 return list;
     }
	 var navTree={
		 'first_title':first_title,
		 'first_check':first_check,
		 'second_title':second_title,
		 'second_check':second_check,
		 'third_title':third_title,
		 'third_check':third_check,
		 'fourth_title':fourth_title,
		 'fourth_check':fourth_check,
		 'beforetree':beforetree,
		 'getLimitId':getLimitId
   	  };
	  

   	  return navTree;         

});
/*message*/
angular.module('ui.message', []).factory('message',function () {
	var success=function(src){
		var dst={time:3,content:'提示'};
		var data=angular.extend(dst,src);
		var body=angular.element('body');		
		$('<div class="message success">'+ data.content +'</div>').appendTo(body);
		setTimeout(function(){
			$('.message').remove()
		},data.time*1000);
    };
    var error=function(src){
    	var dst={
    			time:3,
    			content:'提示'
    			};
		var data=angular.extend(dst,src);
		var body=angular.element('body');		
		$('<div class="message error">'+ data.content +'</div>').appendTo(body);
		setTimeout(function(){
			$('.message').remove()
		},data.time*1000);
    };
	var message={
			'success':success,
			'error':error
	};
       
    return message;
});
/*数据共享服务*/
angular.module('ui.publicdata', []).factory('publicdata',function () {
     
	return {};
});
var serialize=function(form){
	var obj=[];
	var formobj=$(form);
	var list=formobj.find('[name]');
	for(var i=0;i<list.length;i++){
		var data={};
		var name=list[i].name;
		var value=list[i].value;
		if(value){
			if(!isNaN(value)){
    			value=value*1;
    		}
		}else{
			value=null;
		}
		
		data[name]=value;
		obj.push(data);
	};
	serialize_callback(obj);
}   

           


