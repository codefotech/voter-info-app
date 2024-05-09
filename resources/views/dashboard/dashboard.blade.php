<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>

    <!-- Google Font: Source Sans Pro | Montserrat | Open Sans -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Icomoon Bootstrap 4 -->
    <link rel="stylesheet" href="{{asset('/fonts/icomoon/frontendstyle.css')}}">
    <!-- Tempusdominus Bootstrap 4 -->
    <link rel="stylesheet" href="{{asset('plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}">
    <!-- iCheck -->
    <link rel="stylesheet" href="{{asset('/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- JQVMap -->
    <link rel="stylesheet" href="{{asset('/plugins/jqvmap/jqvmap.min.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('/dist/css/adminlte.css')}}">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="{{asset('/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')}}">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="{{asset('/plugins/daterangepicker/daterangepicker.css')}}">
    <!-- summernote -->
    <link rel="stylesheet" href="{{asset('/plugins/summernote/summernote-bs4.min.css')}}">

    <link rel="stylesheet" href="{{asset('/css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('/css/owl.theme.default.min.css')}}">

    <link rel="stylesheet" href="{{asset('/css/progress.css')}}">
    <link rel="stylesheet" href="{{asset('/css/animate.min.css')}}">
    <link rel="stylesheet" href="{{asset('/css/bootstrap.css')}}">
    <!-- custom css -->
    <link rel="stylesheet" href="{{asset('/css/dashboard_custom.css')}}">
    <link rel="stylesheet" href="{{asset('/css/toastify.min.css')}}">

    @yield('dashboard_styles')

    <link href="{{asset('css/jquery.dataTables.min.css')}}" rel="stylesheet" />
    <script src="{{asset('js/jquery-3.7.0.min.js')}}"></script>


    <script src="{{asset('/js/config.js')}}"></script>
    <script src="{{asset('/js/toastify.min.js')}}"></script>
    <script src="{{asset('/js/axios.min.js')}}"></script>


</head>
<body class="hold-transition sidebar-mini layout-fixed">

<div id="loader" class="loadingOverlay d-none">
    <div class="Line-Progress">
        <div class="indeterminate"></div>
    </div>
</div>

<div class="wrapper">
    <!-- Navbar Start -->
    @include('layout.dashboard_partial.nav')
    <!-- Navbar End -->

    <!-- Sidebar Start -->
    @include('layout.dashboard_partial.sidebar')
    <!-- Sidebar End -->

    <!-- Main Content Start -->
    <div class="content-wrapper">
        @yield('dashboard_content')
    </div>
    <!-- Main Content End -->

    <!-- Footer Start -->
    @include('layout.dashboard_partial.footer')
    <!-- Footer End -->

</div>
<!-- ./wrapper -->




<!-- jQuery UI 1.11.4 -->
<script src="{{asset('/plugins/jquery-ui/jquery-ui.min.js')}}"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<script src="{{asset('/js/bootstrap.bundle.js')}}"></script>

<!-- Bootstrap 4 -->
<script src="{{asset('/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- ChartJS -->
<script src="{{asset('/plugins/chart.js/Chart.min.js')}}"></script>
<!-- Sparkline -->
<script src="{{asset('/plugins/sparklines/sparkline.js')}}"></script>
<!-- JQVMap -->
<script src="{{asset('/plugins/jqvmap/jquery.vmap.min.js')}}"></script>
<script src="{{asset('/plugins/jqvmap/maps/jquery.vmap.usa.js')}}"></script>
<!-- jQuery Knob Chart -->
<script src="{{asset('/plugins/jquery-knob/jquery.knob.min.js')}}"></script>
<!-- daterangepicker -->
<script src="{{asset('/plugins/moment/moment.min.js')}}"></script>
<script src="{{asset('/plugins/daterangepicker/daterangepicker.js')}}"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="{{asset('/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script>
<!-- Summernote -->
<script src="{{asset('/plugins/summernote/summernote-bs4.min.js')}}"></script>
<!-- overlayScrollbars -->
<script src="{{asset('/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{asset('/dist/js/adminlte.min.js')}}"></script>

</body>
</html>

