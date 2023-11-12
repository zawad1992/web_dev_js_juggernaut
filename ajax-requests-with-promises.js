// Filename: ajaxRequestsWithPromises.js

/**
 * AJAX Requests Using Promises
 *
 * This script demonstrates handling AJAX requests using JavaScript Promises with jQuery.
 * It includes examples of GET and POST requests and showcases how Promises improve handling asynchronous operations.
 *
 * Usage:
 * - Include this script in your HTML file where AJAX requests are needed.
 * - Ensure jQuery is loaded before this script.
 * - Replace the URLs and data structures as per your application's requirements.
 *
 * Note:
 * - The overlay function calls are placeholders and should be implemented according to your UI requirements.
 */

/**
 * Perform a GET request using Promises
 * @param {string} fileid - The file identifier.
 * @returns {Promise}
 */
function getQRCode(fileid) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/qrcode/genereateqrcode/" + fileid, // Modify with your endpoint
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                overlay('show');
            },
            success: function (data) {
                overlay('hide');
                resolve(data);
            },
            error: function (error) {
                overlay('hide');
                reject(error);
            }
        });
    });
}

/**
 * Perform a POST request using Promises
 * @param {Object} formData - The form data to submit.
 * @returns {Promise}
 */
function submitFormData(formData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/submit-form", // Modify with your form submission endpoint
            type: "POST",
            data: formData,
            dataType: "json",
            contentType: false,
            processData: false,
            beforeSend: function () {
                overlay('show');
            },
            success: function (data) {
                overlay('hide');
                resolve(data);
            },
            error: function (error) {
                overlay('hide');
                reject(error);
            }
        });
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
// getQRCode('123').then(data => console.log('GET Response:', data)).catch(error => console.error('GET Error:', error));
// submitFormData({ name: 'John Doe', age: 30 }).then(data => console.log('POST Response:', data)).catch(error => console.error('POST Error:', error));
