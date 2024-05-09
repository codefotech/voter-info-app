function loadMinistryDivision(ele, target_class, old_data = '') {
    let _token = $('input[name="_token"]').val();
    let ministry_id = $(ele).val();
    $(ele).closest('tr').find("." + target_class).after('<span class="loading_data">Loading...</span>');
    if (ministry_id != 0 || ministry_id != '') {
        $.ajax({
            type: "POST",
            url: "/users/get_ministry_division_by_ministry_id",
            data: {
                _token: _token,
                ministry_id: ministry_id
            },
            success: function (response) {
                var option = '<option value="">Select one</option>';
                if (response.responseCode == 1) {
                    $.each(response.data, function (id, value) {
                        if (id != '' && id.trim() == old_data) {
                            option += '<option value="' + id + '" selected>' + value + '</option>';
                        } else {
                            option += '<option value="' + id + '">' + value + '</option>';
                        }
                    });
                }
                $(ele).closest('tr').find("." + target_class).html(option);
                $(ele).closest('tr').find("." + target_class).next().hide('slow');
                if(old_data !== ""){
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
    let ministryDepartmentId = $(ele).val();
    let _token = $('input[name="_token"]').val();
    $(ele).closest('tr').find("." + target_class).after('<span class="loading_data">Loading...</span>');
    $.ajax({
        type: "POST",
        url: "/users/get_ministry_office_by_min_department_id",
        data: {
            _token: _token,
            ministryDepartmentId: ministryDepartmentId
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
            if(old_data !== ""){
                $(ele).closest('tr').find("." + target_class).trigger('change');
            }

        }
    });
}

function loadMinistryDesignation(ele, target_class, old_data = ''){
    let ministryOfficeId = $(ele).val();
    let _token = $('input[name="_token"]').val();
    $(ele).closest('tr').find("." + target_class).after('<span class="loading_data">Loading...</span>');
    $.ajax({
        type: "POST",
        url: "/users/get_designaton_by_office_id",
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
