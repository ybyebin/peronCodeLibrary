function GetObj(objName){return document.getElementById?eval('document.getElementById("'+objName+'")'):eval("document.all."+objName)}function GoUp(e){MoveLock_1||(clearInterval(AutoPlayObj_1),MoveLock_1=!0,MoveWay_1="left",MoveTimeObj_1=setInterval(e,Speed_1))}function StopUp(e){"right"!=MoveWay_1&&(clearInterval(MoveTimeObj_1),(GetObj(e).scrollLeft-fill_1)%PageWidth_1!=0?(Comp_1=fill_1-GetObj(e).scrollLeft%PageWidth_1,CompScr_1(e)):MoveLock_1=!1)}function ScrUp(e){GetObj(e).scrollLeft<=0&&(GetObj(e).scrollLeft=GetObj(e).scrollLeft+GetObj(e).offsetWidth),GetObj(e).scrollLeft-=Space_1}function GoDown(e,o,t){clearInterval(MoveTimeObj_1),MoveLock_1||(clearInterval(AutoPlayObj_1),MoveLock_1=!0,MoveWay_1="right",ScrDown(e,o),MoveTimeObj_1=setInterval(t,Speed_1))}function StopDown(e){"left"!=MoveWay_1&&(clearInterval(MoveTimeObj_1),GetObj(e).scrollLeft%PageWidth_1-(fill_1>=0?fill_1:fill_1+1)!=0?(Comp_1=PageWidth_1-GetObj(e).scrollLeft%PageWidth_1+fill_1,CompScr_1(e)):MoveLock_1=!1)}function ScrDown(e,o){GetObj(e).scrollLeft>=GetObj(o).scrollWidth&&(GetObj(e).scrollLeft=GetObj(e).scrollLeft-GetObj(o).scrollWidth-40),GetObj(e).scrollLeft+=Space_1}function CompScr_1(e){if(0==Comp_1)return void(MoveLock_1=!1);var o,t=Speed_1,l=Space_1;Math.abs(Comp_1)<PageWidth_1/2&&(l=Math.round(Math.abs(Comp_1/Space_1)))<1&&(l=1),Comp_1<0?(Comp_1<-l?(Comp_1+=l,o=l):(o=-Comp_1,Comp_1=0),GetObj(e).scrollLeft-=o,setTimeout(CompScr_1(e),t)):(Comp_1>l?(Comp_1-=l,o=l):(o=Comp_1,Comp_1=0),GetObj(e).scrollLeft+=o,setTimeout(CompScr_1(e),t))}function picrun_ini(e,o,t){GetObj(e).innerHTML=GetObj(t).innerHTML,GetObj(o).scrollLeft=fill_1>=0?fill_1:GetObj(t).scrollWidth-Math.abs(fill_1)}var Speed_1=10,Space_1=20,PageWidth_1=500,interval_1=5e3,fill_1=0,MoveLock_1=!1,MoveTimeObj_1,MoveWay_1="right",Comp_1=0,AutoPlayObj_1=null;