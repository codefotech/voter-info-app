/**
 * Set default X-CSRF-TOKEN for all future ajax request.
 */
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


$(document).ready(function () {

    enableVerifyButton();
    $('input[name="nationality_type"]').on('change', enableVerifyButton);
    $('input[name="identity_type_bd"]').on('change', enableVerifyButton);
    $('input[name="identity_type_foreign"]').on('change', enableVerifyButton);
    $('#etin_number').on('keyup', enableVerifyButton);
    $('#user_DOB').on('keyup', enableVerifyButton);
    $('.userDP').on('dp.change', enableVerifyButton);
    $('#user_nid').on('keyup', enableVerifyButton);

    var today = new Date();
    var yyyy = today.getFullYear();
    $('.userDP').datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: 'now',
        minDate: '01/01/' + (yyyy - 110)
    });
    $('.passportDP').datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: 'now',
        minDate: '01/01/' + (yyyy - 110)
    });

    $(".passExpiryDate").datetimepicker({
        viewMode: 'years',
        format: 'DD-MMM-YYYY',
        maxDate: '01/01/' + (yyyy + 20),
        minDate: '01/01/' + (yyyy - 10)
    });

    /**
     * Form validation
     */
    $("#identityVerifyForm").validate({
        errorPlacement: function () {
            return false;
        },
        submitHandler: function (form) {
            var identity_type = getSelectedIdentityType();
            if (identity_type === 'nid') {
                $('#NIDVerifyModal').modal('show');
                return false;
            } else if (identity_type === 'tin') {
                $('#ETINVerifyModal').modal('show');
                return false;
            } else if (identity_type === 'passport') {
                form.submit();
            } else {
                alert('Sorry! unknown identity type');
                return false;
            }
        }
    });


    /**
     * Start NID API calling on shown NIDVerifyModal
     */
    $("#NIDVerifyModal").on('shown.bs.modal', function () {

        // On shown modal, block the NIDVerificationTimeCounting div, if it has been hidden
        document.getElementById('NIDVerificationTimeCounting').style.display = 'block';

        $("#NIDVerificationResponse").slideDown('slow', function () {
            $("#NIDVerificationResponse").html('<i class="fa fa-spinner fa-spin"></i> NID সিস্টেমে সংযোগ হচ্ছে, অনুগ্রহপূর্বক অপেক্ষা করুন.....');

            /**
             * submit_time need to assign before verifyNID() calling.
             * Because, this time will calculate inside the verifyNID() function.
             */
            submit_time = new Date();
            verifyNID();
        });
    });

    /**
     * Reset html element on hidden NIDVerifyModal
     */
    $('#NIDVerifyModal').on('hidden.bs.modal', function () {
        // Clear div of NID Verification Response
        document.getElementById('NIDVerificationResponse').innerHTML = '';

        // Reset NID info, name, gender, dob
        document.getElementById('VerifiedNIDInfo').style.display = 'none';
        document.getElementById('nid_image').setAttribute('src', '');
        document.getElementById('nid_name').innerHTML = '';
        document.getElementById('nid_dob').innerHTML = '';
        //document.getElementById('nid_gender').innerHTML = '';
        // Reset NID info, name, gender, dob

        // Re-hide the 'Save & continue' button
        document.getElementById('SaveContinueBtn').classList.add('hidden');

        $('.errorMsgNID').slideUp();

        // On modal close, disable NID verification calling.
        clearTimeout(setRecursionForNIDVerification);

        // Refresh the page
        location.reload();
    });


    /**
     * Start ETIN API calling on shown NIDVerifyModal
     */
    $("#ETINVerifyModal").on('shown.bs.modal', function () {
        $("#ETINResponseCountMsg").slideDown('slow', function () {
            $("#ETINResponseCountMsg").html('<i class="fa fa-spinner fa-spin"></i> Waiting for the connection to the NBR server.....');
            /**
             * submit_time need to assign before verifyETIN() calling.
             * Because, this time will calculate inside the verifyETIN() function.
             */
            submit_time = new Date();
            verifyETIN();
        });
    });

    /**
     * Reset html element on hidden ETINVerifyModal
     */
    $('#ETINVerifyModal').on('hidden.bs.modal', function () {
        // Clear div of ETIN Response count Message
        document.getElementById('ETINResponseCountMsg').innerHTML = '';
        // Reset ETIN info, name, dob
        document.getElementById('VerifiedETINInfo').style.display = 'none';
        document.getElementById('etin_name').innerHTML = '';
        document.getElementById('etin_dob').innerHTML = '';
        // Reset ETIN info, name, dob

        // Re-hide the 'Save & continue' button
        document.getElementById('etinSaveContinueBtn').classList.add('hidden');

        $('#ETINVerifyModal .errorMsgTIN').slideUp();

        // On modal close, disable NID verification calling.
        clearTimeout(setRecursionForNIDVerification);
    });
});

