<?php
// Filename: ImagePreview.php

/**
 * Image Preview Before Upload
 *
 * This script allows users to view an image preview before uploading.
 * It uses PHP for backend processing and JavaScript (jQuery) for frontend interaction.
 *
 * Usage:
 * - Place this file on your server and access it through a web browser.
 * - Select an image file to see its preview before uploading.
 *
 * Note:
 * - This is a basic implementation. In a production environment, always validate and sanitize file inputs.
 */

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    tempFrontImage();
    exit;
}

function tempFrontImage() {
    if (isset($_FILES['item_img_fn']['tmp_name'][0])) {
        $imgFileF = file_get_contents($_FILES['item_img_fn']['tmp_name'][0]);
        $fileTypeF = $_FILES['item_img_fn']['type'][0];
        $fnImg = 'data:' . $fileTypeF . ';base64,' . base64_encode($imgFileF);
        echo $fnImg;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Preview Before Upload</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>Preview Image Before Upload</h1>
    <form id="im_img_data">
        <input type="file" id="item_img_fn" name="item_img_fn[]" accept="image/*">
        <div id="fn_image"></div>
    </form>

    <script>
        $("#item_img_fn").on('change', function(e) {
            var formData = new FormData($("#im_img_data")[0]);

            $.ajax({
                url: 'imagePreview.php', // Adjust the URL to this file
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                    $("#fn_image").html("<img width='150px' height='150px' src='" + returndata + "' />");
                },
                error: function(msg) {
                    alert('Error: ' + msg.statusText);
                }
            });

            return false;
        });
    </script>
</body>
</html>
