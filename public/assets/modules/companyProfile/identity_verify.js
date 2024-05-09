$(document).ready(function () {
    //datePicker ....
    var today = new Date();
    var yyyy = today.getFullYear();

    // $('.userDP').datetimepicker({
    //     viewMode: 'years',
    //     format: 'DD-MMM-YYYY',
    //     maxDate: 'now',
    //     minDate: '01/01/' + (yyyy - 110)
    // });

    $('#datetimepicker4').datetimepicker({
        format: 'L',
        format: 'DD-MMM-YYYY',
        maxDate: 'now',
        minDate: '01/01/' + (yyyy - 110),
        ignoreReadonly: true,
    });


    $('#datetimepicker5').datetimepicker({
        format: 'L',
        format: 'DD-MMM-YYYY',
        maxDate: 'now',
        minDate: '01/01/' + (yyyy - 110),
        ignoreReadonly: true,
    });



    $('.dobDP').datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: '01/01/' + (yyyy + 20),
        minDate: '01/01/' + (yyyy - 10)
    });

    $('.eTinDP').datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: 'now',
        minDate: '01/01/' + (yyyy - 110)
    });

    $('.passportDOB').datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: 'now',
        minDate: '01/01/' + (yyyy - 110)
    });

    $('.passExpiryDate').datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: '01/01/' + (yyyy + 20),
        minDate: '01/01/' + (yyyy - 10)
    });

    LoadModalListOfDirectors();
});

/**
 * Show nationality wise fields
 * @param nationality
 */
function setUserNationality(nationality) {

    if (nationality === 'bangladeshi') {
        document.getElementById('bd_nationality_fields').style.display = 'block';
        document.getElementById('foreign_nationality_fields').style.display = 'none';
        $('input[name="identity_type_foreign"]').prop('checked', false);

        //hidden second step
        document.getElementById('nid_save').style.display = 'none';
        document.getElementById('tin_save').style.display = 'none';
        document.getElementById('passport_div').style.display = 'none';
    } else if (nationality === 'foreign') {
        document.getElementById('foreign_nationality_fields').style.display = 'block';
        document.getElementById('bd_nationality_fields').style.display = 'none';
        $('input[name="identity_type_bd"]').prop('checked', false);

        //hidden second step
        document.getElementById('nid_save').style.display = 'none';
        document.getElementById('tin_save').style.display = 'none';
        document.getElementById('passport_div').style.display = 'none';
    } else {
        document.getElementById('foreign_nationality_fields').style.display = 'none';
        document.getElementById('bd_nationality_fields').style.display = 'none';
    }

    // Trigger on user identity
    setUserIdentity();
}

/**
 * Show identity type wise div
 * @param identity
 */
function setUserIdentity(identity) {
    if (identity === 'nid') {
        document.getElementById('nid_verify').style.display = 'block';
        document.getElementById('tin_verify').style.display = 'none';
        //display none second step tin infomation
        document.getElementById('tin_save').style.display = 'none';
        document.getElementById('nid_save').style.display = 'none';
        document.getElementById('passport_div').style.display = 'none';

    } else if (identity === 'tin') {
        document.getElementById('tin_verify').style.display = 'block';
        document.getElementById('nid_verify').style.display = 'none';
        document.getElementById('passport_div').style.display = 'none';
        //display none second step nid information
        document.getElementById('nid_save').style.display = 'none';
        document.getElementById('tin_save').style.display = 'none';
    } else if (identity === 'passport') {
        document.getElementById('passport_div').style.display = 'block';
        document.getElementById('tin_verify').style.display = 'none';
        //display none second step tin information
        document.getElementById('tin_save').style.display = 'none';
    } else {
        document.getElementById('nid_verify').style.display = 'none';
        document.getElementById('tin_verify').style.display = 'none';
        document.getElementById('passport_div').style.display = 'none';
    }
}

/**
 * sumit form
 * @param form id
 * validation input field
 */