function enableVerifyButton() {
    var submit_button_status = false;

    // const nationality_type = $('input[name="nationality_type"]:checked').val();
    const nationality_type = $("#nationality_types").val();
    var etin_number = $('input[name="etin_number"]').val();
    var user_DOB = $('input[name="user_DOB"]').val();

    if (nationality_type == 'foreign') {

        const identity_type_foreign = $('input[name="identity_type_foreign"]:checked').val();
        if (identity_type_foreign == 'tin') {
            if (etin_number && user_DOB) {
                submit_button_status = true;
            }
        } else if (identity_type_foreign == 'passport') {
            submit_button_status = true;
        }

    } else if (nationality_type == 'bangladeshi') {

        const identity_type_bd = 'nid';
        if (identity_type_bd == 'nid') {
            const user_nid = $('input[name="user_nid"]').val();
            if (user_nid && user_DOB) {
                submit_button_status = true;
            }
        }

    }

    if (submit_button_status) {
        $("#nid_tin_verify").prop("disabled", false);
    }
}

/**
 * NID verification recursion variable (setRecursionForNIDVerification), which will used to stop recursion calling.
 */
var setRecursionForNIDVerification;

/**
 * ETIN verification recursion variable (setRecursionForETINVerification), which will used to stop recursion calling.
 */
var setRecursionForETINVerification;

