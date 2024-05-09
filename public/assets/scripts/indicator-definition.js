$(document).ready(function () {
    var form = $("#formId").show();
    form.find('#submitForm').addClass('hidden');
    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            if(currentIndex == 1){
                let selectedOptions = $('.srcMin').find(':selected');

                // Create an array to store the selected id => value pairs
                let selectedIdValuePairs = [];

                // Iterate through the selected options and populate the array
                selectedOptions.each(function() {
                    let option = $(this);
                    let id = option.val();
                    let value = option.text();
                    selectedIdValuePairs.push({ id: id, value: value });
                });

                var providerSourceSelectedIds = [];

                $('.provider_source_selected_id').each(function(index, element) {
                    var provider_source_selected_id = $(element).val();
                    providerSourceSelectedIds.push(provider_source_selected_id);
                });

                var providerSourceSelectedIds = [];

// Iterate through each element with the class 'provider_source_selected_id'
                $('.provider_source_selected_id').each(function(index, element) {
                    var provider_source_selected_id = $(element).val();
                    providerSourceSelectedIds.push(provider_source_selected_id);
                });

// Log the array to the console (you can do whatever you want with it)
                console.log(providerSourceSelectedIds);

// Populate the options of the first select element
                let sourceSelect = $('.source_provider_id');
                sourceSelect.empty(); // Clear existing options
                sourceSelect.append('<option value="" selected>Select source</option>'); // Add a default option

// Add options based on the selected values
                selectedIdValuePairs.forEach(function(pair) {
                    var option = $('<option value="' + pair.id + '">' + pair.value + '</option>');

                    // Check if the value is in the providerSourceSelectedIds array
                    if (providerSourceSelectedIds.includes(pair.id)) {
                        option.prop('selected', true);
                    }

                    sourceSelect.append(option);
                });

                // Log the array to the console (you can do whatever you want with it)
                // Populate the options of the first select element
//                 let sourceSelect = $('.source_provider_id');
//                 sourceSelect.empty(); // Clear existing options
//                 sourceSelect.append('<option value="" selected>Select source</option>'); // Add a default option
//
// // Add options based on the selected values
//                 selectedIdValuePairs.forEach(function(pair) {
//                     sourceSelect.append('<option value="' + pair.id + '">' + pair.value + '</option>');
//                 });

// Populate the options of the second select element
                let approverSourceSelect = $('.source_approver_id');
                approverSourceSelect.empty(); // Clear existing options
                approverSourceSelect.append('<option value="" selected>Select source</option>'); // Add a default option

// Add options based on the selected values
                selectedIdValuePairs.forEach(function(pair) {
                    approverSourceSelect.append('<option value="' + pair.id + '">' + pair.value + '</option>');
                });

                $('.source_provider_id').each(function (provider_key, providerElement) {
                    $('.provider_source_selected_id').each(function (value_key){
                        let selectedVal = $(this).val();
                        if (provider_key == value_key){
                            $(providerElement).val(selectedVal);
                        }
                    })
                });

                $('.source_approver_id').each(function (approver_key, approverElement) {
                    $('.approver_source_selected_id').each(function (value_key){
                        console.log(value_key);
                        let selectedVal = $(this).val();
                        if (approver_key == value_key){
                            $(approverElement).val(selectedVal);
                        }
                    })
                });

            }


            // return true;
            // Always allow previous action even if the current form is not valid!
            if (currentIndex > newIndex) {
                return true;
            }

            // Forbid next action on "Warning" step if the user is to young
            if (newIndex == 3) {
                return form.valid();
            }
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex) {
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate({
                    highlight: function (element, errorClass) {
                        var elem = $(element);
                        if (elem.hasClass("select2-hidden-accessible")) {
                            $("#select2-" + elem.attr("id") + "-container").css("color", "red");
                            $("#select2-" + elem.attr("id") + "-container").parent().css("border-color", "red");
                        } else {
                            elem.addClass(errorClass);
                        }
                    },
                    unhighlight: function (element, errorClass) {
                        var elem = $(element);
                        if (elem.hasClass("select2-hidden-accessible")) {
                            $("#select2-" + elem.attr("id") + "-container").css("color", "#444");
                            $("#select2-" + elem.attr("id") + "-container").parent().css("border-color", "#aaa");
                        } else {
                            elem.removeClass(errorClass);
                        }
                    }
                }
            ).settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {

        },

        onStepChanged: function (event, currentIndex, priorIndex) {
            if (currentIndex == 3) {
                form.find('#submitForm').removeClass('hidden');
                form.find('.finish').closest('li').css('display', 'none');

                $('#submitForm').on('click', function (e) {
                    form.validate().settings.ignore = ":disabled";
                    //console.log(form.validate().errors()); // show hidden errors in last step
                    return form.valid();
                });
            } else {
                form.find('#submitForm').addClass('hidden');
            }
        },

        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            //alert("Submitted!");
        }
    });

    $('.datepicker').datetimepicker({
        viewMode: 'years',
        format: 'YYYY',
        useCurrent: false
    });

    $('.entry_datepicker').datetimepicker({
        viewMode: 'months',
        format: 'DD-MMM',
    });

    $(".select2").select2();

    $(document).on('change','.radio', function() {
        $('.radio:checked').not(this).prop('checked', false)
        $(this).val(1)
    });
})

