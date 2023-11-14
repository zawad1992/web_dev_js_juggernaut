/**
 * jquery-toggle-class.js
 * 
 * This script is designed to toggle a CSS class on an element with the class 'flash-msg'
 * after a specified delay. This is typically used for flash messages in a web application.
 * 
 * Usage:
 * 1. Include this script in your HTML file.
 * 2. Add an HTML element with the class 'flash-msg' in your HTML file.
 * 3. The script will automatically toggle the 'hide-msg' class on this element after 6 seconds.
 * 
 * Example HTML structure:
 * 
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>Flash Message Example</title>
 *   <!-- Add your CSS link here -->
 *   <script src="path_to/jquery-toggle-class.js"></script>
 * </head>
 * <body>
 *   <!-- Flash message element -->
 *   <div class="flash-msg">
 *     Your flash message goes here.
 *   </div>
 *   <!-- Rest of your HTML content -->
 * </body>
 * </html>
 * 
 * Note: You can change the time limit by modifying the value inside the .delay() method.
 */

$(document).ready(function() {
    $('.flash-msg').delay(6000).queue(function() {
        $(this).toggleClass("flash-msg hide-msg");
    });
});
