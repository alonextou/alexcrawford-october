/*
 * TreeList Widget
 *
 * Supported options:
 *  - handle - class name to use as a handle
 * 
 * Events:
 * - move.oc.treelist - triggered when a node on the tree is moved.
 * 
 * Dependences:
 * - Sortable Plugin (october.sortable.js)
 */
+function ($) { "use strict";

    var TreeListWidget = function (element, options) {

        var $el = this.$el = $(element),
            self = this;

        this.options = options || {};

        $el.find('> ol').sortable({
            handle: options.handle,
            onDrop: function($item, container, _super) {
                self.$el.trigger('move.oc.treelist', { item: $item, container: container })
                _super($item, container)
            }

        })

    }

    TreeListWidget.DEFAULTS = {
        handle: null
    }

    // TREELIST WIDGET PLUGIN DEFINITION
    // ============================

    var old = $.fn.treeListWidget

    $.fn.treeListWidget = function (option) {
        var args = arguments,
            result

        this.each(function () {
            var $this   = $(this)
            var data    = $this.data('oc.treelist')
            var options = $.extend({}, TreeListWidget.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('oc.treelist', (data = new TreeListWidget(this, options)))
            if (typeof option == 'string') result = data[option].call($this)
            if (typeof result != 'undefined') return false
        })

        return result ? result : this
      }

    $.fn.treeListWidget.Constructor = TreeListWidget

    // TREELIST WIDGET NO CONFLICT
    // =================

    $.fn.treeListWidget.noConflict = function () {
        $.fn.treeListWidget = old
        return this
    }

    // TREELIST WIDGET DATA-API
    // ==============
    
    $(document).render(function(){
        $('[data-control="treelist"]').treeListWidget();
    })

}(window.jQuery);