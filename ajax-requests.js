// Filename: ajaxRequests.js

/**
 * AJAX Request Handling Examples
 *
 * This script demonstrates various ways to handle AJAX requests using jQuery.
 * It includes examples for GET and POST requests and handling responses.
 *
 * Usage:
 * - Include this script in your HTML file where AJAX requests are required.
 * - Ensure jQuery is loaded before this script.
 * - Replace the URLs and data structures with those relevant to your application.
 *
 * Note:
 * - The overlay function calls are placeholders for showing/hiding a loading indicator.
 * - These examples assume a server endpoint that responds with JSON data.
 */

/**
 * Example of a GET request
 */
function getQRCode(fileid) {
    $.ajax({
        url: "/qrcode/genereateqrcode/" + fileid, // Modify with your endpoint
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            overlay('show'); // Example function call before request
        },
        success: function (data) {
            overlay('hide'); // Hide overlay on success
            console.log("GET Response:", data);
        },
        error: function (error) {
            overlay('hide'); // Hide overlay on error
            console.error("GET Error:", error);
        }
    });
}

/**
 * Example of a POST request
 */
function submitFormData(formData) {
    $.ajax({
        url: "/submit-form", // Modify with your form submission endpoint
        type: "POST",
        data: formData,
        dataType: "json",
        contentType: false, // Set to false for multipart/form-data forms
        processData: false,
        beforeSend: function () {
            overlay('show'); // Show overlay when request starts
        },
        success: function (data) {
            overlay('hide'); // Hide overlay on success
            console.log("POST Response:", data);
        },
        error: function (error) {
            overlay('hide'); // Hide overlay on error
            console.error("POST Error:", error);
        }
    });
}

/**
 * Example function for overlay handling (to be implemented as per UI requirements)
 */
function overlay(action) {
    if (action === 'show') {
        // Show loading overlay
    } else {
        // Hide loading overlay
    }
}

// Usage examples (Uncomment to test)
// getQRCode(123); // Call with a file ID
// submitFormData({ name: 'John Doe', age: 30 }); // Call with form data
