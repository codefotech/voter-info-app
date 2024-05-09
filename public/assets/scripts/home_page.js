//for notice .....
let is_notice_loaded = false;


function LoadNotice() {
    if (!is_notice_loaded) {
        $.ajax({
            url: "/web/notice",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#showNotice").html(response.response);
                $('#noticeLoading').hide();
                is_notice_loaded = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}


//-----end notice -------


//for act and rules .....
let is_act_and_rules_loaded = false;


function LoadActandRules() {
    if (!is_act_and_rules_loaded) {
        $.ajax({
            url: "/web/act-and-rules",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#showActandRules").html(response.response);
                $('#actandRulesLoading').hide();
                is_act_and_rules_loaded = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

//-----end act and rules -------

//for user manual .....
let is_user_manual_loaded = false;


function LoadUserManual() {
    if (!is_user_manual_loaded) {
        $.ajax({
            url: "/web/user-manual",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#showUserManual").html(response.response);
                $('#userManualLoading').hide();
                is_user_manual_loaded = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

//-----end user manual -------

//for terms and conditions .....
let is_terms_and_conditions = false;


function LoadTermsAndConditions() {
    if (!is_terms_and_conditions) {
        $.ajax({
            url: "/web/terms-and-conditions",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#showtermsandCon").html(response.response);
                $('#termsandConLoading').hide();
                is_terms_and_conditions = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

//-----end terms and conditions -------

//for service list .....
let is_service_list = false;


function LoadServiceList() {
    if (!is_service_list) {
        $.ajax({
            url: "/web/service-list",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#showService").html(response.response);
                $('#serviceLoading').hide();
                is_service_list = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

//-----end service list -------


//for service list .....
let is_app_chart = false;


function LoadApplicationChart() {
    if (!is_app_chart) {
        $.ajax({
            url: "/web/application-chart",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#showApplicationChart").html(response.response);
                $("#applicationChartLoading").hide();
                is_app_chart = true;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}


LoadApplicationChart();

let notice_page_number = 1;

function loadMoreNotice() {
    const load_btn = document.getElementById("notice_load_btn");
    load_btn.disabled = true;

    const button_text = load_btn.innerText;
    const loading_sign = '...<i class="fa fa-spinner fa-spin"></i>';
    let has_available_notice = true;
    $.ajax({
        url: "/web/load-more-notice?page=" + ++notice_page_number,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            load_btn.innerHTML = button_text + loading_sign;
        },
        success: function (response) {
            if (response.data) {
                $('.news_inner_wrapper').append(response.data);
            } else {
                $('#notice_load_btn').hide();
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            $('#notice_load_btn').hide();

        },
        complete: function () {
            load_btn.innerText = button_text;
            if (has_available_notice) {
                load_btn.disabled = false;
            }
        }
    });
}


if (window.matchMedia('(max-width: 476px)').matches) {


    var maxLength = 200;

    $(".show-read-more").each(function(){
        var myStr = $(this).text();
        if($.trim(myStr).length > maxLength){
            var newStr = myStr.substring(0, maxLength);
            var removedStr = myStr.substring(maxLength, myStr.length);
            $(this).empty().html(newStr);
            $(this).append('<a href="javascript:void(0);" class="read-more" style="color: green">...আরো দেখুন</a>');
            $(this).append('<span class="more-text">' + removedStr + '</span>');
        }
    });
    $(".read-more").click(function(){
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
    });
}

var notice = $('#totalNotice').val();
if (notice == 0){
    $('#notice_load_btn').hide();
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
            // $('.chevron1_down').show();
            // $('.chevron1_up').addClass('hidden');
        } else {
            content.style.display = "block";
            // $('.chevron1_up').removeClass('hidden');
            // $('.chevron1_down').hide();
        }
    });
}



var same_count = '';
function loadCityOffice(e){
    const area_id = e;
    if (area_id !== same_count) {
        $.ajax({
            url: "/web/load-city-office",
            type: 'GET',
            dataType: 'json',
            data: {area_id: area_id},
            success: function (response) {
                same_count = area_id;
                $('#content'+e).html("");
                $.each(response, function (index, value) {

                    var html = '<div class="col-md-3 text-center">\n' +
                        '                                            <div class="location_item">\n' +
                        '                                                <div class="location-item-header">\n' +
                        '                                                    <img alt=\'...\' src="'+value.image+'">\n' +
                        '                                                </div>\n' +
                        '\n' +
                        '                                                <div class="location-item-content">\n' +
                        '                                                    <h3>'+value.name+'</h3>\n' +
                        '                                                    <p>জেলা\n' +
                        '                                                        : '+value.district_name+'</p>\n' +
                        '                                                    <p>উপজেলা\n' +
                        '                                                        : '+value.upazila_name+'</p>\n' +
                        '                                                </div>\n' +
                        '\n' +
                        '                                                <div class="location-item-footer">\n' +
                        '                                                    <a href="bscic-industrial-city/'+value.id+'">\n' +
                        '                                                        <button class="help_div">বিস্তারিত</button>\n' +
                        '                                                    </a>\n' +
                        '                                                </div>\n' +
                        '                                            </div>\n' +
                        '                                        </div>';


                    $('#content'+e).append(html);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {

            },
        });
    }

}

// Marquee Ticker
// $(function () {
//     var timer = !1;
//     _Ticker = $(".TickerNews").newsTicker({});
//     _Ticker.on("mouseenter", function () {
//         var __self = this;
//         timer = setTimeout(function () {
//             __self.pauseTicker();
//         }, 200);
//     });
//     _Ticker.on("mouseleave", function () {
//         clearTimeout(timer);
//         if (!timer) return !1;
//         this.startTicker();
//     });
// });
$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
});

// reset localstorage
localStorage.removeItem('collapsValue');

function lazyLoadSliderImage() {
    const imgDefer = document.getElementsByTagName('img');
    for (let i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        }
    }
}

window.onload = lazyLoadSliderImage;

// const swiper = new Swiper('.swiper-container', {
//     slidesPerView: 2,
//     spaceBetween: 0,
//     autoplay: true,
//     // init: false,
//     pagination: {
//         // el: '.swiper-pagination',
//         clickable: true,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     breakpoints: {
//         640: {
//             slidesPerView: 2,
//             spaceBetween: 0,
//         },
//         768: {
//             slidesPerView: 2,
//             spaceBetween: 0,
//         },
//         1024: {
//             slidesPerView: 2,
//             spaceBetween: 0,
//         },
//     }
// });
// window.onload = function(){
// document.getElementById('notice_content').onclick = function () {
//     LoadNotice();
// };
//
// document.getElementById('act_and_rules').onclick = function () {
//     LoadActandRules();
// };
//
// document.getElementById('user_manual').onclick = function () {
//     LoadUserManual();
// };
//
// document.getElementById('terms_and_conditions').onclick = function () {
//     LoadTermsAndConditions();
// };
//
// document.getElementById('service_list').onclick = function () {
//     LoadServiceList();
// };
//
// document.getElementById('application_chart').onclick = function () {
//     LoadApplicationChart();
// };

// LoadApplicationChart();
// }

//-----end service list -------