function loadOfficeInfo(ele, user_id = 0) {
    let userId = $(ele).val();
    var _token = $('input[name="_token"]').val();
    $.ajax({
        type: "post",
        url: "/indicator-definition/get-user-office",
        data: {
            _token: _token,
            userId: userId
        },
        success: function (response) {
            if ($(ele).hasClass('provider_id')) {
                var option = '<option value="">Select provider first and then office</option>';
            }
            if ($(ele).hasClass('approver_id')) {
                var option = '<option value="">Select approver first and then office</option>';
            }
            if ($(ele).hasClass('publisher_id')) {
                var option = '<option value="">Select publisher first and then office</option>';
            }
            if (response.responseCode == 1) {
                $.each(response.data, function (id, value) {
                    if (id.trim() == user_id) {
                        option += '<option value="' + id + '" selected>' + value + '</option>';
                    } else {
                        option += '<option value="' + id + '">' + value + '</option>';
                    }
                });
            }
            if ($(ele).hasClass('provider_id')) {
                $(ele).closest('tr').find('.office_info').html(option);
            }
            if ($(ele).hasClass('approver_id')) {
                $(ele).closest('tr').find('.approver_office_info').html(option);
            }
            if ($(ele).hasClass('publisher_id')) {
                $(ele).closest('tr').find('.publisher_office_info').html(option);
            }
        }
    });
}

function showDisaggDiv(indicatorId) {
    if (indicatorId == '') {
        $('#disagg_div').addClass('hidden')
    } else {
        var _token = $('input[name="_token"]').val();
        $.ajax({
            type: "post",
            url: "/indicator-definition/get-disagg-flag",
            data: {
                _token: _token,
                indicatorId: indicatorId
            },
            success: function (response) {
                if (response.responseCode == 1) {
                    $('#disagg_div').removeClass('hidden')
                    $('#parentIndicator').html(response.parentIndicator)
                } else {
                    $('#disagg_div').addClass('hidden')
                    $('#parentIndicator').html(response.parentIndicator)
                }
            }
        });
    }

}

function getDisaggName(disaggType, ele, old = 0) {
    if (disaggType != '') {
        var _token = $('input[name="_token"]').val();
        var option = '<option value="">Select one</option>';
        $.ajax({
            type: "post",
            url: "/indicator-definition/get-disagg-name",
            data: {
                _token: _token,
                disaggType: disaggType
            },
            success: function (response) {
                if (response.responseCode == 1) {
                    $.each(response.data, function (id, value) {
                        if (id.trim() == old) {
                            option += '<option value="' + id + '" selected>' + value + '</option>';
                        } else {
                            option += '<option value="' + id + '">' + value + '</option>';
                        }
                    });
                }
                $(ele).closest('tr').find('.disagrregation_id').html(option);
            }
        });
    }
}

