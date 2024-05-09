@extends('layout.dashboard')
@section('dashboard_content')
   <!-- PROFILE FORM START ======================= -->
<section class="content">
    <div class="container-fluid">
        <div class="row py-5 align-items-center justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header" style="background-image: linear-gradient(to bottom, rgb(12, 9, 88), rgb(0, 34, 141), rgb(37, 93, 157))">
                        <h3 class="card-title text-white">Upload Voter Info</h3>
                    </div>
                    <form action="uploadvoterinfo" method="post" enctype="multipart/form-data" >
                            @csrf
                        <div class="card-body">

                            <div class="form-group">
                                <label for="upazila">Upazila</label>
                                <select class="form-control" id="union" name="union">
                                    <option value="">Select Upazila</option>
                                    <option value="আমলাব">আমলাব</option>
                                    <option value="চরউজিলাব">চরউজিলাব</option>
                                    <option value="বাজনাব">বাজনাব</option>
                                    <option value="বেলাব">বেলাব</option>
                                    <option value="বিন্নাবাইদ">বিন্নাবাইদ</option>
                                    <option value="নারায়ণপুর">নারায়ণপুর</option>
                                    <option value="পাটুলী">পাটুলী</option>
                                    <option value="সাল্লাবাদ">সাল্লাবাদ</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>

                             <div class="form-group">
                                <label for="name">Text Format Data</label>
                                <textarea id="textdata" name="textdata" rows="4" cols="50"></textarea><br>
                            </div>
                        
                            <div class="form-group">
                                <label for="birth_date">Pdf File</label>
                                <input type="file" name="file" class="form-control" id="birth_date">
                            </div>
                        </div>

                        <div class="card-footer">
                            <button onclick="OnSubmit()" id="save-btn" class="btn text-white" style="background-image: linear-gradient(to top, rgb(0, 34, 141), rgb(37, 93, 157))">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</section>
<!-- PROFILE FORM END ========================= -->




<script>

</script>
@endsection
