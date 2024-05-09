function loadMinistryDivision(ele, target_class, office_class, old_data = '') {
    let _token = $('input[name="_token"]').val();
    let ministry_id = $(ele).val();
    $(ele).closest('tr').find("." + target_class).after('<span class="loading_data">Loading...</span>');
    $(ele).closest('tr').find("." + office_class).after('<span class="loading_data">Loading...</span>');
    var old_office_id = $(ele).closest('tr').find("." + office_class).val();
    if (ministry_id != 0 || ministry_id != '') {
        $.ajax({
            type: "POST",
            url: "/get_divisions_by_ministry_id",
            data: {
                _token: _token,
                ministry_id: ministry_id
            },
            success: function (response) {
                var option = '<option value="">Select one</option>';
                var officeOption = '<option value="">Select one</option>';
                if (response.responseCode == 1) {
                    $.each(response.data, function (id, value) {
                        if (id != '' && id.trim() == old_data) {
                            option += '<option value="' + id + '" selected>' + value + '</option>';
                        } else {
                            option += '<option value="' + id + '">' + value + '</option>';
                        }
                    });
                    $.each(response.officeData, function (id, value) {
                        if (id != '' && id.trim() == old_office_id) {
                            officeOption += '<option value="' + id + '" selected>' + value + '</option>';
                        } else {
                            officeOption += '<option value="' + id + '">' + value + '</option>';
                        }
                    });
                }
                $(ele).closest('tr').find("." + target_class).html(option);
                $(ele).closest('tr').find("." + office_class).html(officeOption);
                $(ele).closest('tr').find("." + target_class).next().hide('slow');
                $(ele).closest('tr').find("." + office_class).next().hide('slow');
                if(old_data != 0){
                    $(ele).closest('tr').find("." + target_class).trigger('change');
                }
            }
        });
    } else {
        var option = '<option value="">Select Ministry first</option>';
        $(ele).closest('tr').find("." + target_class).html(option);
        $(ele).closest('tr').find("." + target_class).next().hide('slow');
        $(ele).closest('tr').find("." + target_class).next().trigger('change');
    }
}

function loadMinistryOffice(ele, target_class, old_data = ''){
    let division_id = $(ele).val();
    let _token = $('input[name="_token"]').val();
    if (division_id != 0 || division_id != '') {
        $(ele).closest('tr').find("." + target_class).after('<span class="loading_data">Loading...</span>');
        $.ajax({
            type: "POST",
            url: "/get_offices_by_division_id",
            data: {
                _token: _token,
                division_id: division_id
            },
            success: function (response) {
                var option = '<option value="">Select One</option>';
                if (response.responseCode == 1) {
                    $.each(response.data, function (id, value) {
                        if (id != '' && id.trim() == old_data) {
                            option += '<option value="' + id + '" selected>' + value + '</option>';
                        } else {
                            option += '<option value="' + id + '">' + value + '</option>';
                        }
                    });
                }
                $(ele).closest('tr').find('.' + target_class).html(option);
                $(ele).closest('tr').find("." + target_class).next().hide('slow');
                if(old_data != 0){
                    $(ele).closest('tr').find("." + target_class).trigger('change');
                }

            }
        });
    }
}

function loadMinistryDesignation(ele, target_class, old_data = ''){
    let ministryOfficeId = $(ele).val();
    let _token = $('input[name="_token"]').val();
    $(ele).closest('tr').find("." + target_class).after('<span class="loading_data">Loading...</span>');
    $.ajax({
        type: "POST",
        url: "/get_designaton_by_office_id",
        data: {
            _token: _token,
            ministryOfficeId: ministryOfficeId
        },
        success: function (response) {
            var option = '<option value="">Select Designation</option>';
            if (response.responseCode == 1) {
                $.each(response.data, function (id, value) {
                    if (id.trim() == old_data) {
                        option += '<option value="' + id + '" selected>' + value + '</option>';
                    } else {
                        option += '<option value="' + id + '">' + value + '</option>';
                    }
                });
            }else{
                option = '<option value="">Select Office First</option>';
            }
            $(ele).closest('tr').find("."+ target_class).html(option);
            $(ele).closest('tr').find("." + target_class).next().hide('slow');
        }
    });
}