function submitIdentityVerifyForm(form_name) {
    $("#" + form_name).validate({
        errorPlacement: function () {
            return true;
        },
        submitHandler: function (form) {
            var getBtnId = document.activeElement.id;
            if (getBtnId === 'NIDVerifyBtn') {
                document.getElementById('NIDVerifyBtn').disabled = true;
                document.getElementById('NIDVerificationTimeCounting').style.display = 'block';
                document.getElementById('NIDVerificationResponse').style.display = 'block';
                $("#NIDVerificationResponse").slideDown('slow', function () {
                    $("#NIDVerificationResponse").html('<i class="fa fa-spinner fa-spin"></i>  NID সিস্টেমে সংযোগ হচ্ছে, অনুগ্রহপূর্বক অপেক্ষা করুন....');

                    /**
                     * submit_time need to assign before verifyNID() calling.
                     * Because, this time will calculate inside the verifyNID() function.
                     */
                    submit_time = new Date();
                    VerifyNID();
                    document.getElementsByClassName('round-btn').disabled = false;
                });

            } else if (getBtnId === 'TINVerifyBtn') {
                document.getElementById('TINVerifyBtn').disabled = true;

                document.getElementById('ETINResponseCountMsg').style.display = 'block';

                $("#ETINResponseCountMsg").slideDown('slow', function () {
                    $("#ETINResponseCountMsg").html('<i class="fa fa-spinner fa-spin"></i> Waiting for the connection to the NBR server.....');

                    /**
                     * submit_time need to assign before verifyETIN() calling.
                     * Because, this time will calculate inside the verifyETIN() function.
                     */
                    submit_time = new Date();
                    VerifyETIN();
                    document.getElementById('NIDVerifyBtn').disabled = false;
                });

            } else {

                /**
                 * form submit
                 * save NID, ETIN, passport information
                 * call function @formSubmit for ajax request
                 */
                formSubmit(getBtnId);
            }
        }
    });
}

var form = $("#directorVerifyForm"); //Get Form ID
var url = form.attr("action"); //Get Form action
var type = form.attr("method"); //get form's data send method
var info_err = $('.errorMsg'); //get error message div
var info_suc = $('.successMsg'); //get success message div

//============Ajax Setup===========//
function formSubmit(btn) {
    $.ajax({
        type: type,
        url: url,
        data: form.serialize(),
        dataType: 'json',
        beforeSend: function (msg) {
            $("#Duplicated jQuery selector").html('<i class="fa fa-cog fa-spin"></i> Loading...');
            $("#Duplicated jQuery selector").prop('disabled', true); // disable button
        },
        success: function (data) {
            //==========validation error===========//
            if (data.success == false) {
                info_err.hide().empty();
                $.each(data.error, function (index, error) {
                    info_err.removeClass('hidden').append('<li>' + error + '</li>');
                });
                info_err.slideDown('slow');
                info_err.delay(2000).slideUp(1000, function () {
                    $("#Duplicated jQuery selector").html('Submit');
                    $("#Duplicated jQuery selector").prop('disabled', false);
                });
            }
            //==========if data is saved=============//
            if (data.success == true) {
                info_suc.hide().empty();
                info_suc.removeClass('hidden').html(data.status);
                info_suc.slideDown('slow');
                info_suc.delay(2000).slideUp(800, function () {

                    if (btn == 'ETINVerifySave' || btn == 'passport_save_close' || btn == 'btn_save_close') {
                        window.location.href = data.link;
                    }

                    if (btn == 'ETINVerifySaveBtn' || btn == 'passport_save' || btn == 'btn_save') {
                        //hidden second step
                        document.getElementById('nid_save').style.display = 'none';
                        document.getElementById('tin_save').style.display = 'none';
                        document.getElementById('passport_div').style.display = 'none';
                        document.getElementById('bd_nationality_fields').style.display = 'none';
                        document.getElementById('foreign_nationality_fields').style.display = 'none';

                        document.getElementById('passport_div_verification').style.display = 'none';
                        document.getElementById('passport_upload_view_wrapper').style.display = 'none';
                        document.getElementById('passport_upload_div').style.display = 'block';
                        document.getElementById('passport_upload_wrapper').style.display = 'block';
                    }

                    if (btn == 'passport_save') {
                        $('#passport_reset_btn').click();
                    }
                });

                // form.trigger("reset");
                form.each(function () {
                    this.reset();
                });
            }
            //=========if data already submitted===========//
            if (data.error == true) {
                info_err.hide().empty();
                info_err.removeClass('hidden').html(data.status);
                info_err.slideDown();
                info_err.delay(8000).slideUp(800, function () {
                    $("#Duplicated jQuery selector").html('Submit');
                    $("#Duplicated jQuery selector").prop('disabled', false);
                });
            }

            //Load modal list of directors here
            LoadListOfDirectors();
            $('#myModal').modal('hide');
        },
        error: function (data) {
            var errors = data.responseJSON;
            $("#Duplicated jQuery selector").prop('disabled', false);
            alert('Sorry, an unknown Error has been occured! Please try again later.');
        }
    });
    return false;
}

