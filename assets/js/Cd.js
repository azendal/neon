Class('Cadmium')({
  prototype : {
    init : function( element ){
      this.element = element;
      //Copy to clipboard code block
      ZeroClipboard.setDefaults( { moviePath: 'assets/js/vendor/ZeroClipboard.swf' } );
      this.element.find('.code-copy').each(function( i, el ){
        zeroClip = new ZeroClipboard( el );
        zeroClip.on('complete', function(z, options){
          var text = options.text;

          //decode text
          text = text.replace(/\\n/g, '\n')
                     .replace(/\&dqu;/g, '"')
                     .replace(/\&squ;/g, '\'')
                     .replace(/\&amp;/g, "&")
                     .replace(/\&lt;/g, "<")
                     .replace(/\&gt;/g, ">");

          zeroClip.setText( text );
        });
      });

      this.stdlibTabs();

    },

    stdlibTabs : function(){
        var stdLibEl = this.element.find('.stdlib-tabs'),
            tabs     = stdLibEl.find('ul.stdlib-intro-table li'),
            contentW = stdLibEl.find('.stdlib-content-wrapper'),
            content  = stdLibEl.find('.stdlib-content');
        
        content.each(function(){
            $(this).attr('data-height', $(this).height());
        });

        //setup tabs
        content.hide().first().show();

        //show only clicked tab content
        tabs.click(function(){
          var tab        = $(this);
              tabContent = stdLibEl.find( '.'+tab.attr('data-content') );
          tabs.removeClass('active');
          tab.addClass('active');
          content.hide();
          tabContent.fadeIn();
          contentW.animate({height:tabContent.attr('data-height')},100);
        });

    }
  }
});

$(function(){
  window.Cd = new Cadmium( $('.wrapper') );
});