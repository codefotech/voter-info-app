// Top Navbar ================
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    var navbarIcon = this.querySelector('i');
    if (navbarIcon.classList.contains('fa-bars')) {
        navbarIcon.classList.remove('fa-bars');
        navbarIcon.classList.add('fa-xmark');
    } else {
        navbarIcon.classList.remove('fa-xmark');
        navbarIcon.classList.add('fa-bars');
    }
});
