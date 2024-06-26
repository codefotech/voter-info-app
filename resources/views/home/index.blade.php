<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>আলহাজ্ব শরীফ উদ্দিন খান মোমেন - চেয়ারম্যান পদপ্রার্থী</title>
    <meta name="description"
          content="স্মার্ট পাটগ্রাম উপজেলা বিনির্মাণে, উপজেলা চেয়ারম্যান পদপ্রার্থী হাজী শরীফ উদ্দিন খান মোমেন ভাইকে কাপ- পিরিচ মার্কায় ভোট দিন">
    <link rel="shortcut icon" href="{{ asset('img/favicon.ico') }}" type="image/x-icon">
    <!-- <link rel="preload" href="customcss/font-solaimanlipi/SolaimanLipi.woff2" as="font" type="font/woff2" crossorigin> -->
    <link rel="stylesheet" href="{{ asset('customcss/font-solaimanlipi/solaimanlipi.css') }}">
    <link rel="stylesheet" href="{{ asset('customcss/tatsama-font/tatsama-font.css') }}">
    <link rel="stylesheet" href="{{ asset('customcss/bundle.css') }}">
    <link rel="stylesheet" href="{{ asset('customcss/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('customcss/custom.css') }}">
</head>


<body>

<main class="top-main-wraper">

    <div class="man-top-visible-text">
        <h3 class="text-h3 font-solaimanlipi">স্মার্ট বেলাব উপজেলা বিনির্মাণে</h3>
        <h1 class="main-big-title font-solaimanlipi">আসন্ন উপজেলা পরিষদ নির্বাচনে<br>বেলাব উপজেলায়</h1>
    </div>

    <section class="main-container">
        <div class="main-left-container">
            <div class="left-column d-flex align-items-end">
                <img class="img-fluid person-photo" src="{{ asset('img/user.png') }}" alt="user"/>
            </div>

            <div class="middle-column ps-0 ps-md-15 pe-0 pe-lg-15">
                <div class="middle-content">
                    <div>
                        <div class="man-top-text">
                            <h3 class="text-h3 font-solaimanlipi">স্মার্ট বেলাব উপজেলা বিনির্মাণে</h3>
                            <h1 class="main-big-title font-solaimanlipi">আসন্ন উপজেলা পরিষদ নির্বাচনে<br> বেলাব উপজেলায়</h1>
                        </div>
                        <h5 class="data-title font-solaimanlipi p-2">২১ মে ২০২৪, মঙ্গলবার </h5>
                    </div>

                    <div class="green-title-name-wrap pb-80 pt-0 pt-xl-60 pb-xl-150">
                        <h5 class="election-designation mb-0 mb-md-0 font-solaimanlipi"><span>উপজেলা</span> <span class="green-big-word">চেয়ারম্যান</span> পদপ্রার্থী</h5>
                        <div class="main-name-wrap">
                            <h5 class="main-name text-start text-md-end font-li-alinur-tatsama-unicode position-relative pb-20 pb-md-30">
                                <span>আলহাজ্ব শরীফ উদ্দিন খান মোমেন </span>
                                <span class="gender text-end d-block font-solaimanlipi">ভাইকে</span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="right-column">
            <div class="form-top-orange-container">
                <div class="orange-container">
                    <div class="orange-container-wrap">
                        <h3 class="main-designation-title font-li-alinur-tatsama-unicode"><span class="brand">কাপ-পিরিচ </span> <span class="slogan">মার্কায় ভোট দিন</span></h3>

                        <div class="logo-container">
                            <img class="w-auto img-fluid" src="{{ asset('img/logo.png') }}" alt="logo">
                        </div>
                    </div>
                </div>

                <section class="blue-bg"></section>
            </div>


            <div class="search-form-wrap">
                <!-- <h4 class="search-form-header">আপনার ভোট কেন্দ্রের নাম জানতে আপনার তথ্য বাংলায় প্রদান করুন</h4> -->
                <h4 class="search-form-header">আপনার তথ্য বাংলায় প্রদান করুন</h4>
                <h6 class="search-form-subheader">অনুসন্ধানের জন্য ইউনিয়ন পূরণ করা বাধ্যতামূলক</h6>

                <div class="filed-container">
                    <form class="elc-info-form">
                        <div class="mb-20">
                            <label class="label" for="name">নাম (অথবা নামের অংশ):</label>
                            <input class="input-field" type="text" name="name" value="">
                        </div>
                        <div class="mb-20">
                            <label class="label" for="name">পিতার নাম (অথবা নামের অংশ):</label>
                            <input class="input-field" type="text" name="fathers_name" value="">
                        </div>
                        <div class="mb-20">
                            <label class="label" for="dob">জন্ম তারিখ (দিন/মাস/বছর)</label>
                            <input class="input-field" type="text" placeholder="জন্ম তারিখ (০১/০১/১৯৯৫)" id="dob" name="dob" value="">
                        </div>
                        <div>
                            <label class="label" for="union_no">ইউনিয়ন:<span class="require">*</span></label>
                            <div class="select-dropdown" id="select_union_no">
                                <select class="selector-wrap" name="union_no" id="union_no" required>
                                    <option value="">ইউনিয়ন সিলেক্ট করুন</option>
                                    <!DOCTYPE html>
                                    <html>

                                    <head>
                                        <meta charset="UTF-8">
                                        <!-- <title>Error Page</title>
                                        <link rel="stylesheet" type="text/css" href="https://bdvoters.com/assets/customcss/error.css"> -->
                                    </head>

                                    <body>
                                    <!-- <div class="container">
                                        <div class="error-code"></div>
                                        <div class="error-message">Warning: Undefined array key "union_no" in /home/1255963.cloudwaysapps.com/yxrkvqyfgt/public_html/app/views/voter-info/form.php on line 36</div>
                                        <a href="/" class="error-back">Go Back Home</a>
                                    </div> -->
                                    </body>

                                    </html>
                                    <option value="বেলাব" > বেলাব </option>
                                    <option value="আমলাব" > আমলাব </option>
                                    <option value="চরউজিলাব" > চরউজিলাব </option>
                                    <option value="বাজনাব" > বাজনাব </option>
                                    <option value="বিন্নাবাইদ" > বিন্নাবাইদ </option>
                                    <option value="নারায়ণপুর" > নারায়ণপুর </option>
                                    <option value="পাটুলী" > পাটুলী </option>
                                    <option value="সাল্লাবাদ" > সাল্লাবাদ </option>
                                </select>
                            </div>
                        </div>

                        <div id="ward-list-div"></div>

                        <button type="button" class="submit-btn mt-20" id="search-btn">অনুসন্ধান</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- <section class="orange-container">
        <div class="orange-container-wrap">
            <h3 class="main-designation-title"><span class="brand">কাপ পিরিজ</span> <span class="slogan">মার্কায় ভোট দিন</span></h3>

            <div class="logo-container">
                <img src="img/logo.png" alt="">
            </div>

            <img class="line-design" src="img/line.png" alt="">
        </div>
    </section> -->

    <section class="main-orange-container">
        <div class="orange-container">
            <div class="orange-container-wrap">
                <h3 class="main-designation-title font-li-alinur-tatsama-unicode"><span class="brand">কাপ-পিরিচ </span> <span
                        class="slogan">মার্কায় ভোট দিন</span></h3>

                <div class="logo-container">
                    <img class="w-auto img-fluid" src="{{ asset('img/logo.png') }}" alt="logo">
                </div>

            </div>
        </div>
        <section class="blue-bg"></section>
    </section>

    <section class="responsive-bottom-form">
    </section>
