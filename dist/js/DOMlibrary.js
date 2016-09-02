/*! domhelper-id.js */
function id(a) {
	$('.id').css('display', 'block'); 
}
/*! domhelper-nextEl.js */
function next(b) {
	$('.next').css('display', 'block');
}
/* domhelper-prevEl.js */
function prev(c) {
	$('.prev').css('display', 'block');
}
/* domhelper-tagEl.js */
function tag(d) {
	$('.tag').css('display', 'block')
						.stop()
						.animate({ opadity: 0.8 }, 500);
}
function addEvent() {
	$('.addEvent').css('display', 'block');
}
function removeEvent() {
	$('.removeEvent').css('display', 'block');
}