function VerifyNID() {
    var info_err = $('.errorMsgNID'); //get error message div

    var nid_number = document.querySelector("input[name='user_nid']").value;
    var user_DOB = document.querySelector("input[name='nid_dob']").value;
    const identity_type = document.querySelector('input[name="identity_type"]:checked').value;

    var nid_length = nid_number.length;
    if (nid_length === 10 || nid_length === 13 || nid_length === 17) {
        $.ajax({
            url: '/client/signup/identity-verify/nid-tin-verify',
            type: 'GET',
            data: {
                nid_number: nid_number,
                user_DOB: user_DOB,
                identity_type: identity_type
            },
            datatype: 'json',
            success: function (response) {

                var NIDVerificationTimeCounting = document.getElementById('NIDVerificationTimeCounting');

                // Print validation errors or others error (Execution, try-catch, custom condition)
                if (response.status === 'error') {
                    // Hide NIDVerificationTimeCounting div
                    NIDVerificationTimeCounting.style.display = 'none';

                    // Reset error message div and put the message inside
                    info_err.hide().empty();

                    if (typeof response.message == 'object') {
                        Object.entries(response.message).forEach(message => {

                            const [key, messages] = message;

                            if (typeof messages == 'object') {

                                Object.entries(messages).forEach(messages => {
                                    const [index, value] = message;
                                    // info_err.removeClass('d-none').append(value + '<br/>');
                                    info_err.show().append('<li>' + error + '</li>');
                                });
                            } else {
                                info_err.show().html(messages);
                            }

                        });
                    } else {
                        info_err.show().html(response.message);
                    }

                    // Slide up NIDVerificationResponse div and slide down error message div
                    $("#NIDVerificationResponse").slideUp('slow', function () {
                        info_err.slideDown('slow');
                    });
                }
                // End Print validation errors or others error (Execution, try-catch, custom condition)

                if (response.status === 'success') {
                    if (response.statusCode === 200) {
                        // Hide NIDVerificationTimeCounting div
                        NIDVerificationTimeCounting.style.display = 'none';
                        // Put success message inside the NIDVerificationResponse div
                        document.getElementById('NIDVerificationResponse').innerHTML = 'Congrats!!! Your NID is valid.';
                        // Slide up NIDVerificationResponse div and slide down the NID details div
                        $('#NIDVerificationResponse').delay(1000).slideUp(1000, function () {

                            // NID details div slide down and put the details inside
                            $('#VerifiedNIDInfo').slideDown('slow');
                            //$('#step_one').slideUp('slow');
                            $('#nid_verify').slideUp('slow');
                            $('#nid_save').slideDown('slow');
                            $('input[name="user_nid"]').val(nid_number);
                            $('input[name="nid_name"]').val(response.data.nameEn);
                            if (response.data.gender === "male") {
                                document.getElementById('maleRadio').checked = true;
                            } else if (response.data.gender === "female") {
                                $document.getElementById('femaleRadio').checked = true;
                            } else {
                                $document.getElementById('otherRadio').checked = true;
                            }
                            $("#nid_nationality").val("18").change();
                            $("#nid_nationality").attr("readonly", true);
                            $("#nid_nationality").css({ 'pointer-events': 'none' });
                            var nid_dob = new Date(response.data.dob);
                            document.getElementById('save_nid_dob').innerHTML = nid_dob.getDate() + "-" + nid_dob.toLocaleString('default', { month: 'short' }) + "-" + nid_dob.getFullYear();
                        });
                    }
                } else {
                    if (response.statusCode === 400) {
                        // Hide NIDVerificationTimeCounting div
                        $('#NIDVerificationResponse').hide();
                        info_err.hide().empty();
                        info_err.removeClass('hidden').html('Invalid NID or Date of Birth.');
                        info_err.slideDown('slow');
                    }
                    document.getElementById('NIDVerifyBtn').disabled = false;
                }
            },
            error: function (jqHR, textStatus, errorThrown) {
                // Reset error message div and put the message inside
                info_err.hide().empty();
                info_err.removeClass('hidden').html(errorThrown);

                // Slide up NIDVerificationResponse div and slide down error message div
                $("#NIDVerificationResponse").slideUp('slow', function () {
                    info_err.slideDown('slow');
                });
            },
            beforeSend: function () {
                // Reset error message div and put the message inside
                info_err.hide().empty();
            }
        });
    } else {
        $("#NIDVerificationResponse").slideUp('slow', function () {
            info_err.hide().empty();
            info_err.removeClass('hidden').html('Invalid NID length. It should be 10, 13 or 17 digits.');
            info_err.slideDown('slow');
        });
        document.getElementById('NIDVerifyBtn').disabled = false;
    }
}

