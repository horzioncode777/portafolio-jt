const projectTabs=[...document.querySelectorAll('.workbench-tab')];
function selectProjectTab(tab,focus=false){
 projectTabs.forEach(item=>{
  const selected=item===tab;
  item.setAttribute('aria-selected',String(selected));
  item.tabIndex=selected?0:-1;
  document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;
 });
 if(focus)tab.focus();
}
projectTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectProjectTab(tab));
 tab.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowRight')next=(index+1)%projectTabs.length;
  else if(event.key==='ArrowLeft')next=(index-1+projectTabs.length)%projectTabs.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=projectTabs.length-1;
  else return;
  event.preventDefault();selectProjectTab(projectTabs[next],true);
 });
});
if(projectTabs.length)selectProjectTab(projectTabs[0]);
