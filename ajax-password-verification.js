/**
 * ajax-password-verification.js
 * 
 * This script is designed for handling password verification in a modal and 
 * managing page unload events in a web application.
 * 
 * Usage:
 * 1. Include this script in your HTML file.
 * 2. Ensure you have a modal element with id 'passwordModal' for password verification.
 * 3. Add elements with the class 'currentPassword' for the password input and 
 *    'currentPasswordErr' for displaying password error messages.
 * 4. Define 'actionName' variable in your HTML or JS file to determine the script's behavior.
 * 
 * Example HTML structure:
 * 
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>Password Verification</title>
 *   <!-- Add your CSS link here -->
 *   <script src="path_to/ajax-password-verification.js"></script>
 * </head>
 * <body>
 *   <!-- Password Modal -->
 *   <div id="passwordModal">
 *     <!-- Modal Content -->
 *     <input type="password" class="currentPassword" />
 *     <div class="currentPasswordErr"></div>
 *     <!-- Submit Button -->
 *     <button class="passwordSendBtn">Submit</button>
 *   </div>
 *   <!-- Rest of your HTML content -->
 * </body>
 * </html>
 * 
 * Note: The 'actionName' variable should be set to either 'edit' or 'add' 
 * to enable the respective functionalities.
 */

jQuery(document).ready(function(){
    // Check if the action is 'edit' for password verification
    if (actionName == "edit") {
        var wrongAttempt = 0;
        $('#passwordModal').modal({
            backdrop: 'static',
            keyboard: false
        });

        // Handle password verification on button click
        $(".passwordSendBtn").on("click",function(e){
            $(".currentPasswordErr").hide();
            var currentPassword = $(".currentPassword").val();
            if (currentPassword == "") {
                $(".currentPasswordErr").html("<b> Password is Required!!!!</b>");
                $(".currentPasswordErr").show();
            } else {
                $(".modal-layer").show(); // Show Ajax Loader
                $(".ajaxLoader").show(); // Show Ajax Loader
                var url = base_url+"Users/checkPassword";
                $.ajax({
                    type: "POST",
                    url: url,               
                    data: { currentPassword: currentPassword },              
                    success: function(response){
                        $(".modal-layer").hide();
                        $(".ajaxLoader").hide();
                        if (response == 1 || response == '1' ) {
                          wrongAttempt = 0;
                          $('#passwordModal').modal('hide') ;                    
                        } else {     
                          ++wrongAttempt;                 
                          $(".currentPasswordErr").html("<b> Password is Incorrect!!!! Attempt ("+wrongAttempt+")</b>");
                          $(".currentPasswordErr").show();
                          if (wrongAttempt == 3) {
                            window.location.href = base_url+"UserForceToLogout";
                          };
                        };
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        $(".modal-layer").hide();     
                        $(".ajaxLoader").hide();
                        $(".currentPasswordErr").html("<b> Internal Server Error!!!!</b>");
                    }
                });
            };

        }); 
    };

    // Handle onbeforeunload event for 'edit' or 'add' actions
    if (actionName == "edit" || actionName == "add") {      
        // This default onbeforeunload event
        var showMsg = "true";
        $(':submit').on('click', function(e) {
            showMsg = "false";          
        });
        /*$('form').on('submit', function(e) {
            showMsg = "false";         
        });*/

        window.onbeforeunload = function(){
            if (showMsg == "true") {
                return "Do you want to leave?";
            } else {
                return undefined;
            };
            
        }
        // A jQuery event (I think), which is triggered after "onbeforeunload"
        /*$(window).unload(function(){
            return true;
        });*/
    }
});