function VerifyETIN() {
    var etin_number = document.getElementById("etin_number").value;
    var user_DOB = document.getElementById("etin_dob").value;
    const identity_type = document.querySelector('input[name="identity_type"]:checked').value;

    var info_err = $('.errorMsgTIN'); //get error message div

    if (etin_number == '' || user_DOB == '') {
        alert('Invalid ETIN No. or Date of Birth');
    }

    var etin_length = etin_number.length;

    if (etin_length >= 10 && etin_length <= 15) {
        $.ajax({
            url: '/client/signup/identity-verify/nid-tin-verify',
            type: 'GET',
            data: {
                etin_number: etin_number,
                user_DOB: user_DOB,
                identity_type: identity_type
            },
            datatype: 'json',
            success: function (response) {
                // Print validation errors or others error (Execution, try-catch, custom condition)
                if (response.status === 'error') {
                    info_err.hide().empty();

                    if (typeof response.message == 'object') {
                        Object.entries(response.message).forEach(message => {

                            const [key, messages] = message;

                            if (typeof messages == 'object') {

                                Object.entries(messages).forEach(messages => {
                                    const [index, value] = message;
                                    // info_err.removeClass('d-none').append(value + '<br/>');
                                    info_err.show().append('<li>' + error + '</li>');
                                });
                            } else {
                                info_err.show().html(messages);
                            }

                        });
                    } else {
                        info_err.show().html(response.message);
                    }

                    $("#ETINResponseCountMsg").slideUp('slow', function () {
                        info_err.slideDown('slow');
                        // info_err.delay(2000).slideUp(1000, function () {
                        //     $('#ETInVerifyModal').modal('hide');
                        // });
                    });
                }
                // End Print validation errors or others error (Execution, try-catch, custom condition)


                if (response.status === 'success') {
                    var ETINVerifySuccessMsg = document.getElementById('ETINVerifySuccessMsg');
                    // Reset ETINVerifySuccessMsg div
                    ETINVerifySuccessMsg.style.display = 'none';

                    document.getElementById('ETINResponseCountMsg').innerHTML = 'Congrats!!! Your ETIN is valid.';

                    $('#ETINResponseCountMsg').delay(1000).slideUp(1000, function () {

                        $('#VerifiedETINInfo').slideDown('slow');

                        //$('#step_one').slideUp('slow');
                        $('#tin_verify').slideUp('slow');
                        $('#tin_save').slideDown('slow');

                        $('input[name="etin_name"]').val(response.data.nameEn);
                        $('input[name="user_etin"]').val(etin_number);
                        var etin_dob = new Date(response.data.dob);
                        document.getElementById('save_etin_dob').innerHTML = etin_dob.getDate() + "-" + etin_dob.toLocaleString('default', { month: 'short' }) + "-" + etin_dob.getFullYear();
                        // put etin data into hidden field
                        //document.getElementById('verified_etin_data').value = JSON.stringify(response.data);

                        //document.getElementById('etinSaveContinueBtn').classList.remove('hidden');
                    });

                }
            },
            error: function (jqHR, textStatus, errorThrown) {
                info_err.hide().empty();
                info_err.removeClass('hidden').html(errorThrown);

                $("#ETINResponseCountMsg").slideUp('slow', function () {
                    info_err.slideDown('slow');
                    // info_err.delay(1000).slideUp(1000, function () {
                    //     $('#ETINVerifyModal').modal('hide');
                    // });
                });
            },
            beforeSend: function () {
                info_err.hide().empty();
            }
        });
    } else {
        $("#ETINResponseCountMsg").slideUp('slow', function () {
            info_err.hide().empty();
            info_err.removeClass('hidden').html('The e-tin number must be between 10 and 15 digits.');
            info_err.slideDown('slow');
            // info_err.delay(1000).slideUp(1000, function () {
            //     $('#ETINVerifyModal').modal('hide');
            // });
        });

    }
}

