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
            tabs     = stdLibEl.find('ul li a'),
            content  = stdLibEl.find('>div');
            
        tabs.each(function(i, tab){
            tab.click(function( element ){
                var contentId = $(element).attr('href').replace('#','');
                content.hide();
            });
        });
    }
  }
});

$(function(){
  window.Cd = new Cadmium( $('.wrapper') );
});