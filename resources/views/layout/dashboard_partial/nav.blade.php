<!-- NAVBAR START ======================= -->
<nav class="main-header navbar navbar-expand sticky-top bg-white">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link text-dark" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">

        <!-- Navbar Search Start -->
        <!--
        <li class="nav-item">
          <a class="nav-link text-dark" data-widget="navbar-search" href="#" role="button">
            <i class="fas fa-search"></i>
          </a>


          <div class="navbar-search-block">
              <form class="form-inline">
                <div class="input-group input-group-sm">

                    <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">

                  <div class="input-group-append">
                    <button class="btn btn-navbar" type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                    <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
          </div>

        </li>
        -->
        <!-- Navbar Search End -->

        <!-- Message Dropdown Menu Start -->
        <!--
        <li class="nav-item dropdown">
            <a class="nav-link text-dark" data-toggle="dropdown" href="#">
                <i class="far fa-bell"></i>
                <span class="badge badge-warning navbar-badge">15</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span class="dropdown-item dropdown-header">15 Notifications</span>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-envelope mr-2"></i> 4 new messages
                    <span class="float-right text-muted text-sm">3 mins</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-users mr-2"></i> 8 friend requests
                    <span class="float-right text-muted text-sm">12 hours</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-file mr-2"></i> 3 new reports
                    <span class="float-right text-muted text-sm">2 days</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
        </li>
        -->
        <!-- Message Dropdown Menu End -->

        <!-- Profile Dropdown Menu Start -->
        <li class="nav-item nav-profile dropdown">
            <a class="nav-link text-dark" href="#" data-toggle="dropdown" id="profileDropdown">
                <i class="fa fa-user"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a href="{{url('/userProfile')}}" class="dropdown-item profile">
                    <i class="ti-settings text-primary"></i>
                    Profile
                </a>
                <a href="{{url('/logout')}}" class="dropdown-item logout">
                    <i class="ti-power-off text-primary"></i>
                    Logout
                </a>
            </div>
        </li>
        <!-- Profile Dropdown Menu End -->

    </ul>
</nav>
<!-- NAVBAR END ========================= -->

