/******* HTML FORM SHOULD BE *********
<div class="col-md-6 col-sm-6 col-xs-12">
    <select class="select2Ajsax form-control" style="width:100%" name="user_id"><option value="" selected="selected">Please Select</option></select>
    <input class="selectedUserName" name="user_name_with_code" type="hidden" value="">
    <input class="selectedUserId" name="user_name_with_id" type="hidden" value="">
</div>
*****************************************/
/*********** Imprtant Notice *************
Never ever call your select to by below mentioned form
$(".select2").select2({});
jQuery("select.select2").select2({placeholder: "Please select"});

*****************************************/

// JavaScript for Select2 AJAX Integration

// Initial values for Select2, if any
var initials = [];

// Retrieve previously selected values from hidden inputs
var pbUserName = $(".selectedUserName").val();
var pbUserId = $(".selectedUserId").val();

// If there are initial values, push them into the initials array
if (pbUserId && pbUserName) {
    initials.push({ id: pbUserId, unameWName: pbUserName });
}

// Initialize Select2 with AJAX source
$(".select2Ajax").select2({
    data: initials, // Set initial values
    ajax: {
        url: "/users/get-user-list", // Adjust URL to your endpoint
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                q: params.term, // search term
                page: params.page
            };
        },
        processResults: function (data, params) {
            params.page = params.page || 1;
            return {
                results: data,
                pagination: {
                    more: (params.page * 30) < data.total_count
                }
            };
        },
        cache: false
    },
    allowClear: true,
    placeholder: 'Search Customer List',
    escapeMarkup: function (markup) { return markup; }, // allow HTML in results
    minimumInputLength: 1,
    templateResult: formatRepo, // formatting the search results
    templateSelection: formatRepoSelection // formatting the selection
});

// Set the value of Select2 if there's an initial value
if (pbUserId) {
    $('.select2Ajax').val(pbUserId).trigger('change');
}

// Function to format each result
function formatRepo(repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.unameWName + "</div>" +
        "</div>" +
        "</div>";
    return markup;
}

// Function to format the selected item
function formatRepoSelection(repo) {
    return repo.unameWName || repo.text;
}

// Event listener for change on Select2
$(document).on("change", ".select2Ajax", function(e) {
    var data = $('.select2Ajax').select2('data')[0]; // Get selected data
    var userId = data.id; // Extract user ID
    var userName = data.unameWName; // Extract user name with code
    $(".selectedUserId").val(userId); // Set hidden input for user ID
    $(".selectedUserName").val(userName); // Set hidden input for user name
});
