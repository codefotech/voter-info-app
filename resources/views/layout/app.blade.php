<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>SHOP</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('/fonts/icomoon/frontendstyle.css')}}">
    <link rel="stylesheet" href="{{asset('/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('/css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('/css/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="{{asset('/css/frontendstyle.css')}}">
    <link rel="stylesheet" href="{{asset('/css/progress.css')}}">
    <link rel="stylesheet" href="{{asset('/css/animate.min.css')}}">

    @yield('styles')

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link rel="stylesheet" href="{{asset('/css/toastify.min.css')}}">
    <script src="{{asset('/js/config.js')}}"></script>
    <script src="{{asset('/js/toastify.min.js')}}"></script>
    <script src="{{asset('/js/axios.min.js')}}"></script>
</head>
<body>

    <div id="loader" class="loadingOverlay d-none">
        <div class="Line-Progress">
            <div class="indeterminate"></div>
        </div>
    </div>

    @yield('main_content')


    <script src="{{asset('/js/jquery.min.js')}}"></script>
    <script src="{{asset('/js/owl.carousel.js')}}"></script>
    <script src="{{asset('/js/owl.carousel.min.js')}}"></script>
    <script src="{{asset('/js/jquery.sticky.js')}}"></script>
{{--    <script src="{{asset('/js/main.js')}}"></script>--}}
    <script src="{{asset('/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('/js/popper.min.js')}}"></script>
</body>
</html>