function addTableRow(tableID, template_row_id) {
    if (tableID == 'leadMinistryTable') {
        $('.leadMin').select2('destroy');
    }
    if (tableID == 'coleadMinistryTable') {
        $('.colMin').select2('destroy');
    }
    if (tableID == 'associateleadMinistryTable') {
        $('.ascMin').select2('destroy');
    }
    if (tableID == 'sourceTable') {
        $('.srcMin').select2('destroy');
    }
    if (tableID == 'providerTable') {
        $('.provider_id').select2('destroy');
    }
    if (tableID == 'approverTable') {
        $('.approver_id').select2('destroy');
    }
    if (tableID == 'disagrregationTable') {
        $('.disagrregation_type').select2('destroy');
        $('.disagrregation_id').select2('destroy');
    }

    let i;
    // Copy the template row (first row) of table and reset the ID and Styling
    const new_row = document.getElementById(template_row_id).cloneNode(true);
    new_row.id = "";
    new_row.style.display = "";

    // Get the total row number, and last row number of table
    let current_total_row = $('#' + tableID).find('tbody tr').length;
    let final_total_row = current_total_row + 1;


    // Generate an ID of the new Row, set the row id and append the new row into table
    let last_row_number = $('#' + tableID).find('tbody tr').last().attr('data-number');
    if (last_row_number != '' && typeof last_row_number !== "undefined") {
        last_row_number = parseInt(last_row_number) + 1;
    } else {
        last_row_number = Math.floor(Math.random() * 101);
    }

    const new_row_id = 'rowCount' + tableID + last_row_number;
    new_row.id = new_row_id;
    $("#" + tableID).append(new_row);


    // Convert the add button into remove button of the new row
    $("#" + tableID).find('#' + new_row_id).find('.addTableRows').removeClass('btn-primary').addClass('btn-danger')
        .attr('onclick', 'removeTableRow("' + tableID + '","' + new_row_id + '")');

    // Icon change of the remove button of the new row
    $("#" + tableID).find('#' + new_row_id).find('.addTableRows > .fa').removeClass('fa-plus').addClass('fa-times');
    // data-number attribute update of the new row
    $('#' + tableID).find('tbody tr').last().attr('data-number', last_row_number);


    // Get all select box elements from the new row, reset the selected value, and change the name of select box
    const all_select_box = $("#" + tableID).find('#' + new_row_id).find('select');
    all_select_box.val(''); // value reset
    all_select_box.prop('selectedIndex', 0);
    for (i = 0; i < all_select_box.length; i++) {
        const name_of_select_box = all_select_box[i].name;
        const updated_name_of_select_box = name_of_select_box.replace('[0]', '[' + last_row_number + ']'); //increment all array element name
        all_select_box[i].name = updated_name_of_select_box;

        const onchange_attribute = all_select_box[i].getAttribute('onchange');
        if (onchange_attribute) {
            const parts = onchange_attribute.split(', ');
            if (parts.length === 4) {
                parts.splice(3, 1); // Remove the third parameter
                const updated_onchange_attribute = parts.join(', ') + ')';
                all_select_box[i].setAttribute('onchange', updated_onchange_attribute);
            }
        }
    }

    // Get all input box elements from the new row, reset the value, and change the name of input box
    const all_input_box = $("#" + tableID).find('#' + new_row_id).find('input');
    all_input_box.val(''); // value reset
    for (i = 0; i < all_input_box.length; i++) {
        const name_of_input_box = all_input_box[i].name;
        const updated_name_of_input_box = name_of_input_box.replace('[0]', '[' + last_row_number + ']');
        all_input_box[i].name = updated_name_of_input_box;
    }


    // Get all textarea box elements from the new row, reset the value, and change the name of textarea box
    const all_textarea_box = $("#" + tableID).find('#' + new_row_id).find('textarea');
    all_textarea_box.val(''); // value reset
    for (i = 0; i < all_textarea_box.length; i++) {
        const name_of_textarea = all_textarea_box[i].name;
        const updated_name_of_textarea = name_of_textarea.replace('[0]', '[' + last_row_number + ']');
        all_textarea_box[i].name = updated_name_of_textarea;
        $('#' + new_row_id).find('.readonlyClass').prop('readonly', true);
    }
    $("#" + tableID).find('.select2').select2();
    $("#" + tableID).find('#' + new_row_id).find('.normalSelect option:not(:first)').remove()
} // end of addTableRow() function

function removeTableRow(tableID, removeNum) {
    $('#' + tableID).find('#' + removeNum).remove();
}
