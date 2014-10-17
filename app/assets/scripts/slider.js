function slider() {
  var $section      = $('section.gall'),
      $slider       = $section.find('.slider'),
      $item         = $slider.find('.item'),
      item_count    = $item.length,
      section_width = $section.width(),
      item_width    = section_width,
      $bullets      = $section.find('.bullets');

  $item.css('width', item_width);
  $slider.css('width', item_width * item_count);

  $(window).resize(function() {
    section_width = $section.width();
    item_width    = section_width;

    $item.css('width', item_width);
    $slider.css('width', item_width * item_count);
  });

  if (!$bullets.find(".selected").length > 0) {
    for (var i = item_count - 1; i >= 0; i--) {
      if (i === 0) {
        $bullets.prepend('<a class="selected bullet" href="#"></a>')
      } else {
        $bullets.prepend('<a class="bullet" href="#"></a>')
      }
    }
  }//if bullets are empty, populate

  var $bullet        = $bullets.find('a.bullet'),
      bullets_width  = $bullets.width(),
      bullets_length = $bullets.length,
      current        = 0,
      left           = 0;

  function moveSlider(to) {
    var previous_actual = $slider.find('.actual').index(),
        offset          = -(item_width * to),
        duration        = 450,
        next_actual,
        next;

    if (to < 0 || to >= item_count) {
      left = 0;
      to   = 0;
    } else {
      left = offset;
    }//else

    $slider.animate(
      { left: offset },
      duration,
      function() {
        $('.actual').removeClass('actual');
        current = to;
        $($('.item')[current]).addClass('actual');
        $bullet.removeClass('selected');
        $bullet.eq(current).addClass('selected');
      }//function
    );
  }//move slider

  $bullet.click(function(e) {
    var bullet_index = $(this).index();

    e.preventDefault();
    e.stopPropagation();
    moveSlider(bullet_index);

    // if ((bullet_index > 0) && bullet_index < (item_count - 1)) {
    //   $('a[class^="icn-arrow-"]').addClass('active');
    // } else if (bullet_index == 0) {
    //   $('a.icn-arrow-l').removeClass('active');
    // } else if (bullet_index === (item_count - 1)) {
    //   $('a.icn-arrow-r').removeClass('active');
    // }
  });

  // $bullets.find('.sign-up').click(function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   moveSlider(item_count - 1);
  // });

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
        $bullets.find('a.selected').prev($bullet).trigger('click');
      break;
      case 39: // right
      $bullets.find('a.selected').next($bullet).trigger('click');
      break;
      default: return; // exit this handler for other keys
    }
    e.preventDefault();
  });

  // $('a[class^="icn-arrow-"]').click(function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if ($(this).hasClass('icn-arrow-r')) {
  //     $bullets.find('a.selected').next($bullet).trigger('click');
  //   } else {
  //     $bullets.find('a.selected').prev($bullet).trigger('click');
  //   }
  // });


  $(window).resize(function() {
    $.doTimeout( 'resize', 150, function(){
      $bullets.find('a.selected').trigger('click');
    });// trigger events only once !!
  });

  // if (window.location.pathname.match('subscription')) {
  //   moveSlider(4);
  // }
}//slider function

function addTouchEvents () {
  $('section.landing .slider .item').swipe({
    //Generic swipe handler for left and right
    swipeLeft: function(event, direction, distance, duration, fingerCount) {
      var $current = $('div.bullets a.selected');
      $current.next('a').trigger('click');
    },
    swipeRight: function(event, direction, distance, duration, fingerCount) {
      var $current = $('div.bullets a.selected');
      $current.prev('a').trigger('click');
    }
  });
}// add touch events

$(document).ready(function() {
  slider();
  
});//DOM ready
