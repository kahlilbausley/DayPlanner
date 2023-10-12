// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let events=[]
$(function () {
  let savebuttons=$("button.saveBtn").click(function(){
      let target=$(this);
      let parent=target.parent();
      console.log(target);
      console.log(parent);
      console.log(parent.index());
      let index=parent.index();
      let text=parent.find("textarea");
      events[index]=text.val();      
      savetolocal();
      

  })
  function savetolocal(){
    localStorage.setItem("userentry",events);



  }
  function applyclasses(){
    let timeblocks=$(".time-block");
    for(let index=0; index<timeblocks.length;index++){

      let timeblock=$(timeblocks[index]);
      let now=new Date();
      let currenthour=now.getHours();
      let idstring=$(timeblock).attr("id");
      let splitindex=idstring.indexOf("-");
      let hourstring=idstring.substring(splitindex+1,idstring.length);
      let hour=parseInt(hourstring);
      timeblock.removeClass("past");
      timeblock.removeClass("present");
      timeblock.removeClass("future");
      if (currenthour>hour){

       timeblock.addClass("past");
       
      }else if(currenthour==hour){
        timeblock.addClass("present");


           
      }else if(currenthour<hour){
        timeblock.addClass("future");

      }

    }
  }
  function loadfromlocal(){
    let eventstring=localStorage.getItem("userentry")
    if (eventstring){

      events=eventstring.split(",")
      let textfields=$("textarea");
      for(let index=0;index<events.length;index++){
        let event=events[index];
        let textarea=textfields.get(index);
        textarea.value=event;
        
      }
    }
  }
  loadfromlocal();
  applyclasses();

  let today=new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
  let todaynode=$("#currentDay");
  todaynode.html(today);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
