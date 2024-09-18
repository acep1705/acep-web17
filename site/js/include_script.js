include('request_url.js');
//----jquery-plagins----
include('jquery-1.8.3.min.js');
include('jquery.ba-resize.min.js');
include('jquery.easing.js');
include('jquery.mousewheel.min.js');
include('jquery.fancybox.pack.js');
include('uScroll.js');
include('gallery.js');
//----bootstrap----
//----All-Scripts----
include('TMForm.js');
include('jquery.mobilemenu.js');
include('scroll_to_top.js');
include('ajax.js.switch.js');
include('script.js');
//----Include-Function----
function include(url){ 
  document.write('<script type="text/javascript" src="js/'+ url + '"></script>'); 
  return false ;
}