</main>

<!-- <div id="phoneNumberInfo" class="modal fade">
        modal content goes here
</div> -->

<div class="container p-5" id="main" style="display: none">
    
<table class="table table-bordered" >
    <thead>
    <tr>
        <th>সিরিয়াল নাম্বার </th>
        <th>নাম </th>
        <th>ভোটার নাম্বার </th>
        <th>পিতার নাম </th>
        <th>মাতার নাম </th>
        <th>ইউনিয়ন  </th>

    </tr>
    </thead>
    <tbody id="voterList">
        <tr></tr>

    </tbody>

</table>

<div class="d-flex align-item-center justify-content-center">
<button type="button" class="text-align-center btn btn-info text-white submit-btn mt-20" id="load-more-btn" style="display:none;">আরো দেখুন</button>

</div>

</div>



<footer class="footer-container">
    <!-- <section class="footer-wrap">Developed by <span class="logo">Coders</span>Bucket</section> -->
    <section class="footer-wrap font-solaimanlipi">যোগাযোগ: 
        <a class="text-decoration-none" href="tel:01635273581">০১৬৩৫২৭৩৫৮১</a>,</section>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

<script src="{{ asset('js/bundle.js') }}"></script>
<!-- <script src="{{ asset('js/custom-script.js') }}"></script> -->

<script>

$(document).ready(function() {
        let page = 1;

        $('#search-btn').on('click', function() {
            page = 1; // Reset page count on new search
            fetchWards(page, true);
        });

        $('#load-more-btn').on('click', function() {
            page++;
            fetchWards(page, false);
        });

        function fetchWards(page, isNewSearch) {
            var name = $('input[name="name"]').val();
            var fathers_name = $('input[name="fathers_name"]').val();
            var dob = $('input[name="dob"]').val();
            var union_no = $('#union_no').val();

            $.ajax({
                url: '/search-voter-data', // Replace with your server endpoint
                type: 'POST',
                data: {
                    name: name,
                    fathers_name: fathers_name,
                    dob: dob,
                    union_no: union_no,
                    page: page
                },
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                 },
                success: function(response) {
                    var wards = response.data;
                    var wardListDiv = $('#voterList');
                    if (isNewSearch) {
                        wardListDiv.empty();
                    }
                    if (wards.length > 0) {
                        wards.forEach(function(ward) {
                            tobody = $('<tr></tr>');
                            wardListDiv.append(tobody);
                            tobody.append('<td>' + ward.si + '</td>' +'<td>' + ward.name + '</td>'+'<td>' + ward.voter_no + '</td>'+'<td>' + ward.fathers_or_husband + '</td>'+'<td>'+ ward.mother + '</td>'+'<td>'+ ward.union + '</td>'); // Assuming ward object has a name property
                        });
                        if (response.next_page_url) {

                            $('#main').show();
                            $('#load-more-btn').show();
                        } else {
                            $('#load-more-btn').hide();
                        }
                    } else {
                        if (isNewSearch) {
                            wardListDiv.append('<p>No wards found.</p>');
                        }
                        $('#load-more-btn').hide();
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    });

</script>
</body>

</html>