/**
 * Passport image preset info
 */
var cropper;
var canvas;
var is_passport_croped;
var image = document.getElementById('passport_upload_view');

/**
 * Passport image removed/ reset
 */
$("#passport_reset_btn").click(function () {

    cropper.destroy();
    cropper = null;

    $('#passport_upload_base_code').val('');
    $('#passport_file_name').val('');
    $('#passport_upload_manual_file').val('');
    $('#passport_cropped_result').html('');
    $('#passport_upload').val('');

    $('#passport_upload_view').attr('src', '#');
    $('div.cropper-container').remove();

    document.getElementById('passport_upload_view_div').style.display = 'block';
    document.getElementById('passport_edit_btn').style.display = 'none';
    document.getElementById('passport_crop_btn').style.display = 'block';
    document.getElementById('passport_upload_view_wrapper').style.display = 'none';
    document.getElementById('passport_upload_div').style.display = 'block';
    $("#passport_verify").hide();
});

/**
 * Passport image edit/ resize option
 */
$("#passport_edit_btn").click(function () {
    $("#passport_verify").hide();
    document.getElementById('passport_cropped_result').style.display = 'none';
    document.getElementById('passport_edit_btn').style.display = 'none';
    document.getElementById('passport_upload_view_div').style.display = 'block';
    document.getElementById('passport_crop_btn').style.display = 'block';
});

/**
 * Passport image crop and set value
 */
$("#passport_crop_btn").click(function () {

    // If user don't crop the image then show the alert
    if (is_passport_croped == 'no') {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please follow the instruction shown on the right side, and position the rectangular properly to crop your proper passport image.'
        });
        return false;
    }

    document.getElementById('passport_preloader').style.display = 'block';
    document.getElementById('passport_upload_view_div').style.display = 'none';
    document.getElementById('passport_crop_btn').style.display = 'none';

    canvas = cropper.getCroppedCanvas({
        width: 1492,
        height: 2087,
    }).toDataURL('image/jpeg', 0.7); // 1.0 = image full quality
    //console.log(canvas);
    var passport_file_name = $('#passport_file_name').val();

    $('#passport_upload_base_code').val(canvas);

    document.getElementById('passport_cropped_result').style.display = 'block';
    $('#passport_cropped_result').html('');
    $('#passport_cropped_result').html('<div style="padding: 10px 15px;" class="panel-heading"><h3 class="panel-title">File name: ' + passport_file_name + '</h3></div><div class="panel-body"><img alt="Passport copy" src="' + canvas + '" /></div>');
    document.getElementById('passport_edit_btn').style.display = 'block';

    // magnify
    $('#magnify_image_large').css({ 'background-image': 'url(' + canvas + ')', 'background-repeat': 'no-repeat' });
    $('#magnify_image_small').attr('src', canvas);

    $("#passport_verify").show();

    toastr.success('Passport cropped and resized.');
    document.getElementById('passport_preloader').style.display = 'none';
});

/**
 * Passport image initialization for crop
 */
function initPassportCropper() {
    cropper = new Cropper(image, {
        viewMode: 1,
        ready: function () {
            is_passport_croped = 'no';
        },
        crop: function (e) {
            is_passport_croped = 'yes';
            //crop_data_info.textContent = JSON.stringify(cropper.getData(true));
        }
    });

    document.getElementById('passport_preloader').style.display = 'none';
}

/**
 * Passport image upload
 * @param input_data
 */
