;(function($){
  var iwindow = {
    bgTemplate: '<div class="iwindow-bg"></div>',
    wrapperTemplate: '<div class="iwindow-wrapper"><div class="iwindow-toolbar">'+
      '<div class="iwindow-title">'+
      '</div>'+
      '<div class="iwindow-tool">'+
        '<span class="close">'+
        '  <img src="close.svg" alt="">'+
      '  </span>'+
    '  </div>'+
  '  </div>'+
  '  <div class="iwindow-content">'+
  '  </div></div>',
    currentZIndex: 1000,
    init: function(options){
      var defaults = {
        size:'normal',    //small,big,full
        title:'窗口标题',
        dragable:false
      };

      var options = $.extend(defaults, options);
      var iwindowInstance = this;
      this.each(function(){
        var $this = $(this);
        var data = {
          options: options
        }


        var $bg = $(iwindow.bgTemplate);
        var $wrapper = $(iwindow.wrapperTemplate);
        $wrapper.find('.iwindow-title').html(options.title);
        $wrapper.find('.iwindow-content').append($this)
        $wrapper.find('.iwindow-tool .close').click(function(){
          iwindow.hide.apply(iwindowInstance);
        });
        $bg.append($wrapper);
        $(document.body).append($bg)

        data.$bg = $bg;
        data.$wrapper = $wrapper;
        $this.data('iwindow',data);

        if(options.dragable){
          var $title = $wrapper.find('.iwindow-title');
          var titleId = 'iwindow-title-' + iwindow.currentZIndex;
          $title.addClass('dragable').attr('data-id', titleId);
          var isDragging = false, prevX = null, prevY = null;
          $(window).on('mousedown',function(event){
            if($(event.target).attr('data-id') == titleId){
              if(!isDragging){
                isDragging = true;
                prevX = event.pageX;
                prevY = event.pageY;
              }
            }

          }).on('mousemove',function(event){
            if (isDragging) {
              var left = parseFloat(data.$wrapper.css('left'));
              var top = parseFloat(data.$wrapper.css('top'));

              data.$wrapper.css({
                'left': left + (event.pageX - prevX) + 'px',
                'top': top + (event.pageY - prevY) + 'px',
              });

              prevX = event.pageX;
              prevY = event.pageY;
            }
          }).on('mouseup',function(){
            if (isDragging) {
              isDragging = false;
            }
          })
        }else{
          $(window).on('resize', function(){
            iwindow.center.apply(iwindowInstance);
          })
        }
      });

      return this;
    },
    center: function(){
      this.each(function(){
        var $this = $(this);
        var data = $this.data('iwindow');

        var wrapperWidth = data.$wrapper.find('.iwindow-content').width();
        var bgWidth = data.$bg.width();

        data.$wrapper.css('top', '80px');
        data.$wrapper.css('left', (bgWidth - wrapperWidth)/2 + 'px');

      });
    },
    show: function(){
      var allData = this.data('iwindow');
      var iwindowInstance = this;
      if(!allData){
        iwindow.init.apply(this, Array.prototype.slice.call(arguments, 0));
      }
      this.each(function(){
        var $this = $(this);
        var data = $this.data('iwindow');

        data.$bg.css('zIndex', ++iwindow.currentZIndex).show();

        iwindow.center.apply(iwindowInstance);

        $('.iwindow-wrapper').css('opacity', '0.5');
        data.$wrapper.css('opacity', '1');

      });
    },
    hide: function(){
      this.each(function(){
        var $this = $(this);
        var data = $this.data('iwindow');

        --iwindow.currentZIndex;
        data.$bg.css('zIndex', '').hide();
        var maxZIndex = 0, maxZIndexItem = null;
        $('.iwindow-bg:visible').each(function(){
          var zIndex = $(this).css('zIndex');
          if(zIndex > maxZIndex){
            maxZIndex = zIndex;
            maxZIndexItem = this;
          }
        });
        if(maxZIndexItem){
          $(maxZIndexItem).find('.iwindow-wrapper').css('opacity', '1');
        }
      })
    }
  }

  $.fn.iwindow = function(method){
    if(iwindow[method]){
      return iwindow[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }else if(typeof method === 'object' || !method){
      return iwindow.init.apply(this, arguments);
    }else{
      $.error('Method "' + method + '" does not exist on jQuery.iwindow');
    }
  };
})(jQuery);