function verifyNID() {
    var nid_number = document.getElementById("user_nid").value;
    var user_DOB = document.getElementById("user_DOB").value;
    var info_err = $('.errorMsgNID'); //get error message div
    var info_suc = $('.successMsgNID'); //get success message div
    if (nid_number == '' || user_DOB == '') {
        alert('Invalid National ID No. or Date of Birth');
    }

    var nid_length = nid_number.length;
    if (nid_length === 10 || nid_length === 13 || nid_length === 17) {
        $.ajax({
            url: '/client/signup/identity-verify/nid-tin-verify',
            type: 'GET',
            data: {
                _token: $('input[name="_token"]').val(),
                nid_number: nid_number,
                user_DOB: user_DOB,
                identity_type: 'nid'
            },
            datatype: 'json',
            success: function (response) {
                var NIDVerificationTimeCounting = document.getElementById('NIDVerificationTimeCounting');
                if (response.status === 'success') {
                    if (response.statusCode === 200) {

                        NIDVerificationTimeCounting.style.display = 'none';

                        // Put success message inside the NIDVerificationResponse div
                        document.getElementById('NIDVerificationResponse').innerHTML = 'Congrats!!! Your NID is valid.';

                        // Slide up NIDVerificationResponse div and slide down the NID details div
                        $('#NIDVerificationResponse').delay(1000).slideUp(1000, function () {
                            // NID details div slide down and put the details inside
                            $('#VerifiedNIDInfo').slideDown('slow');


                            document.getElementById('nid_image').setAttribute('src',  response.data.photo);
                            document.getElementById('nid_name').innerHTML = response.data.nameEn;
                            var nid_dob = new Date(response.data.dob);
                            document.getElementById('nid_dob').innerHTML = nid_dob.getDate() + "-" + nid_dob.toLocaleString('default', {month: 'short'}) + "-" + nid_dob.getFullYear();
                            //document.getElementById('nid_gender').innerHTML = response.data.gender;

                            // Show SaveContinueBtn button
                            document.getElementById('SaveContinueBtn').classList.remove('hidden');
                        });
                    } else {
                        // Reset error message div and put the message inside
                        info_err.hide().empty();

                        // Set the message based on different condition
                        if (NIDVerifyTimeCount() > 60 * 3) {
                            document.getElementById('NIDVerificationResponse').innerHTML = '<i class="fa fa-spinner fa-spin"></i> Its been 3 minute already!<br />We will try to verify for you, when server is available<br /><b>You can try again after some time...</b>';
                        } else if (response.status === 999) {
                            document.getElementById('NIDVerificationResponse').innerHTML = '<i class="fa fa-spinner fa-spin"></i> Your national ID information has been sent for verification, please wait...';
                        } else if (response.status === 777) {
                            document.getElementById('NIDVerificationResponse').innerHTML = '<i class="fa fa-spinner fa-spin"></i> Your national ID information has been sent to EC Server. Please wait for some more time...';
                        } else {
                            document.getElementById('NIDVerificationResponse').innerHTML = '<i class="fa fa-spinner fa-spin"></i> Waiting for response from the national ID server. Please wait...';
                        }
                    }
                }

                if (response.statusCode === 400) {
                    // Hide NIDVerificationTimeCounting div
                    NIDVerificationTimeCounting.style.display = 'none';

                    // Reset error message div and put the message inside
                    info_err.hide().empty();
                    if (response.data.response_messages.message) {
                        info_err.removeClass('hidden').html(response.data.response_messages.message);
                    } else {
                        info_err.removeClass('hidden').html(response.message);
                    }

                    // Slide up NIDVerificationResponse div and slide down error message div
                    $("#NIDVerificationResponse").slideUp('slow', function () {
                        info_err.slideDown('slow');
                    });
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

                // On modal close, disable NID verification calling.
                clearTimeout(setRecursionForNIDVerification);
            },
            beforeSend: function () {
            }
        });
    } else {
        $("#NIDVerificationResponse").slideUp('slow', function () {
            info_err.hide().empty();
            info_err.removeClass('hidden').html('Invalid NID length. It should be 10, 13 or 17 digits.');
            info_err.slideDown('slow');
        });

    }
}

/**
 * This variable will used to time counting in NID Verification.
 * we should declare the variable at first, for global scope.
 *
 * But, data will be assigned before verifyNID() function calling.
 */
var submit_time;

function NIDVerifyTimeCount() {
    var date1 = new Date();
    /**
     * submit_time must need to declared before verifyNID() calling
     *
     */
    return Math.floor((date1 - submit_time) / 1000);
}


function verifyETIN() {
    var etin_number = document.getElementById("etin_number").value;
    var user_DOB = document.getElementById("user_DOB").value;
    var info_err = $('.errorMsgTIN'); //get error message div
    var info_suc = $('.successMsgTIN'); //get success message div

    if (etin_number == '' || user_DOB == '') {
        alert('Invalid ETIN No. or Date of Birth');
    }
    var etin_length = etin_number.length;
    if (etin_length >= 10 && etin_length <= 15) {
        $.ajax({
            url: '/client/signup/identity-verify/etin-verify',
            type: 'GET',
            data: {
                _token: $('input[name="_token"]').val(),
                etin_number: etin_number,
                user_DOB: user_DOB,
            },
            datatype: 'json',
            success: function (response) {
                // Print validation errors or others error (Execution, try-catch, custom condition)
                if (response.status === 'error') {
                    info_err.hide().empty();
                    if (typeof response.message === 'object') {
                        $.each(response.message, function (index, error) {
                            info_err.removeClass('hidden').append('<li>' + error + '</li>');
                        });
                    } else {
                        info_err.removeClass('hidden').html(response.message);
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
                        document.getElementById('etin_name').innerHTML = response.data.nameEn;
                        document.getElementById('etin_father_name').innerHTML = response.data.father_name;
                        var etin_dob = new Date(response.data.dob);
                        document.getElementById('etin_dob').innerHTML = etin_dob.getDate() + "-" + etin_dob.toLocaleString('default', {month: 'short'}) + "-" + etin_dob.getFullYear();

                        // put etin data into hidden field
                        //document.getElementById('verified_etin_data').value = JSON.stringify(response.data);

                        document.getElementById('etinSaveContinueBtn').classList.remove('hidden');
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
                // On modal close, disable ETIN verification calling.
                clearTimeout(setRecursionForETINVerification);
            },
            beforeSend: function () {
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
 * This variable will used to time counting in ETIN Verification.
 * we should declare the variable at first, for global scope.
 *
 * But, data will be assigned before verifyETIN() function calling.
 */
var submit_time;

function ETINVerifyTimeCount() {
    var date1 = new Date();
    /**
     * submit_time must need to declared before verifyETIN() calling
     *
     */
    return Math.floor((date1 - submit_time) / 1000);
}

/**
 * Submit identity verification form from modal
 * @param form_name
 */
function submitIdentityVerifyForm(form_name) {
    document.forms[form_name].submit();
}

/**
 * Get selected identity type [e.g. NID, TIN, Passport]
 * @returns {*}
 */
function getSelectedIdentityType() {
    // var nationality_type = document.querySelector('input[name="nationality_type"]:checked').value;
    const nationality_type = 'bangladeshi';
    var identity_type;
    if (nationality_type === 'bangladeshi') {
        identity_type = 'nid';
    }
    return identity_type;
}

/**
 * Show nationality wise fields
 * @param nationality
 */
function setUserNationality(nationality) {
    $("#nationality_types").val(nationality);
    if (nationality === 'bangladeshi') {
        $('#nid_tin_verify').show();
    }

    // Trigger on user identity
    setUserIdentity();
}

/**
 * Show identity type wise fields
 * @param identity
 */
function setUserIdentity(identity) {
    if (identity === 'nid') {
        $('#nid_field').fadeIn();
        document.getElementById('user_nid').value = '';
        $('#user_dob_field').fadeIn();
        document.getElementById('user_DOB').value = '';
        $('#nid_tin_verify').show();
    }
}

$(document).ready(function () {

    $("#nid_tin_close").on('click', function () {
        location.reload();
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
                $(this).children(".large").css({left: px, top: py, backgroundPosition: bgp});
            }
        }
    }).on("mouseleave", function () {
        native_width = 0;
        native_height = 0;
        loadLocker = true;
    });

});
