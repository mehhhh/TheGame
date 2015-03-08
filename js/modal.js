/**
 * Created by jhtan on 3/8/15.
 */
(function ($) {
    "use strict";
    $(document).ready(function () {
        $('#continuePlaying').click(function () {
            game.paused = false;
        });

        $('#welcomeModal').modal()

        window.showAtmModal = function showAtmModal() {
            $('#atmModal').modal();
        }
    });
})(jQuery);