function getPassportImage(input_data) {

    $('.no-js').css('overflow', 'hidden');
    if (input_data.files && input_data.files[0]) {

        $("#passport_upload_error").html('');

        // validated image height and width
        var _URL = window.URL || window.webkitURL;
        var image = new Image();
        image.src = _URL.createObjectURL(input_data.files[0]);
        image.onload = function () {
            if ((4500 < this.height || 3500 < this.width) || (1043 > this.height || 746 > this.width)) {
                $("#passport_upload_error").html('<div class="alert alert-warning fade in" role="alert"><h4>Warning! Better check yourself. </h4><p>The passport image resolution minimum <strong>746X1043</strong> pixel and maximum <strong>3500X4500</strong> pixel is suitable for verify. You have given <strong>' + this.width + 'x' + this.height + ' </strong> pixel.</p></div>');
            }
        };

        // Validate image type
        var mime_type = input_data.files[0].type;
        if (!(mime_type == 'image/jpeg' || mime_type == 'image/jpg' || mime_type == 'image/png')) {
            $("#passport_upload_error").html('<div class="alert alert-danger fade in" role="alert"><h4>Oh snap! You got an error!</h4><p>The passport format is not valid. Only PNG, JPEG, or JPG type is allowed.</p></div>');
            return false;
        }

        // validated image size
        if (!(input_data.files[0].size <= 5242880)) { // 5mb = 5242880, 1mb = 1048576
            $("#passport_upload_error").html('<div class="alert alert-danger fade in" role="alert"><h4>Oh snap! You got an error!</h4><p>The passport size maximum of 5 MB.</p></div>');
            return false;
        }

        document.getElementById('passport_upload_div').style.display = 'none';
        document.getElementById('passport_preloader').style.display = 'block';

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#passport_upload_view').attr('src', e.target.result);
            $('#passport_upload_base_code').val(e.target.result);
            $('#passport_file_name').val(input_data.files[0].name);
            //console.log(e.target.result);
            // manual file
            $('#passport_upload_manual_file').val(e.target.result);

            // magnify start
            $('#magnify_image_large').css({ 'background-image': 'url(' + e.target.result + ')', 'background-repeat': 'no-repeat' });
            $('#magnify_image_small').attr('src', e.target.result);
            // magnify end

            document.getElementById('passport_upload_view_wrapper').style.display = 'block';
        };
        reader.readAsDataURL(input_data.files[0]);

        setTimeout(initPassportCropper, 1000);
    }
}

