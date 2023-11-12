// JavaScript for AJAX Page Loading

/**
 * This script handles click events on elements with the class `.ajax_page` to dynamically load content.
 * It supports loading content into a modal or directly into a page element.
 *
 * Usage:
 * - Apply the `.ajax_page` class to any element (e.g., link or button) intended for AJAX content loading.
 * - For modal loading, use `data-target` attribute to specify the target modal ID.
 * - Ensure that jQuery is included in your project.
 */

// Event listener for click on elements with `.ajax_page`
$(document).on("click", ".ajax_page", function (event) {
    event.preventDefault(); // Prevent default action

    var url, modal_id, is_modal = false;
    var page_title = $(this).text(); // Get the text of the clicked element

    // Determine URL from the element or its child
    if ($(this).attr('href') === undefined) {
        url = $(this).find('a').attr('href');
    } else {
        url = $(this).attr('href');
    }

    // Check if the clicked element targets a modal
    if ($(this).data('target') !== undefined) {
        modal_id = $(this).data('target');
        is_modal = true;

        // Show loading indicator in the modal
        var loading_html = '<div class="text-center"><i class="fa fa-spinner fa-spin fa-4x"></i><p class="text-warning">Loading...</p></div>';
        $(modal_id).find('.modal-content').html(loading_html);
    } else {
        // Show page-level overlay for loading
        overlay('show');
    }

    // AJAX request
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        success: function (data) {
            if (is_modal) {
                // Load data into modal and show it
                $(modal_id).find('.modal-content').html(data);
                $(modal_id).modal('show');
                $(modal_id).addClass('magictime spaceInDown');
            } else {
                // Load data into a page element
                $(".x_panel").html(data);
                $(".overlay, #flashMessage, .modal-backdrop").hide();
                changeUrlWithoutRefresh(page_title, url);
            }
            overlay('hide');
        },
        error: function (data, errorThrown) {
            // Error handling
            if (data.responseText) {
                var msg = '<div class="alert alert-danger" role="alert">' + data.responseText + '</div>';
                $("#abssl-alert-modal .modal-body").html(msg);
                $("#abssl-alert-modal").modal('show');
            } else {
                window.location.reload();
            }
        }
    });

    $(modal_id).removeClass('magictime spaceInDown');
});

/**
 * Function to change the URL without refreshing the page.
 * @param {string} page_title - The title to be set for the page.
 * @param {string} url - The URL to be pushed to browser history.
 */
function changeUrlWithoutRefresh(page_title, url) {
    document.title = page_title || $('head title').html();
    window.history.pushState({ state: page_title }, '', url);
}

/**
 * Example overlay function (to be implemented)
 * @param {string} action - Show or hide the overlay.
 */
function overlay(action) {
    if (action === 'show') {
        // Code to show overlay
    } else {
        // Code to hide overlay
    }
}


/********************************************************************************************
Instructions for Use:
    - Include this JavaScript code in your project where you need dynamic AJAX content loading.
    - Ensure the elements intended for AJAX loading have the class .ajax_page.
    - Modify the overlay function to match your project's overlay handling logic.
    - For modal interactions, ensure you have the corresponding modal structure in your HTML.
********************************************************************************************/