$(document).ready(function () {

    $('#passport_error_retry').on('click', function () {
        $('#PassportErrorModal').modal('hide');
        $('#passport_reset_btn').trigger('click');
        $('#myModal').css('overflow', 'auto');
    });

    $('#passport_error_manual').on('click', function () {
        $('#PassportErrorModal').modal('hide');
        $('#myModal').css('overflow', 'auto');
        // file name
        var manual_file_name = $('#passport_file_name').val();
        var manual_file_data = $('#passport_upload_manual_file').val();
        $('#passport_file_name_show').text(manual_file_name);

        // magnify start
        $('#magnify_image_large').css({ 'background-image': 'url(' + manual_file_data + ')', 'background-repeat': 'no-repeat' });
        $('#magnify_image_small').attr('src', manual_file_data);
        // magnify end

        document.getElementById('passport_upload_wrapper').style.display = 'none';
        $("#preloader").hide().html('');
        document.getElementById('passport_div_verification').style.display = 'block';
        $('#passport_verify').hide();
        $('#passport_save').show();
        $('#passport_save_close').show();
    });

    $('#passport_verify').on('click', function () {
        document.getElementById('passport_verify').disabled = true;
        $("#preloader").show().html('<i class="fa fa-spinner fa-pulse"></i>');

        var file_data = $('#passport_upload_base_code').val(); // crop or origin image
        //var file_data = $('#passport_upload_manual_file').val(); // only origin image

        if (!file_data) {
            return false;
            document.getElementById('passport_verify').disabled = false;
        }

        $.ajax({
            url: '/client/signup/getPassportData',
            type: 'POST',
            dataType: 'text',           // what to expect back from the PHP script, if anything
            data: {
                _token: $('input[name="_token"]').val(),
                file: file_data,
                photo: 'yes',
            },
            success: function (response) {
                //console.log(response);
                var obj = JSON.parse(response);

                if (obj.code == '200') {

                    document.getElementById('passport_no').value = obj.data.document_number;
                    //                            document.getElementById('passport_type').value = obj.data.document_type;
                    $("#passport_nationality").val(obj.nationality_id).change();
                    $("#passport_type").val(obj.data.document_type.toLowerCase()).change();

                    var passport_dob = new Date(obj.data.birth_date);
                    var expiry_date = new Date(obj.data.expiry_date);

                    document.getElementById('passport_surname').value = obj.data.surname;
                    document.getElementById('passport_given_name').value = obj.data.name;
                    document.getElementById('passport_personal_no').value = obj.data.optional_data;
                    document.getElementById('passport_DOB').value = passport_dob.getDate() + "-" + passport_dob.toLocaleString('default', { month: 'short' }) + "-" + passport_dob.getUTCFullYear();
                    document.getElementById('passport_date_of_expire').value = expiry_date.getDate() + "-" + expiry_date.toLocaleString('default', { month: 'short' }) + "-" + expiry_date.getUTCFullYear();
                    //gender checked
                    if (obj.data.sex == 'M') {
                        $('input:radio[name="gender"][value="male"]').attr('checked', true);
                    } else {
                        $('input:radio[name="gender"][value="female"]').attr('checked', true);
                    }

                    document.getElementById('passport_upload_wrapper').style.display = 'none';
                    $("#preloader").hide().html('');
                    document.getElementById('passport_div_verification').style.display = 'block';
                    $('#passport_verify').hide();
                    // file name
                    var pass_file_name = $('#passport_file_name').val();

                    // empty manual file
                    $('#passport_upload_manual_file').val('');

                    $('#passport_file_name_show').text(pass_file_name);
                    $('#passport_save').show();
                    $('#passport_save_close').show();
                } else {
                    $("#preloader").hide().html('');
                    $('#PassportErrorModal').modal('show');
                    document.getElementById('passport_verify').disabled = false;
                }
            }
        });
    });

    // passport magnify
    var native_width = 0;
    var native_height = 0;
    var loadLocker = true;
    var image_object = null;

    // Now the mousemove function
    $(".magnify").mousemove(function (e) {
        if (!native_width && !native_height) {
            if (loadLocker) {
                loadLocker = false;
                image_object = new Image();
                image_object.src = $(this).children(".small").attr("src");
            }

            native_width = image_object.width;
            native_height = image_object.height;
        } else {
            var magnify_offset = $(this).offset();
            var mx = e.pageX - magnify_offset.left;
            var my = e.pageY - magnify_offset.top;

            if (mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
                $(this).children(".large").fadeIn(100);
            } else {
                $(this).children(".large").fadeOut(100);
            }
            if ($(this).children(".large").is(":visible")) {
                var rx = Math.round(mx / $(this).children(".small").width() * native_width - $(this).children(".large").width() / 2) * -1;
                var ry = Math.round(my / $(this).children(".small").height() * native_height - $(this).children(".large").height() / 2) * -1;
                var bgp = rx + "px " + ry + "px";
                var px = mx - $(this).children(".large").width() / 2;
                var py = my - $(this).children(".large").height() / 2;
                $(this).children(".large").css({ left: px, top: py, backgroundPosition: bgp });
            }
        }
    }).on("mouseleave", function () {
        native_width = 0;
        native_height = 0;
        loadLocker = true;
    });

});

/**
 * reset modal and value ...
 */
function closeModal() {
    // Clear div of NID Verification Response
    document.getElementById('NIDVerificationResponse').innerHTML = '';

    // Reset NID info, name, gender, dob
    document.getElementById('nid_name').innerHTML = '';
    document.getElementById('nid_dob').innerHTML = '';

    // Clear div of ETIN Response count Message
    document.getElementById('ETINResponseCountMsg').innerHTML = '';
    // Reset ETIN info, name, dob
    document.getElementById('etin_name').innerHTML = '';
    document.getElementById('etin_dob').innerHTML = '';
    // Reset ETIN info, name, dob

    // Refresh the page
    // location.reload();
    $("html").css({ "overflow": "auto" });

    LoadListOfDirectors();
}